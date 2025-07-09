JavaScript


/**
 * Ficheiro: js/ui.js
 * Descrição: Módulo para manipulações gerais da interface do utilizador.
 */

const UI = (function() {

    function toggleViews(showDashboard) {
        const loginView = document.getElementById('login-view');
        const appContainer = document.getElementById('app-container');

        if (showDashboard) {
            loginView.classList.add('hidden');
            appContainer.classList.remove('hidden');
        } else {
            loginView.classList.remove('hidden');
            appContainer.classList.add('hidden');
        }
    }

    function showError(inputElement, message) {
        const formGroup = inputElement.parentElement;
        formGroup.classList.add('error');
        const errorSpan = formGroup.querySelector('.error-message');
        if(errorSpan) errorSpan.textContent = message;
    }

    function clearError(inputElement) {
        const formGroup = inputElement.parentElement;
        formGroup.classList.remove('error');
        const errorSpan = formGroup.querySelector('.error-message');
        if(errorSpan) errorSpan.textContent = '';
    }

    function setupEventListeners() {
        // Acordeão
        const accordionContainer = document.querySelector('.accordion-container');
        if (accordionContainer) {
            accordionContainer.addEventListener('click', (e) => {
                const header = e.target.closest('.accordion-header');
                if (header) {
                    const item = header.parentElement;
                    item.classList.toggle('active');
                }
            });
        }
        
        // Menus Dropdown
        document.body.addEventListener('click', (e) => {
            const isDropdownButton = e.target.matches('.user-dropdown-btn,.user-dropdown-btn *');
            const dropdown = document.querySelector('.user-dropdown-content');
            
            if (isDropdownButton) {
                dropdown.classList.toggle('show');
            } else if (!e.target.closest('.user-menu')) {
                if (dropdown.classList.contains('show')) {
                    dropdown.classList.remove('show');
                }
            }
        });

        // Navegação por Tabs nas Matrizes
        const tabNavigations = document.querySelectorAll('.tab-navigation');
        tabNavigations.forEach(nav => {
            nav.addEventListener('click', (e) => {
                if (e.target.classList.contains('tab-link')) {
                    const tabId = e.target.dataset.tab;
                    const parentSection = e.target.closest('.content-section');
                    
                    // Desativa tabs e conteúdos antigos
                    parentSection.querySelectorAll('.tab-link').forEach(link => link.classList.remove('active'));
                    parentSection.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

                    // Ativa o novo tab e conteúdo
                    e.target.classList.add('active');
                    document.getElementById(tabId).classList.add('active');
                }
            });
        });
    }

    function createBarChart(canvasId, chartData) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        return new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Distribuição de Nível de Risco',
                        font: {
                            size: 16,
                            weight: 'bold',
                            family: 'Nunito, sans-serif'
                        }
                    } ||
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        },
                        title: {
                            display: true,
                            text: 'Nº de Riscos',
                            font: { weight: 'bold' }
                        }
                    },
                    x: {
                         title: {
                            display: true,
                            text: 'Nível de Risco',
                            font: { weight: 'bold' }
                        }
                    }
                }
            }
        });
    }

    function showToast(message, type = 'info') {
        let backgroundColor;
        switch(type) {
            case 'success': backgroundColor = "linear-gradient(to right, #00b09b, #96c93d)"; break;
            case 'warning': backgroundColor = "linear-gradient(to right, #ffc107, #ff9800)"; break;
            case 'danger':  backgroundColor = "linear-gradient(to right, #dc3545, #b71c1c)"; break;
            default:        backgroundColor = "linear-gradient(to right, #005A9C, #003B66)"; break;
        }

        Toastify({
            text: message,
            duration: 5000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: backgroundColor,
                fontFamily: 'Nunito, sans-serif'
            },
        }).showToast();
    }

    return {
        toggleViews,
        showError,
        clearError,
        setupEventListeners,
        createBarChart,
        showToast
    };
})();
