🍃 Calculadora de Emissão de CO₂

Projeto de uma calculadora de emissão de dióxido de carbono desenvolvido para avaliação no Bootcamp de GitHub Copilot da DIO.

 📋 Visão Geral

A Calculadora de Emissão de CO₂ é uma aplicação web que permite aos usuários calcular a quantidade de dióxido de carbono emitida em suas viagens, utilizando e compararando diferentes meios de transporte e descobrir como contribuir para um planeta mais sustentável.

✨ Funcionalidades Principais

- **Cálculo de Emissões**: Calcule emissões de CO₂ para diferentes modos de transporte
- **Autopreenchimento de Distância**: Função inteligente que preenche automaticamente a distância entre cidades
- **Comparação de Transportes**: Compare 4 modos de transporte (bicicleta, carro, ônibus, caminhão)
- **Créditos de Carbono**: Calcule quantos créditos de carbono sua viagem requer
- **Estimativa de Preços**: Veja o valor estimado em R$ dos créditos de carbono
- **Interface Responsiva**: Design moderno e responsivo para desktop e mobile

 🏗️ Estrutura do Projeto

```
calculadora-carbono/
├── index.html             # Estrutura HTML semântica
├── css/
│   └── style.css          # Estilos CSS modernos com variáveis
├── js/
│   ├── routes-data.js     # Base de dados de rotas brasileiras
│   ├── config.js          # Configurações e fatores de emissão
│   ├── calculator.js      # Lógica de cálculo
│   ├── ui.js              # Gerenciador de UI e renderização
│   └── app.js             # Inicialização e manipulação de eventos
├── README.md              # Documentação
└── LICENSE                # Licença do projeto
```

 📝 Detalhamento dos Arquivos

 1. **index.html** - Estrutura Semântica HTML5
- **Header**: Título com emoji de folha e subtítulo explicativo
- **Form Principal** (id="calculator-form"):
  - Inputs de origem e destino com datalist para autocompletar cidades
  - Input de distância (readonly) que é preenchido automaticamente
  - Checkbox para inserir distância manualmente
  - Seletor de modo de transporte com 4 radio buttons em grid visual
  - Botão de submissão "Calcular Emissão"
