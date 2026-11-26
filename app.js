/**
 * BARRY ALIOU SHOP — Boutique Officielle & Showroom 3D Interactif 2026
 * Vêtements, Sneakers & Accessoires haut de gamme
 * Deux vues complètes par article : Face Avant & Vue Arrière (Pile & Face)
 * Calcul automatique des 10 % d'acompte • Wave & Orange Money : +221 77 453 22 55
 * Email Administrateur : mamadoualioubarry1871@gmail.com
 */

const ADMIN_EMAIL = 'mamadoualioubarry1871@gmail.com';
const DEFAULT_ADMIN_PIN = '1871';
const MERCHANT_PHONE_DISPLAY = '77 453 22 55';
const MERCHANT_PHONE_INTL = '+221 77 453 22 55';
const MERCHANT_WHATSAPP = '221774532255';

// Taux de conversion
const DEFAULT_GNF_RATE = 14.3; // 1 FCFA ≈ 14.3 GNF (Franc Guinéen)
const RATE_EUR = 655.957;      // 1 EUR ≈ 655.957 FCFA
const RATE_USD = 605.0;        // 1 USD ≈ 605 FCFA

const STORAGE_KEYS = {
  PRODUCTS: 'barry_aliou_products_v3',
  ORDERS: 'barry_aliou_orders_v3',
  ADMIN_SESSION: 'barry_aliou_admin_session_v3',
  ADMIN_PIN: 'barry_aliou_admin_pin_v3',
  LOGIN_ATTEMPTS: 'barry_aliou_login_attempts_v3',
  SHOP_NAME: 'barry_aliou_shop_name_v3',
  CUSTOMERS: 'barry_aliou_customers_v3',
  CURRENT_CUSTOMER: 'barry_aliou_current_customer_v3',
  GNF_RATE: 'barry_aliou_gnf_rate_v3',
  DISPLAY_CURRENCY: 'barry_aliou_display_currency_v3',
  CART: 'barry_aliou_cart_v3',
  AUDIO_ENABLED: 'barry_aliou_audio_enabled_v3'
};

