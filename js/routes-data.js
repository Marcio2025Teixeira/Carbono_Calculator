/**
 * RoutesDB - Global database of Brazilian routes
 * 
 * Structure:
 * - routes: Array of route objects containing origin, destination, and distanceKm
 * - Methods for querying and managing route data
 */

const RoutesDB = {
    /**
     * Array of route objects
     * Each route has:
     * - origin: string (city name with state abbreviation, e.g., "São Paulo, SP")
     * - destination: string (city name with state abbreviation)
     * - distanceKm: number (distance in kilometers)
     */
    routes: [
        // Capital to Capital connections
        { origin: "São Paulo, SP", destination: "Rio de Janeiro, RJ", distanceKm: 430 },
        { origin: "São Paulo, SP", destination: "Brasília, DF", distanceKm: 1015 },
        { origin: "Rio de Janeiro, RJ", destination: "Brasília, DF", distanceKm: 1148 },
        { origin: "São Paulo, SP", destination: "Belo Horizonte, MG", distanceKm: 586 },
        { origin: "Rio de Janeiro, RJ", destination: "Belo Horizonte, MG", distanceKm: 716 },
        { origin: "São Paulo, SP", destination: "Salvador, BA", distanceKm: 1945 },
        { origin: "Rio de Janeiro, RJ", destination: "Salvador, BA", distanceKm: 1959 },
        { origin: "São Paulo, SP", destination: "Curitiba, PR", distanceKm: 408 },
        { origin: "São Paulo, SP", destination: "Manaus, AM", distanceKm: 3150 },
        { origin: "São Paulo, SP", destination: "Recife, PE", distanceKm: 2430 },
        
        // São Paulo Region
        { origin: "São Paulo, SP", destination: "Campinas, SP", distanceKm: 95 },
        { origin: "São Paulo, SP", destination: "Santos, SP", distanceKm: 70 },
        { origin: "São Paulo, SP", destination: "Sorocaba, SP", distanceKm: 108 },
        { origin: "São Paulo, SP", destination: "Ribeirão Preto, SP", distanceKm: 312 },
        { origin: "Campinas, SP", destination: "Ribeirão Preto, SP", distanceKm: 217 },
        
        // Rio de Janeiro Region
        { origin: "Rio de Janeiro, RJ", destination: "Niterói, RJ", distanceKm: 13 },
        { origin: "Rio de Janeiro, RJ", destination: "Duque de Caxias, RJ", distanceKm: 35 },
        { origin: "Rio de Janeiro, RJ", destination: "Petrópolis, RJ", distanceKm: 68 },
        { origin: "Rio de Janeiro, RJ", destination: "Angra dos Reis, RJ", distanceKm: 165 },
        
        // Minas Gerais Region
        { origin: "Belo Horizonte, MG", destination: "Ouro Preto, MG", distanceKm: 100 },
        { origin: "Belo Horizonte, MG", destination: "Montes Claros, MG", distanceKm: 418 },
        { origin: "Belo Horizonte, MG", destination: "Juiz de Fora, MG", distanceKm: 290 },
        { origin: "Belo Horizonte, MG", destination: "Uberaba, MG", distanceKm: 467 },
        
        // Paraná Region
        { origin: "Curitiba, PR", destination: "Londrina, PR", distanceKm: 398 },
        { origin: "Curitiba, PR", destination: "Maringá, PR", distanceKm: 409 },
        { origin: "Curitiba, PR", destination: "Foz do Iguaçu, PR", distanceKm: 645 },
        
        // Bahia Region
        { origin: "Salvador, BA", destination: "Feira de Santana, BA", distanceKm: 110 },
        { origin: "Salvador, BA", destination: "Vitória da Conquista, BA", distanceKm: 710 },
        { origin: "Salvador, BA", destination: "Camaçari, BA", distanceKm: 52 },
        
        // Ceará Region
        { origin: "Fortaleza, CE", destination: "Sobral, CE", distanceKm: 240 },
        { origin: "Fortaleza, CE", destination: "Juazeiro do Norte, CE", distanceKm: 530 },
        
        // Pernambuco Region
        { origin: "Recife, PE", destination: "Olinda, PE", distanceKm: 8 },
        { origin: "Recife, PE", destination: "Caruaru, PE", distanceKm: 134 },
        
        // Goiás Region
        { origin: "Brasília, DF", destination: "Goiânia, GO", distanceKm: 209 },
        { origin: "Goiânia, GO", destination: "Anápolis, GO", distanceKm: 54 },
        
        // Espírito Santo Region
        { origin: "Vitória, ES", destination: "Vila Velha, ES", distanceKm: 25 },
        { origin: "Vitória, ES", destination: "Cachoeiro de Itapemirim, ES", distanceKm: 115 },
        
        // Rio Grande do Sul Region
        { origin: "Porto Alegre, RS", destination: "Caxias do Sul, RS", distanceKm: 230 },
        { origin: "Porto Alegre, RS", destination: "Pelotas, RS", distanceKm: 280 },
    ],

    /**
     * Get all unique cities from the routes database
     * @returns {Array} Sorted array of unique city names with state abbreviation
     */
    getAllCities: function() {
        const cities = new Set();
        
        // Extract all cities from both origin and destination (with state)
        this.routes.forEach(route => {
            cities.add(route.origin);
            cities.add(route.destination);
        });
        
        // Convert to array, sort alphabetically, and return
        return Array.from(cities).sort((a, b) => a.localeCompare(b, 'pt-BR'));
    },

    /**
     * Find distance between two cities
     * @param {string} origin - Origin city name (with or without state)
     * @param {string} destination - Destination city name (with or without state)
     * @returns {number|null} Distance in kilometers if route found, null otherwise
     */
    findDistance: function(origin, destination) {
        // Normalize input: trim whitespace and convert to lowercase for comparison
        const normalizedOrigin = origin.trim().toLowerCase();
        const normalizedDestination = destination.trim().toLowerCase();

        // Search through routes in both directions
        for (const route of this.routes) {
            const routeOrigin = route.origin.toLowerCase();
            const routeDestination = route.destination.toLowerCase();

            // Check if route matches in either direction (exact match)
            if (routeOrigin === normalizedOrigin && routeDestination === normalizedDestination) {
                return route.distanceKm;
            }

            // Check reverse direction
            if (routeOrigin === normalizedDestination && routeDestination === normalizedOrigin) {
                return route.distanceKm;
            }

            // Also try matching by city name only (first part before comma)
            const routeOriginCity = routeOrigin.split(',')[0].trim();
            const routeDestinationCity = routeDestination.split(',')[0].trim();
            const originCity = normalizedOrigin.split(',')[0].trim();
            const destinationCity = normalizedDestination.split(',')[0].trim();

            if (routeOriginCity === originCity && routeDestinationCity === destinationCity) {
                return route.distanceKm;
            }

            if (routeOriginCity === destinationCity && routeDestinationCity === originCity) {
                return route.distanceKm;
            }
        }

        // Route not found
        return null;
    }
};
