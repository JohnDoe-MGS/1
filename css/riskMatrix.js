JavaScript


/**
 * Ficheiro: js/riskMatrix.js
 * Descrição: Módulo para criar e gerir as tabelas interativas de risco com Tabulator.js.
 */

const RiskMatrix = (function() {

    /**
     * Cria e retorna uma instância de uma tabela de risco Tabulator.
     * @param {string} elementSelector - O seletor CSS para o elemento da tabela.
     * @param {Array} data - Os dados iniciais para a tabela.
     * @param {string} riskType - 'strategic' ou 'operational'.
     * @param {object} globalState - O objeto de estado global da aplicação.
     * @param {function} onDataChange - Callback a ser chamado quando os dados mudam.
     * @returns {Tabulator} - A instância da tabela.
     */
    function createRiskMatrix(elementSelector, data, riskType, globalState, onDataChange) {
        
        // Editor personalizado para datas usando flatpickr
        const flatpickrEditor = function(cell, onRendered, success, cancel) {
            const input = document.createElement("input");
            input.setAttribute("type", "text");
            input.style.width = "100%";
            input.style.boxSizing = "border-box";
            
            const fp = flatpickr(input, {
                dateFormat: "d/m/Y",
                defaultDate: cell.getValue(),
                onClose: function(selectedDates, dateStr, instance) {
                    if (dateStr!== cell.getValue()) {
                        success(dateStr);
                    } else {
                        cancel();
                    }
                }
            });

            onRendered(() => {
                input.focus();
                fp.open();
            });

            return input;
        };

        // Formatador para a célula de Nível de Risco
        const riskLevelFormatter = function(cell) {
            const value = cell.getValue();
            if (!value) return "";
            const levelClass = `risk-level-${value.toLowerCase()}`;
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('risk-level-cell', levelClass);
            cellDiv.textContent = value.toUpperCase();
            return cellDiv;
        };

        // Formatador para a célula de Efetividade
        const effectivenessFormatter = function(cell) {
            const value = cell.getValue();
            let text = '';
            let className = '';
            switch(value) {
                case 'ne': text = 'Não Eficaz'; className = 'effectiveness-ne'; break;
                case 'pe': text = 'Parcialmente Eficaz'; className = 'effectiveness-pe'; break;
                case 'e': text = 'Eficaz'; className = 'effectiveness-e'; break;
                default: return "";
            }
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('effectiveness-cell', className);
            cellDiv.textContent = text;
            return cellDiv;
        };

        // Formatador para ícones de ação (Observações, Documentos)
        const actionIconFormatter = function(cell, formatterParams) {
            const rowId = cell.getRow().getData().id;
            const container = document.createElement('div');
            container.classList.add('icon-container');

            formatterParams.icons.forEach(icon => {
                const i = document.createElement('i');
                i.className = `fas ${icon.class} action-icon`;
                i.setAttribute('title', icon.title);
                i.dataset.action = icon.action;
                i.dataset.rowId = rowId;
                container.appendChild(i);
            });
            return container;
        };

        // Formatador para a coluna de Aprovação (3 estados)
        const approvalFormatter = function(cell) {
            const value = cell.getValue();
            const icon = document.createElement('i');
            icon.classList.add('fas');
            switch(value) {
                case 1: icon.classList.add('fa-check-circle', 'approval-icon-check'); break;
                case 2: icon.classList.add('fa-times-circle', 'approval-icon-times'); break;
                default: icon.classList.add('fa-circle', 'approval-icon-empty');
            }
            return icon;
        };

        const table = new Tabulator(elementSelector, {
            data: data,
            layout: "fitColumns",
            reactiveData: true,
            history: true,
            addRowPos: "top",
            initialSort:,
            rowFormatter: function(row) {
                // Colore a linha com base no status de aprovação
                const data = row.getData();
                row.getElement().classList.remove('approval-approved', 'approval-rejected');
                if (data.approval === 1) {
                    row.getElement().classList.add('approval-approved');
                } else if (data.approval === 2) {
                    row.getElement().classList.add('approval-rejected');
                }
            },
            columns:
                }, cellClick: function(e, cell) {
                    const action = e.target.dataset.action;
                    const rowId = e.target.dataset.rowId;
                    const row = cell.getRow();
                    if (action === 'delete') {
                        if (confirm(`Tem certeza que deseja excluir o risco "${row.getData().riskName}"?`)) {
                            row.delete();
                        }
                    }
                    // Outras ações (notas, docs) podem ser tratadas aqui ou por delegação de evento
                }}
            ],
            // Callbacks para lógica de negócio
            cellEdited: function(cell) {
                const field = cell.getField();
                if (field === "probability" |

| field === "impact") {
                    const row = cell.getRow();
                    const data = row.getData();
                    const probability = parseInt(data.probability) |

| 0;
                    const impact = parseInt(data.impact) |

| 0;
                    const score = probability * impact;
                    
                    let level = "N/A";
                    if (score >= 17) level = "Extremo";
                    else if (score >= 10) level = "Alto";
                    else if (score >= 5) level = "Médio";
                    else if (score > 0) level = "Baixo";

                    row.update({ riskScore: score, riskLevel: level });
                }
                // Dispara o callback para atualizar o gráfico
                if (onDataChange) onDataChange(riskType);
            },
            dataChanged: function(data) {
                 if (onDataChange) onDataChange(riskType);
            },
            rowDeleted: function(row) {
                 if (onDataChange) onDataChange(riskType);
            }
        });

        return table;
    }

    return {
        createRiskMatrix
    };

})();