const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Gilet Matelassé Colombe',
    category: 'veste',
    price: 45000,
    status: 'published',
    createdAt: Date.now() - 3600000 * 24,
    colors: [
      {
        name: 'Orange Vif',
        hex: '#F95700',
        front: 'assets/vest-orange-front.jpg',
        back: 'assets/vest-orange-back.jpg'
      },
      {
        name: 'Noir Intense',
        hex: '#141413',
        front: 'assets/vest-black-front.jpg',
        back: 'assets/vest-black-back.jpg'
      },
      {
        name: 'Crème Écru',
        hex: '#E8E3D9',
        front: 'assets/vest-cream-front.jpg',
        back: 'assets/vest-cream-back.jpg'
      }
    ],
    defaultColor: 'Orange Vif',
    image: 'assets/vest-orange-front.jpg',
    imageBack: 'assets/vest-orange-back.jpg'
  },
  {
    id: 'prod-2',
    name: 'Veste Biker en Toile Canvas & Velours',
    category: 'veste',
    price: 65000,
    status: 'published',
    createdAt: Date.now() - 3600000 * 20,
    colors: [
      {
        name: 'Kaki & Charcoal',
        hex: '#373D3F',
        front: 'assets/jacket-front.jpg',
        back: 'assets/jacket-back.jpg'
      }
    ],
    defaultColor: 'Kaki & Charcoal',
    image: 'assets/jacket-front.jpg',
    imageBack: 'assets/jacket-back.jpg'
  },
  {
    id: 'prod-3',
    name: 'Sweat à Capuche Boxy Coton Épais',
    category: 'vetement',
    price: 38000,
    status: 'published',
    createdAt: Date.now() - 3600000 * 16,
    colors: [
      {
        name: 'Gris Anthracite Délavé',
        hex: '#2B2B2B',
        front: 'assets/hoodie-front.jpg',
        back: 'assets/hoodie-back.jpg'
      }
    ],
    defaultColor: 'Gris Anthracite Délavé',
    image: 'assets/hoodie-front.jpg',
    imageBack: 'assets/hoodie-back.jpg'
  },
  {
    id: 'prod-4',
    name: 'Pull Zippé en Maille Côtelée Rayée',
    category: 'vetement',
    price: 42000,
    status: 'published',
    createdAt: Date.now() - 3600000 * 12,
    colors: [
      {
        name: 'Bleu Marine & Blanc',
        hex: '#1D2A44',
        front: 'assets/knit-front.jpg',
        back: 'assets/knit-back.jpg'
      }
    ],
    defaultColor: 'Bleu Marine & Blanc',
    image: 'assets/knit-front.jpg',
    imageBack: 'assets/knit-back.jpg'
  },
  {
    id: 'prod-5',
    name: 'T-Shirt Coupe Boxy Coton Lourd',
    category: 'vetement',
    price: 22000,
    status: 'published',
    createdAt: Date.now() - 3600000 * 8,
    colors: [
      {
        name: 'Blanc Vintage',
        hex: '#F0EFEA',
        front: 'assets/tee-front.jpg',
        back: 'assets/tee-back.jpg'
      }
    ],
    defaultColor: 'Blanc Vintage',
    image: 'assets/tee-front.jpg',
    imageBack: 'assets/tee-back.jpg'
  },
  {
    id: 'prod-6',
    name: 'Sneakers Rétro Streetwear Cuir Premium',
    category: 'chaussure',
    price: 55000,
    status: 'published',
    createdAt: Date.now() - 3600000 * 4,
    colors: [
      {
        name: 'Blanc & Noir',
        hex: '#FFFFFF',
        front: 'assets/sneakers-front.jpg',
        back: 'assets/sneakers-back.jpg'
      }
    ],
    defaultColor: 'Blanc & Noir',
    image: 'assets/sneakers-front.jpg',
    imageBack: 'assets/sneakers-back.jpg'
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
  shopName: 'Barry Aliou Shop',
  gnfRate: DEFAULT_GNF_RATE,
  displayCurrency: 'FCFA',
  activeCategoryFilter: 'all',
  activeProduct: null,
  activeColor: null,
  isFlipped: false,
  audioEnabled: true,
  editingColors: [],
  uploadedFrontDataUrl: '',
  uploadedBackDataUrl: ''
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
  if (cur === 'GNF') return `🇬🇳 ${formatGNF(amountFCFA)}`;
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

    state.shopName = 'Barry Aliou Shop';
    localStorage.setItem(STORAGE_KEYS.SHOP_NAME, 'Barry Aliou Shop');

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
const hangersPhysics = [];

function renderRailShowroom() {
  const container = document.getElementById('hangersContainer');
  if (!container) return;

  const published = state.products.filter(p => p.status === 'published');
  hangersPhysics.length = 0;

  container.innerHTML = published
    .map((prod, index) => {
      const activeColor = (prod.colors && prod.colors[0]) || {
        name: 'Standard',
        front: prod.image || ''
      };
      const frontImg = activeColor.front || prod.image || '';

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
        <article class="hanger-item" data-product-id="${escapeHtml(prod.id)}" data-index="${index}" title="Cliquer pour examiner la face et le dos">
          <!-- Crochet du cintre sur la tringle -->
          <div class="hanger-hook-visual">
            <svg viewBox="0 0 24 28" fill="none">
              <path d="M12 2C8 2 6 5 8 8C9.5 10.2 12 12 12 16V19" stroke-width="2.2" stroke-linecap="round"/>
              <path d="M2 24L12 19L22 24" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>

          <!-- Visuel suspendu -->
          <div class="hanger-garment-frame">
            <img class="hanger-garment-img" src="${escapeHtml(frontImg)}" alt="${escapeHtml(prod.name)}" loading="lazy" />
          </div>

          <!-- Ombre portée douce -->
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
  const viewport = document.getElementById('showroomSection');
  const tooltip = document.getElementById('railHoverTooltip');
  const tipTitle = document.getElementById('hoverTipTitle');
  const tipPrice = document.getElementById('hoverTipPrice');

  if (!viewport) return;

  const handlePointerMove = (clientX) => {
    const now = performance.now();
    if (lastMouseX !== null && lastMouseTime !== null) {
      const dt = Math.max(16, now - lastMouseTime);
      mouseVelocityX = (clientX - lastMouseX) / dt;
    }
    lastMouseX = clientX;
    lastMouseTime = now;

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
          hangersPhysics[idx].velocity = Math.max(-18, Math.min(18, hangersPhysics[idx].velocity));
        }
      }
    });
  };

  viewport.addEventListener('mousemove', e => {
    if (state.activeProduct) return;
    handlePointerMove(e.clientX);
  });

  viewport.addEventListener('touchmove', e => {
    if (state.activeProduct) return;
    if (e.touches && e.touches[0]) {
      handlePointerMove(e.touches[0].clientX);
    }
  }, { passive: true });

  const items = document.querySelectorAll('.hanger-item');
  items.forEach((item, idx) => {
    item.addEventListener('mouseenter', () => {
      if (state.activeProduct) return;
      const prod = state.products.find(p => p.id === item.dataset.productId);
      if (!prod) return;

      playSound('sway');

      if (hangersPhysics[idx]) {
        hangersPhysics[idx].targetLift = -10;
        hangersPhysics[idx].targetScale = 1.07;
      }

      if (hangersPhysics[idx - 1]) hangersPhysics[idx - 1].targetAngle = -4;
      if (hangersPhysics[idx + 1]) hangersPhysics[idx + 1].targetAngle = 4;

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

    item.addEventListener('click', () => {
      const prod = state.products.find(p => p.id === item.dataset.productId);
      if (prod) {
        if (tooltip) tooltip.classList.remove('active');
        openProductFocus(prod);
      }
    });
  });
}

function startPhysicsLoop() {
  const items = document.querySelectorAll('.hanger-item');
  const springK = 0.08;
  const damping = 0.88;

  items.forEach((el, idx) => {
    const phys = hangersPhysics[idx];
    if (!phys) return;

    const displacement = phys.currentAngle - phys.targetAngle;
    const force = -springK * displacement;
    phys.velocity = (phys.velocity + force) * damping;
    phys.currentAngle += phys.velocity;

    phys.lift += (phys.targetLift - phys.lift) * 0.2;
    phys.scale += (phys.targetScale - phys.scale) * 0.2;

    el.style.transform = `rotate(${phys.currentAngle.toFixed(2)}deg) translateY(${phys.lift.toFixed(1)}px) scale(${phys.scale.toFixed(3)})`;
  });

  requestAnimationFrame(startPhysicsLoop);
}

// ============================================================================
// VUE 2 : FICHE PRODUIT INTERACTIVE (DEUX BOUTONS FACE AVANT & VUE ARRIÈRE)
// ============================================================================
function openProductFocus(product) {
  state.activeProduct = product;
  state.isFlipped = false;

  const colors = product.colors && product.colors.length > 0 ? product.colors : [
    { name: 'Standard', hex: '#141413', front: product.image, back: product.imageBack || product.image }
  ];
  state.activeColor = colors[0];

  const viewport = document.getElementById('showroomSection');
  viewport.classList.add('in-product-view');

  // Remonter en haut pour voir le vêtement centré en 3D
  viewport.scrollIntoView({ behavior: 'smooth', block: 'start' });

  playSound('flip');

  document.getElementById('focusedProductTitle').textContent = product.name;
  document.getElementById('focusedMainPrice').textContent = formatPrimaryPriceByCurrency(product.price);
  document.getElementById('focusedGnfPrice').textContent = `🇬🇳 ${formatGNF(product.price)}`;
  document.getElementById('focusedIntlPrice').textContent = formatIntlEquivalent(product.price);

  const deposit = calculateTenPercent(product.price);
  document.getElementById('focusedDepositAmount').textContent = `${formatFCFA(deposit)} (🇬🇳 ${formatGNF(deposit)})`;

  updateFocusImages();
  renderMiniColorways(colors);

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
  backImg.src = state.activeColor.back || state.activeProduct.imageBack || state.activeColor.front || state.activeProduct.image;
}

// Sélecteur de couleurs (Mini-aperçus sur cintres)
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

        stack.querySelectorAll('.variant-mini-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');

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
  const viewport = document.getElementById('showroomSection');
  viewport.classList.remove('in-product-view');
  state.activeProduct = null;
  state.activeColor = null;
  state.isFlipped = false;
  playSound('sway');
}

