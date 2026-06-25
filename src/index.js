const fs = require('fs');
const path = require('path');
const readline = require('readline');

const extract = require('./extract');
const transform = require('./transform');
const load = require('./load');

async function run(companyName, forceRefresh) {
    try {
        const outputPath = path.join(
            __dirname,
            '..',
            'outputs',
            `${companyName}.json`
        );

        const rawData = await extract(
            companyName,
            forceRefresh
        );

        if (
            !forceRefresh &&
            fs.existsSync(outputPath) &&
            rawData.company_identity
        ) {
            console.log(
                JSON.stringify(rawData, null, 4)
            );

            console.log(
                '\nLoaded existing JSON from outputs.'
            );

            return;
        }

        const companyProfile =
            await transform(rawData);

        await load(companyProfile);

        console.log(
            JSON.stringify(
                companyProfile,
                null,
                4
            )
        );

        console.log(
            '\nCompany profile generated successfully.'
        );

    } catch (error) {
        console.error(
            'Pipeline failed:',
            error
        );
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question(
    'Enter company name (add !refresh to force API): ',
    async (input) => {

        const forceRefresh =
            input.includes('!refresh');

        const companyName =
            input.replace('!refresh', '').trim();

        await run(
            companyName,
            forceRefresh
        );

        rl.close();
    }
);