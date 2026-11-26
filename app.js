/**
 * STUDIO ARCHIVE — 2026 Interactive Fashion Showroom
 * Showroom interactif de mode avec tringle 3D physique, bascule avant/arrière,
 * sélecteur de variantes par miniatures, gestion panier & acompte 10 %
 * Numéro officiel Wave / Orange Money : +221 77 453 22 55
 * Email Admin : mamadoualioubarry1871@gmail.com
 */

const ADMIN_EMAIL = 'mamadoualioubarry1871@gmail.com';
const DEFAULT_ADMIN_PIN = '1871';
const MERCHANT_PHONE_DISPLAY = '77 453 22 55';
const MERCHANT_PHONE_INTL = '+221 77 453 22 55';
const MERCHANT_WHATSAPP = '221774532255';

// Taux de conversion
const DEFAULT_GNF_RATE = 14.3; // 1 FCFA ≈ 14.3 GNF
const RATE_EUR = 655.957;      // 1 EUR ≈ 655.957 FCFA
const RATE_USD = 605.0;        // 1 USD ≈ 605 FCFA

const STORAGE_KEYS = {
  PRODUCTS: 'studio_archive_products_2026_v1',
  ORDERS: 'studio_archive_orders_2026_v1',
  ADMIN_SESSION: 'studio_archive_admin_session_v1',
  ADMIN_PIN: 'studio_archive_admin_pin_v1',
  LOGIN_ATTEMPTS: 'studio_archive_login_attempts_v1',
  SHOP_NAME: 'studio_archive_shop_name_v1',
  CUSTOMERS: 'studio_archive_customers_v1',
  CURRENT_CUSTOMER: 'studio_archive_current_customer_v1',
  GNF_RATE: 'studio_archive_gnf_rate_v1',
  DISPLAY_CURRENCY: 'studio_archive_display_currency_v1',
  CART: 'studio_archive_cart_2026_v1',
  AUDIO_ENABLED: 'studio_archive_audio_enabled_v1'
};

const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'UNKNOWN C DOVE VEST',
    price: 45000,
    status: 'published',
    createdAt: Date.now() - 3600000 * 24,
    colors: [
      {
        name: 'Orange',
        hex: '#F95700',
        front: 'assets/vest-orange-front.jpg',
        back: 'assets/vest-orange-back.jpg'
      },
      {
        name: 'Noir',
        hex: '#141413',
        front: 'assets/vest-black-front.jpg',
        back: 'assets/vest-black-back.jpg'
      },
      {
        name: 'Crème',
        hex: '#E8E3D9',
        front: 'assets/vest-cream-front.jpg',
        back: 'assets/vest-cream-back.jpg'
      }
    ],
    defaultColor: 'Orange'
  },
  {
    id: 'prod-2',
    name: 'UNKNOWN WORKWEAR BIKER JACKET',
    price: 65000,
    status: 'published',
    createdAt: Date.now() - 3600000 * 20,
    colors: [
      {
        name: 'Charcoal & Olive',
        hex: '#373D3F',
        front: 'assets/jacket-front.jpg',
        back: 'assets/jacket-back.jpg'
      }
    ],
    defaultColor: 'Charcoal & Olive'
  },
  {
    id: 'prod-3',
    name: 'UNKNOWN HEAVYWEIGHT HOODIE',
    price: 38000,
    status: 'published',
    createdAt: Date.now() - 3600000 * 16,
    colors: [
      {
        name: 'Washed Charcoal',
        hex: '#2B2B2B',
        front: 'assets/hoodie-front.jpg',
        back: 'assets/hoodie-back.jpg'
      }
    ],
    defaultColor: 'Washed Charcoal'
  },
  {
    id: 'prod-4',
    name: 'UNKNOWN STRIPED KNIT ZIP SWEATER',
    price: 42000,
    status: 'published',
    createdAt: Date.now() - 3600000 * 12,
    colors: [
      {
        name: 'Navy & White',
        hex: '#1D2A44',
        front: 'assets/knit-front.jpg',
        back: 'assets/knit-back.jpg'
      }
    ],
    defaultColor: 'Navy & White'
  },
  {
    id: 'prod-5',
    name: 'UNKNOWN OVERSIZED BOXY TEE',
    price: 22000,
    status: 'published',
    createdAt: Date.now() - 3600000 * 8,
    colors: [
      {
        name: 'Vintage White',
        hex: '#F0EFEA',
        front: 'assets/tee-front.jpg',
        back: 'assets/tee-back.jpg'
      }
    ],
    defaultColor: 'Vintage White'
  },
  {
    id: 'prod-6',
    name: 'RETRO STREETWEAR SNEAKERS',
    price: 55000,
    status: 'published',
    createdAt: Date.now() - 3600000 * 4,
    colors: [
      {
        name: 'White & Black',
        hex: '#FFFFFF',
        front: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85',
        back: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80'
      }
    ],
    defaultColor: 'White & Black'
  }
];

let state = {
  products: [],
  orders: [],
  customers: [],
  cart: [],
  currentCustomer: null,
  pendingFavoriteProductId: null,
  isAdmin: false,
  shopName: 'UNKNOWN',
  gnfRate: DEFAULT_GNF_RATE,
  displayCurrency: 'FCFA',
  viewMode: 'showroom', // 'showroom' | 'grid'
  activeProduct: null,
  activeColor: null,
  isFlipped: false,
  audioEnabled: true,
  editingColors: [],
  uploadedPhotoDataUrl: ''
};

// ============================================================================
// AUDIO MICRO-INTERACTIONS (Web Audio API Synthesizer)
// ============================================================================
let audioCtx = null;
function getAudioContext() {
  if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playSound(type) {
  if (!state.audioEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    if (type === 'sway') {
      // Bruit feutré de cintre en métal qui glisse
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.12);
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === 'flip') {
      // Son fluide de bascule avant/arrière
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.08);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.22);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === 'click') {
      // Clic tactile sélection variante
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(580, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
    } else if (type === 'cart') {
      // Chime d'ajout au panier
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        gain.gain.setValueAtTime(0.05, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.25);
      });
    }
  } catch (_) {}
}

