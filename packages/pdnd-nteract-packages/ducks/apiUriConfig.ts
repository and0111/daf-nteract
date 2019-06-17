const BASE_API_URI = "https://api.daf.teamdigitale.it/pdnd-openapi/";

const OLD_SEARCH_DATASET_ENDPOINT =
  "https://api.daf.teamdigitale.it/" +
  "dati-gov/v1/public/elasticsearch/search";
const SEARCH_DATASET_ENDPOINT = BASE_API_URI + "public/search/";

const OLD_SELECT_DATASET_ENDPOINT =
  "https://api.daf.teamdigitale.it/" +
  "catalog-manager/v1/public/catalog-ds/getbyname/";
// const SELECT_DATASET_ENDPOINT = "https://api.daf.teamdigitale.it/" + "catalog-manager/v1/public/catalog-ds/getbyname/"

const OLD_SAVE_DATASET_ENDPOINT =
  "http://localhost:8080/pdnd-openapi/dataset/save";
const SAVE_DATASET_ENDPOINT = BASE_API_URI + "dataset/save/";

const OLD_REQUEST_TOKEN_ENDPOINT =
  "https://api.daf.teamdigitale.it/" + +"security-manager/v1/ipa/userbymail/";
const REQUEST_TOKEN_ENDPOINT = BASE_API_URI + "jwt/";

const OLD_VALIDATE_TOKEN_ENDPOINT =
  "https://api.daf.teamdigitale.it/" + +"sso-manager/secured/test";
// const VALIDATE_TOKEN_ENDPOINT = BASE_API_URI + "sso-manager/secured/test"

export {
  BASE_API_URI,
  OLD_SEARCH_DATASET_ENDPOINT,
  SEARCH_DATASET_ENDPOINT,
  OLD_SELECT_DATASET_ENDPOINT,
  // SELECT_DATASET_ENDPOINT,
  OLD_SAVE_DATASET_ENDPOINT,
  SAVE_DATASET_ENDPOINT,
  OLD_REQUEST_TOKEN_ENDPOINT,
  REQUEST_TOKEN_ENDPOINT,
  OLD_VALIDATE_TOKEN_ENDPOINT /* ,
    VALIDATE_TOKEN_ENDPOINT */
};
