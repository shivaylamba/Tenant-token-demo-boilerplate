import axios from 'axios'

export const MEILISEARCH_CONFIG = {
  HOST: process.env.REACT_APP_MEILI_HOST || 'http://localhost:7700',
  MASTER_KEY: process.env.REACT_APP_MEILI_API_KEY || 'masterKey',
  INDEX: process.env.REACT_APP_MEILI_INDEX || 'patient_medical_record',
  API_HOST: process.env.REACT_APP_API_HOST || 'http://localhost:5000',
}

const apiHost = MEILISEARCH_CONFIG.API_HOST

/* Add the function for Tenant token below */
export const getTenantToken = async (userName) => {}
