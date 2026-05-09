// ========== CANVAS АНИМАЦИЯ (АНИМИРОВАННАЯ СЕТКА) ==========
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
        
        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.21)';
        ctx.lineWidth = 1;
        
        const step = 50;
        const offset = (Date.now() * 0.05) % step;
        
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
    
    function handleResize() {
        resizeCanvas();
    }
    

    resizeCanvas();
    drawGrid();
    

    window.addEventListener('resize', handleResize);

    window.cleanupGridAnimation = function() {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
        window.removeEventListener('resize', handleResize);
    };
})();

// ========== ПОДКЛЮЧЕНИЕ PHOSPHOR ICONS ==========
const phosphorScript = document.createElement('script');
phosphorScript.src = 'https://unpkg.com/@phosphor-icons/web@2.1.2';
document.head.appendChild(phosphorScript);

// ========== ДОБАВЛЯЕМ ИКОНКИ В КОМПАКТНУЮ СЕТКУ (6 навыков в hero-about) ==========
function addIconsToCompactSkills() {
    const compactItems = document.querySelectorAll('.skill-compact-item');
    const iconsMap = {
        'Веб-разработка': 'ph-code',
        'UI/UX Дизайн': 'ph-palette',
        'Оптимизация': 'ph-gauge',
        'Управление': 'ph-users',
        'Аналитика': 'ph-chart-line',
        'Видеомонтаж': 'ph-video'
    };
    
    compactItems.forEach(item => {
        const span = item.querySelector('span');
        if (span) {
            const skillName = span.innerText;
            const iconName = iconsMap[skillName];
            if (iconName && !item.querySelector('i')) {
                const icon = document.createElement('i');
                icon.className = `ph-fill ${iconName}`;
                icon.style.cssText = 'font-size: 1.3rem; min-width: 28px;';
                item.insertBefore(icon, span);
                item.style.display = 'flex';
                item.style.alignItems = 'center';
                item.style.gap = '10px';
            }
        }
    });
}

// ========== ДОБАВЛЯЕМ ИКОНКИ ДЛЯ ВСЕХ НАВЫКОВ И ИНСТРУМЕНТОВ ==========
function addAllIcons() {
    // Карта иконок для НАВЫКОВ
    const skillsIconMap = {
        'Python': 'ph-fill ph-code',
        'Linux/Debian': 'ph-terminal',
        'Telegram API': 'ph-telegram-logo',
        'Промт-инжиниринг': 'ph-brain',
        'Git': 'ph-github-logo',
        'HTML/CSS': 'ph-browser',
        'Базы данных (SQLite)': 'ph-database',
        'Английский язык': 'ph-translate',
        'Аналитика': 'ph-chart-line'
    };
    
    // Карта иконок для ИНСТРУМЕНТОВ
    const toolsIconMap = {
        'VS Code': 'ph-code',
        'GitHub': 'ph-github-logo',
        'Terminal': 'ph-terminal',
        'FunPay': 'ph-coin',
        'ASF': 'ph-grains',
        'Arch Linux': 'ph-linux-logo'
    };
    
    // Добавляем иконки в НАВЫКИ
    const skillCards = document.querySelectorAll('#skills-tab .skill-card');
    skillCards.forEach(card => {
        const text = card.innerText.trim();
        const iconName = skillsIconMap[text];
        if (iconName && !card.querySelector('i')) {
            const originalText = card.innerText;
            card.innerHTML = '';
            const icon = document.createElement('i');
            icon.className = `ph-fill ${iconName}`;
            const span = document.createElement('span');
            span.innerText = originalText;
            card.appendChild(icon);
            card.appendChild(span);
            card.style.display = 'flex';
            card.style.alignItems = 'center';
            card.style.justifyContent = 'center';
            card.style.gap = '10px';
        }
    });
    
    // Добавляем иконки в ИНСТРУМЕНТЫ
    const toolCards = document.querySelectorAll('#tools-tab .skill-card');
    toolCards.forEach(card => {
        const text = card.innerText.trim();
        const iconName = toolsIconMap[text];
        if (iconName && !card.querySelector('i')) {
            const originalText = card.innerText;
            card.innerHTML = '';
            const icon = document.createElement('i');
            icon.className = `ph-fill ${iconName}`;
            const span = document.createElement('span');
            span.innerText = originalText;
            card.appendChild(icon);
            card.appendChild(span);
            card.style.display = 'flex';
            card.style.alignItems = 'center';
            card.style.justifyContent = 'center';
            card.style.gap = '10px';
        }
    });
}

