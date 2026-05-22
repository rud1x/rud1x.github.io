let allPosts = [];
let filteredPosts = [];
let currentPage = 1;
let currentSearchQuery = "";
const postsPerPage = 6;

let originalMainContent = '';

function slugify(str) {
    const translitMap = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e',
        'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
        'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
        'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '',
        'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
    };
    
    let result = '';
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (translitMap[char]) {
            result += translitMap[char];
        } else if (/[a-zA-Z0-9]/.test(char)) {
            result += char;
        } else if (char === ' ') {
            result += '-';
        }
    }
    
    result = result.toLowerCase()
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
    
    return result || 'post';
}

async function getPostFiles() {
    try {
        // Убрали первый слэш, чтобы путь корректно подхватывал имя репозитория на GitHub Pages
        const response = await fetch('posts/list.txt?_=' + Date.now());
        if (!response.ok) throw new Error('list.txt not found');
        const text = await response.text();
        return text.split('\n')
            .map(line => line.trim())
            .filter(line => line && line.endsWith('.txt'));
    } catch (error) {
        console.error('Error loading list.txt:', error);
        return [];
    }
}

function parseFrontMatter(mdContent) {
    let content = mdContent.replace(/^\uFEFF/, '').trimStart();

    if (!content.startsWith('---')) {
        return { metadata: {}, content: mdContent };
    }

    const firstDashEnd = 3;
    const secondDashStart = content.indexOf('---', firstDashEnd);

    if (secondDashStart === -1) {
        return { metadata: {}, content: mdContent };
    }
    
    const yamlText = content.slice(firstDashEnd, secondDashStart).trim();
    const articleContent = content.slice(secondDashStart + 3).trim();

    const metadata = {};
    const lines = yamlText.split(/\r?\n/);

    for (const line of lines) {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
            let key = line.substring(0, colonIndex).trim();
            let value = line.substring(colonIndex + 1).trim();

            if ((value.startsWith('"') && value.endsWith('"')) || 
                (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }
            metadata[key] = value;
        }
    }

    return { metadata, content: articleContent };
}

async function loadPost(id) {
    try {
        let filename = id;
        if (!filename.endsWith('.txt')) {
            filename += '.txt';
        }

        const response = await fetch(`posts/${filename}?_=${Date.now()}`);
        
        if (!response.ok) {
            throw new Error(`Статус сервера: ${response.status} ${response.statusText}`);
        }
        const mdContent = await response.text();
        const { metadata, content } = parseFrontMatter(mdContent);
        
        if (!metadata || !metadata.title) {
            throw new Error("Не удалось распарсить 'title:' в метаданных.");
        }
        
        const cleanId = id.replace('.txt', '');
        const dateMatch = cleanId.match(/^(\d{4}-\d{2}-\d{2})/);
        let dateStr = dateMatch ? dateMatch[1] : "";
        
        let formattedDate = "Без даты";
        if (dateStr) {
            const [year, month, day] = dateStr.split('-');
            const months = [
                "января", "февраля", "марта", "апреля", "мая", "июня",
                "июля", "августа", "сентября", "октября", "ноября", "декабря"
            ];
            formattedDate = `${parseInt(day)} ${months[parseInt(month) - 1]} ${year} г.`;
        }

        const postSlug = slugify(cleanId.replace(/^\d{4}-\d{2}-\d{2}-/, ''));

        return {
            id: cleanId,
            slug: postSlug,
            title: metadata.title,
            excerpt: metadata.excerpt || "Описание статьи отсутствует...",
            category: metadata.category || "Заметки",
            date: formattedDate,
            rawDate: dateStr,
            content: content
        };
    } catch (error) {
        console.error(`[Блог] Ошибка загрузки поста (${id}):`, error.message);
        
        return {
            id: id,
            title: "⚠️ Статья недоступна",
            excerpt: `Ошибка: ${error.message}`,
            category: "error",
            date: "--.--.----",
            rawDate: "",
            content: "Не удалось загрузить содержимое статьи."
        };
    }
}

function getCategoryLabel(cat) {
    const map = { dev: "Разработка", bots: "Боты & API", life: "Инди-мысли", opensource: "Open Source", tutorial: "Туториал", meta: "О блоге" };
    return map[cat] || cat;
}