// ============================================================================
// FORMATAGE & DEVISES (FCFA, GNF, USD, EUR)
// ============================================================================
function formatFCFA(amount) {
  const num = Math.round(Number(amount) || 0);
  return num.toLocaleString('fr-FR') + ' FCFA';
}

function convertToGNF(amountFCFA) {
  const num = Number(amountFCFA) || 0;
  const raw = num * state.gnfRate;
  return Math.round(raw / 50) * 50;
}

function formatGNF(amountFCFA) {
  const gnf = convertToGNF(amountFCFA);
  return gnf.toLocaleString('fr-FR') + ' GNF';
}

function formatIntlEquivalent(amountFCFA) {
  const num = Number(amountFCFA) || 0;
  const usd = Math.max(1, Math.round(num / RATE_USD));
  const eur = Math.max(1, Math.round(num / RATE_EUR));
  return `≈ $${usd} USD • ${eur} € EUR`;
}

function formatPrimaryPriceByCurrency(amountFCFA) {
  const cur = state.displayCurrency;
  if (cur === 'GNF') return formatGNF(amountFCFA);
  if (cur === 'USD') {
    const usd = Math.max(1, Math.round((Number(amountFCFA) || 0) / RATE_USD));
    return `$${usd} USD`;
  }
  if (cur === 'EUR') {
    const eur = Math.max(1, Math.round((Number(amountFCFA) || 0) / RATE_EUR));
    return `${eur} € EUR`;
  }
  return formatFCFA(amountFCFA);
}

function calculateTenPercent(price) {
  return Math.round((Number(price) || 0) * 0.10);
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getAdminPin() {
  return localStorage.getItem(STORAGE_KEYS.ADMIN_PIN) || DEFAULT_ADMIN_PIN;
}

function showToast(message) {
  const toast = document.getElementById('toastNotification');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.remove('hidden');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.add('hidden');
  }, 3200);
}

// ============================================================================
// CHARGEMENT DU STOCKAGE LOCAL & SYNCHRONISATION SERVEUR
// ============================================================================
function loadStateFromStorage() {
  try {
    const savedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    state.products = savedProducts ? JSON.parse(savedProducts) : INITIAL_PRODUCTS;

    const savedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
    state.orders = savedOrders ? JSON.parse(savedOrders) : [];

    const savedCustomers = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
    state.customers = savedCustomers ? JSON.parse(savedCustomers) : [];

    const savedCart = localStorage.getItem(STORAGE_KEYS.CART);
    state.cart = savedCart ? JSON.parse(savedCart) : [];

    const savedCustomerPhone = localStorage.getItem(STORAGE_KEYS.CURRENT_CUSTOMER);
    if (savedCustomerPhone) {
      state.currentCustomer = state.customers.find(c => c.phone === savedCustomerPhone) || null;
    }

    const savedCurrency = localStorage.getItem(STORAGE_KEYS.DISPLAY_CURRENCY);
    if (savedCurrency && ['FCFA', 'GNF', 'USD', 'EUR'].includes(savedCurrency)) {
      state.displayCurrency = savedCurrency;
      const sel = document.getElementById('currencySelector');
      if (sel) sel.value = savedCurrency;
    }

    const savedGnfRate = parseFloat(localStorage.getItem(STORAGE_KEYS.GNF_RATE));
    if (!isNaN(savedGnfRate) && savedGnfRate > 0) {
      state.gnfRate = savedGnfRate;
    }

    const rawSession = localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION);
    if (rawSession) {
      const parsed = JSON.parse(rawSession);
      const twelveHours = 12 * 60 * 60 * 1000;
      if (parsed.email === ADMIN_EMAIL && Date.now() - parsed.timestamp < twelveHours) {
        state.isAdmin = true;
      }
    }

    const savedShopName = localStorage.getItem(STORAGE_KEYS.SHOP_NAME);
    if (savedShopName) state.shopName = savedShopName;

    const savedAudio = localStorage.getItem(STORAGE_KEYS.AUDIO_ENABLED);
    if (savedAudio !== null) state.audioEnabled = savedAudio === 'true';

  } catch (err) {
    console.error('Erreur chargement state :', err);
    state.products = INITIAL_PRODUCTS;
  }
}

function saveProducts() {
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(state.products));
}

function saveCart() {
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(state.cart));
  updateCartBadge();
}

function updateCartBadge() {
  const count = state.cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const badge = document.getElementById('cartHeaderCount');
  if (badge) badge.textContent = count;
  const drawerCount = document.getElementById('cartDrawerCount');
  if (drawerCount) drawerCount.textContent = count;
}

// ============================================================================
// VUE 1 : TRINGLE INTERACTIVE & SIMULATION PHYSIQUE DE BALANCEMENT (SWAY)
// ============================================================================
const hangersPhysics = []; // Stores physics state for each garment on the rail

function renderRailShowroom() {
  const container = document.getElementById('hangersContainer');
  if (!container) return;

  const published = state.products.filter(p => p.status === 'published');
  hangersPhysics.length = 0; // reset

  container.innerHTML = published
    .map((prod, index) => {
      const activeColor = (prod.colors && prod.colors[0]) || {
        name: 'Standard',
        front: prod.image || ''
      };
      const frontImg = activeColor.front || prod.image || '';

      // Initialize physics data for this hanger
      hangersPhysics.push({
        id: prod.id,
        currentAngle: 0,
        targetAngle: 0,
        velocity: 0,
        lift: 0,
        targetLift: 0,
        scale: 1,
        targetScale: 1
      });

      return `
        <article class="hanger-item" data-product-id="${escapeHtml(prod.id)}" data-index="${index}" title="Cliquer pour voir les détails">
          <!-- Crochet du cintre sur la tringle -->
          <div class="hanger-hook-visual">
            <svg viewBox="0 0 24 28" fill="none">
              <path d="M12 2C8 2 6 5 8 8C9.5 10.2 12 12 12 16V19" stroke-width="2.2" stroke-linecap="round"/>
              <path d="M2 24L12 19L22 24" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>

          <!-- Visuel du vêtement suspendu -->
          <div class="hanger-garment-frame">
            <img class="hanger-garment-img" src="${escapeHtml(frontImg)}" alt="${escapeHtml(prod.name)}" loading="lazy" />
          </div>

          <!-- Ombre portée douce sur le fond clair -->
          <div class="hanger-ground-shadow"></div>
        </article>
      `;
    })
    .join('');

  initRailInteractions();
}

