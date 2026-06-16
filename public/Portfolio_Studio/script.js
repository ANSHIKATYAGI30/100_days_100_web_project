const previewFrame = document.getElementById('preview-frame');
const downloadBtn = document.getElementById('download-btn');
const addProjectBtn = document.getElementById('add-project-btn');
const projectsFormContainer = document.getElementById('projects-form-container');
const themeSelect = document.getElementById('input-theme');

// Target baseline mock model array matrix
let projectDataList = [
    { 
        title: "100 Days 100 Web Project", 
        tech: "HTML5, CSS3, ES6 JavaScript", 
        desc: "A massive interactive ecosystem built to test advanced interface design logic layouts." 
    },
    { 
        title: "Samvidhan Path Platform", 
        tech: "React, Tailwind, Next.js, Framer Motion", 
        desc: "Immersive open-source dynamic interface navigating structural documentation trees." 
    }
];

const baseFields = ['input-name', 'input-title', 'input-bio', 'input-email', 'input-phrases'];

/**
 * Boots the master configuration settings, binds input event trackers 
 * and refreshes the sandbox preview DOM frame.
 */
function initializeApp() {
    baseFields.forEach(id => {
        document.getElementById(id).addEventListener('input', updateLivePreview);
    });
    themeSelect.addEventListener('change', updateLivePreview);
    addProjectBtn.addEventListener('click', addNewProjectRow);

    renderProjectForms();
    updateLivePreview();
}

/**
 * Parses the model list objects to paint editable row boxes 
 * directly into the sidebar options view panel.
 */
function renderProjectForms() {
    projectsFormContainer.innerHTML = '';
    projectDataList.forEach((proj, idx) => {
        const box = document.createElement('div');
        box.classList.add('dynamic-project-box');
        box.innerHTML = `
            <div class="input-group">
                <input type="text" value="${proj.title}" placeholder="Project Name" data-idx="${idx}" data-field="title" class="proj-input">
            </div>
            <div class="input-group">
                <input type="text" value="${proj.tech}" placeholder="Languages / Engines Used" data-idx="${idx}" data-field="tech" class="proj-input">
            </div>
            <div class="input-group">
                <input type="text" value="${proj.desc}" placeholder="Project Summary" data-idx="${idx}" data-field="desc" class="proj-input">
            </div>
            <button class="btn-delete" data-idx="${idx}">Remove Element 🗑</button>
        `;
        projectsFormContainer.appendChild(box);
    });

    // Mirror input text adjustments straight into preview states
    document.querySelectorAll('.proj-input').forEach(input => {
        input.addEventListener('input', (e) => {
            const idx = e.target.dataset.idx;
            const field = e.target.dataset.field;
            projectDataList[idx][field] = e.target.value;
            updateLivePreview();
        });
    });

    // Bind array cell splice deletion commands
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idx = parseInt(e.target.dataset.idx);
            projectDataList.splice(idx, 1);
            renderProjectForms();
            updateLivePreview();
        });
    });
}

/**
 * Appends a fresh element object to the stack 
 * and refreshes control element layouts.
 */
function addNewProjectRow() {
    projectDataList.push({ 
        title: "Custom Application Build", 
        tech: "Vue.js, WebSockets, Node", 
        desc: "Operational microservice metrics suite processing payload operations in real-time." 
    });
    renderProjectForms();
    updateLivePreview();
}

/**
 * Re-injects compiled document elements cleanly back into the 
 * active isolated sandbox Iframe viewer viewport.
 */
function updateLivePreview() {
    const code = compilePortfolioHTML(); // Defined inside template.js
    const doc = previewFrame.contentDocument || previewFrame.contentWindow.document;
    doc.open();
    doc.write(code);
    doc.close();
}

// Attach export blob streaming trigger
downloadBtn.addEventListener('click', () => {
    const data = compilePortfolioHTML();
    const blob = new Blob([data], { type: 'text/html' });
    const link = document.createElement('a');
    
    link.download = 'animated_portfolio.html';
    link.href = window.URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Run framework bootstrap configuration lifecycle initialization
initializeApp();
