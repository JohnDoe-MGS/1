CSS


/* ==================================================== */
/* 1. GLOBAL CONFIG & VARIABLES                       */
/* ==================================================== */
:root {
    --primary-color: #005A9C;
    --secondary-color: #003B66;
    --accent-color: #FF8C00; /* Laranja para destaque */
    --text-color: #333;
    --text-light: #666;
    --background-color: #f4f7fa;
    --white: #ffffff;
    --border-color: #dee2e6;
    
    --success-color: #28a745;
    --warning-color: #ffc107;
    --danger-color: #dc3545;

    --success-light: #e9f7ec;
    --warning-light: #fff8e1;
    --danger-light: #fbe9e7;
    --info-light: #e3f2fd; /* Azul muito claro para pop-ups e highlights */

    --font-family-main: 'Nunito', sans-serif;
    --header-height: 65px;
    --shadow-sm: 0 1px 3px rgba(0,0,0,0.05);
    --shadow-md: 0 4px 12px rgba(0,0,0,0.1);
    --border-radius: 8px;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: var(--font-family-main);
    background-color: var(--background-color);
    color: var(--text-color);
    line-height: 1.6;
}

.hidden {
    display: none!important;
}

/* ==================================================== */
/* 2. LOGIN VIEW                                      */
/* ==================================================== */
#login-view {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.login-container {
    background-color: var(--white);
    padding: 2.5rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-md);
    width: 100%;
    max-width: 420px;
    text-align: center;
}

.login-header.company-title-orange {
    color: var(--accent-color);
    margin-bottom: 0.5rem;
    font-size: 2rem;
    font-weight: 700;
}

.login-header p {
    margin-bottom: 2rem;
    color: var(--text-light);
}

.form-group {
    margin-bottom: 1.5rem;
    text-align: left;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
}

.form-group input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    font-size: 1rem;
    font-family: var(--font-family-main);
}

.form-group input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(0, 90, 156, 0.2);
}

.form-links {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
}

.form-link {
    color: var(--primary-color);
    text-decoration: none;
}
.form-link:hover {
    text-decoration: underline;
}

.btn-submit {
    width: 100%;
    padding: 0.8rem;
    background-color: var(--accent-color);
    color: var(--white);
    border: none;
    border-radius: 4px;
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn-submit:hover {
    background-color: #e67e00;
}

.form-group.error input {
    border-color: var(--danger-color);
}

.error-message {
    color: var(--danger-color);
    font-size: 0.875rem;
    margin-top: 0.25rem;
    display: block;
    min-height: 1em;
}

/* ==================================================== */
/* 3. APP HEADER & NAVIGATION                         */
/* ==================================================== */
#app-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: var(--white);
    box-shadow: var(--shadow-sm);
    z-index: 1000;
    height: var(--header-height);
}

.header-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
}

.logo-area {
    display: flex;
    align-items: baseline;
    gap: 1rem;
}

.app-name {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary-color);
}

.company-name-placeholder {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-light);
}

.main-nav {
    display: flex;
    gap: 1rem;
}

.nav-link {
    text-decoration: none;
    color: var(--text-color);
    padding: 0.5rem 1rem;
    font-weight: 600;
    border-radius: 4px;
    transition: background-color 0.2s ease, color 0.2s ease;
}

.nav-link:hover,.nav-link.active {
    background-color: var(--info-light);
    color: var(--primary-color);
}

.user-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.action-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: var(--text-light);
    cursor: pointer;
    position: relative;
}

.notification-badge {
    position: absolute;
    top: -5px;
    right: -8px;
    background-color: var(--danger-color);
    color: white;
    border-radius: 50%;
    padding: 2px 6px;
    font-size: 0.7rem;
    font-weight: bold;
}

.user-menu {
    position: relative;
}

.user-dropdown-btn {
    background: none;
    border: none;
    font-size: 2rem;
    color: var(--primary-color);
    cursor: pointer;
}

.user-dropdown-content {
    display: none;
    position: absolute;
    right: 0;
    top: 120%;
    background-color: var(--white);
    min-width: 200px;
    box-shadow: var(--shadow-md);
    border-radius: var(--border-radius);
    z-index: 1001;
    overflow: hidden;
}

.user-dropdown-content.show {
    display: block;
}

.user-dropdown-content a {
    color: var(--text-color);
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    font-weight: 600;
}

.user-dropdown-content a:hover {
    background-color: #f1f1f1;
}

/* ==================================================== */
/* 4. MAIN CONTENT & SECTIONS                         */
/* ==================================================== */
.main-content {
    padding-top: var(--header-height);
    max-width: 1400px;
    margin: 0 auto;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
}

.content-section {
    background-color: var(--white);
    padding: 2rem;
    margin-bottom: 2rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-sm);
}

.section-title {
    font-size: 1.75rem;
    color: var(--secondary-color);
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--accent-color);
}

