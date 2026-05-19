// ─── DOM References ────────────────────────────────────────────────────────────
const notesContainer = document.getElementById("notes-container");
const documentsList  = document.querySelector(".documents-list");
const pdfMessage     = document.getElementById("pdfMessage");
const taskInput      = document.getElementById("task-input");
const taskTypeSelect = document.getElementById("task-type");

// ─── Theme State ───────────────────────────────────────────────────────────────
// Maps theme id → gradient for body + card fallback colour for default cards
const THEMES = {
  sunset: {
    body: "linear-gradient(135deg, #3b0764, #6b21a8)",
    card: "#8b5fbf",
  },

  ocean: {
    body: "linear-gradient(135deg, #021b79, #0575e6)",
    card: "#4d8df7",
  },

  forest: {
    body: "linear-gradient(135deg, #134e5e, #71b280)",
    card: "#65a88f",
  },

  midnight: {
    body: "linear-gradient(135deg, #232526, #414345)",
    card: "#5c5f61",
  },

  aurora: {
    body: "linear-gradient(135deg, #00c9a7, #845ec2)",
    card: "#57c5b6",
  },
};

let currentTheme = "sunset"; // default

// ─── Task Type colour map ──────────────────────────────────────────────────────
// Keeps track of user-chosen type colours so they survive theme switches
const TYPE_COLORS = {
  "":              null,           // → use theme colour
  "Work":          "#FFDE59",
  "Personal":      "#FFC0CB",
  "Professional":  "#B0BEC5",
  "Fitness":       "#B1EE99",
  "Miscellaneous": "#CAB9F5",
};

// ─── Add Task ──────────────────────────────────────────────────────────────────
function Add() {
  const text = taskInput.value.trim();

  if (text === "") {
    taskInput.focus();
    taskInput.style.borderColor = "rgba(255, 80, 80, 0.8)";
    setTimeout(() => { taskInput.style.borderColor = ""; }, 1200);
    return;
  }

  const notes = document.querySelectorAll(".notes");

  if (notes.length > 0) {
    const lastNote = notes[notes.length - 1];
    const taskText = lastNote.querySelector("span");

    if (taskText && (taskText.innerText.trim() === "Click here to add a task..." || taskText.innerText.trim() === "")) {
      alert("Please add a task to the previous note before creating a new one!");
      return;
    }
  }

  const selectedType  = taskTypeSelect.value;
  const typeColor     = TYPE_COLORS[selectedType] ?? null;
  const isDefaultCard = !typeColor; // no type selected → follows theme

  // Card container
  const note = document.createElement("div");
  note.classList.add("notes");
  note.dataset.defaultCard = isDefaultCard ? "true" : "false";

  // Apply colour
  note.style.backgroundColor = isDefaultCard
    ? THEMES[currentTheme].card
    : typeColor;

  // Inner layout
  const noteWrapper = document.createElement("div");
  noteWrapper.style.cssText = "display:flex; align-items:flex-start; justify-content:space-between; width:100%; gap:8px;";

  // Task text
  const taskText = document.createElement("span");
  taskText.className = "task-text";
  taskText.innerText = text;
  taskText.style.cssText = "flex:1; line-height:1.4; word-break:break-word;";

  // Actions column
  const actions = document.createElement("div");
  actions.style.cssText = "display:flex; flex-direction:column; align-items:center; gap:6px; flex-shrink:0;";

  // Tick / complete toggle
  const tickBtn = document.createElement("button");
  tickBtn.innerHTML = "&#10003;";
  tickBtn.title = "Mark complete";
  tickBtn.style.cssText = [
    "background:none", "border:1.5px solid #555", "border-radius:50%",
    "width:26px", "height:26px", "cursor:pointer", "font-size:14px",
    "display:flex", "align-items:center", "justify-content:center",
    "transition:background 0.2s, color 0.2s", "color:#333",
  ].join(";");

  tickBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    taskText.classList.toggle("completed");
    tickBtn.style.background = taskText.classList.contains("completed") ? "#4caf50" : "none";
    tickBtn.style.color      = taskText.classList.contains("completed") ? "white"   : "#333";
    tickBtn.style.borderColor= taskText.classList.contains("completed") ? "#4caf50" : "#555";
  });

  // Delete button
  const delBtn = document.createElement("button");
  delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
  delBtn.title = "Delete task";
  delBtn.style.cssText = [
    "background:none", "border:none", "cursor:pointer",
    "font-size:13px", "color:#c0392b", "padding:2px",
    "transition:transform 0.2s",
  ].join(";");
  delBtn.addEventListener("mouseenter", () => { delBtn.style.transform = "scale(1.25)"; });
  delBtn.addEventListener("mouseleave", () => { delBtn.style.transform = "scale(1)"; });
  delBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    note.style.animation = "none";
    note.style.transition = "opacity 0.25s, transform 0.25s";
    note.style.opacity = "0";
    note.style.transform = "scale(0.92)";
    setTimeout(() => note.remove(), 250);
  });

  // Type badge (only if type was selected)
  if (selectedType) {
    const badge = document.createElement("span");
    badge.innerText = selectedType;
    badge.style.cssText = [
      "font-size:10px", "font-weight:700", "padding:2px 7px",
      "border-radius:20px", "background:rgba(0,0,0,0.12)",
      "color:#333", "white-space:nowrap", "margin-top:4px",
      "align-self:flex-end",
    ].join(";");
    note.appendChild(badge);
  }

  actions.appendChild(tickBtn);
  actions.appendChild(delBtn);
  noteWrapper.appendChild(taskText);
  noteWrapper.appendChild(actions);
  note.insertBefore(noteWrapper, note.firstChild);
  notesContainer.appendChild(note);

  // Reset inputs
  taskInput.value = "";
  taskTypeSelect.value = "";
  taskInput.focus();
}

