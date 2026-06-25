const fs = require('fs');
const path = require('path');

const { getCompany } = require('./providers/pdlProvider');

async function extract(companyName, forceRefresh = false) {
    const outputPath = path.join(
        __dirname,
        '..',
        'outputs',
        `${companyName}.json`
    );

    if (!forceRefresh && fs.existsSync(outputPath)) {
        console.log('\nUsing cached company profile...\n');

        return JSON.parse(
            fs.readFileSync(outputPath, 'utf8')
        );
    }

    console.log('\nFetching fresh data from PDL...\n');

    return await getCompany(companyName);
}

module.exports = extract;