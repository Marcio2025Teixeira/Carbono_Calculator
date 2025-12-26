/**
 * app.js - Application initialization and event handling
 * 
 * Initializes the CO2 emissions calculator when DOM is ready
 * and handles form submissions with validation and calculation logic
 */

// Initialize application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, iniciando aplicação...');

    // ==========================================
    // INITIALIZATION
    // ==========================================

    // Populate cities datalist for autocomplete functionality
    CONFIG.populateDatalist();

    // Setup automatic distance autofill when cities are selected
    CONFIG.setupDistanceAutofill();

    // Get the main calculator form element
    const calculatorForm = document.getElementById('calculator-form');

    if (!calculatorForm) {
        console.error('Formulário com id "calculator-form" não encontrado');
        return;
    }

    // Add submit event listener to form
    calculatorForm.addEventListener('submit', handleFormSubmit);

    console.log('Calculadora inicializada!');
});

/**
 * Handle form submission and perform calculations
 * @param {Event} event - Form submit event
 */
function handleFormSubmit(event) {
    // Prevent default form submission behavior
    event.preventDefault();

    // ==========================================
    // GET FORM VALUES
    // ==========================================

    // Get origin and destination inputs
    const originInput = document.getElementById('origin');
    const destinationInput = document.getElementById('destination');
    const distanceInput = document.getElementById('distance');
    const transportRadios = document.getElementsByName('transport');

    // Trim whitespace from origin and destination
    const origin = originInput.value.trim();
    const destination = destinationInput.value.trim();

    // Parse distance as float
    const distance = parseFloat(distanceInput.value);

    // Get selected transport mode from radio buttons
    let selectedTransport = 'car';
    for (const radio of transportRadios) {
        if (radio.checked) {
            selectedTransport = radio.value;
            break;
        }
    }

    // ==========================================
    // VALIDATION
    // ==========================================

    // Check if all required fields are filled
    if (!origin || !destination) {
        alert('⚠️ Por favor, preencha os campos de origem e destino.');
        return;
    }

    // Check if distance is valid
    if (!distance || distance <= 0) {
        alert('⚠️ Por favor, preencha a distância com um valor maior que zero.');
        return;
    }

    // ==========================================
    // SHOW LOADING STATE
    // ==========================================

    // Get submit button element
    const submitButton = event.target.querySelector('button[type="submit"]');

    // Show loading state on button
    UI.showLoading(submitButton);

    // Hide previous results sections
    UI.hideElement('results');
    UI.hideElement('comparison');
    UI.hideElement('carbon-credits');

    // ==========================================
    // SIMULATE PROCESSING DELAY
    // ==========================================

    // Use setTimeout to simulate processing and provide UX feedback
    setTimeout(() => {
        try {
            // ==========================================
            // PERFORM CALCULATIONS
            // ==========================================

            // Calculate emission for selected transport mode
            const selectedModeEmission = Calculator.calculateEmission(distance, selectedTransport);

            // Calculate car emission as baseline for comparison
            const carEmission = Calculator.calculateEmission(distance, 'car');

            // Calculate savings compared to car
            const savings = Calculator.calculateSavings(selectedModeEmission, carEmission);

            // Calculate emissions for all transport modes
            const allModesComparison = Calculator.calculateAllModes(distance);

            // Calculate carbon credits needed for this emission
            const carbonCredits = Calculator.calculateCarbonCredits(selectedModeEmission);

            // Estimate carbon credit pricing
            const creditPricing = Calculator.estimateCreditPrice(carbonCredits);

            // ==========================================
            // BUILD DATA OBJECTS FOR RENDERING
            // ==========================================

            // Results data object
            const resultsData = {
                origin: origin,
                destination: destination,
                distance: distance,
                emission: selectedModeEmission,
                mode: selectedTransport,
                savings: savings
            };

            // Carbon credits data object
            const creditsData = {
                credits: carbonCredits,
                price: creditPricing
            };

            // ==========================================
            // RENDER RESULTS
            // ==========================================

            // Render and display main results
            const resultsContent = document.getElementById('results-content');
            resultsContent.innerHTML = UI.renderResults(resultsData);

            // Render and display mode comparison
            const comparisonContent = document.getElementById('comparison-content');
            comparisonContent.innerHTML = UI.renderComparison(allModesComparison, selectedTransport);

            // Render and display carbon credits information
            const creditsContent = document.getElementById('carbon-credits-content');
            creditsContent.innerHTML = UI.renderCarbonCredits(creditsData);

            // ==========================================
            // SHOW RESULTS SECTIONS
            // ==========================================

            // Show all results sections
            UI.showElement('results');
            UI.showElement('comparison');
            UI.showElement('carbon-credits');

            // Scroll smoothly to results section
            UI.scrollToElement('results');

            console.log('Cálculo realizado com sucesso:', resultsData);

        } catch (error) {
            // ==========================================
            // ERROR HANDLING
            // ==========================================

            // Log detailed error to console for debugging
            console.error('Erro ao processar cálculo:', error);

            // Show user-friendly error message
            alert('❌ Ocorreu um erro ao processar o cálculo. Por favor, tente novamente.');

        } finally {
            // ==========================================
            // CLEANUP
            // ==========================================

            // Hide loading state regardless of success or failure
            UI.hideLoading(submitButton);
        }

    }, 1500); // 1500ms delay to simulate processing
}