// ========== АНИМАЦИЯ ТОЛЬКО ДЛЯ КАРТОЧЕК В УКАЗАННОМ ТАБЕ ==========
function animateTabCards(tabId) {
    const tabContent = document.getElementById(tabId);
    if (!tabContent) return;
    
    const cards = tabContent.querySelectorAll('.skill-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'none';
        card.offsetHeight;
        setTimeout(() => {
            card.style.transition = 'all 0.4s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 60);
    });
}

// ========== ТАБЫ ДЛЯ НАВЫКОВ ==========
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;
        
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        btn.classList.add('active');
        document.getElementById(tabId).classList.add('active');
        
        addAllIcons();
        animateTabCards(tabId);
    });
});

// ========== ДАННЫЕ ПРОЕКТОВ ==========
const projectsData = [
    {
        id: 2,
        title: 'Nooke',
        description: 'Уютное Discord-сообщество для общения и игр',
        category: 'discord',
        icon: '🎮',
        fullInfo: 'Nooke — это пространство, где можно найти друзей для совместных игр, обсудить последние новости индустрии или просто приятно провести время в голосовых каналах. Сообщество активно развивается и поддерживает дружелюбную атмосферу.',
        image: 'https://i.ibb.co/PsPX5Z97/b3c5163a185008b1e6daf2fc83a4c1fb.png',
        link: 'https://discord.gg/WZgdVcemmk'
    },
    {
        id: 1,
        title: 'Серийчик Бот',
        description: 'Игровой Telegram-бот с экономикой и системой уровней',
        category: 'telegram',
        icon: '🎲',
        fullInfo: 'Бот предлагает увлекательную игровую механику с элементами RPG: сражайтесь с противниками, прокачивайте персонажа, зарабатывайте валюту и соревнуйтесь с друзьями в таблице лидеров.',
        image: 'https://i.ibb.co/k66xYQwj/IMG-20260409-190151-122.jpg',
        link: 'https://t.me/strikepet_bot'
    },
    {
        id: 3,
        title: 'Comaru CardBot',
        description: 'Коллекционная карточная игра в Telegram',
        category: 'telegram',
        icon: '🃟',
        fullInfo: 'Собирайте коллекцию карт, обменивайтесь ими с друзьями, улучшайте свои экземпляры и участвуйте в PvP-сражениях. Бот регулярно пополняется новыми картами и ивентами.',
        image: 'https://i.ibb.co/cStk7zqJ/dc-Se0.jpg',
        link: 'https://t.me/comaru_cardbot'
    },
    {
        id: 4,
        title: 'HuroBot',
        description: 'Open Source инструмент для автоматизации и OSINT',
        category: 'code',
        icon: '🤖',
        fullInfo: '**HuroBot** — мощный инструмент на Python для продвинутых пользователей Telegram. Он включает в себя модули для работы с медиа, OSINT-аналитики, автоматизации рассылок и многое другое. Проект с открытым исходным кодом.\n\n**Основные возможности:**\n• OSINT: сбор данных о пользователях, IP-адресах и доменах.\n• Автоматизация: рассылка сообщений, управление аккаунтами.\n• Утилиты: сокращение ссылок, экспорт чатов.\n• Медиа: автосохранение самоуничтожающихся файлов.',
        image: 'https://i.ibb.co/v08LpSt/IMG-20260409-190254-955.jpg',
        link: 'https://github.com/rud1x/HuroBot_tg'
    },
    {
        id: 5,
        title: 'uHunt',
        description: 'Инструмент для поиска свободных username',
        category: 'telegram',
        icon: '✈️',
        fullInfo: '',
        image: 'https://i.ibb.co/67fCkYvk/Untitled-project-6.jpg',
        link: 'https://t.me/uHunt_bot'
    },
    {
        id: 6,
        title: 'wexos',
        description: 'Многофункциональный  юзерюот на основе BusinessApi',
        category: 'telegram',
        icon: '✈️',
        fullInfo: '',
        image: 'https://i.ibb.co/HpVYWpht/IMG-20260426-011158-447.jpg',
        link: 'https://t.me/wexosbot'
    },
    {
        id: 7,
        title: 'NeoShell',
        description: 'Управляй своим ПК с телефона через Wi-Fi',
        category: 'code',
        icon: '✈️',
        fullInfo: '',
        image: 'https://i.ibb.co/gL2pJL2m/image.png',
        link: 'https://github.com/rud1x/NeoShell'
    }
];

// Функция для категорий (добавь перед renderProjects)
function getCategoryName(category) {
    const names = {
        'discord': 'Discord',
        'telegram': 'Telegram',
        'code': 'Open Source',
        'web': 'Веб-сайт',
        'app': 'Приложение',
        'design': 'Дизайн'
    };
    return names[category] || category;
}

