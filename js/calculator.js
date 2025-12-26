/**
 * Calculator - Global calculation engine for CO2 emissions
 * 
 * Contains methods for:
 * - Calculating emissions by transport mode
 * - Comparing emissions across all modes
 * - Computing savings vs baseline
 * - Carbon credit calculations and pricing
 */

const Calculator = {
    /**
     * Calculate CO2 emission for a given distance and transport mode
     * @param {number} distanceKm - Distance in kilometers
     * @param {string} transportMode - Transport mode (bicycle, car, bus, truck)
     * @returns {number} CO2 emission in kg, rounded to 2 decimal places
     */
    calculateEmission: function(distanceKm, transportMode) {
        // Get emission factor for the transport mode
        const emissionFactor = CONFIG.EMISSION_FACTORS[transportMode];

        if (emissionFactor === undefined) {
            console.error(`Invalid transport mode: ${transportMode}`);
            return 0;
        }

        // Calculate: distance (km) * emission factor (kg/km)
        const emission = distanceKm * emissionFactor;

        // Return rounded to 2 decimal places
        return Math.round(emission * 100) / 100;
    },

    /**
     * Calculate emissions for all transport modes and compare against car baseline
     * @param {number} distanceKm - Distance in kilometers
     * @returns {Array} Array of objects with mode, emission, and percentageVsCar, sorted by emission
     */
    calculateAllModes: function(distanceKm) {
        // Calculate car emission as baseline for comparison
        const carEmission = this.calculateEmission(distanceKm, 'car');

        // Create array to store results for each transport mode
        const results = [];

        // Iterate through each transport mode
        for (const mode in CONFIG.EMISSION_FACTORS) {
            // Calculate emission for this mode
            const emission = this.calculateEmission(distanceKm, mode);

            // Calculate percentage vs car baseline (avoid division by zero)
            const percentageVsCar = carEmission > 0 ? 
                Math.round((emission / carEmission) * 10000) / 100 : 0;

            // Push result object
            results.push({
                mode: mode,
                emission: emission,
                percentageVsCar: percentageVsCar
            });
        }

        // Sort by emission (lowest first)
        results.sort((a, b) => a.emission - b.emission);

        return results;
    },

    /**
     * Calculate CO2 savings compared to baseline emission
     * @param {number} emission - Actual emission in kg
     * @param {number} baselineEmission - Baseline emission in kg (usually car)
     * @returns {Object} Object with savedKg and percentage, both rounded to 2 decimals
     */
    calculateSavings: function(emission, baselineEmission) {
        // Calculate saved kg
        const savedKg = Math.round((baselineEmission - emission) * 100) / 100;

        // Calculate percentage saved
        const percentage = baselineEmission > 0 ? 
            Math.round(((savedKg / baselineEmission) * 100) * 100) / 100 : 0;

        return {
            savedKg: savedKg,
            percentage: percentage
        };
    },

    /**
     * Calculate number of carbon credits from emission amount
     * @param {number} emissionKg - Emission in kilograms
     * @returns {number} Number of carbon credits, rounded to 4 decimal places
     */
    calculateCarbonCredits: function(emissionKg) {
        // Divide emission by kg per credit
        const credits = emissionKg / CONFIG.CARBON_CREDIT.KG_PER_CREDIT;

        // Return rounded to 4 decimal places
        return Math.round(credits * 10000) / 10000;
    },

    /**
     * Estimate carbon credit price range based on market prices
     * @param {number} credits - Number of carbon credits
     * @returns {Object} Object with min, max, and average prices in BRL, all rounded to 2 decimals
     */
    estimateCreditPrice: function(credits) {
        // Calculate minimum price
        const min = Math.round((credits * CONFIG.CARBON_CREDIT.PRICE_MIN_BRL) * 100) / 100;

        // Calculate maximum price
        const max = Math.round((credits * CONFIG.CARBON_CREDIT.PRICE_MAX_BRL) * 100) / 100;

        // Calculate average price
        const average = Math.round(((min + max) / 2) * 100) / 100;

        return {
            min: min,
            max: max,
            average: average
        };
    }
};
