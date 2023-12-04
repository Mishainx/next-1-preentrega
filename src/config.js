import dotenv from 'dotenv'

dotenv.config();

export default{
    API_KEY: process.env.apikey,
    AUTH_DOMAIN: process.env.autuDomain,
    PROJECT_ID: process.env.projectID,
    STORAGE_BUCKET: process.env.storageBucket,
    MESSAGING_SENDER_ID: process.env.messaggingSenderId,
    APP_ID: process.env.appId
}