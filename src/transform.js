async function transform(rawData) {
    return {
        company_identity: {
            company_name:
                rawData.display_name ||
                rawData.name ||
                null,

            description:
                rawData.summary ||
                null,

            website:
                rawData.website
                    ? `https://${rawData.website}`
                    : null,

            headquarters: {
                city:
                    rawData.location?.locality ||
                    null,

                state:
                    rawData.location?.region ||
                    null,

                country:
                    rawData.location?.country ||
                    null
            },

            founded_year:
                rawData.founded ||
                null
        },

        industry: {
            industries: [
                rawData.industry,
                rawData.industry_v2
            ].filter(Boolean),

            keywords:
                rawData.tags || []
        },

        company_size: {
            employee_count:
                rawData.employee_count || null,

            employee_range:
                rawData.size || null
        },

        funding: {
            funding_stage:
                rawData.latest_funding_stage || null,

            total_funding:
                rawData.total_funding_raised || null,

            number_funding_rounds:
                rawData.number_funding_rounds || null,

            last_funding_date:
                rawData.last_funding_date || null
        }
    };
}

module.exports = transform;