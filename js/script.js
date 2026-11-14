(() => {
  'use strict';

  /* ---------- Translations ---------- */
  const T = {
    en: {
      title: 'Training', add: 'Add content', remove: 'Remove content', lang: 'العربية',
      update: 'Update', rights: 'All rights reserved', sectionTitle: 'HTML, CSS & JavaScript',
      menu: ['Dashboard','HTML Editor','CSS Styles','JS Console','Components','Templates','Snippets','Projects','Live Preview','Responsive Design','Color Palette','Typography','Animations','Debugger','Settings'],
      html1: 'HTML (HyperText Markup Language) is the skeleton of every web page. It describes the structure of a document using elements such as headings, paragraphs, lists, links, images, forms and tables, so that browsers, search engines and assistive technologies all understand what each part of the page means.',
      html2: 'Modern HTML5 adds semantic elements like header, nav, main, section, article and footer, along with native audio, video and canvas support. Writing meaningful markup improves accessibility, search visibility and maintainability, and it is the foundation on which styling and behaviour are built.',
      css1: 'CSS (Cascading Style Sheets) controls how HTML looks: colours, fonts, spacing, borders, backgrounds and layout. Selectors target elements, and the cascade, specificity and inheritance decide which rule wins, letting one stylesheet restyle an entire website consistently.',
      css2: 'With Flexbox, Grid, custom properties, media queries, transitions and keyframe animations, CSS builds responsive layouts that adapt to any screen and adds polished motion without a single line of JavaScript. Logical properties even let one design work in both left-to-right and right-to-left languages.',
      js1: 'JavaScript is the programming language of the web. It runs in the browser and reacts to clicks, typing, scrolling and timers, changing the page on the fly by reading and updating the DOM, validating forms, and fetching data from servers without reloading.',
      js2: 'From variables, functions and objects to modules, promises and async/await, JavaScript scales from tiny interactive widgets to full applications. Libraries such as Three.js even render real-time 3D graphics, like the rotating heart on this page, directly in the browser.'
    },
    ar: {
      title: 'التدريب', add: 'إضافة محتوى', remove: 'إزالة المحتوى', lang: 'English',
      update: 'تحديث', rights: 'جميع الحقوق محفوظة', sectionTitle: 'HTML وCSS وJavaScript',
      menu: ['لوحة التحكم','محرر HTML','أنماط CSS','وحدة تحكم JS','المكونات','القوالب','المقتطفات','المشاريع','المعاينة المباشرة','التصميم المتجاوب','لوحة الألوان','الخطوط','الحركات','المصحح','الإعدادات'],
      html1: 'لغة HTML (لغة ترميز النص التشعبي) هي الهيكل الأساسي لكل صفحة ويب. تصف بنية المستند باستخدام عناصر مثل العناوين والفقرات والقوائم والروابط والصور والنماذج والجداول، لكي تفهم المتصفحات ومحركات البحث والتقنيات المساعدة معنى كل جزء من الصفحة.',
      html2: 'يضيف HTML5 عناصر دلالية مثل header وnav وmain وsection وarticle وfooter، إلى جانب دعم الصوت والفيديو والرسم عبر canvas. كتابة ترميز واضح المعنى تحسّن إمكانية الوصول وظهور الموقع في البحث وسهولة الصيانة، وهي الأساس الذي يُبنى عليه التنسيق والسلوك.',
      css1: 'تتحكم CSS (أوراق الأنماط المتتالية) في مظهر عناصر HTML: الألوان والخطوط والمسافات والحدود والخلفيات والتخطيط. تستهدف المحددات العناصر، وتحدد قواعد التتابع والخصوصية والوراثة أي قاعدة تُطبَّق، فتعيد ورقة أنماط واحدة تنسيق موقع كامل بشكل متسق.',
      css2: 'باستخدام Flexbox وGrid والمتغيرات المخصصة واستعلامات الوسائط والانتقالات والحركات، تبني CSS تخطيطات متجاوبة تتكيف مع أي شاشة وتضيف حركة أنيقة دون أي سطر JavaScript. كما تتيح الخصائص المنطقية تصميماً واحداً يعمل مع اللغات من اليسار إلى اليمين ومن اليمين إلى اليسار.',
      js1: 'جافاسكربت هي لغة البرمجة الخاصة بالويب. تعمل داخل المتصفح وتستجيب للنقرات والكتابة والتمرير والمؤقتات، فتغيّر الصفحة مباشرة عبر قراءة DOM وتحديثه، والتحقق من النماذج، وجلب البيانات من الخوادم دون إعادة تحميل الصفحة.',
      js2: 'من المتغيرات والدوال والكائنات إلى الوحدات والوعود وasync/await، تتدرج جافاسكربت من أدوات تفاعلية صغيرة إلى تطبيقات كاملة. وتستطيع مكتبات مثل Three.js رسم رسومات ثلاثية الأبعاد في الزمن الحقيقي، مثل القلب الدوار في هذه الصفحة، مباشرة داخل المتصفح.'
    }
  };

  const $ = (id) => document.getElementById(id);
  let lang = 'en', updates = 0;

  /* ---------- Language switch (text + direction) ---------- */
  function applyLang() {
    const t = T[lang];
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = t.title;
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t[el.dataset.i18n]; });
    $('langBtn').textContent = t.lang;
    $('fab').setAttribute('aria-label', t.add);
    renderMenu();
    renderUpdates();
  }

  /* ---------- Menu ---------- */
  let activeItem = 0;
  function renderMenu() {
    $('menuList').innerHTML = '';
    T[lang].menu.forEach((label, i) => {
      const a = document.createElement('a');
      a.href = '#'; a.textContent = label;
      a.className = i === activeItem ? 'active' : '';
      a.addEventListener('click', (e) => { e.preventDefault(); activeItem = i; renderMenu(); });
      $('menuList').appendChild(a);
    });
  }

  /* ---------- Add / remove updates under the navbar ---------- */
  function renderUpdates() {
    $('updates').innerHTML = '';
    for (let i = 1; i <= updates; i++) {
      const d = document.createElement('div');
      d.className = 'update';
      d.textContent = `${T[lang].update} ${i}`;
      $('updates').appendChild(d);
    }
    syncHeader();
  }
  const addContent = () => { updates++; renderUpdates(); };
  const removeContent = () => { if (updates) { updates--; renderUpdates(); } };

  /* Keep --hdr equal to the real header height so the menu sits right below it */
  const syncHeader = () => document.documentElement.style.setProperty('--hdr', $('header').offsetHeight + 'px');
  new ResizeObserver(syncHeader).observe($('header'));

  $('langBtn').onclick = () => { lang = lang === 'en' ? 'ar' : 'en'; applyLang(); };
  $('addBtn').onclick = $('fab').onclick = addContent;
  $('removeBtn').onclick = removeContent;

  /* ---------- Red box: endlessly drifting chips ---------- */
  const reds = ['#7a0f1a','#9b1423','#d63a44','#e8606a','#a01a28','#f08a8f','#8c1220'];
  for (let i = 0; i < 16; i++) {
    const c = document.createElement('span');
    const size = 20 + Math.random() * 60;
    c.className = 'chip';
    c.style.cssText = `width:${size}px;height:${size * (0.6 + Math.random() * 0.6)}px;top:${Math.random() * 85}%;` +
      `background:${reds[i % reds.length]};--d:${8 + Math.random() * 10}s;--b:${2 + Math.random() * 3}s;--delay:-${Math.random() * 14}s`;
    $('redbox').prepend(c);
  }

  applyLang();   // page works even if the 3D library fails to load

  /* ---------- 3D heart (Three.js) ---------- */
  try {
  const box = $('heart');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 6);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  box.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 0.9); key.position.set(3, 4, 5); scene.add(key);
  const rim = new THREE.PointLight(0xff6070, 0.7); rim.position.set(-4, -2, -3); scene.add(rim);

  const heart = new THREE.Group();
  const fallback = new THREE.Group();   // built-in heart, used until/unless assets/heart.glb loads
  heart.add(fallback);
  const s = new THREE.Shape();
  s.moveTo(5, 5);
  s.bezierCurveTo(5, 5, 4, 0, 0, 0);
  s.bezierCurveTo(-6, 0, -6, 7, -6, 7);
  s.bezierCurveTo(-6, 11, -3, 15.4, 5, 19);
  s.bezierCurveTo(12, 15.4, 16, 11, 16, 7);
  s.bezierCurveTo(16, 7, 16, 0, 10, 0);
  s.bezierCurveTo(7, 0, 5, 5, 5, 5);
  const bodyGeo = new THREE.ExtrudeGeometry(s, { depth: 3, bevelThickness: 3, bevelSize: 3, bevelSegments: 14, curveSegments: 48 });
  bodyGeo.scale(0.1, 0.1, 0.1); bodyGeo.center();
  const body = new THREE.Mesh(bodyGeo, new THREE.MeshPhysicalMaterial({ color: 0xa3121f, roughness: 0.35, clearcoat: 1, clearcoatRoughness: 0.2 }));
  body.rotation.z = Math.PI; body.rotation.x = 0.1;   // tip pointing down
  fallback.add(body);

  // Great vessels on top: aorta, pulmonary artery, vena cava
  const vessel = (pts, r, color) => {
    const m = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts.map(p => new THREE.Vector3(...p))), 24, r, 16),
      new THREE.MeshStandardMaterial({ color, roughness: 0.45 }));
    fallback.add(m);
  };
  vessel([[0.1,0.7,0],[0.1,1.2,0],[-0.3,1.6,0],[-0.8,1.3,0]], 0.19, 0x8f1d2a);
  vessel([[-0.35,0.7,0.35],[-0.45,1.2,0.4],[-0.9,1.5,0.4]], 0.15, 0x4a5fa8);
  vessel([[0.65,0.7,-0.2],[0.75,1.3,-0.2],[0.75,1.8,-0.2]], 0.14, 0x3d4f93);

  heart.scale.setScalar(0.95);
  scene.add(heart);

  /* Optional real anatomical model: put it at assets/heart.glb (see README).
     If the file is missing, the built-in heart above stays on screen. */
  if (THREE.GLTFLoader) {
    new THREE.GLTFLoader().load('assets/heart.glb', (gltf) => {
      const model = gltf.scene;
      const bb = new THREE.Box3().setFromObject(model);
      const size = bb.getSize(new THREE.Vector3()), mid = bb.getCenter(new THREE.Vector3());
      model.position.sub(mid);                                   // centre on its own axis
      const wrap = new THREE.Group(); wrap.add(model);
      wrap.scale.setScalar(3 / Math.max(size.x, size.y, size.z)); // fit the viewport
      heart.remove(fallback); heart.add(wrap);
    }, undefined, () => console.info('assets/heart.glb not found - using built-in heart.'));
  }

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; controls.enablePan = false;
  controls.minDistance = 2.2; controls.maxDistance = 9;   // scroll / pinch to zoom, drag to look from any angle

  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  (function loop(t) {
    requestAnimationFrame(loop);
    if (!still) { heart.rotation.y += 0.01; heart.scale.setScalar(0.95 + Math.sin(t / 260) * 0.015); } // spin + faint heartbeat
    controls.update();
    renderer.render(scene, camera);
  })(0);

  new ResizeObserver(() => {
    const w = box.clientWidth, h = box.clientHeight;
    renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix();
  }).observe(box);

  } catch (err) { console.warn('3D heart unavailable:', err.message); }
})();