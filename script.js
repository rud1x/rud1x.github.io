/* ========================================
   КОНФИГ
   ======================================== */
const CFG_URL = 'https://raw.githubusercontent.com/rud1x/rud1x/refs/heads/main/cfg.json';
const RELEASES_URL = 'https://raw.githubusercontent.com/rud1x/rud1x/refs/heads/main/releases.json';
const CFG_CACHE_KEY = 'gh_stats_cache';
const CFG_CACHE_TTL = 5 * 60 * 1000;
const GITHUB_PROFILE = 'https://github.com/rud1x?tab=repositories';

/* ========================================
   ДАННЫЕ ПРОЕКТОВ
   ======================================== */
const projectsData = [
    {
        id: 1,
        title: 'NeoShell',
        description: 'Управляй своим ПК с телефона через Wi-Fi',
        category: 'code',
        icon: '💻',
        image: 'https://i.ibb.co/gL2pJL2m/image.png',
        link: 'https://github.com/rud1x/NeoShell',
        detailsUrl: 'projects/neoshell.html'
    },
    {
        id: 2,
        title: 'Серийчик Бот',
        description: 'Игровой Telegram-бот с экономикой и системой уровней',
        category: 'telegram',
        icon: '🎲',
        image: 'https://i.ibb.co/k66xYQwj/IMG-20260409-190151-122.jpg',
        link: 'https://t.me/strikepet_bot',
        detailsUrl: 'projects/seriy4ik.html',
        year: 2024,
        stats: { users: 0 }
    },
    {
        id: 4,
        title: 'HuroBot',
        description: 'Open Source инструмент для автоматизации и OSINT',
        category: 'code',
        icon: '🤖',
        image: 'https://i.ibb.co/v08LpSt/IMG-20260409-190254-955.jpg',
        link: 'https://github.com/rud1x/HuroBot_tg',
        detailsUrl: 'projects/hurobot.html'
    },
    {
        id: 3,
        title: 'Comaru CardBot',
        description: 'Коллекционная карточная игра в Telegram',
        category: 'telegram',
        icon: '🃟',
        image: 'https://i.ibb.co/cStk7zqJ/dc-Se0.jpg',
        link: 'https://t.me/comaru_cardbot',
        detailsUrl: 'projects/comaru.html',
        year: 2024,
        stats: { users: 0 }
    },
    {
        id: 5,
        title: 'uHunt',
        description: 'Инструмент для поиска свободных username',
        category: 'telegram',
        icon: '✈️',
        image: 'https://i.ibb.co/67fCkYvk/Untitled-project-6.jpg',
        link: 'https://t.me/uHunt_bot',
        detailsUrl: 'projects/uhunt.html',
        year: 2026,
        stats: { users: 0 }
    },
    {
        id: 6,
        title: 'wexos',
        description: 'Многофункциональный юзербот на основе BusinessApi',
        category: 'telegram',
        icon: '⚙️',
        image: 'https://i.ibb.co/HpVYWpht/IMG-20260426-011158-447.jpg',
        link: 'https://t.me/wexosbot',
        detailsUrl: 'projects/wexos.html',
        year: 2026,
        stats: { users: 0 }
    },
    {
        id: 8,
        title: 'GitWid',
        description: 'Виджеты на основе Rainmeter для отображения вашей GitHub-статистики',
        category: 'code',
        icon: '💻',
        image: 'https://i.ibb.co/bZQm86c/Gemini-Generated-Image-bnpo6vbnpo6vbnpo-1.png',
        link: 'https://github.com/rud1x/GitWid',
        detailsUrl: 'projects/gitwid.html'
    },
    {
        id: 7,
        title: 'Nooke',
        description: 'Уютное Discord-сообщество для общения и игр',
        category: 'discord',
        icon: '🎮',
        image: 'https://i.ibb.co/PsPX5Z97/b3c5163a185008b1e6daf2fc83a4c1fb.png',
        link: 'https://discord.gg/WZgdVcemmk',
        detailsUrl: 'projects/nooke.html',
        year: 2024,
        stats: { users: 0 }
    },
    {
        id: 9,
        title: 'Luma Code',
        description: 'Discord-сообщество для разработчиков и не только',
        category: 'discord',
        icon: '💜',
        image: 'https://i.ibb.co/k2wwJBCY/luma-code-icon-1024.png',
        link: 'https://discord.gg/npqMCPzDeg',
        detailsUrl: 'projects/luma.html',
        year: 2026,
        stats: { users: 0 }
    },
    {
        id: 10,
        title: 'gitfetch',
        description: 'Минималистичная CLI-утилита для просмотра статистики GitHub в стиле fastfetch/neofetch',
        category: 'code',
        icon: '🐙',
        image: 'https://opengraph.githubassets.com/1/rud1x/gitfetch',
        link: 'https://github.com/rud1x/gitfetch',
        detailsUrl: 'projects/gitfetch.html'
    }
];

