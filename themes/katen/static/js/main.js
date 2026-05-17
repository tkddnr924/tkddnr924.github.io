/* Katen Theme - main.js */

// ---- Hero Slider ----
(function () {
  const slider = document.getElementById('hero-slider');
  if (!slider) return;

  const slides = slider.querySelectorAll('.hero-slide');
  const dotsContainer = document.getElementById('slider-dots');
  let current = 0;
  let timer;

  if (!slides.length) return;

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Slide ' + (i + 1));
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(index) {
    slides[current].style.display = 'none';
    dotsContainer.children[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].style.display = 'flex';
    dotsContainer.children[current].classList.add('active');
    resetTimer();
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 5000);
  }

  document.getElementById('slider-prev')?.addEventListener('click', () => goTo(current - 1));
  document.getElementById('slider-next')?.addEventListener('click', () => goTo(current + 1));

  // Init
  slides[0].style.display = 'flex';
  resetTimer();
})();

// ---- Search ----
(function () {
  const overlay   = document.getElementById('search-overlay');
  const input     = document.getElementById('search-input');
  const results   = document.getElementById('search-results');
  const empty     = document.getElementById('search-empty');
  const noResult  = document.getElementById('search-no-result');
  const openBtns  = document.querySelectorAll('[data-search-open]');

  if (!overlay) return;

  let fuse = null;

  function openSearch() {
    overlay.classList.add('open');
    input.focus();
    if (!fuse) loadIndex();
  }

  function closeSearch() {
    overlay.classList.remove('open');
    input.value = '';
    results.innerHTML = '';
    empty.style.display = '';
    noResult.style.display = 'none';
  }

  function loadIndex() {
    fetch('/index.json')
      .then(r => r.json())
      .then(data => {
        fuse = new Fuse(data, {
          keys: ['title', 'content', 'summary', 'tags', 'categories'],
          threshold: 0.35,
          includeMatches: true,
          minMatchCharLength: 2,
        });
      })
      .catch(() => {});
  }

  function highlight(text, matches, key) {
    if (!matches) return escHtml(text);
    const m = matches.find(m => m.key === key);
    if (!m || !m.indices.length) return escHtml(text);
    const str = text || '';
    let out = '', last = 0;
    m.indices.forEach(([s, e]) => {
      out += escHtml(str.slice(last, s));
      out += '<mark>' + escHtml(str.slice(s, e + 1)) + '</mark>';
      last = e + 1;
    });
    out += escHtml(str.slice(last));
    return out;
  }

  function escHtml(s) {
    return (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function renderResults(items) {
    if (!items.length) {
      results.innerHTML = '';
      empty.style.display = 'none';
      noResult.style.display = '';
      return;
    }
    empty.style.display = 'none';
    noResult.style.display = 'none';
    results.innerHTML = items.slice(0, 8).map(({ item, matches }) => {
      const cat = (item.categories || [])[0] || '';
      return `<a class="search-result-item" href="${escHtml(item.url)}">
        <div class="search-result-title">${highlight(item.title, matches, 'title')}</div>
        <div class="search-result-meta">
          ${cat ? `<span>${escHtml(cat)}</span>` : ''}
          <span>${escHtml(item.date)}</span>
        </div>
        <div class="search-result-excerpt">${escHtml((item.summary || '').slice(0, 120))}</div>
      </a>`;
    }).join('');
  }

  input.addEventListener('input', () => {
    const q = input.value.trim();
    if (!q) {
      results.innerHTML = '';
      empty.style.display = '';
      noResult.style.display = 'none';
      return;
    }
    if (!fuse) return;
    renderResults(fuse.search(q));
  });

  openBtns.forEach(btn => btn.addEventListener('click', openSearch));

  overlay.addEventListener('click', e => { if (e.target === overlay) closeSearch(); });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeSearch();
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
  });
})();

// ---- Dark Mode ----
(function () {
  const btn = document.getElementById('dark-toggle');
  const html = document.getElementById('html-root');
  const icon = btn?.querySelector('i');

  const stored = localStorage.getItem('katen-dark');
  if (stored === 'true') {
    document.body.classList.add('dark-mode');
    if (icon) { icon.classList.replace('fa-moon', 'fa-sun'); }
  }

  btn?.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('katen-dark', isDark);
    if (icon) {
      icon.classList.toggle('fa-moon', !isDark);
      icon.classList.toggle('fa-sun', isDark);
    }
  });
})();