let lastMouseX = null;
let lastMouseTime = null;
let mouseVelocityX = 0;

function initRailInteractions() {
  const viewport = document.getElementById('showroomViewport');
  const tooltip = document.getElementById('railHoverTooltip');
  const tipTitle = document.getElementById('hoverTipTitle');
  const tipPrice = document.getElementById('hoverTipPrice');

  if (!viewport) return;

  // Track mouse velocity and calculate sway impulses
  const handlePointerMove = (clientX) => {
    const now = performance.now();
    if (lastMouseX !== null && lastMouseTime !== null) {
      const dt = Math.max(16, now - lastMouseTime);
      mouseVelocityX = (clientX - lastMouseX) / dt;
    }
    lastMouseX = clientX;
    lastMouseTime = now;

    // Apply physics impulse to hangers based on distance from pointer
    const items = document.querySelectorAll('.hanger-item');
    items.forEach((el, idx) => {
      const rect = el.getBoundingClientRect();
      const hangerCenterX = rect.left + rect.width / 2;
      const dist = clientX - hangerCenterX;

      if (Math.abs(dist) < 240) {
        const proximity = 1 - Math.abs(dist) / 240;
        const impulse = mouseVelocityX * 3.5 * proximity;
        if (hangersPhysics[idx]) {
          hangersPhysics[idx].velocity += impulse;
          // Clamp velocity
          hangersPhysics[idx].velocity = Math.max(-18, Math.min(18, hangersPhysics[idx].velocity));
        }
      }
    });
  };

  viewport.addEventListener('mousemove', e => {
    if (state.viewMode !== 'showroom' || state.activeProduct) return;
    handlePointerMove(e.clientX);
  });

  viewport.addEventListener('touchmove', e => {
    if (state.viewMode !== 'showroom' || state.activeProduct) return;
    if (e.touches && e.touches[0]) {
      handlePointerMove(e.touches[0].clientX);
    }
  }, { passive: true });

  // Hover effect over individual items
  const items = document.querySelectorAll('.hanger-item');
  items.forEach((item, idx) => {
    item.addEventListener('mouseenter', () => {
      if (state.activeProduct) return;
      const prod = state.products.find(p => p.id === item.dataset.productId);
      if (!prod) return;

      playSound('sway');

      // Lift and highlight
      if (hangersPhysics[idx]) {
        hangersPhysics[idx].targetLift = -10;
        hangersPhysics[idx].targetScale = 1.07;
      }

      // Neighboring items part slightly
      if (hangersPhysics[idx - 1]) hangersPhysics[idx - 1].targetAngle = -4;
      if (hangersPhysics[idx + 1]) hangersPhysics[idx + 1].targetAngle = 4;

      // Show micro-tooltip
      if (tooltip) {
        tipTitle.textContent = prod.name;
        tipPrice.textContent = formatPrimaryPriceByCurrency(prod.price);
        tooltip.classList.add('active');
      }
    });

    item.addEventListener('mouseleave', () => {
      if (hangersPhysics[idx]) {
        hangersPhysics[idx].targetLift = 0;
        hangersPhysics[idx].targetScale = 1;
      }
      if (hangersPhysics[idx - 1]) hangersPhysics[idx - 1].targetAngle = 0;
      if (hangersPhysics[idx + 1]) hangersPhysics[idx + 1].targetAngle = 0;
      if (tooltip) tooltip.classList.remove('active');
    });

    // CLICK ITEM -> TRANSITION FLUIDE VERS LA VUE PRODUIT DÉTAILLÉE
    item.addEventListener('click', () => {
      const prod = state.products.find(p => p.id === item.dataset.productId);
      if (prod) {
        if (tooltip) tooltip.classList.remove('active');
        openProductFocus(prod);
      }
    });
  });
}

// Continuous requestAnimationFrame physics loop for spring damping
function startPhysicsLoop() {
  const items = document.querySelectorAll('.hanger-item');
  const springK = 0.08;   // Spring stiffness
  const damping = 0.88;   // Natural friction/air drag

  items.forEach((el, idx) => {
    const phys = hangersPhysics[idx];
    if (!phys) return;

    // Harmonic spring oscillation towards target angle
    const displacement = phys.currentAngle - phys.targetAngle;
    const force = -springK * displacement;
    phys.velocity = (phys.velocity + force) * damping;
    phys.currentAngle += phys.velocity;

    // Smooth lift & scale lerp
    phys.lift += (phys.targetLift - phys.lift) * 0.2;
    phys.scale += (phys.targetScale - phys.scale) * 0.2;

    // Apply transform
    el.style.transform = `rotate(${phys.currentAngle.toFixed(2)}deg) translateY(${phys.lift.toFixed(1)}px) scale(${phys.scale.toFixed(3)})`;
  });

  requestAnimationFrame(startPhysicsLoop);
}

