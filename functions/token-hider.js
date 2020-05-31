const axios = require('axios')
const qs = require('qs')

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
}
