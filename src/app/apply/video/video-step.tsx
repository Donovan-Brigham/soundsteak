"use client";

import { useState } from "react";
import { ApplicationConsent } from "./application-consent";
import { VideoRecorder } from "./video-recorder";

export function VideoStep({
  artistId,
  initialConsented,
}: {
  artistId: string;
  initialConsented: boolean;
}) {
  const [consented, setConsented] = useState(initialConsented);

  if (!consented) {
    return (
      <ApplicationConsent
        artistId={artistId}
        onAccepted={() => setConsented(true)}
      />
    );
  }

  return <VideoRecorder artistId={artistId} />;
}