// ============================================================================
// VUE 2 : TRANSITION VERS LA FICHE PRODUIT INTERACTIVE
// ============================================================================
function openProductFocus(product) {
  state.activeProduct = product;
  state.isFlipped = false;

  // Determine active color variant
  const colors = product.colors && product.colors.length > 0 ? product.colors : [
    { name: 'Standard', hex: '#141413', front: product.image, back: product.image }
  ];
  state.activeColor = colors[0];

  const viewport = document.getElementById('showroomViewport');
  viewport.classList.add('in-product-view');

  playSound('flip');

  // Update text meta
  document.getElementById('focusedProductTitle').textContent = product.name;
  document.getElementById('focusedMainPrice').textContent = formatPrimaryPriceByCurrency(product.price);
  document.getElementById('focusedGnfPrice').textContent = `🇬🇳 ${formatGNF(product.price)}`;
  document.getElementById('focusedIntlPrice').textContent = formatIntlEquivalent(product.price);

  const deposit = calculateTenPercent(product.price);
  document.getElementById('focusedDepositAmount').textContent = `${formatFCFA(deposit)} (${formatGNF(deposit)})`;

  // Update front and back visuals
  updateFocusImages();

  // Render floating mini-thumbnails for colorways
  renderMiniColorways(colors);

  // Reset Front/Back Switcher
  const flipper = document.getElementById('garmentFlipper');
  flipper.classList.remove('is-flipped');

  const switchTrack = document.querySelector('.switch-pill-track');
  if (switchTrack) switchTrack.classList.remove('is-back');

  document.getElementById('btnSideFront').classList.add('active');
  document.getElementById('btnSideBack').classList.remove('active');
}

function updateFocusImages() {
  if (!state.activeColor) return;
  const frontImg = document.getElementById('focusedImgFront');
  const backImg = document.getElementById('focusedImgBack');

  frontImg.src = state.activeColor.front || state.activeProduct.image;
  backImg.src = state.activeColor.back || state.activeColor.front || state.activeProduct.image;
}

// Mini-Aperçus / Sélecteur de variantes flottant (Exactement comme dans la vidéo)
function renderMiniColorways(colors) {
  const stack = document.getElementById('variantsMiniStack');
  if (!stack) return;

  stack.innerHTML = colors
    .map(c => {
      const isActive = state.activeColor && state.activeColor.name === c.name;
      return `
        <div class="variant-mini-card ${isActive ? 'active' : ''}" data-color-name="${escapeHtml(c.name)}" title="${escapeHtml(c.name)}">
          <img class="variant-mini-img" src="${escapeHtml(c.front || '')}" alt="${escapeHtml(c.name)}" />
        </div>
      `;
    })
    .join('');

  stack.querySelectorAll('.variant-mini-card').forEach(card => {
    card.addEventListener('click', () => {
      const colName = card.dataset.colorName;
      const found = colors.find(c => c.name === colName);
      if (found) {
        state.activeColor = found;
        playSound('click');

        // Update active class
        stack.querySelectorAll('.variant-mini-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        // Smooth visual update with subtle sway
        const flipper = document.getElementById('garmentFlipper');
        flipper.style.transform = (state.isFlipped ? 'rotateY(180deg) ' : '') + 'scale(0.96)';
        setTimeout(() => {
          updateFocusImages();
          flipper.style.transform = state.isFlipped ? 'rotateY(180deg)' : 'none';
        }, 140);
      }
    });
  });
}

function closeProductFocus() {
  const viewport = document.getElementById('showroomViewport');
  viewport.classList.remove('in-product-view');
  state.activeProduct = null;
  state.activeColor = null;
  state.isFlipped = false;
  playSound('sway');
}

// ============================================================================
// BASCULE DE FACE (FRONT / BACK)
// ============================================================================
function toggleGarmentSide(side) {
  const flipper = document.getElementById('garmentFlipper');
  const switchTrack = document.querySelector('.switch-pill-track');
  const btnFront = document.getElementById('btnSideFront');
  const btnBack = document.getElementById('btnSideBack');

  if (side === 'back') {
    state.isFlipped = true;
    flipper.classList.add('is-flipped');
    if (switchTrack) switchTrack.classList.add('is-back');
    btnFront.classList.remove('active');
    btnBack.classList.add('active');
  } else {
    state.isFlipped = false;
    flipper.classList.remove('is-flipped');
    if (switchTrack) switchTrack.classList.remove('is-back');
    btnFront.classList.add('active');
    btnBack.classList.remove('active');
  }

  playSound('flip');
}

// ============================================================================
// PANIER / BAG MANAGEMENT & COMMANDE
// ============================================================================
function addToCart(product, color) {
  if (!product) return;
  const col = color || (product.colors && product.colors[0]) || { name: 'Standard', front: product.image };

  const existing = state.cart.find(
    item => item.id === product.id && item.colorName === col.name
  );

  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      colorName: col.name,
      image: col.front || product.image,
      quantity: 1
    });
  }

  saveCart();
  playSound('cart');
  showToast(`"${product.name}" (${col.name}) ajouté au panier !`);
  openCartDrawer();
}

function openCartDrawer() {
  renderCartDrawer();
  document.getElementById('cartDrawerBackdrop').classList.remove('hidden');
}

function closeCartDrawer() {
  document.getElementById('cartDrawerBackdrop').classList.add('hidden');
}

