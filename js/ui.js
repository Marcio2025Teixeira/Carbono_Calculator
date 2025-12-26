/**
 * UI - Global UI manager for rendering and formatting
 * 
 * Contains methods for:
 * - Formatting numbers and currency
 * - DOM element manipulation
 * - Rendering results, comparisons, and carbon credits
 * - Loading state management
 */

const UI = {
    /**
     * Format number with specified decimal places and thousand separators
     * @param {number} number - Number to format
     * @param {number} decimals - Number of decimal places (default: 2)
     * @returns {string} Formatted number string (e.g., "1.234,56")
     */
    formatNumber: function(number, decimals = 2) {
        // Use toLocaleString with pt-BR locale for proper formatting
        return Number(number).toLocaleString('pt-BR', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
    },

    /**
     * Format value as Brazilian currency
     * @param {number} value - Value to format
     * @returns {string} Formatted currency string (e.g., "R$ 1.234,56")
     */
    formatCurrency: function(value) {
        return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    },

    /**
     * Show element by removing 'hidden' class
     * @param {string} elementId - ID of element to show
     */
    showElement: function(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.remove('hidden');
        } else {
            console.warn(`Element with id "${elementId}" not found`);
        }
    },

    /**
     * Hide element by adding 'hidden' class
     * @param {string} elementId - ID of element to hide
     */
    hideElement: function(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.add('hidden');
        } else {
            console.warn(`Element with id "${elementId}" not found`);
        }
    },

    /**
     * Scroll to element smoothly
     * @param {string} elementId - ID of element to scroll to
     */
    scrollToElement: function(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            console.warn(`Element with id "${elementId}" not found`);
        }
    },

    /**
     * Render main results section with emission data
     * @param {Object} data - Result data containing origin, destination, distance, emission, mode, savings
     * @returns {string} HTML string with formatted results
     */
    renderResults: function(data) {
        const modeData = CONFIG.TRANSPORT_MODES[data.mode];
        const savingsHtml = data.savings && data.savings.savedKg > 0 ? `
            <div class="results__card results__savings-card">
                <h3 class="results__card-title">💚 Economia de CO₂</h3>
                <p class="results__card-value">${this.formatNumber(data.savings.savedKg)} kg</p>
                <p class="results__card-subtitle">${data.savings.percentage}% a menos que carro</p>
            </div>
        ` : '';

        return `
            <div class="results__container">
                <!-- Route Card -->
                <div class="results__card results__route-card">
                    <h3 class="results__card-title">📍 Rota</h3>
                    <p class="results__route">
                        <span class="results__city">${data.origin}</span>
                        <span class="results__arrow">→</span>
                        <span class="results__city">${data.destination}</span>
                    </p>
                </div>

                <!-- Distance Card -->
                <div class="results__card results__distance-card">
                    <h3 class="results__card-title">📏 Distância</h3>
                    <p class="results__card-value">${this.formatNumber(data.distance, 0)} km</p>
                </div>

                <!-- Emission Card -->
                <div class="results__card results__emission-card">
                    <h3 class="results__card-title">🍃 Emissão de CO₂</h3>
                    <p class="results__card-value" style="color: #10b981;">${this.formatNumber(data.emission)} kg</p>
                </div>

                <!-- Transport Mode Card -->
                <div class="results__card results__mode-card">
                    <h3 class="results__card-title">🚗 Modo de Transporte</h3>
                    <p class="results__mode">
                        <span class="results__mode-emoji">${modeData.icon}</span>
                        <span class="results__mode-label">${modeData.label}</span>
                    </p>
                </div>

                <!-- Savings Card (if applicable) -->
                ${savingsHtml}
            </div>
        `;
    },

    /**
     * Render comparison of all transport modes
     * @param {Array} modesArray - Array of mode data from Calculator.calculateAllModes()
     * @param {string} selectedMode - Currently selected transport mode
     * @returns {string} HTML string with comparison view
     */
    renderComparison: function(modesArray, selectedMode) {
        // Find maximum emission for progress bar scaling
        const maxEmission = Math.max(...modesArray.map(m => m.emission));

        // Helper function to determine progress bar color based on percentage
        const getBarColor = (percentageVsCar) => {
            if (percentageVsCar <= 25) return '#10b981'; // Green
            if (percentageVsCar <= 75) return '#f59e0b'; // Yellow
            if (percentageVsCar <= 100) return '#f97316'; // Orange
            return '#ef4444'; // Red
        };

        // Generate HTML for each mode
        const modesHtml = modesArray.map(mode => {
            const modeData = CONFIG.TRANSPORT_MODES[mode.mode];
            const isSelected = mode.mode === selectedMode;
            const barWidth = maxEmission > 0 ? (mode.emission / maxEmission) * 100 : 0;
            const barColor = getBarColor(mode.percentageVsCar);

            return `
                <div class="comparison__item ${isSelected ? 'comparison__item--selected' : ''}">
                    <!-- Mode Header -->
                    <div class="comparison__header">
                        <span class="comparison__icon">${modeData.icon}</span>
                        <span class="comparison__label">${modeData.label}</span>
                        ${isSelected ? '<span class="comparison__badge">Selecionado</span>' : ''}
                    </div>

                    <!-- Emission Stats -->
                    <div class="comparison__stats">
                        <p class="comparison__emission">${this.formatNumber(mode.emission)} kg CO₂</p>
                        <p class="comparison__percentage">${this.formatNumber(mode.percentageVsCar, 1)}% vs Carro</p>
                    </div>

                    <!-- Progress Bar -->
                    <div class="comparison__bar-container">
                        <div 
                            class="comparison__bar" 
                            style="width: ${barWidth}%; background-color: ${barColor};"
                        ></div>
                    </div>
                </div>
            `;
        }).join('');

        return `
            <div class="comparison__container">
                ${modesHtml}
                
                <!-- Tip Box -->
                <div class="comparison__tip">
                    <p class="comparison__tip-title">💡 Dica</p>
                    <p class="comparison__tip-text">Bicicleta produz zero emissões! Ônibus e bicicleta são as opções mais sustentáveis para reduzir seu impacto ambiental.</p>
                </div>
            </div>
        `;
    },

    /**
     * Render carbon credits information and pricing
     * @param {Object} creditsData - Object containing credits and price data
     * @returns {string} HTML string with carbon credits information
     */
    renderCarbonCredits: function(creditsData) {
        const { credits, price } = creditsData;

        return `
            <div class="carbon-credits__container">
                <!-- Credits Grid -->
                <div class="carbon-credits__grid">
                    <!-- Credits Card -->
                    <div class="carbon-credits__card">
                        <h3 class="carbon-credits__card-title">♻️ Créditos de Carbono</h3>
                        <p class="carbon-credits__card-value">${this.formatNumber(credits, 4)}</p>
                        <p class="carbon-credits__card-helper">1 crédito = 1.000 kg CO₂</p>
                    </div>

                    <!-- Price Card -->
                    <div class="carbon-credits__card">
                        <h3 class="carbon-credits__card-title">💰 Valor Estimado</h3>
                        <p class="carbon-credits__card-value">${this.formatCurrency(price.average)}</p>
                        <p class="carbon-credits__card-range">${this.formatCurrency(price.min)} - ${this.formatCurrency(price.max)}</p>
                    </div>
                </div>

                <!-- Info Box -->
                <div class="carbon-credits__info">
                    <h4 class="carbon-credits__info-title">O que são Créditos de Carbono?</h4>
                    <p class="carbon-credits__info-text">
                        Créditos de carbono representam o direito de emitir uma tonelada de CO₂. Você pode compensar suas emissões 
                        investindo em projetos de sustentabilidade como reflorestamento, energia renovável e tecnologias limpas.
                    </p>
                </div>

                <!-- Action Button -->
                <button class="carbon-credits__button">
                    🌍 Compensar Emissões
                </button>
            </div>
        `;
    },

    /**
     * Show loading state on button
     * @param {HTMLElement} buttonElement - Button element to show loading state
     */
    showLoading: function(buttonElement) {
        // Save original text in data attribute
        buttonElement.dataset.originalText = buttonElement.textContent;

        // Disable button
        buttonElement.disabled = true;

        // Update button content with spinner
        buttonElement.innerHTML = '<span class="spinner"></span> Calculando...';
    },

    /**
     * Hide loading state on button
     * @param {HTMLElement} buttonElement - Button element to hide loading state
     */
    hideLoading: function(buttonElement) {
        // Enable button
        buttonElement.disabled = false;

        // Restore original text from data attribute
        if (buttonElement.dataset.originalText) {
            buttonElement.textContent = buttonElement.dataset.originalText;
        }
    }
};
