/**
 * CONFIG - Global configuration object for CO2 emissions calculator
 * 
 * Contains:
 * - Emission factors for different transport modes
 * - Transport mode metadata and styling
 * - Carbon credit pricing information
 * - Initialization methods for UI integration
 */

const CONFIG = {
    /**
     * Emission factors in kg CO2 per kilometer
     * Based on average vehicle occupancy and fuel consumption
     */
    EMISSION_FACTORS: {
        bicycle: 0,
        car: 0.12,
        bus: 0.089,
        truck: 0.96
    },

    /**
     * Transport mode metadata with labels, icons, and colors
     */
    TRANSPORT_MODES: {
        bicycle: {
            label: "Bicicleta",
            icon: "🚴",
            color: "#3b82f6"
        },
        car: {
            label: "Carro",
            icon: "🚗",
            color: "#ef4444"
        },
        bus: {
            label: "Ônibus",
            icon: "🚌",
            color: "#f59e0b"
        },
        truck: {
            label: "Caminhão",
            icon: "🚚",
            color: "#8b5cf6"
        }
    },

    /**
     * Carbon credit configuration
     */
    CARBON_CREDIT: {
        KG_PER_CREDIT: 1000,
        PRICE_MIN_BRL: 50,
        PRICE_MAX_BRL: 150
    },

    /**
     * Populate the cities datalist with available cities from RoutesDB
     * Creates option elements for autocomplete functionality
     */
    populateDatalist: function() {
        // Get all unique cities from RoutesDB
        const cities = RoutesDB.getAllCities();
        
        // Get the datalist element
        const datalist = document.getElementById('cities-list');
        
        if (!datalist) {
            console.error('Datalist element with id "cities-list" not found');
            return;
        }

        // Clear existing options
        datalist.innerHTML = '';

        // Create and append option elements for each city
        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            datalist.appendChild(option);
        });

        console.log(`Populated datalist with ${cities.length} cities`);
    },

    /**
     * Setup automatic distance autofill functionality
     * Listens to origin and destination changes to automatically fill distance
     * Handles manual distance entry option
     */
    setupDistanceAutofill: function() {
        // Get form elements
        const originInput = document.getElementById('origin');
        const destinationInput = document.getElementById('destination');
        const distanceInput = document.getElementById('distance');
        const manualDistanceCheckbox = document.getElementById('manual-distance');
        const helperText = document.querySelector('.calculator__helper');

        if (!originInput || !destinationInput || !distanceInput || !helperText) {
            console.error('Required form elements not found for distance autofill setup');
            return;
        }

        /**
         * Helper function to attempt automatic distance filling
         */
        const autoFillDistance = () => {
            // Skip if manual distance entry is enabled
            if (manualDistanceCheckbox && manualDistanceCheckbox.checked) {
                return;
            }

            const origin = originInput.value.trim();
            const destination = destinationInput.value.trim();

            // Both fields must be filled
            if (!origin || !destination) {
                distanceInput.value = '';
                distanceInput.classList.remove('success');
                helperText.textContent = 'A distância será preenchida automaticamente';
                helperText.style.color = '';
                return;
            }

            // Try to find the distance between cities
            const distance = RoutesDB.findDistance(origin, destination);

            if (distance !== null) {
                // Distance found - fill input and make readonly
                distanceInput.value = distance;
                distanceInput.setAttribute('readonly', true);
                distanceInput.classList.add('success');
                helperText.textContent = '✓ Distância encontrada automaticamente';
                helperText.style.color = '#10b981'; // Primary green color
            } else {
                // Distance not found - clear input and suggest manual entry
                distanceInput.value = '';
                distanceInput.classList.remove('success');
                helperText.textContent = 'Rota não encontrada. Insira a distância manualmente ou marque a opção abaixo.';
                helperText.style.color = '#f59e0b'; // Warning color
            }
        };

        // Add change event listeners to origin and destination inputs
        originInput.addEventListener('change', autoFillDistance);
        destinationInput.addEventListener('change', autoFillDistance);

        // Handle manual distance checkbox
        if (manualDistanceCheckbox) {
            manualDistanceCheckbox.addEventListener('change', function() {
                if (this.checked) {
                    // Enable manual distance entry
                    distanceInput.removeAttribute('readonly');
                    helperText.textContent = 'Digite a distância manualmente';
                    helperText.style.color = '';
                } else {
                    // Try to autofill again when unchecked
                    distanceInput.value = '';
                    autoFillDistance();
                }
            });
        }

        console.log('Distance autofill setup completed');
    }
};