function renderCartDrawer() {
  const container = document.getElementById('cartDrawerItems');
  const totalArticlesEl = document.getElementById('cartTotalArticles');
  const totalDepositEl = document.getElementById('cartTotalDeposit');
  const remainingEl = document.getElementById('cartRemainingBalance');

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 48px 16px; color: var(--text-muted);">
        <div style="font-size: 2.2rem; margin-bottom: 8px;">🛍️</div>
        <h4>Votre panier est vide</h4>
        <p style="font-size: 0.85rem; margin-top: 4px;">Sélectionnez un vêtement sur la tringle et ajoutez-le au panier.</p>
      </div>
    `;
    totalArticlesEl.textContent = '0 FCFA';
    totalDepositEl.textContent = '0 FCFA';
    remainingEl.textContent = '0 FCFA';
    return;
  }

  const total = state.cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const deposit = calculateTenPercent(total);
  const remaining = total - deposit;

  totalArticlesEl.textContent = `${formatPrimaryPriceByCurrency(total)} (${formatGNF(total)})`;
  totalDepositEl.textContent = `${formatFCFA(deposit)} • 🇬🇳 ${formatGNF(deposit)}`;
  remainingEl.textContent = `${formatFCFA(remaining)} (à payer à réception)`;

  container.innerHTML = state.cart
    .map((item, idx) => `
      <div class="cart-item-row">
        <img class="cart-item-img" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" />
        <div class="cart-item-info">
          <h4>${escapeHtml(item.name)}</h4>
          <span>Couleur : ${escapeHtml(item.colorName)} • Qté : ${item.quantity || 1}</span>
          <div class="cart-item-price">${formatPrimaryPriceByCurrency(item.price)}</div>
        </div>
        <button type="button" class="cart-item-remove" data-cart-remove-idx="${idx}" title="Retirer du panier">&times;</button>
      </div>
    `)
    .join('');

  container.querySelectorAll('[data-cart-remove-idx]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.cartRemoveIdx);
      state.cart.splice(idx, 1);
      saveCart();
      renderCartDrawer();
    });
  });
}

// ============================================================================
// MODALE DE COMMANDE AVEC ACOMPTE DE 10 % (WAVE, OM, CARTE)
// ============================================================================
function openOrderModal(product, presetColor) {
  const prod = product || state.activeProduct;
  if (!prod) return;

  const color = presetColor || state.activeColor || (prod.colors && prod.colors[0]) || { name: 'Standard' };

  document.getElementById('orderProductId').value = prod.id;
  document.getElementById('orderProductName').textContent = prod.name;
  document.getElementById('orderProductImage').src = color.front || prod.image;
  document.getElementById('orderProductPrice').textContent = formatFCFA(prod.price);
  document.getElementById('orderProductPriceGnf').textContent = `🇬🇳 ${formatGNF(prod.price)}`;
  document.getElementById('orderSelectedColorSummary').textContent = color.name;

  const deposit = calculateTenPercent(prod.price);
  const rest = prod.price - deposit;

  document.getElementById('depositTotalDisplay').textContent = formatFCFA(prod.price);
  document.getElementById('depositDueDisplay').textContent = `${formatFCFA(deposit)} (🇬🇳 ${formatGNF(deposit)})`;
  document.getElementById('depositRestDisplay').textContent = formatFCFA(rest);

  // Pré-remplir si le client est connecté
  if (state.currentCustomer) {
    document.getElementById('customerFullName').value = `${state.currentCustomer.firstName} ${state.currentCustomer.lastName}`;
    document.getElementById('customerPhone').value = state.currentCustomer.phone;
  }

  document.getElementById('orderSuccessView').classList.add('hidden');
  document.getElementById('orderForm').classList.remove('hidden');
  document.getElementById('orderModalBackdrop').classList.remove('hidden');
}

function handleOrderSubmit(e) {
  e.preventDefault();

  const prodId = document.getElementById('orderProductId').value;
  const prod = state.products.find(p => p.id === prodId);
  if (!prod) return;

  const fullName = document.getElementById('customerFullName').value.trim();
  const phone = document.getElementById('customerPhone').value.trim();
  const address = document.getElementById('customerAddress').value.trim();
  const paymentRef = document.getElementById('paymentReferenceInput').value.trim();
  const colorName = document.getElementById('orderSelectedColorSummary').textContent;

  if (!fullName || !phone || !address || !paymentRef) {
    showToast('Veuillez renseigner tous les champs obligatoires.');
    return;
  }

  const deposit = calculateTenPercent(prod.price);
  const remaining = prod.price - deposit;

  const newOrder = {
    id: 'cmd-' + Date.now(),
    productId: prod.id,
    productName: prod.name,
    productImage: prod.image,
    productPrice: prod.price,
    depositAmount: deposit,
    remainingAmount: remaining,
    selectedColor: colorName,
    customerName: fullName,
    customerPhone: phone,
    customerAddress: address,
    paymentMethod: 'Wave / OM / CB',
    paymentReference: paymentRef,
    createdAt: Date.now()
  };

  state.orders.unshift(newOrder);
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(state.orders));

  // Retirer l'article des ventes publiques (exigence client)
  prod.status = 'ordered';
  saveProducts();

  // Envoyer au serveur Node.js / SQLite
  if (window.location.protocol !== 'file:') {
    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder)
    }).catch(() => {});
  }

  // Préparer lien WhatsApp
  const waMsg = [
    `Bonjour Mamadou Aliou Barry !`,
    `Je viens de valider ma commande sur le site :`,
    `- Article : ${prod.name} (Couleur : ${colorName})`,
    `- Prix total : ${formatFCFA(prod.price)} (${formatGNF(prod.price)})`,
    `- Acompte 10 % réglé : ${formatFCFA(deposit)} (Réf : ${paymentRef})`,
    `- Solde à la livraison : ${formatFCFA(remaining)}`,
    `- Nom : ${fullName}`,
    `- Téléphone : ${phone}`,
    `- Adresse de livraison : ${address}`
  ].join('\n');

  document.getElementById('whatsappConfirmLink').href = `https://wa.me/${MERCHANT_WHATSAPP}?text=${encodeURIComponent(waMsg)}`;
  document.getElementById('orderForm').classList.add('hidden');
  document.getElementById('orderSuccessView').classList.remove('hidden');

  // Retirer du panier si présent
  state.cart = state.cart.filter(item => item.id !== prod.id);
  saveCart();

  // Re-render
  renderRailShowroom();
  closeProductFocus();
  showToast("Commande validée ! L'article a été réservé.");
}

// ============================================================================
// FAVORIS & COMPTE CLIENT
// ============================================================================
function isProductFavorited(id) {
  return state.currentCustomer && (state.currentCustomer.favorites || []).includes(id);
}

function handleToggleFavorite(productId) {
  if (!state.currentCustomer) {
    state.pendingFavoriteProductId = productId;
    openCustomerAuthModal(true);
    return;
  }

  if (!state.currentCustomer.favorites) state.currentCustomer.favorites = [];
  const idx = state.currentCustomer.favorites.indexOf(productId);
  if (idx > -1) {
    state.currentCustomer.favorites.splice(idx, 1);
    showToast('Article retiré de vos favoris.');
  } else {
    state.currentCustomer.favorites.push(productId);
    showToast('Article ajouté à vos favoris ❤️');
  }

  localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(state.customers));
  updateFavoritesBadge();
}