// BASCULE DE FACE : FACE AVANT ET VUE ARRIÈRE (PILE & FACE)
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
// SECTION 2 : CATALOGUE COMPLET SCROLLABLE EN BAS DE PAGE
// ============================================================================
function renderShowcaseGrid() {
  const grid = document.getElementById('classicProductsGrid');
  if (!grid) return;

  const published = state.products.filter(p => p.status === 'published');
  const filter = state.activeCategoryFilter;

  const filtered = published.filter(p => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align:center; padding: 40px; color: var(--text-muted);">
        <p>Aucun article dans cette catégorie pour le moment.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered
    .map(p => {
      const activeColor = (p.colors && p.colors[0]) || { front: p.image, back: p.imageBack || p.image };
      const frontSrc = activeColor.front || p.image;
      const backSrc = activeColor.back || p.imageBack || p.image;

      const colorDots = (p.colors || []).map(c => `
        <span class="showcase-color-dot" style="background-color: ${escapeHtml(c.hex)};" title="${escapeHtml(c.name)}"></span>
      `).join('');

      return `
        <article class="showcase-card" data-card-id="${escapeHtml(p.id)}">
          <div class="showcase-media" data-action="inspect" data-id="${escapeHtml(p.id)}" title="Cliquer pour voir Face & Dos en 3D">
            <span class="card-face-toggle-badge">Face &amp; Dos 3D</span>
            <img class="showcase-img" id="cardImg-${p.id}" src="${escapeHtml(frontSrc)}" data-front="${escapeHtml(frontSrc)}" data-back="${escapeHtml(backSrc)}" alt="${escapeHtml(p.name)}" loading="lazy" />
          </div>

          <div class="showcase-card-body">
            <div class="showcase-title-row">
              <h3 class="showcase-title">${escapeHtml(p.name)}</h3>
              <div class="showcase-price">${formatPrimaryPriceByCurrency(p.price)}</div>
            </div>

            <div class="showcase-gnf-sub">🇬🇳 ${formatGNF(p.price)}</div>

            <div class="showcase-colors-row">
              ${colorDots}
              <span style="font-size:0.75rem; color:var(--text-muted); margin-left:4px;">${(p.colors || []).length} couleur(s)</span>
            </div>

            <div class="showcase-actions">
              <button type="button" class="btn-card-inspect" data-action="inspect" data-id="${escapeHtml(p.id)}">
                Examiner 3D (Face &amp; Dos)
              </button>
              <button type="button" class="btn-card-order" data-action="order" data-id="${escapeHtml(p.id)}">
                Commander
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join('');

  // Hover sur les photos pour faire aperçu dos
  grid.querySelectorAll('.showcase-media').forEach(media => {
    const img = media.querySelector('.showcase-img');
    if (!img) return;
    const front = img.dataset.front;
    const back = img.dataset.back;
    if (back && back !== front) {
      media.addEventListener('mouseenter', () => { img.src = back; });
      media.addEventListener('mouseleave', () => { img.src = front; });
    }
  });

  // Écouteurs de clics sur les cartes
  grid.addEventListener('click', e => {
    const inspectBtn = e.target.closest('[data-action="inspect"]');
    if (inspectBtn) {
      const prod = state.products.find(p => p.id === inspectBtn.dataset.id);
      if (prod) openProductFocus(prod);
      return;
    }

    const orderBtn = e.target.closest('[data-action="order"]');
    if (orderBtn) {
      const prod = state.products.find(p => p.id === orderBtn.dataset.id);
      if (prod) openOrderModal(prod);
    }
  });
}

// ============================================================================
// PANIER / BAG & COMMANDE
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
        <p style="font-size: 0.85rem; margin-top: 4px;">Sélectionnez une pièce sur la tringle ou dans le catalogue ci-dessous.</p>
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
  remainingEl.textContent = `${formatFCFA(remaining)} (à payer à la livraison)`;

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

  if (window.location.protocol !== 'file:') {
    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder)
    }).catch(() => {});
  }

  const waMsg = [
    `Bonjour Mamadou Aliou Barry !`,
    `Je viens de commander sur Barry Aliou Shop :`,
    `- Article : ${prod.name} (Couleur : ${colorName})`,
    `- Prix : ${formatFCFA(prod.price)} (${formatGNF(prod.price)})`,
    `- Acompte 10 % versé : ${formatFCFA(deposit)} (Réf : ${paymentRef})`,
    `- Solde à la livraison : ${formatFCFA(remaining)}`,
    `- Nom : ${fullName}`,
    `- Téléphone : ${phone}`,
    `- Adresse : ${address}`
  ].join('\n');

  document.getElementById('whatsappConfirmLink').href = `https://wa.me/${MERCHANT_WHATSAPP}?text=${encodeURIComponent(waMsg)}`;
  document.getElementById('orderForm').classList.add('hidden');
  document.getElementById('orderSuccessView').classList.remove('hidden');

  state.cart = state.cart.filter(item => item.id !== prod.id);
  saveCart();

  renderRailShowroom();
  renderShowcaseGrid();
  closeProductFocus();
  showToast("Commande validée ! L'article a été réservé.");
}

// ============================================================================
// FAVORIS & COMPTE CLIENT
// ============================================================================
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
// ESPACE ADMINISTRATEUR SÉCURISÉ & AJOUT D'ARTICLE PILE ET FACE
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
        renderShowcaseGrid();
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
      renderShowcaseGrid();
      renderAdminUI();
      showToast('Article supprimé.');
    });
  });
}