// Функция рендера проектов
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
        grid.innerHTML = '<div class="no-projects">Проектов пока нет</div>';
        return;
    }
    
    grid.innerHTML = filtered.map((project) => {
        // Обработка изображения
        let imageHtml = '';
        if (project.image) {
            imageHtml = `<img 
                src="${project.image}" 
                alt="${project.title}"
                referrerpolicy="no-referrer"
                onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=\\'font-size: 4rem;\\'>${project.icon}</div>'"
                loading="lazy"
                style="width:100%; height:100%; object-fit:cover;"
            >`;
        } else {
            imageHtml = `<div style="font-size: 4rem; display: flex; align-items: center; justify-content: center; height: 100%;">${project.icon}</div>`;
        }
        
        return `
            <div class="project-card" data-id="${project.id}" data-link="${project.link || ''}">
                <div class="project-img">
                    ${imageHtml}
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <span class="project-tag">${getCategoryName(project.category)}</span>
                </div>
            </div>
        `;
    }).join('');
    
    // Добавляем обработчики кликов
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            const link = card.dataset.link;
            if (link) {
                window.open(link, '_blank');
            }
        });
    });
}

// ========== ФИЛЬТРАЦИЯ ПРОЕКТОВ ==========
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        renderProjects(filter);
    });
});

// ========== МОДАЛЬНОЕ ОКНО ==========
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.querySelector('.close');

function openModal(project) {
    modalBody.innerHTML = `
        <h3 style="margin-bottom: 1rem; font-size: 1.8rem;">${project.title}</h3>
        <div style="font-size: 5rem; text-align: center; margin: 1rem 0;">${project.icon}</div>
        <p style="color: #ccc; margin-bottom: 1rem; line-height: 1.6;">${project.fullInfo}</p>
        <button onclick="closeModal()" class="modal-close-btn" style="margin-top: 1rem; background: #fff; color: #000; border: none; padding: 12px 24px; cursor: pointer; border-radius: 30px; font-weight: bold;">Закрыть</button>
    `;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

if (closeBtn) closeBtn.onclick = closeModal;
window.onclick = (e) => {
    if (e.target === modal) closeModal();
};

// ========== ВЫПАДАЮЩЕЕ МЕНЮ КОНТАКТОВ ==========
const contactMenuBtn = document.getElementById('contactMenuBtn');
const contactDropdown = document.getElementById('contactDropdown');

if (contactMenuBtn && contactDropdown) {
    contactMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        contactDropdown.classList.toggle('show');
    });

    document.addEventListener('click', () => {
        contactDropdown.classList.remove('show');
    });

    contactDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// ========== КНОПКА В ОБЪЕДИНЁННОМ БЛОКЕ ==========
const heroContactBtn = document.getElementById('heroContactBtn');
const heroDropdown = document.getElementById('heroContactDropdown');

if (heroContactBtn && heroDropdown) {
    heroContactBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        heroDropdown.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
        if (!heroContactBtn.contains(e.target) && !heroDropdown.contains(e.target)) {
            heroDropdown.classList.remove('show');
        }
    });
    
    heroDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// ========== ПЛАВНАЯ ПРОКРУТКА ==========
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ========== РАСЧЁТ ВОЗРАСТА ==========
function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}

// Устанавливаем возраст (ЗАМЕНИ ДАТУ НА СВОЮ)
const ageElement = document.getElementById('age');
if (ageElement) {
    ageElement.textContent = calculateAge('2012-02-10');
}

// Вызов при загрузке
document.addEventListener('DOMContentLoaded', () => {
    updateHeroDescription();
});

// Запрет сохранения через контекстное меню
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => e.preventDefault());
});

// ========== ИНИЦИАЛИЗАЦИЯ ==========
renderProjects('all');
setTimeout(() => {
    addIconsToCompactSkills();
    addAllIcons();
    animateTabCards('skills-tab');
}, 200);

// ========== СКЕЛЕТОНЫ ДЛЯ ПРОЕКТОВ ==========
function createSkeletonProjects(count = 4) {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    
    // Очищаем грид
    grid.innerHTML = '';
    
    // Создаём скелетоны
    for (let i = 0; i < count; i++) {
        const skeleton = document.createElement('div');
        skeleton.className = 'project-card-skeleton';
        skeleton.innerHTML = `
            <div class="skeleton-img"></div>
            <div class="skeleton-info">
                <div class="skeleton-title"></div>
                <div class="skeleton-text"></div>
                <div class="skeleton-text" style="width: 60%;"></div>
                <div class="skeleton-tag"></div>
            </div>
        `;
        grid.appendChild(skeleton);
    }
}

