JavaScript


/**
 * Ficheiro: js/main.js
 * Descrição: O ponto de entrada principal da aplicação.
 * Orquestra a inicialização, gere o estado global e a comunicação entre módulos.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Estado global da aplicação
    const state = {
        isLoggedIn: false,
        currentUser: null,
        // Dados partilhados entre módulos
        sectors:,
        actionPlans: {
            strategic:,
            operational:
        },
        contingencyPlans: {
            strategic:,
            operational:
        },
        allNotes:,
        meetingMinutes:,
        policies:,
        // Referências às instâncias das tabelas
        tables: {
            strategic_1q25: null,
            strategic_2q25: null,
            strategic_3q25: null,
            operational_1q25: null,
            //... outras tabelas
        },
        charts: {
            strategic: null,
            operational: null
        }
    };

    /**
     * Função principal para inicializar a aplicação.
     */
    function initializeApp() {
        console.log("Compliance Veritas App Initializing...");
        
        // Configura a lógica de autenticação
        Auth.setupLoginForm();
        Auth.setupLogout();
        
        // Configura interações gerais da UI
        UI.setupEventListeners();
        
        // Verifica se há dados guardados no localStorage
        loadStateFromLocalStorage();

        // Atualiza a UI com base no estado inicial
        updateUI();

        console.log("App Initialized.");
    }

    /**
     * Atualiza a interface do utilizador com base no estado atual.
     */
    function updateUI() {
        if (state.isLoggedIn) {
            UI.toggleViews(true);
            initializeDashboard();
        } else {
            UI.toggleViews(false);
        }
    }

    /**
     * Inicializa todos os componentes do dashboard após o login.
     */
    function initializeDashboard() {
        // Inicializa as matrizes de risco
        // Exemplo para a primeira tabela estratégica
        if (!state.tables.strategic_1q25) {
            const tableData =;
            state.tables.strategic_1q25 = RiskMatrix.createRiskMatrix(
                '#risk-table-strategic-1q25', 
                tableData, 
                'strategic',
                state,
                updateRiskChart
            );
        }
        
        // Inicializar outras tabelas e componentes aqui...
        
        // Inicializar gráficos
        updateRiskChart('strategic');
        // updateRiskChart('operational');

        // Inicializar Bluebook e Notas
        Bluebook.init(state);
        Notes.init(state);
    }

    /**
     * Atualiza o gráfico de risco para um determinado tipo (estratégico/operacional).
     * @param {string} riskType - 'strategic' ou 'operational'
     */
    function updateRiskChart(riskType) {
        const table = state.tables; // Simplificado para 1Q25
        if (!table) return;

        const data = table.getData('active');
        const riskLevels = { 'Baixo': 0, 'Médio': 0, 'Alto': 0, 'Extremo': 0, 'N/A': 0 };
        
        data.forEach(row => {
            const level = row.riskLevel |

| 'N/A';
            if (riskLevels.hasOwnProperty(level)) {
                riskLevels[level]++;
            }
        });

        const chartData = {
            labels: Object.keys(riskLevels),
            datasets:,
                borderColor: [
                    'rgb(40, 167, 69)',
                    'rgb(255, 193, 7)',
                    'rgb(220, 53, 69)',
                    'rgb(183, 28, 28)',
                    'rgb(108, 117, 125)'
                ],
                borderWidth: 1
            }]
        };

        const canvasId = `${riskType}RiskChart`;
        const chartInstance = state.charts;

        if (chartInstance) {
            chartInstance.data = chartData;
            chartInstance.update();
        } else {
            state.charts = UI.createBarChart(canvasId, chartData);
        }
    }
    
    /**
     * Guarda o estado relevante no localStorage.
     */
    function saveStateToLocalStorage() {
        const stateToSave = {
            contingencyPlans: state.contingencyPlans
            // Adicionar outros dados que precisam ser persistidos
        };
        localStorage.setItem('complianceVeritasState', JSON.stringify(stateToSave));
    }

    /**
     * Carrega o estado do localStorage na inicialização.
     */
    function loadStateFromLocalStorage() {
        const savedState = localStorage.getItem('complianceVeritasState');
        if (savedState) {
            const parsedState = JSON.parse(savedState);
            // Mescla o estado guardado com o estado atual
            Object.assign(state, parsedState);
        }
        // Verifica notificações agendadas
        checkScheduledNotifications();
    }
    
    /**
     * Verifica se existem notificações de simulação agendadas.
     */
    function checkScheduledNotifications() {
        const today = luxon.DateTime.now();
        const allPlans = [...(state.contingencyPlans.strategic ||),...(state.contingencyPlans.operational ||)];

        allPlans.forEach(plan => {
            if (plan.nextSimulationDate) {
                const simDate = luxon.DateTime.fromISO(plan.nextSimulationDate);
                const daysUntil = simDate.diff(today, 'days').as('days');

                if (daysUntil <= 10 && daysUntil > 9) {
                    UI.showToast(`Lembrete: A simulação para "${plan.name}" está agendada para ${simDate.toFormat('dd/MM/yyyy')}.`, 'warning');
                }
                if (daysUntil <= 2 && daysUntil > 1) {
                    UI.showToast(`AVISO: A simulação para "${plan.name}" é em 2 dias! (${simDate.toFormat('dd/MM/yyyy')})`, 'danger');
                }
            }
        });
    }

    // Ouve eventos personalizados para gerir o fluxo da aplicação
    document.addEventListener('loginSuccess', (e) => {
        state.isLoggedIn = true;
        state.currentUser = e.detail.user;
        updateUI();
    });

    document.addEventListener('logout', () => {
        state.isLoggedIn = false;
        state.currentUser = null;
        // Limpa o estado se necessário, ou mantém para re-login rápido
        updateUI();
    });
    
    // Ouve eventos de atualização de estado de outros módulos
    document.addEventListener('stateChange', (e) => {
        // Ex: e.detail = { key: 'sectors', value: }
        if (e.detail && state.hasOwnProperty(e.detail.key)) {
            state[e.detail.key] = e.detail.value;
            console.log(`State updated: ${e.detail.key}`, state[e.detail.key]);
            
            // Guarda o estado no localStorage após mudanças importantes
            if (e.detail.key === 'contingencyPlans') {
                saveStateToLocalStorage();
            }
        }
    });

    // Inicia a aplicação
    initializeApp();
});
