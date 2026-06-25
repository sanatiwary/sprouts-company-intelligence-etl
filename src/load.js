const fs = require('fs');
const path = require('path');

async function load(profile) {
    const companyName =
        profile.company_identity.company_name;

    const outputDir = './outputs';

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    fs.writeFileSync(
        path.join(outputDir, `${companyName}.json`),
        JSON.stringify(profile, null, 4)
    );
}

module.exports = load;