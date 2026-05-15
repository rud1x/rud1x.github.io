// CANVAS АНИМАЦИЯ
(function initGridBackground() {
    const canvas = document.getElementById('bgCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId = null;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function drawGrid() {
        if (!ctx) return;
        const w = canvas.width, h = canvas.height;
        ctx.clearRect(0, 0, w, h);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
        ctx.lineWidth = 1;
        const step = 50;
        const offset = (Date.now() * 0.03) % step;
        
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
        animationId = requestAnimationFrame(drawGrid);
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    drawGrid();
})();

// ВОЗРАСТ
function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) age--;
    return age;
}
const ageElement = document.getElementById('age');
if (ageElement) ageElement.textContent = calculateAge('2012-02-10');

// ========== ДАННЫЕ ПРОЕКТОВ ==========
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

// Функция для категорий
function getCategoryName(category) {
    const names = {
        'discord': 'Discord',
        'telegram': 'Telegram',
        'code': 'Open Source'
    };
    return names[category] || category;
}

// Функция рендера проектов - ИСПРАВЛЕННАЯ (чистые картинки без мусора)
function renderProjects(filter = 'all') {
    const grid = document.getElementById('projectsGrid');
    if (!grid) {
        console.error('projectsGrid не найден');
        return;
    }
    
    const filtered = filter === 'all' 
        ? projectsData 
        : projectsData.filter(p => p.category === filter);
    
    if (filtered.length === 0) {
        grid.innerHTML = '<div class="no-projects">✨ Проектов в этой категории пока нет</div>';
        return;
    }
    
    grid.innerHTML = filtered.map((project, index) => {
        const imageHtml = project.image 
            ? `<img src="${project.image}" alt="${project.title}" loading="lazy">`
            : `<span style="font-size: 3rem;">${project.icon}</span>`;
        
        return `<div class="project-card" data-id="${project.id}" data-link="${project.link}" style="animation: fadeInUp 0.5s ease ${index * 0.05}s both">
    <div class="project-img">
        ${imageHtml}
    </div>
    <div class="project-info">
        <h3>${escapeHtml(project.title)}</h3>
        <p>${escapeHtml(project.description)}</p>
        <span class="project-tag">${getCategoryName(project.category)}</span>
    </div>
</div>`;
    }).join('');
    
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            const link = card.dataset.link;
            if (link) {
                window.open(link, '_blank');
            }
        });
        
        const img = card.querySelector('.project-img img');
        if (img) {
            img.addEventListener('error', function() {
                const projectId = card.dataset.id;
                const project = projectsData.find(p => p.id == projectId);
                if (project) {
                    this.style.display = 'none';
                    const fallbackDiv = document.createElement('span');
                    fallbackDiv.style.fontSize = '3rem';
                    fallbackDiv.textContent = project.icon;
                    this.parentElement.appendChild(fallbackDiv);
                }
            });
        }
    });
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

// ФИЛЬТРАЦИЯ
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProjects(filter);
    });
});

// ТАБЫ НАВЫКОВ
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// GITHUB СТАТИСТИКА
async function loadGitHubStats() {
    const grid = document.getElementById('githubStatsGrid');
    if (!grid) return;
    try {
        const res = await fetch('https://raw.githubusercontent.com/rud1x/rud1x/main/cfg.json');
        if (res.ok) {
            const stats = await res.json();
            grid.innerHTML = `
                <div class="stat-card"><div class="stat-value">${stats.repos || 6}</div><div class="stat-label">Репозитории</div></div>
                <div class="stat-card"><div class="stat-value">${stats.stars || 0}</div><div class="stat-label">Звёзды</div></div>
                <div class="stat-card"><div class="stat-value">${stats.followers || 2}</div><div class="stat-label">Подписчики</div></div>
                <div class="stat-card"><div class="stat-value">${stats.totalCommits || 0}</div><div class="stat-label">Коммиты</div></div>
            `;
        } else {
            throw new Error();
        }
    } catch {
        grid.innerHTML = `<div class="stat-card" style="grid-column:1/-1"><div class="stat-value">—</div><div class="stat-label">Не удалось загрузить</div></div>`;
    }
}

// ========== CODEWARS СТАТИСТИКА ==========
async function loadCodewarsStats() {
    const grid = document.getElementById('codewarsStatsGrid');
    if (!grid) return;
    
    try {
        const response = await fetch('https://www.codewars.com/api/v1/users/rud1x');
        
        if (!response.ok) throw new Error('User not found');
        
        const data = await response.json();
        
        // Цвета для рангов
        const rankColors = {
            'white': '#cccccc',
            'yellow': '#ffcc00',
            'blue': '#4a90e2',
            'purple': '#9b59b6',
            'black': '#222222'
        };
        const rankColor = rankColors[data.ranks.overall.color] || '#ffffff';
        
        // Тот же HTML, что и у GitHub
        grid.innerHTML = `
            <div class="stat-card"><div class="stat-value" style="color: ${rankColor}">${data.ranks.overall.name}</div><div class="stat-label">Ранг</div></div>
            <div class="stat-card"><div class="stat-value">${data.honor || 0}</div><div class="stat-label">Очки чести</div></div>
            <div class="stat-card"><div class="stat-value">${data.codeChallenges.totalCompleted || 0}</div><div class="stat-label">Решено задач</div></div>
            <div class="stat-card"><div class="stat-value">${data.ranks.overall.score || 0}</div><div class="stat-label">Всего очков</div></div>
        `;
    } catch (error) {
        console.error('Ошибка загрузки Codewars:', error);
        grid.innerHTML = `
            <div class="stat-card" style="grid-column:1/-1"><div class="stat-value">—</div><div class="stat-label">Не удалось загрузить</div></div>
        `;
    }
}

