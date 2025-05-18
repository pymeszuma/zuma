CREATE TABLE "companies" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
	"nombre_empresa" varchar(255) NOT NULL,
	"nit" varchar(50),
	"sector_economico" varchar(100),
	"sector_economico_otro" varchar(100),
	"subsector" varchar(100),
	"cantidad_empleados" integer,
	"departamento" varchar(100),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "companies_uuid_unique" UNIQUE("uuid")
);
--> statement-breakpoint
CREATE TABLE "ndc_assessments" (
	"id" serial PRIMARY KEY NOT NULL,
	"company_id" integer NOT NULL,
	"familiarizado_metas" varchar(50),
	"conoce_metas_pymes" varchar(50),
	"recibido_formacion" varchar(50),
	"familiarizado_ods" varchar(50),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sustainability_assessments" (
	"id" serial PRIMARY KEY NOT NULL,
	"company_id" integer NOT NULL,
	"calculado_huella_12" varchar(50),
	"calculado_huella_3" varchar(50),
	"identificado_asuntos" varchar(50),
	"analizado_doble" varchar(50),
	"capacitado_colaboradores" varchar(50),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "ndc_assessments" ADD CONSTRAINT "ndc_assessments_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sustainability_assessments" ADD CONSTRAINT "sustainability_assessments_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;