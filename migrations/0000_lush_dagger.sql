CREATE TABLE "analyses" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"file_name" text NOT NULL,
	"file_type" text NOT NULL,
	"original_file_name" text NOT NULL,
	"detected_stage" text,
	"action_date" timestamp DEFAULT now(),
	"preparation_score" integer,
	"swing_score" integer,
	"follow_through_score" integer,
	"keypoints" jsonb,
	"observations" jsonb,
	"suggestions" jsonb
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "analyses" ADD CONSTRAINT "analyses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;