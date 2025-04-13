export interface Question {
  sector_id: number;
  sector: string;
  type: string;
  ndc_measurement: number;
  initiative: string;
  ods_id: number;
  ods: string;
  ods_goal: string;
  ods_url_image: string;
  id_actions: number;
  actions: string;
  name_indicator: string;
  equation_indicator: string;
  frequency_indicator: string;
  recommended_goal_indicator: string;
  ghg_emissions_reduction_target_2030_tco2eq: string | null;
  co_benefits: string | null;
  question: string;
}

export interface Answer {
  questionId: number;
  value: string;
}