function updateFavoritesBadge() {
  const count = (state.currentCustomer && state.currentCustomer.favorites && state.currentCustomer.favorites.length) || 0;
  const badge = document.getElementById('favoritesHeaderCount');
  if (badge) badge.textContent = count;
}

function openCustomerAuthModal(fromFav = false) {
  const modal = document.getElementById('customerAuthModalBackdrop');
  const profile = document.getElementById('customerProfileView');
  const form = document.getElementById('customerRegisterForm');

  if (state.currentCustomer) {
    profile.classList.remove('hidden');
    form.classList.add('hidden');
    document.getElementById('profileFullNameDisplay').textContent = `${state.currentCustomer.firstName} ${state.currentCustomer.lastName}`;
    document.getElementById('profilePhoneDisplay').textContent = state.currentCustomer.phone;
  } else {
    profile.classList.add('hidden');
    form.classList.remove('hidden');
    document.getElementById('customerAuthBanner').textContent = fromFav
      ? 'Pour sauvegarder cette pièce en favoris, renseignez votre nom et numéro de téléphone :'
      : 'Créez votre profil pour sauvegarder vos pièces favorites :';
  }

  modal.classList.remove('hidden');
}

function handleCustomerRegister(e) {
  e.preventDefault();
  const lastName = document.getElementById('clientLastNameInput').value.trim();
  const firstName = document.getElementById('clientFirstNameInput').value.trim();
  const phone = document.getElementById('clientPhoneInput').value.trim();

  if (!lastName || !firstName || phone.length < 7) {
    showToast('Veuillez remplir votre nom, prénom et téléphone.');
    return;
  }

  let customer = state.customers.find(c => c.phone === phone);
  if (customer) {
    customer.firstName = firstName;
    customer.lastName = lastName;
  } else {
    customer = {
      id: 'cust-' + Date.now(),
      firstName,
      lastName,
      phone,
      favorites: []
    };
    state.customers.push(customer);
  }

  state.currentCustomer = customer;
  localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(state.customers));
  localStorage.setItem(STORAGE_KEYS.CURRENT_CUSTOMER, phone);

  if (state.pendingFavoriteProductId) {
    handleToggleFavorite(state.pendingFavoriteProductId);
    state.pendingFavoriteProductId = null;
  }

  document.getElementById('customerAuthModalBackdrop').classList.add('hidden');
  updateFavoritesBadge();
  showToast(`Bienvenue ${firstName} !`);
}

// ============================================================================
// ESPACE ADMINISTRATEUR SÉCURISÉ (Code PIN & Email masqués)
// ============================================================================
function handleAdminLogin(e) {
  e.preventDefault();
  const emailInput = document.getElementById('adminEmailInput').value.trim().toLowerCase();
  const pinInput = document.getElementById('adminPinInput').value.trim();
  const errorEl = document.getElementById('loginErrorMsg');

  if (emailInput === ADMIN_EMAIL.toLowerCase() && pinInput === getAdminPin()) {
    state.isAdmin = true;
    localStorage.setItem(
      STORAGE_KEYS.ADMIN_SESSION,
      JSON.stringify({ email: ADMIN_EMAIL, timestamp: Date.now() })
    );
    document.getElementById('loginModalBackdrop').classList.add('hidden');
    document.getElementById('adminHeaderControls').classList.remove('hidden');
    document.getElementById('adminDashboardSection').classList.remove('hidden');
    renderAdminUI();
    showToast('Connexion administrateur réussie !');
  } else {
    errorEl.textContent = 'Identifiants administrateur incorrects.';
    errorEl.classList.remove('hidden');
  }
}

function renderAdminUI() {
  document.getElementById('statPublishedCount').textContent = state.products.filter(p => p.status === 'published').length;
  document.getElementById('statOrdersCount').textContent = state.orders.length;
  const totalDep = state.orders.reduce((sum, o) => sum + (Number(o.depositAmount) || 0), 0);
  document.getElementById('statDepositsTotal').textContent = formatFCFA(totalDep);
  document.getElementById('statCustomersCount').textContent = state.customers.length;

  document.getElementById('tabOrdersCount').textContent = state.orders.length;
  document.getElementById('tabInventoryCount').textContent = state.products.length;
  document.getElementById('tabCustomersCount').textContent = state.customers.length;

  renderAdminOrders();
  renderAdminInventory();
}

function renderAdminOrders() {
  const container = document.getElementById('ordersListContainer');
  if (state.orders.length === 0) {
    container.innerHTML = '<p style="color:var(--text-muted); text-align:center;">Aucune commande pour le moment.</p>';
    return;
  }
  container.innerHTML = state.orders
    .map((o, idx) => `
      <div style="display:flex; justify-content:space-between; align-items:center; padding:12px; border-bottom:1px solid var(--border-hairline);">
        <div>
          <strong>${escapeHtml(o.productName)}</strong> (${escapeHtml(o.selectedColor)})<br/>
          <small>Client : ${escapeHtml(o.customerName)} (${escapeHtml(o.customerPhone)}) • Acompte 10% : ${formatFCFA(o.depositAmount)}</small><br/>
          <small>Adresse : ${escapeHtml(o.customerAddress)} • Réf : ${escapeHtml(o.paymentReference)}</small>
        </div>
        <button type="button" class="btn btn-sm btn-outline" data-del-order="${idx}">Supprimer</button>
      </div>
    `)
    .join('');

  container.querySelectorAll('[data-del-order]').forEach(b => {
    b.addEventListener('click', () => {
      state.orders.splice(Number(b.dataset.delOrder), 1);
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(state.orders));
      renderAdminUI();
    });
  });
}

