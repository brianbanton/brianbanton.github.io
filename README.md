# Visual Portfolio

A single-scroll visual blog for graphic design and motion work.  
Supports images, videos, GIFs, and interactive canvas sketches in an organic scattered layout.

---

## Folder structure

```
portfolio/
├── index.html          ← page structure, nav, footer
├── css/
│   └── style.css       ← all styles
├── js/
│   ├── posts.js        ← YOUR CONTENT GOES HERE
│   ├── canvas.js       ← interactive canvas sketches
│   └── main.js         ← feed builder + UI logic (don't need to edit)
├── assets/
│   ├── images/         ← put your .jpg .png .webp .gif files here
│   └── videos/         ← put your .mp4 .webm files here
└── README.md
```

---

## How to add your work

Open `js/posts.js` and add entries to the `posts` array.

### Still image
```js
{
  type:   'image',
  tags:   ['branding', 'identity'],
  aspect: '4/3',
  size:   'md',
  src:    'assets/images/my-project.jpg'
}
```

### Video
```js
{
  type:   'video',
  tags:   ['motion'],
  aspect: '16/9',
  size:   'lg',
  src:    'assets/videos/my-reel.mp4'
}
```

### Animated GIF
```js
{
  type:   'gif',
  tags:   ['motion'],
  aspect: '1/1',
  size:   'md',
  src:    'assets/images/my-loop.gif'
}
```

### Interactive canvas
```js
{
  type:     'canvas',
  tags:     ['interactive'],
  aspect:   '4/3',
  size:     'md',
  canvasId: 'myUniqueId',
  init:     myCanvasFunction   // write the function in canvas.js
}
```

### Size options
| Value | Width  |
|-------|--------|
| `sm`  | 220px  |
| `md`  | 340px  |
| `lg`  | 500px  |
| `xl`  | 640px  |

### Aspect ratio
Any CSS ratio string: `'1/1'` `'4/3'` `'3/4'` `'16/9'` `'9/16'` `'2/3'`

---

## Customise

| What | Where |
|------|-------|
| Your name | `index.html` — the `<a class="nav-name">` and `<footer>` |
| Email | `index.html` — footer `<a href="mailto:...">` |
| Filter buttons | `index.html` — add `<button class="filter-btn" data-filter="yourtag">` in the nav |
| Scatter layout | `js/main.js` — the `layout` array (left %, margin-top) |
| Colors / fonts | `css/style.css` — `:root` variables |
| Canvas word | `js/canvas.js` — `initTypeDist`, change the `letters` array |

---

## Deploy to GitHub Pages

```bash
# 1. Create a new repo on github.com, then:
git init
git add .
git commit -m "init"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main

# 2. On GitHub: Settings → Pages → Source → main branch → / (root) → Save
# Your site will be live at: https://YOUR_USERNAME.github.io/YOUR_REPO
```

---

## Running locally

Just open `index.html` in your browser — no build step, no dependencies.

> **Note:** Videos and canvas sketches work best when served over HTTP  
> (not `file://`). If videos don't play locally, use a simple server:
>
> ```bash
> # Python
> python3 -m http.server 8000
>
> # Node (if you have npx)
> npx serve .
> ```
> Then open `http://localhost:8000`