// КНОПКА КОНТАКТОВ
const contactBtn = document.getElementById('contactBtn');
const contactDropdown = document.getElementById('contactDropdown');
if (contactBtn && contactDropdown) {
    contactBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        contactDropdown.classList.toggle('show');
    });
    document.addEventListener('click', (e) => {
        if (!contactBtn.contains(e.target) && !contactDropdown.contains(e.target)) {
            contactDropdown.classList.remove('show');
        }
    });
}

// ТЕМА
function setTheme(theme) {
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === theme);
    });
    const canvas = document.getElementById('bgCanvas');
    if (canvas) canvas.style.opacity = theme === 'dark' ? '0.15' : '0.08';
}

const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);
document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => setTheme(btn.dataset.theme));
});

// Анимация появления карточек
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ЗАПУСК
document.addEventListener('DOMContentLoaded', () => {
    renderProjects('all');
    loadGitHubStats();
    loadCodewarsStats(); // Добавляем загрузку Codewars
});


// КНОПКА НАВЕРХ
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========== ПЛАВНОЕ ПОЯВЛЕНИЕ КАРТОЧЕК ПРИ СКРОЛЛЕ ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '20px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Применяем ко всем карточкам проектов и навыков
document.querySelectorAll('.project-card, .skill-card, .stat-card, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// Hero-блок тоже плавно появляется
const heroContent = document.querySelector('.hero-content');
if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(20px)';
    heroContent.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    setTimeout(() => {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }, 100);
}

// ========== КНОПКА ТЕМЫ В УГЛУ (без конфликтов) ==========
const cornerBtn = document.getElementById('cornerThemeBtn');

function updateCornerBtnIcon() {
    if (!cornerBtn) return;
    const icon = cornerBtn.querySelector('i');
    const isDark = document.body.classList.contains('dark');
    if (isDark) {
        icon.className = 'ph-fill ph-moon';
    } else {
        icon.className = 'ph-fill ph-sun';
    }
}

if (cornerBtn) {
    // Устанавливаем правильную иконку
    updateCornerBtnIcon();
    
    // Клик по кнопке
    cornerBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        const isDark = document.body.classList.contains('dark');
        const newTheme = isDark ? 'light' : 'dark';
        
        // Используем существующую функцию setTheme
        setTheme(newTheme);
        updateCornerBtnIcon();
        
        // Анимация
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            if (cornerBtn) cornerBtn.style.transform = '';
        }, 150);
    });
}

// Следим за изменением темы от других кнопок
const themeObserver = new MutationObserver(function() {
    updateCornerBtnIcon();
});
themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });

// ========== АНИМАЦИЯ ПЕЧАТНОЙ МАШИНКИ ==========
function initTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    // Сохраняем структуру
    const cursorSpan = heroTitle.querySelector('.cursor');
    if (!cursorSpan) return;
    
    // Текст для печати
    const firstLineText = "JUNIOR";
    const secondLineText = "DEVELOPER";
    
    // Очищаем заголовок, сохраняя курсор
    heroTitle.innerHTML = '';
    
    // Создаём элементы для строк
    const firstLineSpan = document.createElement('span');
    firstLineSpan.className = 'typing-line';
    const breakSpan = document.createElement('br');
    const secondLineSpan = document.createElement('span');
    secondLineSpan.className = 'typing-line';
    
    heroTitle.appendChild(firstLineSpan);
    heroTitle.appendChild(breakSpan);
    heroTitle.appendChild(secondLineSpan);
    heroTitle.appendChild(cursorSpan);
    
    let firstIndex = 0;
    let secondIndex = 0;
    
    function typeFirstLine() {
        if (firstIndex < firstLineText.length) {
            firstLineSpan.textContent += firstLineText.charAt(firstIndex);
            firstIndex++;
            setTimeout(typeFirstLine, 100);
        } else {
            // После первой строки ждём и печатаем вторую
            setTimeout(typeSecondLine, 200);
        }
    }
    
    function typeSecondLine() {
        if (secondIndex < secondLineText.length) {
            secondLineSpan.textContent += secondLineText.charAt(secondIndex);
            secondIndex++;
            setTimeout(typeSecondLine, 100);
        }
    }
    
    // Запускаем анимацию
    setTimeout(typeFirstLine, 300);
}

// Запуск при загрузке
document.addEventListener('DOMContentLoaded', () => {
    renderProjects('all');
    loadGitHubStats();
    loadCodewarsStats();
    setTimeout(initTypingAnimation, 500);
});


// ========== КОМПАКТНЫЙ ЗАГОЛОВОК (убираем лишнюю высоту) ==========
function compactStickyHeader() {
    if (window.innerWidth > 768) return;
    
    const headers = document.querySelectorAll('.section-header');
    headers.forEach(header => {
        header.style.padding = '0.2rem 0';
        header.style.minHeight = 'auto';
        header.style.lineHeight = '1.2';
    });
    
    const titles = document.querySelectorAll('.section-title');
    titles.forEach(title => {
        title.style.padding = '0.1rem 0';
        title.style.margin = '0';
        title.style.fontSize = '0.7rem';
    });
}

document.addEventListener('DOMContentLoaded', compactStickyHeader);
window.addEventListener('resize', compactStickyHeader);

// КНОПКА РЕЗЮМЕ - ВРЕМЕННО НЕТ
const resumeBtn = document.querySelector('.btn-secondary');
if (resumeBtn) {
    resumeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Резюме недоступно. (кнопка на будущее)');
    });
}