- **Seções de Resultados** (ocultas por padrão):
  - Seção de resultados (#results)
  - Seção de comparação (#comparison)
  - Seção de créditos de carbono (#carbon-credits)
- **Footer**: Créditos do desenvolvedor
- **Scripts**: 5 arquivos JavaScript carregados em ordem específica

 2. **css/style.css** - Estilos Modernos
- **Variáveis CSS**:
  - Paleta eco-friendly (#10b981 primária, #059669 secundária, #34d399 acentuada)
  - Escala de espaçamento (xs até xl: 0.5rem a 3rem)
  - Sombras (sm, md, lg) e bordas arredondadas
  
- **Componentes**:
  - Header com fundo branco e sombra
  - Formulário com cartões e input styling
  - Grade de transporte (4 colunas desktop, 2 mobile)
  - Botão com efeito hover
  - Animação spinner para carregamento
  - Animação fadeIn para seções de resultado

- **Design Responsivo**:
  - Media queries para mobile (max-width: 767px)
  - Media queries para desktop (min-width: 768px)

 3. **js/routes-data.js** - Base de Dados de Rotas
- **RoutesDB Object** com:
  - 40 rotas populares brasileiras (capitais, regiões)
  - Método `getAllCities()`: retorna lista única e ordenada de cidades
  - Método `findDistance(origin, destination)`: busca distância entre dois pontos

 4. **js/config.js** - Configuração e Inicialização
- **CONFIG Object** contendo:
  - **EMISSION_FACTORS**: fatores de emissão por modo (kg CO₂/km)
    - Bicicleta: 0 kg/km
    - Carro: 0.12 kg/km
    - Ônibus: 0.089 kg/km
    - Caminhão: 0.96 kg/km
  
  - **TRANSPORT_MODES**: metadados (label, ícone, cor)
  - **CARBON_CREDIT**: preço e conversão de créditos
  - **populateDatalist()**: popula datalist com cidades
  - **setupDistanceAutofill()**: setup de autopreenchimento inteligente

 5. **js/calculator.js** - Motor de Cálculo
- **Calculator Object** com métodos:
  - `calculateEmission()`: calcula emissão para modo/distância
  - `calculateAllModes()`: compara todos os modos
  - `calculateSavings()`: calcula economia vs baseline
  - `calculateCarbonCredits()`: converte kg para créditos
  - `estimateCreditPrice()`: estima preço em R$

 6. **js/ui.js** - Gerenciador de UI
- **Métodos de Utilidade**:
  - `formatNumber()`: formata com locale pt-BR
  - `formatCurrency()`: formata como R$
  - `showElement/hideElement()`: gerencia classe hidden
  - `scrollToElement()`: scroll suave
  
- **Métodos de Renderização**:
  - `renderResults()`: cards de resultado
  - `renderComparison()`: grid de comparação com barras coloridas
  - `renderCarbonCredits()`: informações de créditos
  
- **Controle de Estado**:
  - `showLoading/hideLoading()`: gerencia estado de carregamento

 7. **js/app.js** - Inicialização e Eventos
- **DOMContentLoaded**: inicializa aplicação
- **Submit Handler**: processa formulário com validação
- **Try-catch**: tratamento de erros
- **setTimeout**: simula processamento (1500ms)
- **Renderização**: exibe resultados em sequência

 🚀 Como Usar

1. **Abrir a aplicação**: Abra `index.html` em um navegador
2. **Preencher origem e destino**: Digite cidades brasileiras (autocomplete disponível)
3. **Selecionar modo de transporte**: Escolha entre bicicleta, carro, ônibus ou caminhão
4. **Distância automática**: A distância é preenchida automaticamente para rotas conhecidas
5. **Inserir manualmente**: Marque "Inserir distância manualmente" se necessário
6. **Calcular**: Clique em "Calcular Emissão"
7. **Ver resultados**: Analise emissões, comparações e créditos de carbono

 📊 Exemplo de Resultado

**Rota**: São Paulo, SP → Rio de Janeiro, RJ
**Distância**: 430 km
**Modo**: Carro
**Emissão CO₂**: 51.6 kg
**Economia vs Ônibus**: 19.9% menos emissão
**Créditos Necessários**: 0.0516 créditos

 🛠️ Tecnologias Utilizadas

- **HTML5**: Semântica e estrutura
- **CSS3**: Variáveis CSS, Grid, Flexbox, Animações
- **JavaScript Vanilla**: Sem dependências externas
- **Locale PT-BR**: Formatação brasileira

 💻 Requisitos

- Navegador (Chrome, Firefox, Safari, Edge)
- Suporte a ES6+
- Suporte a CSS Grid e Flexbox

 📱 Design Responsivo

- **Mobile First**: Otimizado para dispositivos móveis
- **Desktop**: Experiência completa em telas maiores
- **Acessibilidade**: Estrutura semântica e contraste adequado

 🎨 Paleta de Cores

- **Primária**: #10b981 (Verde eco)
- **Secundária**: #059669 (Verde escuro)
- **Acentuada**: #34d399 (Verde claro)
- **Perigo**: #ef4444 (Vermelho)
- **Aviso**: #f59e0b (Amarelo)
- **Info**: #3b82f6 (Azul)

 📝 Histórico de Desenvolvimento

Este projeto foi desenvolvido através de uma série de exchanges de mensagens com GitHub Copilot, documentados neste README (veja seções abaixo).

Produzido por

Teixeira
- Bootcamp GitHub Copilot DIO -

 📄 Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo LICENSE para detalhes.

---

 English

 📋 Overview

The CO₂ Emissions Calculator is a modern web application that allows users to calculate the amount of carbon dioxide emitted during their trips, compare different transport modes, and discover how to contribute to a more sustainable planet.

 ✨ Key Features

- **Emissions Calculation**: Calculate CO₂ emissions for different transport modes
- **Distance Auto-fill**: Smart function that automatically fills distance between cities
- **Transport Comparison**: Compare 4 transport modes (bicycle, car, bus, truck)
- **Carbon Credits**: Calculate how many carbon credits your trip requires
- **Price Estimation**: See the estimated value in R$ of carbon credits
- **Responsive Interface**: Modern and responsive design for desktop and mobile

 🏗️ Project Structure

```
calculadora-carbono/
├── index.html              # Semantic HTML structure
├── css/
│   └── style.css          # Modern CSS with variables
├── js/
│   ├── routes-data.js     # Brazilian routes database
│   ├── config.js          # Configuration and emission factors
│   ├── calculator.js      # Calculation logic
│   ├── ui.js              # UI manager and rendering
│   └── app.js             # Initialization and event handling
├── README.md              # Documentation
└── LICENSE                # Project license
```

 📝 File Details

 1. **index.html** - Semantic HTML5 Structure
- **Header**: Title with leaf emoji and explanatory subtitle
- **Main Form** (id="calculator-form"):
  - Origin and destination inputs with datalist for city autocomplete
  - Distance input (readonly) that is auto-filled
  - Checkbox to manually insert distance
  - Transport mode selector with 4 radio buttons in visual grid
  - Submit button "Calculate Emission"
- **Result Sections** (hidden by default):
  - Results section (#results)
  - Comparison section (#comparison)
  - Carbon credits section (#carbon-credits)
- **Footer**: Developer credits
- **Scripts**: 5 JavaScript files loaded in specific order

 2. **css/style.css** - Modern Styles
- **CSS Variables**:
  - Eco-friendly color palette (#10b981 primary, #059669 secondary, #34d399 accent)
  - Spacing scale (xs to xl: 0.5rem to 3rem)
  - Shadows (sm, md, lg) and border radius
  
- **Components**:
  - Header with white background and shadow
  - Form with cards and input styling
  - Transport grid (4 columns desktop, 2 mobile)
  - Button with hover effect
  - Spinner animation for loading
  - FadeIn animation for result sections

- **Responsive Design**:
  - Media queries for mobile (max-width: 767px)
  - Media queries for desktop (min-width: 768px)

 3. **js/routes-data.js** - Routes Database
- **RoutesDB Object** with:
  - 40 popular Brazilian routes (capitals, regions)
  - `getAllCities()` method: returns unique and sorted list of cities
  - `findDistance(origin, destination)` method: searches distance between two points

 4. **js/config.js** - Configuration and Initialization
- **CONFIG Object** containing:
  - **EMISSION_FACTORS**: emission factors by mode (kg CO₂/km)
    - Bicycle: 0 kg/km
    - Car: 0.12 kg/km
    - Bus: 0.089 kg/km
    - Truck: 0.96 kg/km
  
  - **TRANSPORT_MODES**: metadata (label, icon, color)
  - **CARBON_CREDIT**: price and credit conversion
  - **populateDatalist()**: populates datalist with cities
  - **setupDistanceAutofill()**: smart auto-fill setup

 5. **js/calculator.js** - Calculation Engine
- **Calculator Object** with methods:
  - `calculateEmission()`: calculates emission for mode/distance
  - `calculateAllModes()`: compares all modes
  - `calculateSavings()`: calculates savings vs baseline
  - `calculateCarbonCredits()`: converts kg to credits
  - `estimateCreditPrice()`: estimates price in R$

 6. **js/ui.js** - UI Manager
- **Utility Methods**:
  - `formatNumber()`: formats with pt-BR locale
  - `formatCurrency()`: formats as R$
  - `showElement/hideElement()`: manages hidden class
  - `scrollToElement()`: smooth scroll
  
- **Rendering Methods**:
  - `renderResults()`: result cards
  - `renderComparison()`: comparison grid with colored bars
  - `renderCarbonCredits()`: credits information
  
- **State Control**:
  - `showLoading/hideLoading()`: manages loading state

 7. **js/app.js** - Initialization and Events
- **DOMContentLoaded**: initializes application
- **Submit Handler**: processes form with validation
- **Try-catch**: error handling
- **setTimeout**: simulates processing (1500ms)
- **Rendering**: displays results in sequence

 🚀 How to Use

1. **Open the application**: Open `index.html` in a modern browser
2. **Fill origin and destination**: Type Brazilian cities (autocomplete available)
3. **Select transport mode**: Choose between bicycle, car, bus, or truck
4. **Automatic distance**: Distance is automatically filled for known routes
5. **Manual entry**: Check "Inserir distância manualmente" if needed
6. **Calculate**: Click "Calculate Emission"
7. **View results**: Analyze emissions, comparisons, and carbon credits

 📊 Example Result

**Route**: São Paulo, SP → Rio de Janeiro, RJ
**Distance**: 430 km
**Mode**: Car
**CO₂ Emission**: 51.6 kg
**Savings vs Bus**: 19.9% less emission
**Credits Required**: 0.0516 credits

 🛠️ Technologies Used

- **HTML5**: Semantic and structure
- **CSS3**: CSS variables, Grid, Flexbox, Animations
- **Vanilla JavaScript**: No external dependencies
- **PT-BR Locale**: Brazilian formatting

 💻 Requirements

- Browser (Chrome, Firefox, Safari, Edge)
- ES6+ support
- CSS Grid and Flexbox support

 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Desktop**: Full experience on larger screens
- **Accessibility**: Semantic structure and proper contrast

 🎨 Color Palette

- **Primary**: #10b981 (Eco green)
- **Secondary**: #059669 (Dark green)
- **Accent**: #34d399 (Light green)
- **Danger**: #ef4444 (Red)
- **Warning**: #f59e0b (Yellow)
- **Info**: #3b82f6 (Blue)

 📝 Development History

This project was developed through a series of message exchanges with GitHub Copilot, documented in this README (see sections below).

 👨‍💻 Produzido por

Teixeira
- Bootcamp GitHub Copilot DIO

 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

---

 📚 Histórico de Exchanges com GitHub Copilot / Development Exchanges with GitHub Copilot

 Exchange 1: Estrutura HTML Semântica / Semantic HTML Structure

**Português:**
Solicitação para criar uma estrutura HTML5 semântica para uma calculadora de CO₂ com:
- Header com título (emoji folha) e subtítulo explicativo
- Formulário principal com inputs de origem, destino e distância
- Campo de distância readonly com autopreenchimento
- Checkbox para entrada manual de distância
- Seletor de modo de transporte com 4 radio buttons em grid visual
- Seções de resultados, comparação e créditos (ocultas por padrão)
- Footer com créditos
- Scripts carregados em ordem específica
- Uso de convenção BEM para classes
- Meta viewport para design responsivo

**English:**
Request to create semantic HTML5 structure for a CO₂ calculator with:
- Header with title (leaf emoji) and explanatory subtitle
- Main form with origin, destination, and distance inputs
- Readonly distance field with auto-fill
- Checkbox for manual distance entry
- Transport mode selector with 4 radio buttons in visual grid
- Result, comparison, and credits sections (hidden by default)
- Footer with credits
- Scripts loaded in specific order
- BEM naming convention for classes
- Meta viewport for responsive design

---

 Exchange 2: Estilos CSS Modernos / Modern CSS Styles

**Português:**
Solicitação para criar arquivo CSS com:
- Variáveis CSS (paleta eco-friendly, escala de espaçamento, sombras)
- Estilos base (reset universal, gradient de fundo)
- Classes utilitárias (.hidden, .section-title)
- Styling do header, form, grid de transporte
- Checkbox e button styling
- Animação spinner de carregamento
- Media queries responsivas

**English:**
Request to create CSS file with:
- CSS custom properties (eco-friendly palette, spacing scale, shadows)
- Base styles (universal reset, background gradient)
- Utility classes (.hidden, .section-title)
- Header, form, transport grid styling
- Checkbox and button styling
- Spinner loading animation
- Responsive media queries

---

 Exchange 3: Base de Dados de Rotas / Routes Database

**Português:**
Criação do objeto global RoutesDB contendo:
- Array de 30-40 rotas populares brasileiras (capitais, regiões)
- Método getAllCities(): retorna lista única e ordenada de cidades
- Método findDistance(): busca distância entre duas cidades em ambas direções

**English:**
Creation of global RoutesDB object containing:
- Array of 30-40 popular Brazilian routes (capitals, regions)
- getAllCities() method: returns unique and sorted list of cities
- findDistance() method: searches distance between two cities in both directions

---

 Exchange 4: Configuração e Inicialização / Configuration and Initialization

**Português:**
Criação do objeto CONFIG com:
- EMISSION_FACTORS: fatores de emissão por modo (kg CO₂/km)
- TRANSPORT_MODES: metadados com label, ícone e cor
- CARBON_CREDIT: configuração de preços
- populateDatalist(): popula datalist com cidades
- setupDistanceAutofill(): configura autopreenchimento inteligente de distância

**English:**
Creation of CONFIG object with:
- EMISSION_FACTORS: emission factors by transport mode (kg CO₂/km)
- TRANSPORT_MODES: metadata with label, icon, and color
- CARBON_CREDIT: pricing configuration
- populateDatalist(): populates datalist with cities
- setupDistanceAutofill(): sets up smart distance auto-fill

---

 Exchange 5: Motor de Cálculo / Calculation Engine

**Português:**
Criação do objeto Calculator com métodos:
- calculateEmission(): calcula emissão para modo/distância
- calculateAllModes(): compara todos os modos
- calculateSavings(): calcula economia vs baseline
- calculateCarbonCredits(): converte kg para créditos
- estimateCreditPrice(): estima preço em R$

**English:**
Creation of Calculator object with methods:
- calculateEmission(): calculates emission for mode/distance
- calculateAllModes(): compares all modes
- calculateSavings(): calculates savings vs baseline
- calculateCarbonCredits(): converts kg to credits
- estimateCreditPrice(): estimates price in R$

---

 Exchange 6: Gerenciador de UI / UI Manager

**Português:**
Criação do objeto UI com métodos:
- Utilitários: formatNumber(), formatCurrency(), showElement(), hideElement(), scrollToElement()
- Renderização: renderResults(), renderComparison(), renderCarbonCredits()
- Controle: showLoading(), hideLoading()

**English:**
Creation of UI object with methods:
- Utilities: formatNumber(), formatCurrency(), showElement(), hideElement(), scrollToElement()
- Rendering: renderResults(), renderComparison(), renderCarbonCredits()
- Control: showLoading(), hideLoading()

---

 Exchange 7: Inicialização e Eventos / Initialization and Events

**Português:**
Criação do arquivo app.js com:
- Inicialização ao DOMContentLoaded
- Handler de submit do formulário com validação
- Try-catch para tratamento de erros
- setTimeout para simular processamento
- Renderização sequencial de resultados

**English:**
Creation of app.js file with:
- Initialization on DOMContentLoaded
- Form submit handler with validation
- Try-catch for error handling
- setTimeout to simulate processing
- Sequential rendering of results

---

 Exchange 8: Estilos para Conteúdo Dinâmico / Dynamic Content Styles

**Português:**
Adição de estilos CSS para:
- Seções de resultados (cards individuais, layout flex)
- Seção de comparação (items, barras coloridas, dica)
- Seção de créditos (grid, cards, info box, botão)
- Animações (fadeIn para seções)
- Design responsivo (ajustes mobile/desktop)

**English:**
Addition of CSS styles for:
- Result sections (individual cards, flex layout)
- Comparison section (items, colored bars, tip)
- Credits section (grid, cards, info box, button)
- Animations (fadeIn for sections)
- Responsive design (mobile/desktop adjustments)

---

 🎯 Próximas Melhorias / Future Improvements

- [ ] Adicionar mais rotas brasileiras
- [ ] Integração com API de distância real
- [ ] Dashboard de histórico de cálculos
- [ ] Integração com sistema de compensação de carbono
- [ ] PWA para acesso offline
- [ ] Testes unitários e integração

---


Para dúvidas ou sugestões, entre em contato através do repositório GitHub.
