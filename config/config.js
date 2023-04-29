const dotenv = require(`dotenv`);

dotenv.config();

module.exports = {
    PORT : process.env.PORT,
    INTEGRATION_KEY : process.env.INTEGRATION_KEY,
    BASE_PATH :process.env.BASE_PATH,
    USER_ID : process.env.USER_ID,
    TEMPLATE_ID : process.env.TEMPLATE_ID,
    ACCOUNT_ID : process.env.ACCOUNT_ID
}