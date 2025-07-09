JavaScript


/**
 * Ficheiro: js/auth.js
 * Descrição: Módulo para gerir a autenticação (login/logout).
 */

const Auth = (function() {

    function setupLoginForm() {
        const form = document.getElementById('login-form');
        if (!form) return;

        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');

        [usernameInput, passwordInput].forEach(input => {
            input.addEventListener('input', () => UI.clearError(input));
        });

        form.addEventListener('submit', function(event) {
            event.preventDefault();
            let isFormValid = true;

            // Validação do Email
            if (usernameInput.validity.valueMissing) {
                UI.showError(usernameInput, 'O campo de email é obrigatório.');
                isFormValid = false;
            } else if (usernameInput.validity.typeMismatch) {
                UI.showError(usernameInput, 'Por favor, insira um endereço de email válido.');
                isFormValid = false;
            } else {
                UI.clearError(usernameInput);
            }

            // Validação da Senha
            if (passwordInput.validity.valueMissing) {
                UI.showError(passwordInput, 'O campo de senha é obrigatório.');
                isFormValid = false;
            } else if (passwordInput.validity.tooShort) {
                UI.showError(passwordInput, `A senha deve ter pelo menos ${passwordInput.minLength} caracteres.`);
                isFormValid = false;
            } else {
                UI.clearError(passwordInput);
            }

            if (isFormValid) {
                // Simulação de autenticação bem-sucedida
                console.log('Formulário válido. Simulando login...');
                
                // Numa aplicação real, aqui seria feita uma chamada fetch() para um API de backend.
                const user = {
                    email: usernameInput.value,
                    name: "Usuário Exemplo"
                };

                // Dispara um evento personalizado para notificar o resto da aplicação
                const loginSuccessEvent = new CustomEvent('loginSuccess', { detail: { user } });
                document.dispatchEvent(loginSuccessEvent);
            }
        });
    }

    function setupLogout() {
        const logoutButton = document.getElementById('logout-btn');
        if (!logoutButton) return;

        logoutButton.addEventListener('click', (event) => {
            event.preventDefault();
            console.log('Terminando sessão...');
            const logoutEvent = new CustomEvent('logout');
            document.dispatchEvent(logoutEvent);
        });
    }

    return {
        setupLoginForm,
        setupLogout
    };
})();