function renderAdminInventory() {
  const container = document.getElementById('adminInventoryContainer');
  container.innerHTML = state.products
    .map((p, idx) => `
      <div style="display:flex; justify-content:space-between; align-items:center; padding:10px; border-bottom:1px solid var(--border-hairline);">
        <div>
          <strong>${escapeHtml(p.name)}</strong> — ${formatFCFA(p.price)}<br/>
          <small>Statut : ${p.status === 'published' ? 'En ligne' : 'Vendu / Réservé'}</small>
        </div>
        <div>
          ${p.status === 'ordered' ? `<button type="button" class="btn btn-sm btn-outline" data-republish="${p.id}">Remettre en vente</button>` : ''}
          <button type="button" class="btn btn-sm btn-outline" style="color:var(--accent-danger);" data-del-prod="${p.id}">Supprimer</button>
        </div>
      </div>
    `)
    .join('');

  container.querySelectorAll('[data-republish]').forEach(b => {
    b.addEventListener('click', () => {
      const prod = state.products.find(p => p.id === b.dataset.republish);
      if (prod) {
        prod.status = 'published';
        saveProducts();
        renderRailShowroom();
        renderAdminUI();
        showToast(`"${prod.name}" est de nouveau en vente !`);
      }
    });
  });

  container.querySelectorAll('[data-del-prod]').forEach(b => {
    b.addEventListener('click', () => {
      state.products = state.products.filter(p => p.id !== b.dataset.delProd);
      saveProducts();
      renderRailShowroom();
      renderAdminUI();
      showToast('Article supprimé.');
    });
  });
}

// ============================================================================
// ÉCOUTEURS D'ÉVÉNEMENTS & INITIALISATION
// ============================================================================
function initEventListeners() {
  // Bascule Mode Showroom / Grille
  const viewModeBtn = document.getElementById('hdrViewModeBtn');
  if (viewModeBtn) {
    viewModeBtn.addEventListener('click', () => {
      state.viewMode = state.viewMode === 'showroom' ? 'grid' : 'showroom';
      document.getElementById('hdrViewModeLabel').textContent = state.viewMode === 'showroom' ? 'SHOWROOM' : 'GRILLE';
      document.getElementById('showroomViewport').classList.toggle('hidden', state.viewMode !== 'showroom');
      document.getElementById('gridCatalogueView').classList.toggle('hidden', state.viewMode !== 'grid');
      if (state.viewMode === 'grid') renderClassicGrid();
    });
  }

  const backToShowroomBtn = document.getElementById('btnBackToShowroom');
  if (backToShowroomBtn) {
    backToShowroomBtn.addEventListener('click', () => {
      state.viewMode = 'showroom';
      document.getElementById('hdrViewModeLabel').textContent = 'SHOWROOM';
      document.getElementById('showroomViewport').classList.remove('hidden');
      document.getElementById('gridCatalogueView').classList.add('hidden');
    });
  }

  // Son ON/OFF
  const audioBtn = document.getElementById('audioToggleBtn');
  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      state.audioEnabled = !state.audioEnabled;
      localStorage.setItem(STORAGE_KEYS.AUDIO_ENABLED, String(state.audioEnabled));
      document.getElementById('audioIcon').textContent = state.audioEnabled ? '🔊' : '🔇';
      showToast(state.audioEnabled ? 'Sons interactifs activés 🔊' : 'Mode silencieux 🔇');
    });
  }

  // Sélecteur de Devise
  const curSel = document.getElementById('currencySelector');
  if (curSel) {
    curSel.addEventListener('change', e => {
      state.displayCurrency = e.target.value;
      localStorage.setItem(STORAGE_KEYS.DISPLAY_CURRENCY, state.displayCurrency);
      if (state.activeProduct) {
        document.getElementById('focusedMainPrice').textContent = formatPrimaryPriceByCurrency(state.activeProduct.price);
      }
      showToast(`Devise : ${e.target.value}`);
    });
  }

  // Bouton retour tringle
  const returnBtn = document.getElementById('returnRackBtn');
  if (returnBtn) returnBtn.addEventListener('click', closeProductFocus);

  // Bascule FRONT / BACK
  const btnFront = document.getElementById('btnSideFront');
  const btnBack = document.getElementById('btnSideBack');
  if (btnFront) btnFront.addEventListener('click', () => toggleGarmentSide('front'));
  if (btnBack) btnBack.addEventListener('click', () => toggleGarmentSide('back'));

  // Touche Échap pour quitter la vue produit
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (state.activeProduct) closeProductFocus();
      closeCartDrawer();
      document.getElementById('orderModalBackdrop').classList.add('hidden');
      document.getElementById('customerAuthModalBackdrop').classList.add('hidden');
      document.getElementById('loginModalBackdrop').classList.add('hidden');
    }
  });

  // ADD TO CART & COMMANDER DIRECTEMENT
  const addCartBtn = document.getElementById('focusedAddToCartBtn');
  if (addCartBtn) {
    addCartBtn.addEventListener('click', () => {
      if (state.activeProduct) addToCart(state.activeProduct, state.activeColor);
    });
  }

  const directOrderBtn = document.getElementById('focusedDirectOrderBtn');
  if (directOrderBtn) {
    directOrderBtn.addEventListener('click', () => {
      if (state.activeProduct) openOrderModal(state.activeProduct, state.activeColor);
    });
  }

  // Panier tiroir
  document.getElementById('openCartDrawerBtn').addEventListener('click', openCartDrawer);
  document.getElementById('closeCartDrawerBtn').addEventListener('click', closeCartDrawer);
  document.getElementById('cartDrawerBackdrop').addEventListener('click', e => {
    if (e.target.id === 'cartDrawerBackdrop') closeCartDrawer();
  });
  document.getElementById('checkoutFromCartBtn').addEventListener('click', () => {
    closeCartDrawer();
    if (state.cart.length > 0) {
      const first = state.products.find(p => p.id === state.cart[0].id) || state.products[0];
      openOrderModal(first);
    }
  });

  // Modal Commande
  document.getElementById('closeOrderModalBtn').addEventListener('click', () => {
    document.getElementById('orderModalBackdrop').classList.add('hidden');
  });
  document.getElementById('cancelOrderBtn').addEventListener('click', () => {
    document.getElementById('orderModalBackdrop').classList.add('hidden');
  });
  document.getElementById('closeSuccessModalBtn').addEventListener('click', () => {
    document.getElementById('orderModalBackdrop').classList.add('hidden');
  });
  document.getElementById('orderForm').addEventListener('submit', handleOrderSubmit);

  // Onglets de Paiement dans la commande
  document.getElementById('paymentMethodTabs').addEventListener('click', e => {
    const btn = e.target.closest('.pay-tab-btn');
    if (!btn) return;
    document.querySelectorAll('.pay-tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const method = btn.dataset.payMethod;
    document.getElementById('panelWave').classList.toggle('hidden', method !== 'Wave');
    document.getElementById('panelOrangeMoney').classList.toggle('hidden', method !== 'OrangeMoney');
    document.getElementById('panelCard').classList.toggle('hidden', method !== 'Card');
  });

  document.getElementById('copyWaveModalBtn').addEventListener('click', () => {
    navigator.clipboard?.writeText('+221774532255');
    showToast('Numéro Wave (+221 77 453 22 55) copié !');
  });

  // Compte & Favoris
  document.getElementById('openCustomerAuthBtn').addEventListener('click', () => openCustomerAuthModal(false));
  document.getElementById('closeCustomerAuthBtn').addEventListener('click', () => {
    document.getElementById('customerAuthModalBackdrop').classList.add('hidden');
  });
  document.getElementById('cancelCustomerAuthBtn').addEventListener('click', () => {
    document.getElementById('customerAuthModalBackdrop').classList.add('hidden');
  });
  document.getElementById('customerRegisterForm').addEventListener('submit', handleCustomerRegister);

  document.getElementById('openFavoritesModalBtn').addEventListener('click', () => {
    if (!state.currentCustomer) {
      openCustomerAuthModal(true);
      return;
    }
    const list = document.getElementById('favoritesListContainer');
    const favs = state.products.filter(p => (state.currentCustomer.favorites || []).includes(p.id));
    if (favs.length === 0) {
      list.innerHTML = '<p style="color:var(--text-muted); text-align:center; padding:30px;">Aucun article en favoris.</p>';
    } else {
      list.innerHTML = favs.map(p => `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:10px; border-bottom:1px solid var(--border-hairline);">
          <span>${escapeHtml(p.name)} — ${formatFCFA(p.price)}</span>
          <button type="button" class="btn btn-sm btn-primary" onclick="openProductFocus(state.products.find(x => x.id === '${p.id}')); document.getElementById('favoritesModalBackdrop').classList.add('hidden');">Voir</button>
        </div>
      `).join('');
    }
    document.getElementById('favoritesModalBackdrop').classList.remove('hidden');
  });

  document.getElementById('closeFavoritesModalBtn').addEventListener('click', () => {
    document.getElementById('favoritesModalBackdrop').classList.add('hidden');
  });

  // Admin
  document.getElementById('openLoginModalBtn').addEventListener('click', () => {
    document.getElementById('loginErrorMsg').classList.add('hidden');
    document.getElementById('loginModalBackdrop').classList.remove('hidden');
  });
  document.getElementById('closeLoginModalBtn').addEventListener('click', () => {
    document.getElementById('loginModalBackdrop').classList.add('hidden');
  });
  document.getElementById('cancelLoginBtn').addEventListener('click', () => {
    document.getElementById('loginModalBackdrop').classList.add('hidden');
  });
  document.getElementById('loginForm').addEventListener('submit', handleAdminLogin);

  document.getElementById('toggleAdminPanelBtn').addEventListener('click', () => {
    const dash = document.getElementById('adminDashboardSection');
    dash.classList.toggle('hidden');
  });
  document.getElementById('logoutAdminBtn').addEventListener('click', () => {
    state.isAdmin = false;
    localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
    document.getElementById('adminHeaderControls').classList.add('hidden');
    document.getElementById('adminDashboardSection').classList.add('hidden');
    showToast('Session admin déconnectée.');
  });
}

