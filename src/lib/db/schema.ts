import {
  pgTable,
  serial,
  varchar,
  integer,
  text,
  index,
  unique,
  timestamp,
  uuid,
  pgEnum
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

// Enums
export const enumOptions = ['si', 'no', 'parcialmente'] as const;
export const enumType = pgEnum('enum_type', enumOptions);

// Response value options
export const responseValues = ['si', 'no', 'no_aplica', 'en_proceso'] as const;
export const responseValueEnum = pgEnum('response_value', responseValues);

// Survey types
export const surveyTypes = ['adaptacion', 'mitigacion'] as const;
export const surveyTypeEnum = pgEnum('survey_type', surveyTypes);

// Response statuses
export const responseStatuses = ['draft', 'submitted'] as const;
export const responseStatusEnum = pgEnum('response_status', responseStatuses);

// Survey Questions table
export const surveyQuestions = pgTable(
  'survey_questions',
  {
    id: serial('id').primaryKey(),
    sectorId: integer('sector_id').notNull(),
    sector: varchar('sector', { length: 255 }).notNull(),
    type: varchar('type', { length: 50 }).notNull(),
    ndcMeasurement: integer('ndc_measurement').notNull(),
    initiative: text('initiative').notNull(),
    odsId: integer('ods_id').notNull(),
    ods: varchar('ods', { length: 255 }).notNull(),
    odsGoal: text('ods_goal').notNull(),
    odsUrlImage: text('ods_url_image'),
    actionId: integer('action_id').notNull(),
    action: text('action').notNull(),
    indicatorName: text('indicator_name').notNull(),
    indicatorEquation: text('indicator_equation').notNull(),
    indicatorFrequency: varchar('indicator_frequency', {
      length: 100
    }).notNull(),
    indicatorRecommendedGoal: text('indicator_recommended_goal'),
    ghgEmissionsReductionTarget: text('ghg_emissions_reduction_target'),
    coBenefits: text('co_benefits'),
    question: text('question').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow()
  },
  (table) => [
    index('survey_question_sector_idx').on(table.sectorId),
    index('survey_question_type_idx').on(table.type)
  ]
);
export const surveyQuestionsSelectSchema = createSelectSchema(surveyQuestions);
export const surveyQuestionsInsertSchema = createInsertSchema(surveyQuestions);
export type SurveyQuestion = typeof surveyQuestions.$inferSelect;

// Survey Response Headers table
export const surveyResponseHeaders = pgTable(
  'survey_response_headers',
  {
    id: serial('id').primaryKey(),
    companyId: integer('company_id')
      .notNull()
      .references(() => companiesInfo.id, { onDelete: 'cascade' }),
    surveyType: surveyTypeEnum('survey_type').notNull(),
    sectorId: integer('sector_id').notNull(),
    status: responseStatusEnum('status').default('draft'),
    submittedAt: timestamp('submitted_at'),
    notes: text('notes'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow()
  },
  (table) => [
    index('survey_response_header_company_idx').on(table.companyId),
    index('survey_response_header_survey_type_idx').on(table.surveyType),
    index('survey_response_header_sector_idx').on(table.sectorId),
    index('survey_response_header_status_idx').on(table.status),
    index('survey_response_header_created_at_idx').on(table.createdAt),
    unique('unique_draft_response_per_company_survey_sector').on(
      table.companyId,
      table.surveyType,
      table.sectorId,
      table.status
    )
  ]
);
export const surveyResponseHeadersSelectSchema = createSelectSchema(
  surveyResponseHeaders
);
export const surveyResponseHeadersInsertSchema = createInsertSchema(
  surveyResponseHeaders
);
export type SurveyResponseHeader = typeof surveyResponseHeaders.$inferSelect;

// Survey Response Items table
export const surveyResponseItems = pgTable(
  'survey_response_items',
  {
    id: serial('id').primaryKey(),
    headerId: integer('header_id')
      .notNull()
      .references(() => surveyResponseHeaders.id, { onDelete: 'cascade' }),
    questionId: integer('question_id')
      .notNull()
      .references(() => surveyQuestions.id, { onDelete: 'cascade' }),
    value: responseValueEnum('value').notNull(),
    notes: text('notes'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow()
  },
  (table) => [
    index('survey_response_item_header_idx').on(table.headerId),
    index('survey_response_item_question_idx').on(table.questionId),
    // Ensure each question is only answered once per response header
    unique('unique_header_question').on(table.headerId, table.questionId)
  ]
);
export const surveyResponseItemsSelectSchema =
  createSelectSchema(surveyResponseItems);
export const surveyResponseItemsInsertSchema =
  createInsertSchema(surveyResponseItems);
export type SurveyResponseItem = typeof surveyResponseItems.$inferSelect;

// Unified companies table that combines all previous tables
export const companiesInfo = pgTable('companies_info', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').defaultRandom().notNull().unique(),
  nombreEmpresa: varchar('nombre_empresa', { length: 255 }).notNull(),
  nit: varchar('nit', { length: 50 }),
  sectorEconomico: varchar('sector_economico', { length: 100 }),
  subsector: varchar('subsector', { length: 100 }),
  cantidadEmpleados: integer('cantidad_empleados'),
  departamento: varchar('departamento', { length: 100 }),

  // Fields from ndc_assessments
  familiarizadoMetas: enumType('familiarizado_metas').default('no'),
  conoceMetasPymes: enumType('conoce_metas_pymes').default('no'),
  recibidoFormacion: enumType('recibido_formacion').default('no'),
  familiarizadoODS: varchar('familiarizado_ods', { length: 200 }),

  // Fields from sustainability_assessments
  calculadoHuella12: varchar('calculado_huella_12', { length: 400 }),
  calculadoHuella3: varchar('calculado_huella_3', { length: 400 }),
  identificadoAsuntos: varchar('identificado_asuntos', { length: 400 }),
  analizadoDoble: varchar('analizado_doble', { length: 400 }),
  capacitadoColaboradores: varchar('capacitado_colaboradores', { length: 400 }),

  // Additional fields that might be useful
  direccion: varchar('direccion', { length: 255 }),
  telefono: varchar('telefono', { length: 50 }),
  correoElectronico: varchar('correo_electronico', { length: 100 }),
  sitioWeb: varchar('sitio_web', { length: 255 }),

  // Audit fields
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at')
});

// Schema validations
export const companiesSelectSchema = createSelectSchema(companiesInfo);
export const companiesInsertSchema = createInsertSchema(companiesInfo);
export type CompaniesInfo = typeof companiesInfo.$inferSelect;
