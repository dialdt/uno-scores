const axios = require('axios')
const qs = require('qs')
const API_KEY = process.env
const APP_ID = process.env
const AUTH_DOMAIN = process.env
const DB_URL = process.env
const MESSAGING_SENDER_ID = process.env
const PROJECT_ID = process.env
const STORAGE_BUCKET = process.env


exports.handler = async function(event, context) {
  // apply our function to the queryStringParameters and assign it to a variable
  //const API_PARAMS = qs.stringify(event.queryStringParameters)
  //console.log('API_PARAMS', API_PARAMS)
  // Get env var values defined in our Netlify site UI

  // TODO: customize your URL and API keys set in the Netlify Dashboard
  // this is secret too, your frontend won't see this
  const { API_KEY, API_ID, AUTH_DOMAIN, DB_URL, MESSAGING_SENDER_ID, PROJECT_ID, STORAGE_BUCKET } = process.env
  //const URL = `https://dog.ceo/api/breed/${API_SECRET}/images`

  //console.log('Constructed URL is ...', URL)
  return [
    {
      statusCode: 200,
      body: API_KEY
    },
    {
      statusCode: 200,
      body: APP_ID
    },
    {
      statusCode: 200,
      body: AUTH_DOMAIN
    },
    {
      statusCode: 200,
      body: DB_URL
    },
    {
      statusCode: 200,
      body: MESSAGING_SENDER_ID
    },
    {
      statusCode: 200,
      body: PROJECT_ID
    },
    {
      statusCode: 200,
      body: STORAGE_BUCKET
    }
  ]
}