// ========== УЛУЧШЕННАЯ ЗАГРУЗКА ИЗОБРАЖЕНИЙ ==========
function loadProjectImage(imgElement, src) {
    return new Promise((resolve, reject) => {
        const tempImg = new Image();
        
        tempImg.onload = () => {
            imgElement.src = src;
            imgElement.classList.add('loaded');
            imgElement.parentElement.classList.add('loaded');
            imgElement.parentElement.classList.remove('loading');
            resolve();
        };
        
        tempImg.onerror = () => {
            // Показываем эмодзи при ошибке
            const parent = imgElement.parentElement;
            parent.classList.remove('loading');
            parent.innerHTML = `<div style="font-size: 4rem; display: flex; align-items: center; justify-content: center; height: 100%;">${imgElement.dataset.fallback || '🖼️'}</div>`;
            reject();
        };
        
        imgElement.parentElement.classList.add('loading');
        tempImg.src = src;
    });
}

// ========== МОДИФИЦИРОВАННАЯ ФУНКЦИЯ РЕНДЕРА ПРОЕКТОВ ==========
async function renderProjectsWithLoader(filter = 'all') {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    
    // Показываем скелетоны
    const filtered = filter === 'all' 
        ? projectsData 
        : projectsData.filter(p => p.category === filter);
    
    createSkeletonProjects(filtered.length || 4);
    
    // Небольшая задержка для плавности (имитация загрузки)
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Рендерим реальные проекты
    if (filtered.length === 0) {
        grid.innerHTML = '<div class="no-projects">Проектов пока нет</div>';
        attachProjectClickHandlers();
        return;
    }
    
    grid.innerHTML = filtered.map((project) => {
        const fallback = project.icon || '🖼️';
        
        return `
            <div class="project-card" data-id="${project.id}" data-link="${project.link || ''}">
                <div class="project-img loading">
                    ${project.image ? 
                        `<img 
                            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'/%3E"
                            data-src="${project.image}"
                            data-fallback="${fallback}"
                            alt="${project.title}"
                            class="lazy-img"
                        >` : 
                        `<div style="font-size: 4rem; display: flex; align-items: center; justify-content: center; height: 100%;">${fallback}</div>`
                    }
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <span class="project-tag">${getCategoryName(project.category)}</span>
                </div>
            </div>
        `;
    }).join('');
    
    // Загружаем изображения
    const lazyImages = grid.querySelectorAll('img[data-src]');
    const loadPromises = Array.from(lazyImages).map(img => {
        const src = img.dataset.src;
        if (src) {
            return loadProjectImage(img, src);
        }
        return Promise.resolve();
    });
    
    await Promise.allSettled(loadPromises);
    
    // Добавляем класс visible для анимации появления
    document.querySelectorAll('.project-card').forEach(card => {
        card.classList.add('visible');
    });
    
    // Добавляем обработчики кликов
    attachProjectClickHandlers();
}

// ========== ОБРАБОТЧИКИ КЛИКОВ НА ПРОЕКТЫ ==========
function attachProjectClickHandlers() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            const projectId = parseInt(card.dataset.id);
            const project = projectsData.find(p => p.id === projectId);
            
            if (project) {
                if (project.link) {
                    window.open(project.link, '_blank');
                } else {
                    openModal(project);
                }
            }
        });
    });
}

// ========== ЛЕНИВАЯ ЗАГРУЗКА ИЗОБРАЖЕНИЙ ПРИ СКРОЛЛЕ ==========
function initLazyLoading() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.dataset.src;
                
                if (src) {
                    loadProjectImage(img, src);
                }
                
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px',
        threshold: 0.1
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        observer.observe(img);
    });
}

// ========== ОБНОВЛЁННАЯ ИНИЦИАЛИЗАЦИЯ ==========
document.addEventListener('DOMContentLoaded', () => {
    // Инициализируем прелоадер
    initPageLoader();
    
    // Устанавливаем возраст
    const ageElement = document.getElementById('age');
    if (ageElement) {
        ageElement.textContent = calculateAge('2012-02-10');
    }
    
    // Рендерим проекты с анимацией загрузки
    renderProjectsWithLoader('all');
    
    // Инициализируем остальные компоненты
    setTimeout(() => {
        addIconsToCompactSkills();
        addAllIcons();
        animateTabCards('skills-tab');
    }, 200);
});

// ========== ОБНОВЛЯЕМ ФИЛЬТРАЦИЮ ==========
filterBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
        const filter = btn.dataset.filter;
        
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        await renderProjectsWithLoader(filter);
    });
});


