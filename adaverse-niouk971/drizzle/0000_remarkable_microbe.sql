CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "promotions" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"start_at" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE "students_projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"promotion_id" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"image_url" varchar(255),
	"custom_url" varchar(255),
	"github_url" varchar(255),
	"demo_url" varchar(255),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"published_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "students_projects" ADD CONSTRAINT "students_projects_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "students_projects" ADD CONSTRAINT "students_projects_promotion_id_promotions_id_fk" FOREIGN KEY ("promotion_id") REFERENCES "public"."promotions"("id") ON DELETE cascade ON UPDATE no action;