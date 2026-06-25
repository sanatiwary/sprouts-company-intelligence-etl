const PDLJS = require('peopledatalabs');
require('dotenv').config();

const client = new PDLJS({
    apiKey: process.env.PDL_API_KEY
});

async function getCompany(companyName) {
    const response = await client.company.enrichment({
        name: companyName
    });

    return response;
}

module.exports = {
    getCompany
};