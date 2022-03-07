const MEILISEARCH_CONFIG = {
  HOST: "https://76b9-122-177-109-176.ngrok.io",
  MASTER_KEY: "2b53060fad07dbcb061cec080a14c52fb1ba848c",
  INDEX_NAME: "tenant_token",
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
