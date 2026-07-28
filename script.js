const projectsData = [
    {
        id: 2,
        title: 'Nooke',
        description: 'Уютное Discord-сообщество для общения и игр',
        category: 'discord',
        icon: '🎮',
        image: 'https://i.ibb.co/PsPX5Z97/b3c5163a185008b1e6daf2fc83a4c1fb.png',
        link: 'https://discord.gg/WZgdVcemmk'
    },
    {
        id: 1,
        title: 'Серийчик Бот',
        description: 'Игровой Telegram-бот с экономикой и системой уровней',
        category: 'telegram',
        icon: '🎲',
        image: 'https://i.ibb.co/k66xYQwj/IMG-20260409-190151-122.jpg',
        link: 'https://t.me/strikepet_bot'
    },
    {
        id: 3,
        title: 'Comaru CardBot',
        description: 'Коллекционная карточная игра в Telegram',
        category: 'telegram',
        icon: '🃟',
        image: 'https://i.ibb.co/cStk7zqJ/dc-Se0.jpg',
        link: 'https://t.me/comaru_cardbot'
    },
    {
        id: 4,
        title: 'HuroBot',
        description: 'Open Source инструмент для автоматизации и OSINT',
        category: 'code',
        icon: '🤖',
        image: 'https://i.ibb.co/v08LpSt/IMG-20260409-190254-955.jpg',
        link: 'https://github.com/rud1x/HuroBot_tg'
    },
    {
        id: 5,
        title: 'uHunt',
        description: 'Инструмент для поиска свободных username',
        category: 'telegram',
        icon: '✈️',
        image: 'https://i.ibb.co/67fCkYvk/Untitled-project-6.jpg',
        link: 'https://t.me/uHunt_bot'
    },
    {
        id: 6,
        title: 'wexos',
        description: 'Многофункциональный юзербот на основе BusinessApi',
        category: 'telegram',
        icon: '⚙️',
        image: 'https://i.ibb.co/HpVYWpht/IMG-20260426-011158-447.jpg',
        link: 'https://t.me/wexosbot'
    },
    {
        id: 7,
        title: 'NeoShell',
        description: 'Управляй своим ПК с телефона через Wi-Fi',
        category: 'code',
        icon: '💻',
        image: 'https://i.ibb.co/gL2pJL2m/image.png',
        link: 'https://github.com/rud1x/NeoShell'
    },
    {
        id: 8,
        title: 'GitWid',
        description: 'Виджеты на основе Rainmeter для отображения вашей GitHub-статистики',
        category: 'code',
        icon: '💻',
        image: 'https://i.ibb.co/bZQm86c/Gemini-Generated-Image-bnpo6vbnpo6vbnpo-1.png',
        link: 'https://github.com/rud1x/GitWid'
    }
];

function getCategoryLabel(category) {
    const labels = {
        'telegram': 'telegram',
        'discord': 'discord',
        'code': 'open source'
    };
    return labels[category] || category;
}

function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function renderProjects(filter = 'all') {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    const filtered = filter === 'all' 
        ? projectsData 
        : projectsData.filter(p => p.category === filter);

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="no-projects">
                ✨ Проектов в этой категории пока нет
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map((project, index) => {
        const imageHtml = project.image 
            ? `<img src="${project.image}" alt="${project.title}" loading="lazy">`
            : `<span class="project-placeholder">${project.icon}</span>`;
        
        return `
            <div class="project-card" data-id="${project.id}" data-link="${project.link}" style="animation-delay: ${index * 0.06}s">
                <div class="project-img">
                    ${imageHtml}
                </div>
                <div class="project-info">
                    <h3>${escapeHtml(project.title)}</h3>
                    <p>${escapeHtml(project.description)}</p>
                    <span class="project-tag">${getCategoryLabel(project.category)}</span>
                </div>
            </div>
        `;
    }).join('');

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function() {
            const link = this.dataset.link;
            if (link) window.open(link, '_blank');
        });

        const img = card.querySelector('.project-img img');
        if (img) {
            img.addEventListener('error', function() {
                const projectId = card.dataset.id;
                const project = projectsData.find(p => p.id == projectId);
                if (project) {
                    this.style.display = 'none';
                    const fallback = document.createElement('span');
                    fallback.className = 'project-placeholder';
                    fallback.textContent = project.icon;
                    this.parentElement.appendChild(fallback);
                }
            });
        }
    });
}

function getAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}

function getDaysSince(date) {
    const start = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function initTyping() {
    const element = document.getElementById('typedText');
    if (!element) return;
    
    const phrases = [
        'python разработчик',
        'создаю ботов',
        'open source энтузиаст',
        'учусь каждый день'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isWaiting = false;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            element.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let speed = isDeleting ? 40 : 80;
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            speed = 2000;
            isWaiting = true;
            setTimeout(() => {
                isWaiting = false;
                isDeleting = true;
                type();
            }, speed);
            return;
        }
        
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            speed = 400;
        }
        
        if (!isWaiting) {
            setTimeout(type, speed);
        }
    }
    
    setTimeout(type, 500);
}

function setTheme(theme) {
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
    
    const icon = document.querySelector('.floating i');
    if (icon) {
        icon.className = theme === 'dark' ? 'ph-fill ph-moon' : 'ph-fill ph-sun';
    }
    
    const canvas = document.getElementById('bgCanvas');
    if (canvas) canvas.style.opacity = theme === 'dark' ? '0.12' : '0.06';
}

function initTheme() {
    const saved = localStorage.getItem('theme') || 'dark';
    setTheme(saved);
    
    document.getElementById('themeBtn').addEventListener('click', function() {
        const isDark = document.body.classList.contains('dark');
        setTheme(isDark ? 'light' : 'dark');
    });
}

 
 
let currentTab = 'skills';
let currentFilter = 'all';

 
function switchTab(tabId) {
 
    currentTab = tabId;
    
 
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabId);
    });
    
 
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.toggle('active', content.id === tabId);
    });
    
 
    renderProjects(currentFilter);
}

 
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const tabId = this.dataset.tab;
        switchTab(tabId);
    });
});

 
document.addEventListener('click', function(e) {
    const filterBtn = e.target.closest('.filter-btn');
    if (!filterBtn) return;
    
 
    const activeTab = document.querySelector('.tab-content.active');
    if (!activeTab) return;
    
 
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    filterBtn.classList.add('active');
    
 
    currentFilter = filterBtn.dataset.filter;
    renderProjects(currentFilter);
});

 
document.addEventListener('DOMContentLoaded', function() {
 
    currentFilter = 'all';
    currentTab = 'skills';
    
 
    switchTab('skills');
    
 
    const ageEl = document.getElementById('age');
    if (ageEl) ageEl.textContent = getAge('2012-02-10');
    
    const daysEl = document.getElementById('codingDays');
    if (daysEl) daysEl.textContent = getDaysSince('2026-04-06');
    
    initTyping();
    initTheme();
    
 
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('section').forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
        observer.observe(el);
    });
});

 
(function initCanvas() {
    const canvas = document.getElementById('bgCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function draw() {
        if (!ctx) return;
        const w = canvas.width, h = canvas.height;
        ctx.clearRect(0, 0, w, h);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
        const step = 55;
        const offset = (Date.now() * 0.02) % step;
        
        for (let x = offset; x < w; x += step) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);
            ctx.stroke();
        }
        for (let y = offset; y < h; y += step) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
            ctx.stroke();
        }
        requestAnimationFrame(draw);
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    draw();
})();