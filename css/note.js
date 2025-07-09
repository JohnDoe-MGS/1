JavaScript


/**
 * Ficheiro: js/notes.js
 * Descrição: Módulo para gerir o Livro de Anotações e a busca inteligente.
 */

const Notes = (function() {
    let stateRef;
    let fuse;

    function init(globalState) {
        stateRef = globalState;
        setupFuse();
        setupEventListeners();
        render();
    }

    function setupFuse() {
        const options = {
            includeScore: true,
            keys: ['content', 'author', 'context'],
            threshold: 0.4 // Ajustar sensibilidade
        };
        fuse = new Fuse(stateRef.allNotes, options);
    }
    
    function setupEventListeners() {
        const searchInput = document.getElementById('notes-search-input');
        searchInput.addEventListener('keyup', (e) => {
            const searchTerm = e.target.value;
            if (searchTerm.length > 2) {
                const results = fuse.search(searchTerm);
                render(results.map(r => r.item)); // Renderiza apenas os itens encontrados
            } else {
                render(); // Renderiza tudo se a busca for curta
            }
        });
    }

    function render(notesToRender = null) {
        const container = document.getElementById('notes-aggregation-container');
        const notes = notesToRender |

| stateRef.allNotes;
        
        container.innerHTML = ''; // Limpa o container

        if (notes.length === 0) {
            container.innerHTML = '<p>Nenhuma anotação encontrada.</p>';
            return;
        }

        // Agrupa as notas por contexto
        const groupedNotes = notes.reduce((acc, note) => {
            (acc[note.context] = acc[note.context] ||).push(note);
            return acc;
        }, {});
        
        for (const context in groupedNotes) {
            const groupDiv = document.createElement('div');
            groupDiv.className = 'note-group';
            
            const title = document.createElement('h3');
            title.className = 'subsection-title';
            title.textContent = context;
            groupDiv.appendChild(title);
            
            groupedNotes[context].forEach(note => {
                const noteEl = document.createElement('div');
                noteEl.className = 'note-item';
                noteEl.innerHTML = `
                    <p>${note.content}</p>
                    <small>Por: ${note.author} em ${luxon.DateTime.fromISO(note.timestamp).toFormat('dd/MM/yyyy HH:mm')}</small>
                `;
                groupDiv.appendChild(noteEl);
            });
            container.appendChild(groupDiv);
        }
    }

    return {
        init
    };
})();
