// JSON Schemas for AI responses

export const FINAL_ANALYSIS_SCHEMA = {
  type: "OBJECT",
  properties: {
    score: { type: "INTEGER" },
    skillComparison: { type: "ARRAY" },
    lackSkills: { type: "ARRAY" },
    futureSkills: { type: "ARRAY" },
    recommendedPath: { type: "STRING" },
  },
};

export const QUIZ_SCHEMA = {
  type: "ARRAY",
  items: { type: "OBJECT" },
};

export const CAREER_PATH_SCHEMA = {
  type: "OBJECT",
  properties: { career: {}, domain: {}, skills: {}, gap: {}, rationale: {} },
};

export const RESUME_ANALYSIS_SCHEMA = {
  type: "OBJECT",
  properties: {
    matchPercentage: { type: "INTEGER" },
    topSkillsFound: { type: "ARRAY" },
    criticalSkillsMissing: { type: "ARRAY" },
    recommendation: { type: "STRING" },
  },
};
