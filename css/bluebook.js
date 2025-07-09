JavaScript


/**
 * Ficheiro: js/bluebook.js
 * Descrição: Módulo para gerir o Bluebook (Atas e Políticas).
 */

const Bluebook = (function() {
    let stateRef; // Referência ao estado global

    function init(globalState) {
        stateRef = globalState;
        setupEventListeners();
        render();
    }

    function setupEventListeners() {
        // Modal para nova ata
        document.getElementById('add-meeting-minutes-btn').addEventListener('click', () => {
            document.getElementById('meeting-minutes-modal').classList.remove('hidden');
        });

        // Fechar modais
        document.querySelectorAll('.modal-close-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.target.closest('.modal-overlay').classList.add('hidden');
            });
        });

        // Geração da ata
        const form = document.getElementById('meeting-minutes-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            generateAtaPreview(form);
        });
        
        // Salvar a ata gerada
        document.getElementById('save-ata-btn').addEventListener('click', saveAta);
    }
    
    function generateAtaPreview(form) {
        const date = luxon.DateTime.fromISO(form.elements['meeting-date'].value).toFormat("dd 'de' MMMM 'de'eleSp, 'às' HH:mm");
        const attendees = form.elements['meeting-attendees'].value;
        const topics = form.elements['meeting-topics'].value;
        const decisions = form.elements['meeting-decisions'].value;
        
        // "IA" de geração de texto usando template literals
        const ataText = `
ATA DE REUNIÃO - COMPLIANCE VERITAS

Data e Hora: ${date}

Pessoas Presentes:
${attendees}

----------------------------------------

Assuntos Tratados:
${topics}

----------------------------------------

Decisões Tomadas:
${decisions}

----------------------------------------

A presente ata foi lavrada por mim, Secretário(a) Ad-Hoc, e segue para aprovação dos presentes.
        `;
        
        const previewContainer = document.getElementById('generated-ata-preview-container');
        const previewEl = document.getElementById('generated-ata-preview');
        previewEl.textContent = ataText.trim();
        previewContainer.classList.remove('hidden');
    }

    function saveAta() {
        const ataText = document.getElementById('generated-ata-preview').textContent;
        const newAta = {
            id: `ata_${Date.now()}`,
            date: document.getElementById('meeting-date').value,
            content: ataText
        };
        stateRef.meetingMinutes.push(newAta);
        
        // Dispara evento de mudança de estado
        document.dispatchEvent(new CustomEvent('stateChange', { detail: { key: 'meetingMinutes', value: stateRef.meetingMinutes } }));
        
        // Limpa e fecha o modal
        document.getElementById('meeting-minutes-form').reset();
        document.getElementById('generated-ata-preview-container').classList.add('hidden');
        document.getElementById('meeting-minutes-modal').classList.add('hidden');
        
        render(); // Re-renderiza a lista de atas
        UI.showToast("Ata de reunião salva com sucesso!", "success");
    }

    function render() {
        // Renderiza a lista de atas
        const listEl = document.getElementById('meeting-minutes-list');
        listEl.innerHTML = ''; // Limpa a lista
        stateRef.meetingMinutes.forEach(ata => {
            const item = document.createElement('div');
            item.className = 'list-item';
            item.innerHTML = `
                <strong>Ata de ${luxon.DateTime.fromISO(ata.date).toFormat('dd/MM/yyyy')}</strong>
                <button class="view-btn">Visualizar</button>
            `;
            listEl.appendChild(item);
        });
        // Adicionar lógica para políticas aqui...
    }

    return {
        init
    };
})();