// Gestion des deux photos (Face Avant & Vue Arrière) dans le formulaire Admin
function initAdminPhotoUploads() {
  const fileFront = document.getElementById('productPhotoFileFront');
  const fileBack = document.getElementById('productPhotoFileBack');

  document.getElementById('photoDropzoneFront').addEventListener('click', (e) => {
    if (e.target.id === 'changePhotoBtnFront' || e.target.closest('#photoPlaceholderFront') || e.target.id === 'photoDropzoneFront') {
      fileFront.click();
    }
  });

  document.getElementById('photoDropzoneBack').addEventListener('click', (e) => {
    if (e.target.id === 'changePhotoBtnBack' || e.target.closest('#photoPlaceholderBack') || e.target.id === 'photoDropzoneBack') {
      fileBack.click();
    }
  });

  fileFront.addEventListener('change', e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => {
        state.uploadedFrontDataUrl = ev.target.result;
        document.getElementById('productPhotoPreviewFront').src = ev.target.result;
        document.getElementById('photoPlaceholderFront').classList.add('hidden');
        document.getElementById('photoPreviewWrapperFront').classList.remove('hidden');
      };
      reader.readAsDataURL(file);
    }
  });

  fileBack.addEventListener('change', e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => {
        state.uploadedBackDataUrl = ev.target.result;
        document.getElementById('productPhotoPreviewBack').src = ev.target.result;
        document.getElementById('photoPlaceholderBack').classList.add('hidden');
        document.getElementById('photoPreviewWrapperBack').classList.remove('hidden');
      };
      reader.readAsDataURL(file);
    }
  });

  document.getElementById('productForm').addEventListener('submit', e => {
    e.preventDefault();
    if (!state.isAdmin) return;

    const name = document.getElementById('productNameInput').value.trim();
    const price = Number(document.getElementById('productPriceInput').value);
    const urlFront = document.getElementById('productPhotoUrlFront').value.trim();
    const urlBack = document.getElementById('productPhotoUrlBack').value.trim();

    const finalFront = state.uploadedFrontDataUrl || urlFront;
    const finalBack = state.uploadedBackDataUrl || urlBack || finalFront;

    if (!name || !price || price <= 0) {
      showToast('Veuillez renseigner un nom et un prix valides.');
      return;
    }

    if (!finalFront) {
      showToast('Veuillez renseigner au moins la photo de face avant.');
      return;
    }

    const newProd = {
      id: 'prod-' + Date.now(),
      name,
      category: 'vetement',
      price,
      image: finalFront,
      imageBack: finalBack,
      status: 'published',
      createdAt: Date.now(),
      colors: [
        {
          name: 'Standard',
          hex: '#141413',
          front: finalFront,
          back: finalBack
        }
      ],
      defaultColor: 'Standard'
    };

    state.products.unshift(newProd);
    saveProducts();

    if (window.location.protocol !== 'file:') {
      fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProd)
      }).catch(() => {});
    }

    renderRailShowroom();
    renderShowcaseGrid();
    renderAdminUI();
    document.getElementById('productModalBackdrop').classList.add('hidden');
    document.getElementById('productForm').reset();
    showToast(`"${name}" avec Face Avant & Vue Arrière a été publié !`);
  });
}

