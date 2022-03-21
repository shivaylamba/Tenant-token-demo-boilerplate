const MEILISEARCH_CONFIG = {
  HOST: process.env.MEILI_HOST || "http://localhost:7700",
  MASTER_KEY: process.env.MEILI_API_KEY || "masterKey",
  INDEX_NAME: process.env.MEILI_INDEX || "patient_medical_record",
};
const userNameList = [
  "Zia",
  "Kevin",
  "Charlotte",
  "Tom",
  "John",
  "Mary",
  "Smith",
  "Bill",
  "Mike",
  "Hannah",
  "Seth",
];

const diseaseList = [
  "Diabetes",
  "Covid",
  "Malaria",
  "Dengue",
  "Cold and cough",
  "Typhoid",
];

module.exports = { MEILISEARCH_CONFIG, userNameList, diseaseList };
