export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      artist_consents: {
        Row: {
          accepted_at: string
          artist_id: string
          consent_key: string
          id: string
        }
        Insert: {
          accepted_at?: string
          artist_id: string
          consent_key: string
          id?: string
        }
        Update: {
          accepted_at?: string
          artist_id?: string
          consent_key?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "artist_consents_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
        ]
      }
      artist_intake_responses: {
        Row: {
          artist_id: string
          created_at: string
          id: string
          question_key: string
          response: Json
          response_group: Database["public"]["Enums"]["intake_response_group"]
          updated_at: string
        }
        Insert: {
          artist_id: string
          created_at?: string
          id?: string
          question_key: string
          response: Json
          response_group: Database["public"]["Enums"]["intake_response_group"]
          updated_at?: string
        }
        Update: {
          artist_id?: string
          created_at?: string
          id?: string
          question_key?: string
          response?: Json
          response_group?: Database["public"]["Enums"]["intake_response_group"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "artist_intake_responses_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
        ]
      }
      artist_members: {
        Row: {
          artist_id: string
          created_at: string
          full_name: string
          id: string
          is_primary_contact: boolean
          role: string | null
        }
        Insert: {
          artist_id: string
          created_at?: string
          full_name: string
          id?: string
          is_primary_contact?: boolean
          role?: string | null
        }
        Update: {
          artist_id?: string
          created_at?: string
          full_name?: string
          id?: string
          is_primary_contact?: boolean
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "artist_members_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
        ]
      }
      artist_milestones: {
        Row: {
          artist_id: string
          category: string
          completed_at: string | null
          created_at: string
          id: string
          milestone_id: string | null
          sequence_order: number
          status: Database["public"]["Enums"]["artist_milestone_status"]
          title: string
          unlocked_at: string | null
        }
        Insert: {
          artist_id: string
          category: string
          completed_at?: string | null
          created_at?: string
          id?: string
          milestone_id?: string | null
          sequence_order?: number
          status?: Database["public"]["Enums"]["artist_milestone_status"]
          title: string
          unlocked_at?: string | null
        }
        Update: {
          artist_id?: string
          category?: string
          completed_at?: string | null
          created_at?: string
          id?: string
          milestone_id?: string | null
          sequence_order?: number
          status?: Database["public"]["Enums"]["artist_milestone_status"]
          title?: string
          unlocked_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "artist_milestones_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artist_milestones_milestone_id_fkey"
            columns: ["milestone_id"]
            isOneToOne: false
            referencedRelation: "milestones"
            referencedColumns: ["id"]
          },
        ]
      }
      artist_ownership_splits: {
        Row: {
          artist_id: string
          created_at: string
          holder_type: Database["public"]["Enums"]["ownership_holder_type"]
          id: string
          locked_at: string | null
          member_id: string | null
          percentage: number
        }
        Insert: {
          artist_id: string
          created_at?: string
          holder_type: Database["public"]["Enums"]["ownership_holder_type"]
          id?: string
          locked_at?: string | null
          member_id?: string | null
          percentage: number
        }
        Update: {
          artist_id?: string
          created_at?: string
          holder_type?: Database["public"]["Enums"]["ownership_holder_type"]
          id?: string
          locked_at?: string | null
          member_id?: string | null
          percentage?: number
        }
        Relationships: [
          {
            foreignKeyName: "artist_ownership_splits_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artist_ownership_splits_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "artist_members"
            referencedColumns: ["id"]
          },
        ]
      }
      artist_platform_connections: {
        Row: {
          artist_id: string
          connected_at: string
          external_url: string | null
          id: string
          platform: Database["public"]["Enums"]["platform_connection_type"]
          verified: boolean
        }
        Insert: {
          artist_id: string
          connected_at?: string
          external_url?: string | null
          id?: string
          platform: Database["public"]["Enums"]["platform_connection_type"]
          verified?: boolean
        }
        Update: {
          artist_id?: string
          connected_at?: string
          external_url?: string | null
          id?: string
          platform?: Database["public"]["Enums"]["platform_connection_type"]
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "artist_platform_connections_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
        ]
      }
      artist_video_submissions: {
        Row: {
          artist_id: string
          created_at: string
          duration_seconds: number | null
          id: string
          status: Database["public"]["Enums"]["video_submission_status"]
          storage_path: string
          submission_type: Database["public"]["Enums"]["video_submission_type"]
        }
        Insert: {
          artist_id: string
          created_at?: string
          duration_seconds?: number | null
          id?: string
          status?: Database["public"]["Enums"]["video_submission_status"]
          storage_path: string
          submission_type?: Database["public"]["Enums"]["video_submission_type"]
        }
        Update: {
          artist_id?: string
          created_at?: string
          duration_seconds?: number | null
          id?: string
          status?: Database["public"]["Enums"]["video_submission_status"]
          storage_path?: string
          submission_type?: Database["public"]["Enums"]["video_submission_type"]
        }
        Relationships: [
          {
            foreignKeyName: "artist_video_submissions_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
        ]
      }
      artists: {
        Row: {
          artist_type: Database["public"]["Enums"]["artist_type"] | null
          bio: string | null
          created_at: string
          id: string
          location: string | null
          stage_name: string
          status: Database["public"]["Enums"]["artist_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          artist_type?: Database["public"]["Enums"]["artist_type"] | null
          bio?: string | null
          created_at?: string
          id?: string
          location?: string | null
          stage_name: string
          status?: Database["public"]["Enums"]["artist_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          artist_type?: Database["public"]["Enums"]["artist_type"] | null
          bio?: string | null
          created_at?: string
          id?: string
          location?: string | null
          stage_name?: string
          status?: Database["public"]["Enums"]["artist_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      milestones: {
        Row: {
          applicable_artist_types: Database["public"]["Enums"]["artist_type"][]
          category: string
          description: string | null
          format_label: string
          id: string
          sort_order: number
        }
        Insert: {
          applicable_artist_types: Database["public"]["Enums"]["artist_type"][]
          category: string
          description?: string | null
          format_label: string
          id?: string
          sort_order?: number
        }
        Update: {
          applicable_artist_types?: Database["public"]["Enums"]["artist_type"][]
          category?: string
          description?: string | null
          format_label?: string
          id?: string
          sort_order?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      artist_milestone_status: "locked" | "current" | "completed" | "flagged"
      artist_status:
        | "draft"
        | "submitted"
        | "shortlisted"
        | "signed"
        | "active"
        | "graduated"
        | "declined"
      artist_type:
        | "band"
        | "solo"
        | "dj_electronic"
        | "composer_producer"
        | "other"
      intake_response_group: "journey" | "ai_context"
      ownership_holder_type: "artist_member" | "platform" | "investor_pool"
      platform_connection_type:
        | "spotify_for_artists"
        | "instagram"
        | "tiktok"
        | "youtube"
        | "other"
      video_submission_status: "pending" | "reviewed" | "approved" | "rejected"
      video_submission_type: "application" | "showcase"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      artist_milestone_status: ["locked", "current", "completed", "flagged"],
      artist_status: [
        "draft",
        "submitted",
        "shortlisted",
        "signed",
        "active",
        "graduated",
        "declined",
      ],
      artist_type: [
        "band",
        "solo",
        "dj_electronic",
        "composer_producer",
        "other",
      ],
      intake_response_group: ["journey", "ai_context"],
      ownership_holder_type: ["artist_member", "platform", "investor_pool"],
      platform_connection_type: [
        "spotify_for_artists",
        "instagram",
        "tiktok",
        "youtube",
        "other",
      ],
      video_submission_status: ["pending", "reviewed", "approved", "rejected"],
      video_submission_type: ["application", "showcase"],
    },
  },
} as const