function renderClassicGrid() {
  const grid = document.getElementById('classicProductsGrid');
  if (!grid) return;
  const published = state.products.filter(p => p.status === 'published');
  grid.innerHTML = published
    .map(p => {
      const col = (p.colors && p.colors[0]) || { front: p.image };
      return `
        <article class="classic-card">
          <div class="classic-card-media" onclick="state.viewMode='showroom'; document.getElementById('hdrViewModeLabel').textContent='SHOWROOM'; document.getElementById('showroomViewport').classList.remove('hidden'); document.getElementById('gridCatalogueView').classList.add('hidden'); openProductFocus(state.products.find(x => x.id === '${p.id}'));">
            <img src="${escapeHtml(col.front || p.image)}" alt="${escapeHtml(p.name)}" />
          </div>
          <div class="classic-card-body">
            <h3 class="classic-card-title">${escapeHtml(p.name)}</h3>
            <div class="classic-card-price">${formatPrimaryPriceByCurrency(p.price)}</div>
            <div class="classic-card-footer">
              <button type="button" class="classic-card-btn primary" onclick="state.viewMode='showroom'; document.getElementById('hdrViewModeLabel').textContent='SHOWROOM'; document.getElementById('showroomViewport').classList.remove('hidden'); document.getElementById('gridCatalogueView').classList.add('hidden'); openProductFocus(state.products.find(x => x.id === '${p.id}'));">Inspecter 3D</button>
            </div>
          </div>
        </article>
      `;
    })
    .join('');
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  loadStateFromStorage();
  updateCartBadge();
  updateFavoritesBadge();
  renderRailShowroom();
  initEventListeners();
  startPhysicsLoop();

  if (state.isAdmin) {
    document.getElementById('adminHeaderControls').classList.remove('hidden');
    renderAdminUI();
  }
});
