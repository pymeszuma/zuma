CREATE TYPE "public"."enum_type" AS ENUM('si', 'no', 'parcialmente');--> statement-breakpoint
CREATE TYPE "public"."response_status" AS ENUM('draft', 'submitted');--> statement-breakpoint
CREATE TYPE "public"."response_value" AS ENUM('si', 'no', 'no_aplica', 'en_proceso');--> statement-breakpoint
CREATE TYPE "public"."survey_type" AS ENUM('adaptacion', 'mitigacion');--> statement-breakpoint
CREATE TABLE "companies_info" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
	"nombre_empresa" varchar(255) NOT NULL,
	"nit" varchar(50),
	"sector_economico" varchar(100),
	"subsector" varchar(100),
	"cantidad_empleados" integer,
	"departamento" varchar(100),
	"familiarizado_metas" "enum_type" DEFAULT 'no',
	"conoce_metas_pymes" "enum_type" DEFAULT 'no',
	"recibido_formacion" "enum_type" DEFAULT 'no',
	"familiarizado_ods" varchar(200),
	"calculado_huella_12" varchar(400),
	"calculado_huella_3" varchar(400),
	"identificado_asuntos" varchar(400),
	"analizado_doble" varchar(400),
	"capacitado_colaboradores" varchar(400),
	"direccion" varchar(255),
	"telefono" varchar(50),
	"correo_electronico" varchar(100),
	"sitio_web" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "companies_info_uuid_unique" UNIQUE("uuid")
);
--> statement-breakpoint
CREATE TABLE "survey_questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"sector_id" integer NOT NULL,
	"sector" varchar(255) NOT NULL,
	"type" varchar(50) NOT NULL,
	"ndc_measurement" integer NOT NULL,
	"initiative" text NOT NULL,
	"ods_id" integer NOT NULL,
	"ods" varchar(255) NOT NULL,
	"ods_goal" text NOT NULL,
	"ods_url_image" text,
	"action_id" integer NOT NULL,
	"action" text NOT NULL,
	"indicator_name" text NOT NULL,
	"indicator_equation" text NOT NULL,
	"indicator_frequency" varchar(100) NOT NULL,
	"indicator_recommended_goal" text,
	"ghg_emissions_reduction_target" text,
	"co_benefits" text,
	"question" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "survey_response_headers" (
	"id" serial PRIMARY KEY NOT NULL,
	"company_id" integer NOT NULL,
	"survey_type" "survey_type" NOT NULL,
	"sector_id" integer NOT NULL,
	"status" "response_status" DEFAULT 'draft',
	"submitted_at" timestamp,
	"notes" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "unique_draft_response_per_company_survey_sector" UNIQUE("company_id","survey_type","sector_id","status")
);
--> statement-breakpoint
CREATE TABLE "survey_response_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"header_id" integer NOT NULL,
	"question_id" integer NOT NULL,
	"value" "response_value" NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "unique_header_question" UNIQUE("header_id","question_id")
);
--> statement-breakpoint
DROP TABLE "companies" CASCADE;--> statement-breakpoint
DROP TABLE "ndc_assessments" CASCADE;--> statement-breakpoint
DROP TABLE "sustainability_assessments" CASCADE;--> statement-breakpoint
ALTER TABLE "survey_response_headers" ADD CONSTRAINT "survey_response_headers_company_id_companies_info_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies_info"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "survey_response_items" ADD CONSTRAINT "survey_response_items_header_id_survey_response_headers_id_fk" FOREIGN KEY ("header_id") REFERENCES "public"."survey_response_headers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "survey_question_sector_idx" ON "survey_questions" USING btree ("sector_id");--> statement-breakpoint
CREATE INDEX "survey_question_type_idx" ON "survey_questions" USING btree ("type");--> statement-breakpoint
CREATE INDEX "survey_response_header_company_idx" ON "survey_response_headers" USING btree ("company_id");--> statement-breakpoint
CREATE INDEX "survey_response_header_survey_type_idx" ON "survey_response_headers" USING btree ("survey_type");--> statement-breakpoint
CREATE INDEX "survey_response_header_sector_idx" ON "survey_response_headers" USING btree ("sector_id");--> statement-breakpoint
CREATE INDEX "survey_response_header_status_idx" ON "survey_response_headers" USING btree ("status");--> statement-breakpoint
CREATE INDEX "survey_response_header_created_at_idx" ON "survey_response_headers" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "survey_response_item_header_idx" ON "survey_response_items" USING btree ("header_id");--> statement-breakpoint
CREATE INDEX "survey_response_item_question_idx" ON "survey_response_items" USING btree ("question_id");