function applySearch() {
    let filtered = [...allPosts];
    if (currentSearchQuery && currentSearchQuery.trim() !== "") {
        const query = currentSearchQuery.toLowerCase().trim();
        filtered = filtered.filter(p => p.title.toLowerCase().includes(query) || p.excerpt.toLowerCase().includes(query));
    }
    filtered.sort((a, b) => new Date(b.rawDate) - new Date(a.rawDate));
    filteredPosts = filtered;
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

function highlightText(text, query) {
    if (!query || query.trim() === "") return escapeHtml(text);
    const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
    return escapeHtml(text).replace(regex, `<mark>$1</mark>`);
}

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function renderPosts() {
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;
    
    const start = (currentPage - 1) * postsPerPage;
    const paginatedPosts = filteredPosts.slice(start, start + postsPerPage);
    const grid = document.getElementById('postsGrid');
    if (!grid) return;
    
    const existingInfo = document.querySelector('.search-result-info');
    if (existingInfo) existingInfo.remove();
    
    if (currentSearchQuery && currentSearchQuery.trim() !== "") {
        const infoDiv = document.createElement('div');
        infoDiv.className = 'search-result-info';
        infoDiv.innerHTML = `<i class="ph-fill ph-magnifying-glass"></i> Найдено ${filteredPosts.length} статей по запросу "${escapeHtml(currentSearchQuery)}"`;
        const searchWrapper = document.querySelector('.search-wrapper');
        if (searchWrapper && !document.querySelector('.search-result-info')) {
            searchWrapper.insertAdjacentHTML('afterend', infoDiv.outerHTML);
        }
    }
    
    if (paginatedPosts.length === 0) {
        grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding: 2rem;"><i class="ph-fill ph-magnifying-glass" style="font-size: 2.5rem; color: var(--gray); margin-bottom: 0.8rem; display: block;"></i><div>Ничего не найдено</div><div style="color: var(--gray); font-size: 0.8rem;">Попробуйте изменить запрос</div></div>`;
        document.getElementById('paginationControls').innerHTML = '';
        return;
    }
    
    const query = currentSearchQuery;
    grid.innerHTML = paginatedPosts.map(post => `
        <div class="post-card" data-slug="${post.slug}">
            <div class="post-content">
                <div class="post-meta">
                    <span>${post.date}</span>
                    <span class="post-category">${getCategoryLabel(post.category)}</span>
                </div>
                <h3 class="post-title">${query ? highlightText(post.title, query) : escapeHtml(post.title)}</h3>
                <p class="post-excerpt">${query ? highlightText(post.excerpt, query) : escapeHtml(post.excerpt)}</p>
                <div class="read-more">Читать заметку <i class="ph-fill ph-arrow-right"></i></div>
            </div>
        </div>
    `).join('');
    
    document.querySelectorAll('.post-card').forEach(card => {
        card.addEventListener('click', () => openPostBySlug(card.dataset.slug));
    });
    
    renderPagination(totalPages);
}

function renderPagination(totalPages) {
    const paginationDiv = document.getElementById('paginationControls');
    if (!paginationDiv) return;
    if (totalPages <= 1) { paginationDiv.innerHTML = ''; return; }
    
    let btns = '';
    for (let i = 1; i <= totalPages; i++) {
        btns += `<button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }
    paginationDiv.innerHTML = btns;
    
    document.querySelectorAll('.page-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentPage = parseInt(btn.dataset.page);
            renderPosts();
            window.scrollTo({ top: 400, behavior: 'smooth' });
        });
    });
}

function setTheme(theme) {
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
    
    const cornerBtn = document.getElementById('cornerThemeBtn');
    if (cornerBtn) {
        const icon = cornerBtn.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'ph-fill ph-moon' : 'ph-fill ph-sun';
        }
    }
    
    const canvas = document.getElementById('bgCanvas');
    if (canvas) canvas.style.opacity = theme === 'dark' ? '0.12' : '0.06';
}

function showAboutPage() {
    const container = document.querySelector('.container');
    const aboutHTML = `
        <header class="main-header"><div class="nav-group"><nav class="main-nav"><a href="/" class="nav-item" id="navPortfolio">Портфолио</a><a href="/blog/" class="nav-item active" id="navBlog">Блог</a></nav><button id="themeToggle" class="theme-btn"><i class="ph-fill ph-moon"></i></button></div></header>
        <div class="about-content"><button id="backToBlogFromAbout" class="back-button">← Назад к блогу</button><div class="about-card"><div class="about-icon"><i class="ph-fill ph-book-open"></i></div><h1>О блоге</h1><p>rudix notes — место, где я делюсь опытом, инсайтами и историями из разработки</p><div class="about-grid"><div class="about-item"><i class="ph-fill ph-robot"></i><span>Telegram и Discord боты</span></div><div class="about-item"><i class="ph-fill ph-code"></i><span>Python, aiogram, asyncio</span></div><div class="about-item"><i class="ph-fill ph-github-logo"></i><span>Open Source проекты</span></div><div class="about-item"><i class="ph-fill ph-linux-logo"></i><span>Linux и серверы</span></div></div></div></div>
    `;
    container.innerHTML = aboutHTML;
    
    document.getElementById('backToBlogFromAbout')?.addEventListener('click', (e) => { e.preventDefault(); showBlogPage(); });
    document.getElementById('footerAboutLink')?.addEventListener('click', (e) => { e.preventDefault(); showAboutPage(); });
    document.getElementById('navPortfolio')?.addEventListener('click', (e) => { e.preventDefault(); window.location.href = '/'; });
    document.getElementById('themeToggle')?.addEventListener('click', () => {
        const newTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
        setTheme(newTheme);
    });
    
    document.title = 'О блоге | rudix';
    window.scrollTo({ top: 0 });
}

function showArticlePage(post) {
    const container = document.querySelector('.container');
    if (!originalMainContent) originalMainContent = container.innerHTML;
    
    const articleHTML = `
        <div style="height: 40px;"></div>
        <div class="post-detail-container">
            <button id="backToBlogBtn" class="back-button">← Назад ко всем записям</button>
            <article class="post-article">
                <h1>${escapeHtml(post.title)}</h1>
                <div class="post-detail-meta">
                    <span>${post.date}</span>
                    <span class="post-category">${getCategoryLabel(post.category)}</span>
                </div>
                <div id="postDetailContent" class="post-content-markdown"></div>
            </article>
        </div>
    `;
    
    container.innerHTML = articleHTML;
    
    if (typeof marked !== 'undefined') {
        marked.setOptions({
            breaks: true,
            gfm: true,
            headerIds: false,
            mangle: false,
            sanitize: false
        });
        document.getElementById('postDetailContent').innerHTML = marked.parse(post.content);
    } else {
        document.getElementById('postDetailContent').innerHTML = `<pre>${escapeHtml(post.content)}</pre>`;
    }
    
    const backBtn = document.getElementById('backToBlogBtn');
    if (backBtn) {
        backBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showBlogPage();
        });
    }
    
    document.title = `${post.title} | rudix`;
    window.scrollTo({ top: 0 });
    
    const newUrl = `${window.location.pathname.split('/').slice(0, -1).join('/')}/?post=${post.slug}`;
    window.history.pushState({ type: 'article', slug: post.slug }, '', newUrl);
}

function showBlogPage() {
    if (!originalMainContent) { window.location.reload(); return; }
    const container = document.querySelector('.container');
    container.innerHTML = originalMainContent;
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = currentSearchQuery;
        searchInput.addEventListener('input', handleSearch);
    }
    
    document.title = 'rudix | Блог разработчика';
    const baseUrl = window.location.pathname.split('/').slice(0, -1).join('/') || '/';
    window.history.pushState({ type: 'blog' }, '', baseUrl + (baseUrl.endsWith('/') ? '' : '/'));
    
    applySearch();
    renderPosts();
}

async function openPostBySlug(slug) {
    const post = allPosts.find(p => p.slug === slug);
    if (post) showArticlePage(post);
}

async function loadAllPosts() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    if (loadingIndicator) loadingIndicator.style.display = 'flex';
    
    const postFiles = await getPostFiles();
    if (postFiles.length === 0) {
        if (loadingIndicator) loadingIndicator.innerHTML = '⚠️ Создайте файл posts/list.txt со списком статей';
        return;
    }
    
    const promises = postFiles.map(file => loadPost(file));
    const posts = await Promise.all(promises);
    allPosts = posts.filter(post => post !== null);
    allPosts.sort((a, b) => new Date(b.rawDate) - new Date(a.rawDate));
    
    if (loadingIndicator) loadingIndicator.style.display = 'none';
    
    applySearch();
    renderPosts();
    
    if (!originalMainContent) {
        const container = document.querySelector('.container');
        originalMainContent = container.innerHTML;
    }
    
    const urlParams = new URLSearchParams(window.location.search);
    const postSlug = urlParams.get('post');
    if (postSlug) {
        const post = allPosts.find(p => p.slug === postSlug);
        if (post) showArticlePage(post);
    }
}

let searchTimeout;
function handleSearch(e) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        currentSearchQuery = e.target.value;
        currentPage = 1;
        applySearch();
        renderPosts();
    }, 300);
}

window.addEventListener('popstate', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postSlug = urlParams.get('post');
    if (postSlug) {
        const post = allPosts.find(p => p.slug === postSlug);
        if (post) showArticlePage(post);
        else showBlogPage();
    } else {
        showBlogPage();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    loadAllPosts();
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.addEventListener('input', handleSearch);
    
    document.getElementById('aboutBlogLink')?.addEventListener('click', (e) => { e.preventDefault(); showAboutPage(); });
    document.getElementById('footerAboutLink')?.addEventListener('click', (e) => { e.preventDefault(); showAboutPage(); });
    document.getElementById('blogHomeLink')?.addEventListener('click', (e) => { e.preventDefault(); showBlogPage(); });
    document.getElementById('homeLink')?.addEventListener('click', (e) => { e.preventDefault(); showBlogPage(); });
    document.getElementById('backToBlogBtn')?.addEventListener('click', () => showBlogPage());
    document.getElementById('backToBlogFromAbout')?.addEventListener('click', (e) => { e.preventDefault(); showBlogPage(); });
    
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    
    document.getElementById('navPortfolio')?.classList.remove('active');
    document.getElementById('navBlog')?.classList.add('active');
});

(function initCanvas() {
    const canvas = document.getElementById('bgCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    function draw() {
        if (!ctx) return;
        const w = canvas.width, h = canvas.height;
        ctx.clearRect(0, 0, w, h);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
        const step = 55;
        const offset = (Date.now() * 0.02) % step;
        for (let x = offset; x < w; x += step) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
        for (let y = offset; y < h; y += step) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
        requestAnimationFrame(draw);
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    draw();
})();

const cornerThemeBtn = document.getElementById('cornerThemeBtn');
if (cornerThemeBtn) {
    cornerThemeBtn.addEventListener('click', () => {
        const newTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
        setTheme(newTheme);
    });
}