// Allow pressing Enter in the input to add a task
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") Add();
});

// ─── Theme Switching ───────────────────────────────────────────────────────────
function applyTheme(themeKey) {
  const theme = THEMES[themeKey];
  document.body.style.background = theme.body;
  currentTheme = themeKey;

  // Update CSS custom property → auto-updates all default cards via var()
  document.documentElement.style.setProperty("--theme-card-bg", theme.card);

  // Also imperatively update existing default cards
  const cards = document.querySelectorAll(".notes[data-default-card='true']");
  cards.forEach((card) => {
    card.style.backgroundColor = theme.card;
  });
}



// ─── PDF Export ────────────────────────────────────────────────────────────────
function saveAsPDF() {
  const { jsPDF } = window.jspdf;
  const doc  = new jsPDF();
  const cards = document.querySelectorAll(".notes");

  doc.setFontSize(18);
  doc.text("My To-Do List", 20, 18);
  doc.setFontSize(12);

  let y = 30;
  cards.forEach((card, i) => {
    const textNode = card.querySelector(".task-text");
    const text = textNode ? textNode.innerText.trim() : card.innerText.trim();
    if (text) {
      doc.text(`${i + 1}. ${text}`, 20, y);
      y += 10;
      if (y > 270) { doc.addPage(); y = 20; }
    }
  });

  const fileName = `ToDoList_${Date.now()}.pdf`;
  const fileURL  = URL.createObjectURL(doc.output("blob"));
  saveDocument(fileName, fileURL);
  showPDFMessage();
}

function saveDocument(fileName, fileURL) {
  const docItem = document.createElement("div");
  docItem.className = "document-item";
  docItem.innerHTML = `
    <span>${fileName}</span>
    <button onclick="viewPDF('${fileURL}')">View</button>
    <button onclick="downloadPDF('${fileURL}', '${fileName}')">Download</button>
    <button onclick="deletePDF(this)">Delete</button>
  `;
  documentsList.appendChild(docItem);
}

function viewPDF(fileURL)                  { window.open(fileURL, "_blank"); }
function downloadPDF(fileURL, fileName)    {
  const a = document.createElement("a");
  a.href = fileURL; a.download = fileName; a.click();
}
function deletePDF(button)                 { button.parentElement.remove(); }

function showPDFMessage() {
  pdfMessage.style.display = "flex";
  setTimeout(() => { pdfMessage.style.display = "none"; }, 3000);
}

// ─── Tab Navigation ────────────────────────────────────────────────────────────
function showHome() {
  document.getElementById("home-tab").style.display      = "block";
  document.getElementById("documents-tab").style.display = "none";
}

function showDocuments() {
  document.getElementById("home-tab").style.display      = "none";
  document.getElementById("documents-tab").style.display = "block";
}
