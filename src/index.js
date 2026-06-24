const extract = require('./extract');
const transform = require('./transform');
const load = require('./load');

async function run(companyName) {
    try {
        const rawData = await extract(companyName);

        const companyProfile = await transform(rawData);

        await load(companyProfile);

        console.log('Company profile generated successfully.');
        console.log(companyProfile);
    } catch (error) {
        console.error('Pipeline failed:', error);
    }
}

run('HeyGen');