/* ========================================
   УТИЛИТЫ
   ======================================== */
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

function formatNumber(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1).replace('.0', '') + 'M';
    if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace('.0', '') + 'K';
    return n.toString();
}

/* ========================================
   GITHUB STATS
   ======================================== */
let githubStats = {};
let repoStars = {};
let allReleases = [];

async function loadGitHubStats() {
    try {
        const cached = sessionStorage.getItem(CFG_CACHE_KEY);
        if (cached) {
            const parsed = JSON.parse(cached);
            if (Date.now() - parsed.ts < CFG_CACHE_TTL) {
                githubStats = parsed.data;
                repoStars = parsed.data.repoStars || {};
                renderProjects(currentFilter);
                updateHeroStats(parsed.data);
                return;
            }
        }
    } catch (e) { /* ignore */ }

    try {
        let res;
        try {
            res = await fetch('cfg.json', { cache: 'no-store' });
            if (!res.ok) throw new Error('local fail');
        } catch {
            res = await fetch(CFG_URL, { cache: 'no-store' });
        }
        if (!res.ok) throw new Error('cfg.json недоступен');

        const data = await res.json();
        githubStats = data;
        repoStars = data.repoStars || {};

        sessionStorage.setItem(CFG_CACHE_KEY, JSON.stringify({
            ts: Date.now(),
            data
        }));

        console.log('[✓] GitHub stats загружены:', {
            repos: data.repos,
            totalStars: data.stars,
            repoCount: Object.keys(repoStars).length
        });

        renderProjects(currentFilter);
        updateHeroStats(data);
    } catch (e) {
        console.warn('[!] Не удалось загрузить cfg.json:', e.message);
        githubStats = {};
        repoStars = {};
        renderProjects(currentFilter);
    }
}

async function loadReleases() {
    try {
        let res;
        try {
            res = await fetch('releases.json', { cache: 'no-store' });
            if (!res.ok) throw new Error('local fail');
        } catch {
            res = await fetch(RELEASES_URL, { cache: 'no-store' });
        }
        if (!res.ok) throw new Error('releases.json недоступен');

        const data = await res.json();
        allReleases = data.releases || [];

        console.log('[✓] Релизы загружены:', allReleases.length);

        renderCareer();
    } catch (e) {
        console.warn('[!] Не удалось загрузить releases.json:', e.message);
        allReleases = [];
        renderCareer();
    }
}

function updateHeroStats(data) {
    const set = (id, val) => {
        const el = document.getElementById(id);
        if (el && val != null) el.textContent = val;
    };
    set('heroStatStars', data.stars);
    set('heroStatRepos', data.repos);
    set('heroStatCommits', data.totalCommits);
    set('heroStatFollowers', data.followers);
}

