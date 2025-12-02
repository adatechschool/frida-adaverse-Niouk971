CREATE UNIQUE INDEX "projects_type_unique" ON "projects" USING btree ("type");--> statement-breakpoint
CREATE UNIQUE INDEX "promotions_name_unique" ON "promotions" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "students_projects_unique_project_promo" ON "students_projects" USING btree ("project_id","promotion_id");