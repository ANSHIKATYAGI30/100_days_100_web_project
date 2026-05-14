if (typeof REPO_OWNER === 'undefined') {
    window.REPO_OWNER = "dhairyagothi";
    window.REPO_NAME = "100_days_100_web_project";
}

async function fetchRepoStats() {
    try {
        const [repoRes, prRes] = await Promise.all([
            fetch(`https://api.github.com/repos/${window.REPO_OWNER}/${window.REPO_NAME}`),
            fetch(`https://api.github.com/search/issues?q=repo:${window.REPO_OWNER}/${window.REPO_NAME}+type:pr+state:open`)
        ]);

        if (!repoRes.ok || !prRes.ok) throw new Error("Stats fetch failed");

        const repoData = await repoRes.json();
        const prData = await prRes.json();

        const starEl = document.getElementById('starCount');
        const forkEl = document.getElementById('forkCount');
        const issueEl = document.getElementById('issueCount');
        const prEl = document.getElementById('prCount');

        if (starEl) starEl.textContent = repoData.stargazers_count.toLocaleString();
        if (forkEl) forkEl.textContent = repoData.forks_count.toLocaleString();
        if (issueEl) issueEl.textContent = (repoData.open_issues_count - prData.total_count).toLocaleString();
        if (prEl) prEl.textContent = prData.total_count.toLocaleString();
    } catch (error) {
        console.error("Error fetching repo stats:", error);
    }
}

// Canvas Background Animation
function initCanvas() {
    const canvas = document.getElementById('bgCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            const isDark = !document.body.classList.contains('light-mode');
            const alpha = isDark ? Math.random() * 0.5 + 0.2 : Math.random() * 0.3 + 0.1;
            ctx.fillStyle = `rgba(26, 188, 156, ${alpha})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        const isDark = !document.body.classList.contains('light-mode');
        ctx.fillStyle = isDark ? 'rgba(10, 10, 10, 0.1)' : 'rgba(245, 245, 245, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 100) {
                    const alpha = isDark ? 0.2 * (1 - dist / 100) : 0.1 * (1 - dist / 100);
                    ctx.strokeStyle = `rgba(26, 188, 156, ${alpha})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Theme Toggle Functionality Initialize theme from storage or default to dark
const savedTheme = localStorage.getItem('theme') || window.theme || 'dark';
window.theme = savedTheme;

if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
} else {
    document.body.classList.remove('light-mode');
}

// Update Navbar for Login Status
const buttons = document.getElementsByClassName('buttons')[0];

function updateNavbar() {
    if (!buttons) return;
    const username = window.username || null;
    const isRoot = !window.location.pathname.includes('/contributors/');
    const basePath = isRoot ? '' : '../';
    const isLight = document.body.classList.contains('light-mode');
    
    const themeButton = `
        <button id="themeToggle" class="button" title="Toggle Theme">
            <i class="fas ${isLight ? 'fa-sun' : 'fa-moon'}"></i>
        </button>
    `;
    
    if (username) {
        buttons.innerHTML = `
        <span class="welcome-text">Welcome, ${username}</span>
        <button class="button logout-btn" id='logout'>Logout</button>
        <a class="button" href="https://github.com/dhairyagothi" target="_blank">GitHub</a>
        <a class="button" href="${basePath}contributors/contributor.html">Contributors</a>
        ${themeButton}`;

        document.getElementById('logout').addEventListener('click', () => {
            window.username = null;
            updateNavbar();
        });
    } else {
        buttons.innerHTML = `
        <a class="button" href="${basePath}contributors/contributor.html">Contributors</a>
        <a class="button" href="https://github.com/dhairyagothi" target="_blank">GitHub</a>
        <a class="button login-btn" href="${basePath}public/Login.html">Log in</a>
        ${themeButton}`;
    }
    
    // Single, clean click controller execution
    const toggleBtn = document.getElementById('themeToggle');
    const toggleIcon = toggleBtn.querySelector('i');
    
    toggleBtn.addEventListener('click', () => {
        const currentlyLight = document.body.classList.toggle('light-mode');
        
        if (currentlyLight) {
            toggleIcon.className = 'fas fa-sun';
            window.theme = 'light';
            localStorage.setItem('theme', 'light');
        } else {
            toggleIcon.className = 'fas fa-moon';
            window.theme = 'dark';
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Populate the table with project data

// Complete fillTable implementation with search filtering
function fillTable(searchTerm = "") {
    const tableBody = document.getElementById("tableBody"); // Ensure your <tbody> has this ID
    const noProjectsMessage = document.getElementById("noProjects"); // The "No Projects Found" element
    
    if (!tableBody) return;

    const data = [
        ["Day 1", "To-Do List", "./public/TO_DO_LIST/todolist.html"],
        ["Day 2", "Digital Clock", "./public/digital_clock/digitalclock.html"],
        ["Day 3", "Indian Flag", "./public/indianflag/flag.html"],
        ["Day 4", "Dropdown Nav Bar", "./public/dropdown_navbar/index.html"],
        ["Day 5", "Animated Cursor", "./public/Animated-cursor/animated-cursor.html"],
        ["Day 6", "Auto Background Image Slider", "./public/Background-Image-sider/slider.html"],
        ["Day 7", "Typewriter", "./public/typewriter/typewriter.html"],
        ["Day 8", "Parallel-X Website", "./public/Parallel-x%20website/parallal.html"],
        ["Day 9", "Captcha Generator", "./public/captcha/captcha.html"],
        ["Day 10", "QR Code Generator", "./public/qr%20generator/qr.html"],
        ["Day 11", "Serve Website Using Express", "./public/index.html"],
        ["Day 12", "Nodemailer Contact Form", "./public/gmail_nodemailer/public/mail.html"],
        ["Day 13", "Login Form Using MERN", "github.com"],
        ["Day 14", "File Uploader", "github.com"],
        ["Day 15", "Progress Bar", "./public/progress_bar/progress_bar.html"],
        ["Day 16", "Scroll Bar CSS", "./public/index.html"],
        ["Day 17", "Slider Using Swiper API", "./public/slider%20box/index.html"],
        ["Day 18", "Carousel Solar System", "./public/carousal/index.html"],
        ["Day 19", "Planto", "./public/plantwebsite/plant.html"],
        ["Day 20", "EveSparks", "onrender.com"],
        ["Day 21", "Video BG Slider Using React", "github.com"]
    ];

    // Clear existing rows
    tableBody.innerHTML = "";

    // Filter projects based on the search query
    const filteredData = data.filter(project => 
        project[0].toLowerCase().includes(searchTerm.toLowerCase()) || 
        project[1].toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Toggle "No Projects Found" visibility
    if (filteredData.length === 0) {
        if (noProjectsMessage) noProjectsMessage.style.display = "block";
        return;
    } else {
        if (noProjectsMessage) noProjectsMessage.style.display = "none";
    }

    // Build and append table rows
    filteredData.forEach(project => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${project[0]}</td>
            <td>${project[1]}</td>
            <td><a class="button" href="${project[2]}" target="_blank">Live Demo</a></td>
        `;
        tableBody.appendChild(row);
    });
}

// Global initialization sequence
document.addEventListener('DOMContentLoaded', () => {
    fetchRepoStats();
    initCanvas();
    updateNavbar();
    fillTable(); // Renders the complete table on page load

    // Optional: Hook into search input if you have one
    const searchInput = document.getElementById("projectSearch");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            fillTable(e.target.value);
        });
    }
});