function getRepoFromLink(link) {
    if (!link) return null;
    const match = link.match(/github\.com\/([^/]+)\/([^/?#]+)/);
    if (!match) return null;
    return `${match[1]}/${match[2]}`;
}

/* ========================================
   ГИДРАТАЦИЯ ПРОЕКТА
   ======================================== */
function hydrateProject(project) {
    const repo = getRepoFromLink(project.link);
    if (!repo || !repoStars[repo]) return project;

    const gh = repoStars[repo];

    return {
        ...project,
        year: project.year ?? (gh.createdAt ? new Date(gh.createdAt).getFullYear() : undefined),
        stats: {
            ...project.stats,
            stars: gh.stars ?? project.stats?.stars ?? 0,
            forks: gh.forks ?? project.stats?.forks ?? 0
        },
        gh: {
            description: gh.description,
            homepage: gh.homepage,
            language: gh.language,
            topics: gh.topics || [],
            pushedAt: gh.pushedAt
        }
    };
}

/* ========================================
   СОРТИРОВКА
   ======================================== */
let currentSort = 'new';

function sortProjects(list, sort) {
    const copy = [...list];
    if (sort === 'new') {
        copy.sort((a, b) => (b.year || 0) - (a.year || 0));
    } else if (sort === 'popular') {
        copy.sort((a, b) => {
            const aScore = (a.stats?.stars || 0) * 100 + (a.stats?.users || 0);
            const bScore = (b.stats?.stars || 0) * 100 + (b.stats?.users || 0);
            return bScore - aScore;
        });
    } else if (sort === 'alpha') {
        copy.sort((a, b) => a.title.localeCompare(b.title, 'ru'));
    }
    return copy;
}

/* ========================================
   РЕНДЕР ПРОЕКТОВ
   ======================================== */
function renderProjects(filter = 'all') {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    let filtered = filter === 'all'
        ? projectsData
        : projectsData.filter(p => p.category === filter);

    filtered = filtered.map(hydrateProject);
    filtered = sortProjects(filtered, currentSort);

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="no-projects">
                ✨ Проектов в этой категории пока нет
            </div>
        `;
        return;
    }

    const currentYear = new Date().getFullYear();

    grid.innerHTML = filtered.map((project, index) => {
        const imageHtml = project.image
            ? `<img src="${project.image}" alt="${project.title}" loading="lazy">`
            : `<span class="project-placeholder">${project.icon}</span>`;

        const isNew = project.year === currentYear;
        const newBadge = isNew ? `<span class="badge-new">NEW</span>` : '';

        const starsCount = project.stats?.stars || 0;
        const forksCount = project.stats?.forks || 0;
        const usersCount = project.stats?.users || 0;

        const stars = starsCount > 0
            ? `<span class="stat-item"><i class="ph-fill ph-star"></i>${starsCount}</span>` : '';
        const forks = forksCount > 0
            ? `<span class="stat-item"><i class="ph-fill ph-git-fork"></i>${forksCount}</span>` : '';
        const users = usersCount > 0
            ? `<span class="stat-item"><i class="ph-fill ph-users"></i>${formatNumber(usersCount)}</span>` : '';
        const year = project.year
            ? `<span class="stat-item"><i class="ph-fill ph-calendar"></i>${project.year}</span>` : '';

        const statsRow = (stars || forks || users || year)
            ? `<div class="project-stats">${stars}${forks}${users}${year}</div>` : '';

        return `
            <div class="project-card" data-id="${project.id}" style="animation-delay: ${index * 0.06}s">
                <div class="project-img">
                    ${imageHtml}
                    ${newBadge}
                    <div class="project-hover-hint">Подробнее <i class="ph-fill ph-arrow-right"></i></div>
                </div>
                <div class="project-info">
                    <h3>${escapeHtml(project.title)}</h3>
                    <p>${escapeHtml(project.description)}</p>
                    ${statsRow}
                    <span class="project-tag">${getCategoryLabel(project.category)}</span>
                </div>
            </div>
        `;
    }).join('');

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function() {
            const id = this.dataset.id;
            const project = projectsData.find(p => p.id == id);
            if (project) openProjectModal(project);
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

/* ========================================
   ИСТОРИЯ ОБНОВЛЕНИЙ — КРУПНЫЙ ГОД
   ======================================== */
function renderCareer() {
    const container = document.getElementById('careerContent');
    if (!container) return;

    const events = allReleases.length > 0
        ? allReleases
        : (githubStats.timeline || []);

    if (events.length === 0) {
        container.innerHTML = `
            <div class="career-empty">
                <i class="ph-fill ph-clock"></i>
                <p>Пока нет публичных обновлений</p>
                <span>Релизы появятся здесь автоматически</span>
            </div>
        `;
        return;
    }

    const byYear = {};
    events.forEach(ev => {
        if (!ev.date) return;
        const year = new Date(ev.date).getFullYear();
        if (!byYear[year]) byYear[year] = [];
        byYear[year].push(ev);
    });

    const years = Object.keys(byYear).sort((a, b) => b - a);

    function formatDate(iso) {
        if (!iso) return '';
        const d = new Date(iso);
        const months = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн',
                       'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
        return `${d.getDate()} ${months[d.getMonth()]}`;
    }

    function pluralReleases(n) {
        const mod10 = n % 10;
        const mod100 = n % 100;
        if (mod10 === 1 && mod100 !== 11) return `${n} релиз`;
        if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${n} релиза`;
        return `${n} релизов`;
    }

    const yearsHtml = years.map(year => {
        const yearEvents = byYear[year];

        const rowsHtml = yearEvents.map(ev => {
            const title = escapeHtml(ev.title || ev.tag || 'Обновление');
            const url = ev.url || '#';
            const isPrerelease = ev.prerelease ? '<span class="career-row-badge">beta</span>' : '';

            return `
                <a href="${url}" target="_blank" class="career-row">
                    <span class="career-row-date">${formatDate(ev.date)}</span>
                    <span class="career-row-title">
                        ${title}
                        ${isPrerelease}
                    </span>
                    <i class="ph-fill ph-arrow-right career-row-arrow"></i>
                </a>
            `;
        }).join('');

        return `
            <div class="career-year">
                <div class="career-year-header">
                    <div class="career-year-num">${year}</div>
                    <div class="career-year-count">${pluralReleases(yearEvents.length)}</div>
                </div>
                <div class="career-row-container">
                    ${rowsHtml}
                </div>
            </div>
        `;
    }).join('');

    const moreHtml = `
        <div class="career-more">
            <a href="${GITHUB_PROFILE}" target="_blank" class="career-more-link">
                все релизы на GitHub
                <i class="ph-fill ph-arrow-up-right"></i>
            </a>
        </div>
    `;

    container.innerHTML = yearsHtml + moreHtml;
}

/* ========================================
   МОДАЛЬНОЕ ОКНО ПРОЕКТА
   ======================================== */
async function openProjectModal(project) {
    const modal = document.getElementById('projectModal');
    const content = document.getElementById('projectModalContent');
    if (!modal || !content) return;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    content.innerHTML = '<div class="modal-loader"><i class="ph-fill ph-circle-notch"></i></div>';

    try {
        const response = await fetch(project.detailsUrl);
        if (!response.ok) throw new Error('Не удалось загрузить');
        const html = await response.text();
        content.innerHTML = html;

        const repo = getRepoFromLink(project.link);
        if (repo && repoStars[repo]) {
            const gh = repoStars[repo];
            content.querySelectorAll('[data-gh]').forEach(el => {
                const key = el.dataset.gh;
                if (gh[key]) el.textContent = gh[key];
            });

            const topicsEl = content.querySelector('[data-gh-topics]');
            if (topicsEl && gh.topics?.length) {
                topicsEl.innerHTML = gh.topics
                    .map(t => `<span class="tag">${escapeHtml(t)}</span>`)
                    .join('');
            }
        }
    } catch (e) {
        content.innerHTML = `
            <div class="modal-error">
                <p>😔 Не удалось загрузить информацию о проекте</p>
                <a href="${project.link}" target="_blank" class="btn btn-primary">
                    открыть внешнюю ссылку
                </a>
            </div>
        `;
    }
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProjectModal();
});

document.addEventListener('click', (e) => {
    if (e.target.id === 'projectModal') closeProjectModal();
    if (e.target.closest('.modal-close')) closeProjectModal();
});

/* ========================================
   ДАТЫ
   ======================================== */
function getDaysSince(date) {
    const start = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/* ========================================
   ТЕМА
   ======================================== */
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

    const btn = document.getElementById('themeBtn');
    if (btn) {
        btn.addEventListener('click', function() {
            const isDark = document.body.classList.contains('dark');
            setTheme(isDark ? 'light' : 'dark');
        });
    }
}

/* ========================================
   ФИЛЬТРЫ И СОРТИРОВКА
   ======================================== */
let currentFilter = 'all';

document.addEventListener('click', function(e) {
    const filterBtn = e.target.closest('.filter-btn');
    if (filterBtn) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        filterBtn.classList.add('active');
        currentFilter = filterBtn.dataset.filter;
        renderProjects(currentFilter);
        return;
    }

    const sortBtn = e.target.closest('.sort-btn');
    if (sortBtn) {
        document.querySelectorAll('.sort-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        sortBtn.classList.add('active');
        currentSort = sortBtn.dataset.sort;
        renderProjects(currentFilter);
    }
});

/* ========================================
   ПАСХАЛКА
   ======================================== */
(function initKonami() {
    const code = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'b', 'a'
    ];
    let position = 0;

    document.addEventListener('keydown', (e) => {
        const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
        if (key === code[position]) {
            position++;
            if (position === code.length) {
                activateEasterEgg();
                position = 0;
            }
        } else {
            position = 0;
        }
    });

    function activateEasterEgg() {
        const body = document.body;
        body.classList.toggle('rainbow-mode');

        if (body.classList.contains('rainbow-mode')) {
            console.log('%c🌈 РАДУЖНЫЙ РЕЖИМ АКТИВИРОВАН 🌈', 'font-size:20px; color:#ff00ff; font-weight:bold;');
            console.log('%cНайди ещё секреты 👀', 'color:#00ffff; font-size:14px;');
        } else {
            console.log('%cРежим выключен', 'color:#888;');
        }
    }
})();

