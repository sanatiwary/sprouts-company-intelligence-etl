const fs = require('fs');

async function load(profile) {
    fs.writeFileSync(
        './companyProfile.json',
        JSON.stringify(profile, null, 4)
    );
}

module.exports = load;