// Как только страница готова, проявляем элементы с задержкой каждого следующего
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`; // Каждая карточка чуть позже предыдущей
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 50);
    });
});


function showDevEasterEgg() {
    const art = `
    ██████╗ ███████╗██╗   ██╗
    ██╔══██╗██╔════╝██║   ██║
    ██║  ██║█████╗  ██║   ██║
    ██║  ██║██╔══╝  ╚██╗ ██╔╝
    ██████╔╝███████╗ ╚████╔╝ 
    ╚═════╝ ╚══════╝  ╚═══╝  
    `;

    // Стили для заголовка
    const titleStyle = 'color: #2481cc; font-size: 20px; font-weight: bold; font-family: monospace;';
    const textStyle = 'color: #888; font-family: monospace; font-size: 12px;';
    const highlightStyle = 'color: #fff; font-weight: bold; background: #2481cc; padding: 2px 5px; border-radius: 3px;';

    console.log(`%c${art}`, titleStyle);
    console.log("%c--- SYSTEM STATUS: %cONLINE", textStyle, 'color: #00ff00; font-weight: bold;');
    console.log("%c--- ACCESS LEVEL:  %cROOT / DEVELOPER", textStyle, 'color: #ff0000; font-weight: bold;');
    console.log("\n%cИнтересно, что ты тут ищешь? %cСтукни в ЛС, если есть идеи для проектов!", textStyle, highlightStyle);
}

// Запускаем через секунду после загрузки, чтобы не мешать основным логам
setTimeout(showDevEasterEgg, 1000);

const menu = document.getElementById('custom-menu');
window.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    menu.style.left = `${e.clientX}px`;
    menu.style.top = `${e.clientY}px`;
    menu.classList.remove('hidden');
});

window.addEventListener('click', () => menu.classList.add('hidden'));


const deleteBtn = document.getElementById('delete-btn');
const confirmOverlay = document.getElementById('confirm-overlay');
const confirmText = document.getElementById('confirm-text');
const confirmYes = document.getElementById('confirm-yes');
const confirmNo = document.getElementById('confirm-no');

let confirmStep = 0;
const messages = [
    "Вы уверены?",
    "Вы ТОЧНО уверены?? Это действие нельзя отменить!",
    "ПОСЛЕДНЕЕ ПРЕДУПРЕЖДЕНИЕ. Сайт будет полностью стерт. Продолжить?"
];

// Открыть окно
deleteBtn.addEventListener('click', () => {
    confirmStep = 0;
    confirmText.innerText = messages[confirmStep];
    confirmOverlay.classList.remove('hidden');
});

// Кнопка "НЕТ" - закрываем всё
confirmNo.addEventListener('click', () => {
    confirmOverlay.classList.add('hidden');
});

// Кнопка "ДА"
confirmYes.addEventListener('click', () => {
    confirmStep++;
    
    if (confirmStep < messages.length) {
        confirmText.innerText = messages[confirmStep];
        // Можно добавить легкую встряску окна с каждым шагом
        document.querySelector('.confirm-box').style.transform = `scale(${1 + confirmStep * 0.1})`;
    } else {
        startSystemCollapse();
    }
});

function startSystemCollapse() {
    confirmOverlay.classList.add('hidden');
    document.body.classList.add('breaking-active');

    // Ломаем пузырьки (делаем их бешеными)
    if (typeof particles !== 'undefined') {
        particles.forEach(p => {
            p.speedX *= 25;
            p.speedY *= 25;
        });
    }

    // Через 10 секунд возвращаем всё в норму
    setTimeout(() => {
        document.body.classList.remove('breaking-active');
        // Возвращаем пузырьки к нормальной жизни
        if (typeof particles !== 'undefined') {
            particles.forEach(p => {
                p.speedX = (Math.random() - 0.5) * 2;
                p.speedY = (Math.random() - 0.5) * 2;
            });
        }
        alert("System restored. Files recovered.");
    }, 2000);
}

let boomCode = ['b', 'o', 'o', 'm'];
let boomIndex = 0;

window.addEventListener('keydown', (e) => {
    // Проверяем нажатую клавишу (приводим к нижнему регистру)
    if (e.key.toLowerCase() === boomCode[boomIndex]) {
        boomIndex++;
        
        // Если слово введено полностью
        if (boomIndex === boomCode.length) {
            activateBoomMode();
            boomIndex = 0; // Сбрасываем счетчик
        }
    } else {
        boomIndex = 0; // Если ошиблись в букве — сброс
    }
});

function activateBoomMode() {
    // 1. Создаем вспышку
    const flash = document.createElement('div');
    flash.className = 'boom-flash';
    document.body.appendChild(flash);
    flash.style.animation = 'flash-anim 0.5s ease-out';

    // 2. Включаем золотой режим
    document.body.classList.add('god-mode');

    // 3. Разгоняем пузырьки до предела
    if (typeof particles !== 'undefined') {
        particles.forEach(p => {
            p.speedX *= 15;
            p.speedY *= 15;
            p.color = '#ffd700'; // Меняем цвет пузырьков на золотой
        });
    }

    // 4. Добавляем уведомление в твою мини-консоль (если она есть)
    const logEl = document.getElementById('log-line');
    if (logEl) logEl.innerText = "> GOD_MODE: ACTIVATED";

    // Удаляем вспышку из DOM после анимации
    setTimeout(() => flash.remove(), 500);
}

// ========== БЕСКОНЕЧНАЯ КАРУСЕЛЬ (с клонами) ==========
function initTimelineCarousel() {
    const cardsContainer = document.getElementById('timelineCards');
    const leftBtn = document.getElementById('timelineLeft');
    const rightBtn = document.getElementById('timelineRight');
    const progressFill = document.getElementById('timelineProgressFill');
    const currentSpan = document.getElementById('timelineCurrentSlide');
    const totalSpan = document.getElementById('timelineTotalSlides');
    
    if (!cardsContainer) return;
    
    const originalCards = Array.from(document.querySelectorAll('.timeline-item'));
    const totalCards = originalCards.length;
    
    if (totalSpan) totalSpan.textContent = totalCards;
    
    // Клонируем карточки для бесконечности (по 2 клона с каждой стороны)
    originalCards.forEach(card => {
        const cloneLeft = card.cloneNode(true);
        const cloneRight = card.cloneNode(true);
        cardsContainer.appendChild(cloneRight);
        cardsContainer.insertBefore(cloneLeft, cardsContainer.firstChild);
    });
    
    const allCards = document.querySelectorAll('.timeline-item');
    const totalAllCards = allCards.length;
    let currentIndex = totalCards; // Стартуем с первой оригинальной карточки
    let cardWidth = allCards[0]?.offsetWidth || 280;
    let gap = 24;
    let isTransitioning = false;
    
    function updateCardWidth() {
        if (allCards[0]) {
            cardWidth = allCards[0].offsetWidth;
            const styles = window.getComputedStyle(cardsContainer);
            gap = parseInt(styles.gap) || 24;
        }
    }
    
    function updateCarousel(smooth = true) {
        updateCardWidth();
        const offset = -(currentIndex * (cardWidth + gap));
        
        if (smooth) {
            cardsContainer.style.transition = 'transform 0.4s ease-out';
        } else {
            cardsContainer.style.transition = 'none';
        }
        
        cardsContainer.style.transform = `translateX(${offset}px)`;
        
        // Обновляем счетчик (показываем реальную карточку)
        let realIndex = ((currentIndex - totalCards) % totalCards + totalCards) % totalCards;
        if (currentSpan) {
            currentSpan.textContent = realIndex + 1;
        }
        
        // Обновляем прогресс
        if (progressFill) {
            const progress = (realIndex / (totalCards - 1)) * 100;
            progressFill.style.width = `${progress}%`;
        }
    }
    
    function handleTransitionEnd() {
        isTransitioning = false;
        
        // Телепортация при достижении края
        if (currentIndex >= totalAllCards - totalCards) {
            // Дошли до конца клонов - телепортируемся в начало
            cardsContainer.style.transition = 'none';
            currentIndex = currentIndex - (totalAllCards - totalCards * 2);
            const offset = -(currentIndex * (cardWidth + gap));
            cardsContainer.style.transform = `translateX(${offset}px)`;
            // Форсируем перерисовку
            cardsContainer.offsetHeight;
        } else if (currentIndex <= totalCards - 1) {
            // Дошли до начала клонов - телепортируемся в конец
            cardsContainer.style.transition = 'none';
            currentIndex = currentIndex + (totalAllCards - totalCards * 2);
            const offset = -(currentIndex * (cardWidth + gap));
            cardsContainer.style.transform = `translateX(${offset}px)`;
            cardsContainer.offsetHeight;
        }
        
        // Возвращаем анимацию
        setTimeout(() => {
            cardsContainer.style.transition = 'transform 0.4s ease-out';
        }, 50);
    }
    
    function nextSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex++;
        updateCarousel(true);
    }
    
    function prevSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex--;
        updateCarousel(true);
    }
    
    cardsContainer.addEventListener('transitionend', handleTransitionEnd);
    
    if (leftBtn) leftBtn.addEventListener('click', prevSlide);
    if (rightBtn) rightBtn.addEventListener('click', nextSlide);
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateCarousel(false);
        }, 100);
    });
    
    // Инициализация
    setTimeout(() => {
        updateCarousel(false);
        setTimeout(() => {
            cardsContainer.style.transition = 'transform 0.4s ease-out';
        }, 50);
    }, 100);
}

// Запуск
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTimelineCarousel);
} else {
    initTimelineCarousel();
}


// ========== ЗАГРУЗКА GITHUB СТАТИСТИКИ ИЗ JSON ==========
async function loadGitHubStats() {
    const statsGrid = document.getElementById('githubStatsGrid');
    const updateInfo = document.getElementById('statsUpdateInfo');
    
    if (!statsGrid) return;
    
    try {
        const response = await fetch('https://raw.githubusercontent.com/rud1x/rud1x/main/cfg.json');
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const stats = await response.json();
        
        // Статистика для отображения в сетке 2×2
        const statsData = [
            { label: 'Репозитории', value: stats.repos, icon: 'ph-git-branch' },
            { label: 'Звёзды', value: stats.stars, icon: 'ph-star' },
            { label: 'Подписчики', value: stats.followers, icon: 'ph-users' },
            { label: 'Коммиты', value: stats.totalCommits || 0, icon: 'ph-git-commit' },
            { label: 'Pull Requests', value: stats.pullRequests || 0, icon: 'ph-git-pull-request' },
            { label: 'Issues', value: stats.issues || 0, icon: 'ph-bug' }
        ];
        
        // Рендерим карточки в стиле Codewars
        statsGrid.innerHTML = statsData.map(stat => `
            <div class="github-stat-card">
                <span class="stat-value">${stat.value}</span>
                <span class="stat-label">${stat.label}</span>
            </div>
        `).join('');
        
        // Информация об обновлении
        if (stats.updatedAt) {
            const updateDate = new Date(stats.updatedAt);
            updateInfo.innerHTML = `<i class="ph-fill ph-clock"></i> Обновлено: ${updateDate.toLocaleString('ru-RU')}`;
        } else {
            updateInfo.innerHTML = `<i class="ph-fill ph-check-circle"></i> Данные актуальны (автообновление каждый час)`;
        }
        
    } catch (error) {
        console.error('Ошибка загрузки GitHub статистики:', error);
        statsGrid.innerHTML = `
            <div class="github-stat-card" style="grid-column: 1/-1;">
                <i class="ph-fill ph-warning" style="font-size: 2rem; color: #ff4444;"></i>
                <p style="color: #888; margin-top: 0.5rem;">Не удалось загрузить статистику</p>
            </div>
        `;
    }
}
// Запускаем загрузку
document.addEventListener('DOMContentLoaded', () => {
    renderProjectsWithLoader('all');
    loadGitHubStats();
});

const fadeElements = document.querySelectorAll('.skill-card, .project-card, .github-stat-card');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.5s ease';
    fadeObserver.observe(el);
});

// ========== МИНИМАЛИСТИЧНЫЙ ПРЕЛОАДЕР ==========
function initSimpleLoader() {
    const loader = document.getElementById('simple-loader');
    const countSpan = document.getElementById('loader-count');
    
    if (!loader) return;
    
    let percent = 0;
    const timer = setInterval(() => {
        // Плавное увеличение процентов
        percent += Math.random() * 15 + 2;
        
        if (percent >= 100) {
            percent = 100;
            countSpan.textContent = percent;
            clearInterval(timer);
            
            // Плавно скрываем прелоадер
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        } else {
            countSpan.textContent = Math.floor(percent);
        }
    }, 120);
}

// Запускаем прелоадер
initSimpleLoader();


// ========== CODEWARS СТАТИСТИКА ==========
async function loadCodewarsStats() {
    const container = document.getElementById('codewars-stats');
    if (!container) return;
    
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
        
        // Прогресс до следующего ранга
        const rankScores = {
            '8 kyu': 20, '7 kyu': 76, '6 kyu': 229, '5 kyu': 643,
            '4 kyu': 1768, '3 kyu': 4829, '2 kyu': 13147, '1 kyu': 35759,
            '1 dan': 97225, '2 dan': 264302
        };
        const nextScore = rankScores[data.ranks.overall.name] || 100;
        const progressPercent = (data.ranks.overall.score / nextScore) * 100;
        
        // Определяем лучший язык
        let bestLanguage = '—';
        if (data.ranks.languages && Object.keys(data.ranks.languages).length > 0) {
            bestLanguage = Object.keys(data.ranks.languages)[0];
        }
        
        container.innerHTML = `
            <div class="github-stats-grid" style="margin-bottom: 1rem;">
                <div class="github-stat-card">
                    <span class="stat-value" style="color: ${rankColor}">${data.ranks.overall.name}</span>
                    <span class="stat-label">Ранг</span>
                </div>
                <div class="github-stat-card">
                    <span class="stat-value">${data.honor}</span>
                    <span class="stat-label">Очки чести</span>
                </div>
                <div class="github-stat-card">
                    <span class="stat-value">${data.codeChallenges.totalCompleted}</span>
                    <span class="stat-label">Решено задач</span>
                </div>
                <div class="github-stat-card">
                    <span class="stat-value">${bestLanguage}</span>
                    <span class="stat-label">Лучший язык</span>
                </div>
            </div>
            <div class="codewars-progress">
                <div class="progress-label">
                    <span>До следующего ранга (${getNextRankName(data.ranks.overall.name)})</span>
                    <span>${data.ranks.overall.score} / ${nextScore}</span>
                </div>
                <div class="progress-bar-bg">
                    <div class="progress-bar-fill" style="width: ${Math.min(progressPercent, 100)}%"></div>
                </div>
            </div>
            <div class="github-button-wrapper" style="margin-top: 1rem;">
                <a href="https://www.codewars.com/users/rud1x" target="_blank" class="github-profile-btn">
                    <i class="ph-fill ph-arrow-square-out"></i> Профиль на Codewars
                </a>
            </div>
        `;
        
    } catch (error) {
        console.error('Ошибка загрузки Codewars:', error);
        container.innerHTML = `
            <div class="github-stat-card" style="grid-column: 1/-1; text-align: center;">
                <i class="ph-fill ph-warning" style="font-size: 2rem; color: #ff4444;"></i>
                <p style="color: #888; margin-top: 0.5rem;">Не удалось загрузить статистику</p>
            </div>
        `;
    }
}

// Вспомогательная функция для получения следующего ранга
function getNextRankName(currentRank) {
    const rankOrder = ['8 kyu', '7 kyu', '6 kyu', '5 kyu', '4 kyu', '3 kyu', '2 kyu', '1 kyu', '1 dan', '2 dan'];
    const currentIndex = rankOrder.indexOf(currentRank);
    if (currentIndex !== -1 && currentIndex < rankOrder.length - 1) {
        return rankOrder[currentIndex + 1];
    }
    return 'дальше';
}

// Запускаем загрузку статистики
document.addEventListener('DOMContentLoaded', () => {
    loadCodewarsStats();
});

// ========== ЭКРАН ЗАГРУЗКИ С КНОПКОЙ GO ==========
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const goButton = document.getElementById('goButton');
    const mainContent = document.querySelector('.container');
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    
    if (!loadingScreen || !goButton) return;
    
    // Скрываем основной контент сначала
    if (mainContent) mainContent.style.opacity = '0';
    if (header) header.style.opacity = '0';
    if (footer) footer.style.opacity = '0';
    
    // Функция для показа сайта
    function revealSite() {
        // Скрываем экран загрузки
        loadingScreen.classList.add('fade-out');
        
        // Показываем контент
        if (mainContent) {
            mainContent.style.transition = 'opacity 0.6s ease';
            mainContent.style.opacity = '1';
            mainContent.classList.add('content-fade-in');
        }
        if (header) {
            header.style.transition = 'opacity 0.6s ease';
            header.style.opacity = '1';
        }
        if (footer) {
            footer.style.transition = 'opacity 0.6s ease';
            footer.style.opacity = '1';
        }
        
        // Удаляем экран из DOM после анимации
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 800);
    }
    
    // Событие клика по кнопке GO
    goButton.addEventListener('click', (e) => {
        e.stopPropagation();
        revealSite();
    });
    
    // Эффект пульсации колец при загрузке
    let pulseAngle = 0;
    function animatePulse() {
        const ring = document.querySelector('.go-ring');
        const innerRing = document.querySelector('.go-ring-inner');
        if (ring && innerRing && !loadingScreen.classList.contains('fade-out')) {
            pulseAngle += 0.03;
            const scale = 1 + Math.sin(pulseAngle) * 0.04;
            const innerScale = 1 + Math.sin(pulseAngle + Math.PI) * 0.03;
            ring.style.transform = `scale(${scale})`;
            innerRing.style.transform = `scale(${innerScale})`;
            requestAnimationFrame(() => setTimeout(animatePulse, 50));
        } else if (!loadingScreen.classList.contains('fade-out')) {
            requestAnimationFrame(() => setTimeout(animatePulse, 50));
        }
    }
    animatePulse();
}

// Запускаем экран загрузки
document.addEventListener('DOMContentLoaded', () => {
    initLoadingScreen();
});