/* ========================================
   ИНИЦИАЛИЗАЦИЯ
   ======================================== */
document.addEventListener('DOMContentLoaded', function() {
    currentFilter = 'all';
    currentSort = 'new';

    renderProjects('all');
    loadGitHubStats();
    loadReleases();

    const daysEl = document.getElementById('codingDays');
    if (daysEl) daysEl.textContent = getDaysSince('2026-04-06');

    initTheme();

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
        sectionObserver.observe(el);
    });
});

/* ========================================
   РАДАР НАВЫКОВ
   ======================================== */
const radarData = [
    {
        id: 0,
        label: 'Python',
        shortLabel: 'Python',
        level: 0.85,
        skills: [
            { name: 'Python', level: 'expert', desc: 'боты, парсеры, скрипты · 3 года' },
            { name: 'SQL', level: 'intermediate', desc: 'SQLite, запросы, схемы данных' },
            { name: 'Async / await', level: 'advanced', desc: 'асинхронные боты и парсеры' }
        ]
    },
    {
        id: 1,
        label: 'Bots',
        shortLabel: 'Bots',
        level: 0.9,
        skills: [
            { name: 'aiogram', level: 'advanced', desc: '6 ботов в проде' },
            { name: 'Telegram API', level: 'advanced', desc: 'userbot, business API' },
            { name: 'Discord.py', level: 'basic', desc: 'простые боты для сообществ' }
        ]
    },
    {
        id: 2,
        label: 'Frontend',
        shortLabel: 'Frontend',
        level: 0.6,
        skills: [
            { name: 'HTML / CSS', level: 'advanced', desc: 'вёрстка лендингов и ботов' },
            { name: 'JavaScript', level: 'basic', desc: 'базовые скрипты, DOM' },
            { name: 'Vue / React', level: 'learning', desc: 'только начал изучать' }
        ]
    },
    {
        id: 3,
        label: 'Tools',
        shortLabel: 'Tools',
        level: 0.75,
        skills: [
            { name: 'Git / GitHub', level: 'advanced', desc: 'командная работа, PR, Actions' },
            { name: 'Linux', level: 'advanced', desc: 'Arch, Debian, серверы' },
            { name: 'VS Code', level: 'expert', desc: 'основной редактор' }
        ]
    },
    {
        id: 4,
        label: 'Soft',
        shortLabel: 'Soft',
        level: 0.7,
        skills: [
            { name: 'Промт-инжиниринг', level: 'advanced', desc: 'работа с LLM в проектах' },
            { name: 'Английский', level: 'intermediate', desc: 'чтение доков, общение' },
            { name: 'Аналитика', level: 'intermediate', desc: 'разбор задач, планирование' }
        ]
    }
];

