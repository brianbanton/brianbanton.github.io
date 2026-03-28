/*
  ================================================================
  main.js — FEED BUILDER + UI LOGIC
  ================================================================
  You shouldn't need to edit this file.
  All your content lives in posts.js.
  All your canvas sketches live in canvas.js.
  ================================================================
*/

/* ── LAYOUT RHYTHM ─────────────────────────────────────────────────
   Controls the organic scatter. Each entry = one post row.
   left: how far from the left edge (% works best)
   mt:   margin-top in px (vertical breathing room)

   The sequence loops if you have more posts than entries.
   Feel free to adjust these to change the scatter feel.
   ──────────────────────────────────────────────────────────────── */
const layout = [
  { left: '7%',  mt: 60 },
  { left: '54%', mt: 24 },
  { left: '20%', mt: 80 },
  { left: '60%', mt: 36 },
  { left: '4%',  mt: 64 },
  { left: '42%', mt: 28 },
  { left: '14%', mt: 72 },
  { left: '58%', mt: 48 },
  { left: '3%',  mt: 56 },
  { left: '47%', mt: 20 },
  { left: '16%', mt: 80 },
  { left: '53%', mt: 40 },
];

/* Size → pixel width */
const sizeMap = { sm: 220, md: 340, lg: 500, xl: 640 };

/* ── BUILD FEED ──────────────────────────────────────────────────── */
const feed = document.getElementById('feed');

posts.forEach((post, i) => {
  const cfg = layout[i % layout.length];
  const w   = sizeMap[post.size] || 340;

  // Row (one post per row to allow independent horizontal offset)
  const row = document.createElement('div');
  row.className    = 'post-row';
  row.style.marginTop = cfg.mt + 'px';

  // Card
  const card = document.createElement('div');
  card.className        = 'post';
  card.dataset.tags     = post.tags.join(',');
  card.dataset.type     = post.type;
  card.dataset.idx      = i;
  card.style.marginLeft = cfg.left;
  card.style.width      = w + 'px';
  card.style.transition = `opacity 0.55s ease ${(i % 5) * 0.07}s, transform 0.55s ease ${(i % 5) * 0.07}s`;

  // Media wrapper
  const media = document.createElement('div');
  media.className       = 'post-media';
  media.style.aspectRatio = post.aspect;

  if (post.type === 'image' || post.type === 'gif') {
    const img   = document.createElement('img');
    img.src     = post.src;
    img.loading = 'lazy';
    img.alt     = post.tags.join(', ');
    media.appendChild(img);

  } else if (post.type === 'video') {
    const vid         = document.createElement('video');
    vid.autoplay      = true;
    vid.muted         = true;
    vid.loop          = true;
    vid.playsInline   = true;
    vid.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
    const src  = document.createElement('source');
    src.src    = post.src;
    src.type   = post.src.endsWith('.mp4') ? 'video/mp4' : 'video/webm';
    vid.appendChild(src);
    media.appendChild(vid);

    const badge           = document.createElement('span');
    badge.className       = 'type-badge';
    badge.textContent     = '▶ video';
    media.appendChild(badge);

  } else if (post.type === 'canvas') {
    const cvs       = document.createElement('canvas');
    cvs.id          = post.canvasId;
    cvs.style.cssText = 'display:block;width:100%;';
    const [aw, ah]  = post.aspect.split('/').map(Number);
    cvs.width       = w;
    cvs.height      = Math.round(w * ah / aw);
    media.appendChild(cvs);

    const badge       = document.createElement('span');
    badge.className   = 'type-badge';
    badge.textContent = '⬡ live';
    media.appendChild(badge);
  }

  card.appendChild(media);

  // Tag strip
  const footer   = document.createElement('div');
  footer.className = 'post-footer';
  post.tags.forEach(t => {
    const tag         = document.createElement('span');
    tag.className     = 'tag';
    tag.textContent   = t;
    footer.appendChild(tag);
  });
  card.appendChild(footer);

  row.appendChild(card);
  feed.appendChild(row);
});

// Bottom spacer
const spacer        = document.createElement('div');
spacer.style.height = '120px';
feed.appendChild(spacer);

/* ── INIT CANVAS SKETCHES ────────────────────────────────────────── */
// Small delay lets the DOM settle before canvas sizing kicks in
setTimeout(() => {
  posts.forEach(p => {
    if (p.type === 'canvas' && p.canvasId && typeof p.init === 'function') {
      const cvs = document.getElementById(p.canvasId);
      if (cvs) p.init(cvs);
    }
  });
}, 80);

/* ── SCROLL REVEAL ───────────────────────────────────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity   = '1';
      e.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.05 });

document.querySelectorAll('.post').forEach(el => revealObserver.observe(el));

/* ── NAV BORDER ON SCROLL ────────────────────────────────────────── */
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

/* ── TAG FILTER ──────────────────────────────────────────────────── */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    document.querySelectorAll('.post').forEach(card => {
      const tags = (card.dataset.tags || '').split(',');
      const show = filter === 'all' || tags.includes(filter);
      const row  = card.closest('.post-row');
      card.classList.toggle('hidden', !show);
      if (row) row.style.display = show ? '' : 'none';
    });
  });
});

/* ── LIGHTBOX ────────────────────────────────────────────────────── */
const lightbox  = document.getElementById('lightbox');
const lbContent = document.getElementById('lbContent');
const lbTags    = document.getElementById('lbTags');

function closeLightbox() {
  lightbox.classList.remove('open');
  lbContent.innerHTML = '';
  lbTags.innerHTML    = '';
}

document.getElementById('lbClose').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

document.querySelectorAll('.post').forEach(card => {
  card.addEventListener('click', () => {
    const idx  = parseInt(card.dataset.idx, 10);
    const post = posts[idx];
    if (!post) return;

    lbContent.innerHTML = '';
    lbTags.innerHTML    = '';

    if (post.type === 'image' || post.type === 'gif') {
      const src = card.querySelector('img');
      if (src) {
        const el = document.createElement('img');
        el.src   = src.src;
        lbContent.appendChild(el);
      }

    } else if (post.type === 'video') {
      const el        = document.createElement('video');
      el.src          = post.src;
      el.autoplay     = true;
      el.controls     = true;
      el.loop         = true;
      el.style.cssText = 'max-width:90vw;max-height:86vh;display:block;';
      lbContent.appendChild(el);

    } else if (post.type === 'canvas') {
      lbContent.innerHTML = `
        <div style="
          color: #fff;
          font-family: 'Geist Mono','Courier New',monospace;
          font-size: 11px;
          padding: 48px 64px;
          border: 1px solid rgba(255,255,255,0.1);
          letter-spacing: 0.14em;
          text-align: center;
        ">
          INTERACTIVE — VIEW INLINE ↓
        </div>`;
    }

    post.tags.forEach(t => {
      const tag       = document.createElement('span');
      tag.className   = 'tag';
      tag.textContent = t;
      lbTags.appendChild(tag);
    });

    lightbox.classList.add('open');
  });
});