.subsection-title {
    font-size: 1.25rem;
    color: var(--primary-color);
    margin-top: 1.5rem;
    margin-bottom: 1rem;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.app-button {
    background-color: var(--primary-color);
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
    font-family: var(--font-family-main);
    font-size: 0.9rem;
    transition: background-color 0.3s ease;
}
.app-button:hover {
    background-color: var(--secondary-color);
}
.app-button.add-button {
    background-color: var(--success-color);
}
.app-button.add-button:hover {
    background-color: #218838;
}

/* ==================================================== */
/* 5. COMPONENT-SPECIFIC STYLES                       */
/* ==================================================== */

/* Accordion */
.accordion-container {
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    overflow: hidden;
}
.accordion-item {
    border-bottom: 1px solid var(--border-color);
}
.accordion-item:last-child {
    border-bottom: none;
}
.accordion-header {
    background-color: transparent;
    border: none;
    width: 100%;
    text-align: left;
    padding: 1rem 1.5rem;
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--secondary-color);
    transition: background-color 0.3s ease;
}
.accordion-header:hover,.accordion-item.active.accordion-header {
    background-color: var(--info-light);
}
.accordion-header i {
    transition: transform 0.3s ease;
}
.accordion-item.active.accordion-header i {
    transform: rotate(180deg);
}
.accordion-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-out, padding 0.3s ease-out;
    background-color: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
}
.accordion-item.active.accordion-content {
    max-height: 500px; /* Adjust as needed */
    padding: 1.5rem;
}

/* Tabulator Table Styles */
.tab-navigation {
    margin-bottom: 1rem;
    border-bottom: 2px solid var(--border-color);
}
.tab-link {
    padding: 0.75rem 1.5rem;
    cursor: pointer;
    border: none;
    background: transparent;
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-light);
    border-bottom: 3px solid transparent;
    margin-bottom: -2px;
}
.tab-link.active {
    color: var(--primary-color);
    border-bottom-color: var(--primary-color);
}
.tab-content {
    display: none;
}
.tab-content.active {
    display: block;
}
.table-actions {
    margin-top: 1rem;
    display: flex;
    gap: 1rem;
}
.chart-container {
    margin-top: 2rem;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
}

/* Custom Cell Formatters */
.risk-level-cell { padding: 5px 10px; border-radius: 4px; color: white; font-weight: bold; text-align: center; }
.risk-level-extremo { background-color: #b71c1c; } /* Vermelho escuro */
.risk-level-alto { background-color: var(--danger-color); }
.risk-level-medio { background-color: var(--warning-color); color: var(--text-color); }
.risk-level-baixo { background-color: var(--success-color); }

.effectiveness-cell { padding: 5px 10px; border-radius: 4px; color: white; font-weight: bold; text-align: center; }
.effectiveness-ne { background-color: var(--danger-color); }
.effectiveness-pe { background-color: var(--warning-color); color: var(--text-color); }
.effectiveness-e { background-color: var(--success-color); }

.approval-icon-check { color: var(--success-color); font-size: 1.5rem; }
.approval-icon-times { color: var(--danger-color); font-size: 1.5rem; }
.approval-icon-empty { color: #ccc; font-size: 1.5rem; }

.tabulator-row.approval-approved { background-color: var(--info-light)!important; }
.tabulator-row.approval-rejected { background-color: var(--danger-light)!important; }

.action-icon {
    cursor: pointer;
    font-size: 1.2rem;
    margin: 0 5px;
    color: var(--primary-color);
    transition: color 0.2s;
}
.action-icon:hover {
    color: var(--accent-color);
}
.icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

/* Plans Container */
.plans-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-top: 2rem;
}
.plan-section.section-header {
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 0.5rem;
}
.info-link {
    text-decoration: none;
    color: var(--primary-color);
    font-weight: bold;
}

/* Bluebook */
.bluebook-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
}
.ata-preview {
    border: 1px solid var(--border-color);
    padding: 1rem;
    margin-top: 1rem;
    background-color: #f9f9f9;
    white-space: pre-wrap;
    font-family: 'Courier New', Courier, monospace;
}

/* Notes Section */
.search-container {
    position: relative;
    margin-bottom: 2rem;
}
.search-container input {
    width: 100%;
    padding: 0.75rem 0.75rem 0.75rem 2.5rem;
    font-size: 1.1rem;
    border: 1px solid var(--border-color);
    border-radius: 2rem;
}
.search-container i {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-light);
}

/* ==================================================== */
/* 6. MODAL STYLES                                    */
/* ==================================================== */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
    backdrop-filter: blur(5px);
}
.modal-content {
    background-color: var(--white);
    padding: 2rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-md);
    position: relative;
    width: 90%;
    max-width: 600px;
    background-color: var(--info-light);
}
.modal-content.large {
    max-width: 900px;
}
.modal-close-btn {
    position: absolute;
    top: 10px;
    right: 15px;
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: var(--text-light);
}
.modal-content h3 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: var(--secondary-color);
}