const RADAR_CENTER = 200;
const RADAR_MAX_R = 160;
const RADAR_ANGLES = [-90, -18, 54, 126, 198].map(deg => (deg * Math.PI) / 180);

function polarToCartesian(angle, radius) {
    return {
        x: RADAR_CENTER + radius * Math.cos(angle),
        y: RADAR_CENTER + radius * Math.sin(angle)
    };
}

function renderRadarPolygon() {
    const polygon = document.getElementById('radarPolygon');
    const pointsGroup = document.getElementById('radarPoints');
    if (!polygon || !pointsGroup) return;

    const points = radarData.map((cat, i) => {
        const angle = RADAR_ANGLES[i];
        const r = RADAR_MAX_R * cat.level;
        const { x, y } = polarToCartesian(angle, r);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');

    polygon.setAttribute('points', points);

    pointsGroup.innerHTML = radarData.map((cat, i) => {
        const angle = RADAR_ANGLES[i];
        const r = RADAR_MAX_R * cat.level;
        const { x, y } = polarToCartesian(angle, r);
        return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5" data-axis="${i}" />`;
    }).join('');

    pointsGroup.querySelectorAll('circle').forEach(c => {
        c.addEventListener('click', () => {
            activateRadarCategory(parseInt(c.dataset.axis));
        });
    });

    document.querySelectorAll('.radar-labels text').forEach(t => {
        t.addEventListener('click', () => {
            activateRadarCategory(parseInt(t.dataset.axis));
        });
    });
}

function activateRadarCategory(index) {
    document.querySelectorAll('.radar-tab').forEach(t => {
        t.classList.toggle('active', parseInt(t.dataset.axis) === index);
    });

    document.querySelectorAll('.radar-labels text').forEach(t => {
        t.classList.toggle('active', parseInt(t.dataset.axis) === index);
    });

    const list = document.getElementById('radarList');
    if (!list) return;

    const cat = radarData[index];
    list.innerHTML = cat.skills.map(s => `
        <div class="radar-item">
            <div class="radar-item-top">
                <span class="radar-item-name">${s.name}</span>
                <span class="radar-item-level ${s.level}">${s.level}</span>
            </div>
            <span class="radar-item-desc">${s.desc}</span>
        </div>
    `).join('');
}

function initRadar() {
    const wrap = document.querySelector('.radar-wrap');
    if (!wrap) return;

    const tabs = document.getElementById('radarTabs');
    if (tabs) {
        tabs.innerHTML = radarData.map((cat, i) => `
            <button class="radar-tab ${i === 0 ? 'active' : ''}" data-axis="${i}">${cat.shortLabel}</button>
        `).join('');

        tabs.querySelectorAll('.radar-tab').forEach(btn => {
            btn.addEventListener('click', () => {
                activateRadarCategory(parseInt(btn.dataset.axis));
            });
        });
    }

    renderRadarPolygon();
    activateRadarCategory(0);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                wrap.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(wrap);
}

/* ========================================
   ФОНОВЫЙ CANVAS
   ======================================== */
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

/* ========================================
   HERO 3D — мышь / палец / гироскоп
   ======================================== */
(function initHero3D() {
    const card = document.getElementById('heroCard');
    const wrap = document.querySelector('.hero-3d-wrap');
    if (!card || !wrap) return;

    const MAX_TILT = 8;
    const isTouch = window.matchMedia('(hover: none)').matches;

    if (!isTouch) {
        wrap.addEventListener('mousemove', (e) => {
            const rect = wrap.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            const tiltY = (x - 0.5) * 2 * MAX_TILT;
            const tiltX = -(y - 0.5) * 2 * MAX_TILT;

            card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
        });

        wrap.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
        return;
    }

    let tiltX = 0;
    let tiltY = 0;
    let gyroEnabled = false;
    let touchActive = false;

    function applyTilt() {
        card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    }

    function handleTouch(e) {
        if (!e.touches || !e.touches[0]) return;
        touchActive = true;
        const touch = e.touches[0];
        const rect = wrap.getBoundingClientRect();
        const x = (touch.clientX - rect.left) / rect.width;
        const y = (touch.clientY - rect.top) / rect.height;

        tiltY = (x - 0.5) * 2 * MAX_TILT;
        tiltX = -(y - 0.5) * 2 * MAX_TILT;
        applyTilt();
    }

    function resetTouch() {
        touchActive = false;
        if (!gyroEnabled) {
            tiltX = 0;
            tiltY = 0;
            applyTilt();
        }
    }

    wrap.addEventListener('touchstart', handleTouch, { passive: true });
    wrap.addEventListener('touchmove', handleTouch, { passive: true });
    wrap.addEventListener('touchend', resetTouch, { passive: true });
    wrap.addEventListener('touchcancel', resetTouch, { passive: true });

    function handleOrientation(e) {
        if (!gyroEnabled || touchActive) return;

        const beta = e.beta || 0;
        const gamma = e.gamma || 0;

        tiltY = Math.max(-MAX_TILT, Math.min(MAX_TILT, gamma / 4));
        tiltX = Math.max(-MAX_TILT, Math.min(MAX_TILT, -beta / 4));
        applyTilt();
    }

    function requestGyro() {
        if (typeof DeviceOrientationEvent !== 'undefined' &&
            typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then(state => {
                    if (state === 'granted') {
                        gyroEnabled = true;
                        window.addEventListener('deviceorientation', handleOrientation);
                    }
                })
                .catch(() => { /* тихо игнорим */ });
        } else {
            gyroEnabled = true;
            window.addEventListener('deviceorientation', handleOrientation);
        }
    }

    document.addEventListener('touchstart', function once() {
        requestGyro();
        document.removeEventListener('touchstart', once);
    }, { once: true, passive: true });
})();

/* ========================================
   ОБО МНЕ — анимация цифры
   ======================================== */
(function initAboutAnim() {
    const num = document.getElementById('aboutNum');
    const caption = document.getElementById('aboutCaption');
    const block = document.getElementById('aboutAnim');
    if (!num || !block) return;

    function countUp(el, target, duration = 1200) {
        const startTime = performance.now();

        function tick(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

            el.textContent = Math.round(eased * target);

            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                el.textContent = target;
            }
        }

        requestAnimationFrame(tick);
    }

    function play() {
        num.textContent = '0';
        if (caption) caption.classList.remove('visible');

        countUp(num, 14, 1200);

        setTimeout(() => {
            if (caption) caption.classList.add('visible');
        }, 500);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                play();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    observer.observe(block);
})();

/* ========================================
   РАДАР — инициализация при загрузке
   ======================================== */
document.addEventListener('DOMContentLoaded', initRadar);