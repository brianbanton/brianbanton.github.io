/*
  ================================================================
  canvas.js — INTERACTIVE CANVAS SKETCHES
  ================================================================

  Each function here powers one of the canvas posts in posts.js.
  To add your own canvas sketch:

  1. Write a function: function mySketch(canvas) { ... }
  2. Add a post entry in posts.js:
     { type:'canvas', canvasId:'myId', init: mySketch, ... }

  The `canvas` argument is the actual <canvas> DOM element.
  canvas.width and canvas.height are already set by main.js.
  ================================================================
*/


/* ── FLOW FIELD ────────────────────────────────────────────────────
   Particles driven by a sine-based noise field.
   Move your mouse over it — particles flee the cursor.
   ──────────────────────────────────────────────────────────────── */
function initFlowField(canvas) {
  const W   = canvas.width;
  const H   = canvas.height;
  const ctx = canvas.getContext('2d');
  let t  = 0;
  let mx = W / 2;
  let my = H / 2;

  const particles = Array.from({ length: 80 }, () => ({
    x:    Math.random() * W,
    y:    Math.random() * H,
    vx:   0,
    vy:   0,
    life: Math.random(),
  }));

  function noise(x, y, z) {
    return Math.sin(x * 1.3 + z) * Math.cos(y * 0.9 + z * 0.7) * 0.5
         + Math.sin(x * 0.7 - z * 0.4) * Math.sin(y * 1.5 + z) * 0.5;
  }

  canvas.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    mx = (e.clientX - r.left) * (W / r.width);
    my = (e.clientY - r.top)  * (H / r.height);
  });

  function draw() {
    ctx.fillStyle = 'rgba(17,17,17,0.18)';
    ctx.fillRect(0, 0, W, H);

    particles.forEach(p => {
      const angle = noise(p.x / 55, p.y / 55, t * 0.007) * Math.PI * 2;
      const dx    = p.x - mx;
      const dy    = p.y - my;
      const dist  = Math.sqrt(dx * dx + dy * dy);
      const rep   = dist < 50 ? ((50 - dist) / 50) * 2 : 0;

      p.vx += Math.cos(angle) * 0.4 + (dist < 50 ? (dx / dist) * rep * 0.6 : 0);
      p.vy += Math.sin(angle) * 0.4 + (dist < 50 ? (dy / dist) * rep * 0.6 : 0);
      p.vx *= 0.92;
      p.vy *= 0.92;
      p.x  += p.vx;
      p.y  += p.vy;
      p.life += 0.005;

      if (p.x < 0 || p.x > W || p.y < 0 || p.y > H) {
        p.x  = Math.random() * W;
        p.y  = Math.random() * H;
        p.vx = 0;
        p.vy = 0;
      }

      const alpha = 0.45 + Math.sin(p.life * 3) * 0.25;
      ctx.strokeStyle = `rgba(180,180,180,${alpha})`;
      ctx.lineWidth   = 0.8;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x - p.vx * 5, p.y - p.vy * 5);
      ctx.stroke();
    });

    t++;
    requestAnimationFrame(draw);
  }

  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, W, H);
  draw();
}


/* ── PARTICLE ORBIT ────────────────────────────────────────────────
   Dots orbit around your cursor in an ellipse.
   ──────────────────────────────────────────────────────────────── */
function initOrbit(canvas) {
  const W   = canvas.width;
  const H   = canvas.height;
  const ctx = canvas.getContext('2d');
  let mx = W / 2;
  let my = H / 2;
  let t  = 0;

  const particles = Array.from({ length: 120 }, () => ({
    angle:  Math.random() * Math.PI * 2,
    radius: 15 + Math.random() * Math.min(W, H) * 0.42,
    speed:  (Math.random() - 0.5) * 0.018 + 0.007,
    size:   Math.random() * 2 + 0.5,
    bright: Math.random() > 0.8,
  }));

  canvas.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    mx = (e.clientX - r.left) * (W / r.width);
    my = (e.clientY - r.top)  * (H / r.height);
  });

  function draw() {
    ctx.fillStyle = 'rgba(17,17,17,0.2)';
    ctx.fillRect(0, 0, W, H);

    particles.forEach(p => {
      p.angle += p.speed;
      const wobble = Math.sin(t * 0.02 + p.angle) * 7;
      const px = mx + Math.cos(p.angle) * (p.radius + wobble);
      const py = my + Math.sin(p.angle) * (p.radius + wobble) * 0.5;

      ctx.beginPath();
      ctx.arc(px, py, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.bright
        ? 'rgba(255,255,255,0.9)'
        : 'rgba(255,255,255,0.35)';
      ctx.fill();
    });

    // crosshair at cursor
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth   = 0.5;
    ctx.beginPath(); ctx.moveTo(mx - 20, my); ctx.lineTo(mx + 20, my); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(mx, my - 20); ctx.lineTo(mx, my + 20); ctx.stroke();

    t++;
    requestAnimationFrame(draw);
  }

  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, W, H);
  draw();
}


/* ── TYPE DISTORTION ───────────────────────────────────────────────
   Letters warp away from your cursor with a scanline effect.
   Change the word in the `letters` line below.
   ──────────────────────────────────────────────────────────────── */
function initTypeDist(canvas) {
  const W   = canvas.width;
  const H   = canvas.height;
  const ctx = canvas.getContext('2d');
  let mx    = W / 2;
  let my    = H / 2;
  let t     = 0;
  let hover = false;

  canvas.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    mx    = (e.clientX - r.left) * (W / r.width);
    my    = (e.clientY - r.top)  * (H / r.height);
    hover = true;
  });
  canvas.addEventListener('mouseleave', () => { hover = false; });

  // ── Change this word ──
  const letters = [...'STUDIO'];

  function draw() {
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, W, H);

    // scanlines
    for (let y = 0; y < H; y += 4) {
      ctx.fillStyle = 'rgba(0,0,0,0.06)';
      ctx.fillRect(0, y, W, 1);
    }

    const fs = Math.min(W * 0.14, 38);
    ctx.font = `500 ${fs}px 'Geist Mono','Courier New',monospace`;

    const totalW = letters.reduce((a, ch) => a + ctx.measureText(ch).width, 0);
    let curX = (W - totalW) / 2;

    letters.forEach((ch, i) => {
      const cw   = ctx.measureText(ch).width;
      const lx   = curX + cw / 2;
      const ly   = H / 2 + fs * 0.35;
      const dx   = lx - mx;
      const dy   = ly - my;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let offX = 0, offY = 0, sc = 1, rot = 0;

      if (hover && dist < 100) {
        const f = (100 - dist) / 100;
        offX = (dx / dist) * f * 16;
        offY = (dy / dist) * f * 10;
        sc   = 1 + f * 0.25;
        rot  = Math.atan2(dy, dx) * f * 0.12;
      }

      offY += Math.sin(t * 0.035 + i * 0.9) * 3.5;

      ctx.save();
      ctx.translate(lx + offX, ly + offY);
      ctx.rotate(rot);
      ctx.scale(sc, sc);
      ctx.font = `500 ${fs}px 'Geist Mono','Courier New',monospace`;
      // ghost / shadow
      ctx.fillStyle = 'rgba(255,255,255,0.07)';
      ctx.fillText(ch, 2, 2);
      // main letter
      ctx.fillStyle = 'rgba(255,255,255,0.88)';
      ctx.fillText(ch, 0, 0);
      ctx.restore();

      curX += cw;
    });

    t++;
    requestAnimationFrame(draw);
  }

  draw();
}
