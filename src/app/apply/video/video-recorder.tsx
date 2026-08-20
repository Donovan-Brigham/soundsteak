"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Stage =
  | "idle"
  | "requesting"
  | "ready"
  | "recording"
  | "recorded"
  | "uploading"
  | "error";

const MAX_SECONDS = 180; // 3 minutes — enough for a real performance without inviting huge uploads

export function VideoRecorder({ artistId }: { artistId: string }) {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [stage, setStage] = useState<Stage>("idle");
  const [seconds, setSeconds] = useState(0);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }, []);

  useEffect(() => stopStream, [stopStream]);

  const startCamera = useCallback(async () => {
    setStage("requesting");
    setErrorMessage(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: true,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.muted = true;
        await videoRef.current.play();
      }
      setStage("ready");
    } catch {
      setErrorMessage(
        "Camera and microphone access is required to record your performance. Check your browser's permission settings and try again.",
      );
      setStage("error");
    }
  }, []);

  const startRecording = useCallback(() => {
    if (!streamRef.current) return;
    chunksRef.current = [];
    const recorder = new MediaRecorder(streamRef.current, {
      mimeType: MediaRecorder.isTypeSupported("video/webm;codecs=vp9,opus")
        ? "video/webm;codecs=vp9,opus"
        : "video/webm",
    });
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunksRef.current.push(event.data);
    };
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      setRecordedBlob(blob);
      setStage("recorded");
    };
    recorder.start();
    recorderRef.current = recorder;
    setSeconds(0);
    setStage("recording");

    timerRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev + 1 >= MAX_SECONDS) {
          recorder.stop();
          if (timerRef.current) clearInterval(timerRef.current);
        }
        return prev + 1;
      });
    }, 1000);
  }, []);

  const stopRecording = useCallback(() => {
    recorderRef.current?.stop();
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const retake = useCallback(() => {
    setRecordedBlob(null);
    setSeconds(0);
    setStage("ready");
  }, []);

  const submit = useCallback(async () => {
    if (!recordedBlob) return;
    setStage("uploading");
    setErrorMessage(null);

    const supabase = createClient();
    const path = `${artistId}/${crypto.randomUUID()}.webm`;

    const { error: uploadError } = await supabase.storage
      .from("artist-videos")
      .upload(path, recordedBlob, { contentType: "video/webm" });

    if (uploadError) {
      setErrorMessage(uploadError.message);
      setStage("recorded");
      return;
    }

    const { error: insertError } = await supabase
      .from("artist_video_submissions")
      .insert({
        artist_id: artistId,
        storage_path: path,
        duration_seconds: seconds,
        submission_type: "application",
      });

    if (insertError) {
      setErrorMessage(insertError.message);
      setStage("recorded");
      return;
    }

    stopStream();
    router.push("/apply/review");
  }, [recordedBlob, artistId, seconds, stopStream, router]);

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const timeLabel = `${minutes}:${secs.toString().padStart(2, "0")}`;

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-video overflow-hidden rounded-radius border border-border bg-black">
        {stage === "recorded" && recordedBlob ? (
           
          <video
            src={URL.createObjectURL(recordedBlob)}
            controls
            className="h-full w-full object-cover"
          />
        ) : (
           
          <video
            ref={videoRef}
            playsInline
            className="h-full w-full object-cover"
          />
        )}

        {stage === "recording" && (
          <div className="absolute top-3 left-3 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
            {timeLabel}
          </div>
        )}

        {stage === "idle" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="px-8 text-center text-sm text-text-2">
              We&rsquo;ll ask for camera and microphone access — this stays
              between you and your application.
            </p>
          </div>
        )}
      </div>

      {errorMessage && <p className="text-sm text-red-400">{errorMessage}</p>}

      <div className="flex gap-3">
        {stage === "idle" && (
          <button
            onClick={startCamera}
            className="rounded-radius bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Turn on camera
          </button>
        )}

        {stage === "requesting" && (
          <p className="text-sm text-text-2">Waiting for permission…</p>
        )}

        {stage === "ready" && (
          <button
            onClick={startRecording}
            className="rounded-radius bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Start recording
          </button>
        )}

        {stage === "recording" && (
          <button
            onClick={stopRecording}
            className="rounded-radius bg-surface-2 px-6 py-3 text-sm font-medium text-text transition-opacity hover:opacity-90"
          >
            Stop ({timeLabel})
          </button>
        )}

        {stage === "recorded" && (
          <>
            <button
              onClick={retake}
              className="rounded-radius border border-border px-6 py-3 text-sm font-medium text-text transition-opacity hover:opacity-90"
            >
              Retake
            </button>
            <button
              onClick={submit}
              className="rounded-radius bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Use this take
            </button>
          </>
        )}

        {stage === "uploading" && (
          <p className="text-sm text-text-2">Uploading…</p>
        )}

        {stage === "error" && (
          <button
            onClick={startCamera}
            className="rounded-radius bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
