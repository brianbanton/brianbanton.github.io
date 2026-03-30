/*
  ================================================================
  posts.js — ADD YOUR WORK HERE
  ================================================================

  Each entry in the `posts` array is one item in your feed.
  The page reads this file and builds everything automatically.

  ── POST TYPES ──────────────────────────────────────────────────

  STILL IMAGE (.jpg, .png, .webp)
  {
    type:   'image',
    tags:   ['branding', 'identity'],
    aspect: '4/3',          // width/height ratio
    size:   'md',           // sm=220px  md=340px  lg=500px  xl=640px
    src:    'assets/images/my-project.jpg'
  }

  VIDEO (.mp4, .webm)
  {
    type:   'video',
    tags:   ['motion'],
    aspect: '16/9',
    size:   'lg',
    src:    'assets/videos/my-reel.mp4'
  }

  ANIMATED GIF
  {
    type:   'gif',
    tags:   ['motion', 'branding'],
    aspect: '1/1',
    size:   'md',
    src:    'assets/images/my-loop.gif'
  }

  INTERACTIVE CANVAS
  {
    type:      'canvas',
    tags:      ['interactive'],
    aspect:    '4/3',
    size:      'md',
    canvasId:  'myUniqueCanvasId',     // must be unique per canvas
    init:      myCanvasFunction        // function defined in canvas.js
  }

  ── SIZE OPTIONS ─────────────────────────────────────────────────
  'sm'  →  220px wide
  'md'  →  340px wide
  'lg'  →  500px wide
  'xl'  →  640px wide

  ── ASPECT RATIO ─────────────────────────────────────────────────
  Any CSS aspect-ratio string:
  '1/1'   = square
  '4/3'   = landscape
  '3/4'   = portrait
  '16/9'  = widescreen
  '9/16'  = phone/story
  '2/3'   = tall portrait

  ── TAGS ─────────────────────────────────────────────────────────
  Use any strings. To add a new filter button for a tag, add a
  matching <button> in the nav inside index.html.

  ================================================================
*/

const posts = [

  {
    type:   'video',
    tags:   ['motion','type'],
    aspect: '9/16',
    size:   'lg',
    src:    'assets/videos/heterosis_overview.mp4'
  },

  // ── Replace these demo posts with your own work ──────────────

  {
    type:   'image',
    tags:   ['branding', 'identity'],
    aspect: '2/3',
    size:   'md',
    src:    'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=700&q=85'
    // ↑ replace with: src: 'assets/images/your-image.jpg'
  },
  {
    type:      'canvas',
    tags:      ['interactive'],
    aspect:    '4/3',
    size:      'sm',
    canvasId:  'c_flow',
    init:      initFlowField   // defined in canvas.js
  },
  {
    type:   'image',
    tags:   ['print', 'type'],
    aspect: '4/3',
    size:   'lg',
    src:    'assets/images/FF2012_slushies.jpg'
  },
  {
    type:   'video',
    tags:   ['motion'],
    aspect: '9/16',
    size:   'sm',
    src:    'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm'
    // ↑ replace with: src: 'assets/videos/your-video.mp4'
  },
  {
    type:   'image',
    tags:   ['branding'],
    aspect: '4/3',
    size:   'lg',
    src:    'assets/images/UAsock.png'
  },
  {
    type:      'canvas',
    tags:      ['interactive', 'motion'],
    aspect:    '3/2',
    size:      'md',
    canvasId:  'c_orbit',
    init:      initOrbit       // defined in canvas.js
  },
  {
    type:   'image',
    tags:   ['print', 'identity'],
    aspect: '16/9',
    size:   'lg',
    src:    'assets/images/IF25-06.jpg'
  },
  {
    type:   'video',
    tags:   ['type', 'motion'],
    aspect: '9/16',
    size:   'lg',
    src:    'assets/videos/wandl_36days.mp4'
  },
  {
    type:   'video',
    tags:   ['motion', 'type'],
    aspect: '1/1',
    size:   'lg',
    src:    'assets/videos/F_F_E_1.mp4'
  },
  {
    type:      'canvas',
    tags:      ['interactive', 'type'],
    aspect:    '3/2',
    size:      'lg',
    canvasId:  'c_type',
    init:      initTypeDist    // defined in canvas.js
  },
  {
    type:   'video',
    tags:   ['identity', 'branding'],
    aspect: '9/16',
    size:   'lg',
    src:    'assets/videos/Ameoba.mp4'
  },
  {
    type:   'image',
    tags:   ['print'],
    aspect: '4/3',
    size:   'lg',
    src:    'assets/images/IF_4.jpg'
  },

];