// ============================================================================
// ÉCOUTEURS D'ÉVÉNEMENTS & INITIALISATION
// ============================================================================
function initEventListeners() {
  // Sons tactiles ON/OFF
  const audioBtn = document.getElementById('audioToggleBtn');
  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      state.audioEnabled = !state.audioEnabled;
      localStorage.setItem(STORAGE_KEYS.AUDIO_ENABLED, String(state.audioEnabled));
      document.getElementById('audioIcon').textContent = state.audioEnabled ? '🔊' : '🔇';
      showToast(state.audioEnabled ? 'Sons tactiles activés 🔊' : 'Mode silencieux 🔇');
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
      renderShowcaseGrid();
      showToast(`Devise d'affichage : ${e.target.value}`);
    });
  }

  // Filtres par catégorie
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.activeCategoryFilter = pill.dataset.filter;
      renderShowcaseGrid();
    });
  });

  // Bouton retour tringle
  const returnBtn = document.getElementById('returnRackBtn');
  if (returnBtn) returnBtn.addEventListener('click', closeProductFocus);

  // LES DEUX BOUTONS : FACE AVANT ET VUE ARRIÈRE
  const btnFront = document.getElementById('btnSideFront');
  const btnBack = document.getElementById('btnSideBack');
  if (btnFront) btnFront.addEventListener('click', () => toggleGarmentSide('front'));
  if (btnBack) btnBack.addEventListener('click', () => toggleGarmentSide('back'));

  // Touche Échap
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (state.activeProduct) closeProductFocus();
      closeCartDrawer();
      document.getElementById('orderModalBackdrop').classList.add('hidden');
      document.getElementById('customerAuthModalBackdrop').classList.add('hidden');
      document.getElementById('loginModalBackdrop').classList.add('hidden');
      document.getElementById('productModalBackdrop').classList.add('hidden');
    }
  });

  // Actions produit focalisé
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

  // Panier
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

  // Commande
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

  // Onglets paiement
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

  // Favoris & Compte
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
          <button type="button" class="btn btn-sm btn-primary" onclick="openProductFocus(state.products.find(x => x.id === '${p.id}')); document.getElementById('favoritesModalBackdrop').classList.add('hidden');">Voir Face &amp; Dos</button>
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

  document.getElementById('openAddProductBtn').addEventListener('click', () => {
    document.getElementById('productForm').reset();
    document.getElementById('photoPreviewWrapperFront').classList.add('hidden');
    document.getElementById('photoPlaceholderFront').classList.remove('hidden');
    document.getElementById('photoPreviewWrapperBack').classList.add('hidden');
    document.getElementById('photoPlaceholderBack').classList.remove('hidden');
    state.uploadedFrontDataUrl = '';
    state.uploadedBackDataUrl = '';
    document.getElementById('productModalBackdrop').classList.remove('hidden');
  });
  document.getElementById('adminBannerAddBtn').addEventListener('click', () => {
    document.getElementById('openAddProductBtn').click();
  });
  document.getElementById('closeProductModalBtn').addEventListener('click', () => {
    document.getElementById('productModalBackdrop').classList.add('hidden');
  });
  document.getElementById('cancelProductModalBtn').addEventListener('click', () => {
    document.getElementById('productModalBackdrop').classList.add('hidden');
  });

  initAdminPhotoUploads();
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  loadStateFromStorage();
  updateCartBadge();
  updateFavoritesBadge();
  renderRailShowroom();
  renderShowcaseGrid();
  initEventListeners();
  startPhysicsLoop();

  if (state.isAdmin) {
    document.getElementById('adminHeaderControls').classList.remove('hidden');
    renderAdminUI();
  }
});
