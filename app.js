/**
 * Barry Aliou Shop — Boutique Internationale de Vêtements & Chaussures
 * Administrateur : mamadoualioubarry1871@gmail.com
 * Numéro officiel (Wave, Orange Money & WhatsApp) : +221 77 453 22 55
 * Devises : FCFA (XOF), Franc Guinéen (GNF), Euro (€ EUR), Dollar ($ USD)
 * Compte Client obligatoire (Nom, Prénom, Téléphone) pour sauvegarder en Favoris
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
  PRODUCTS: 'mab_elegance_products_v1',
  ORDERS: 'mab_elegance_orders_v1',
  ADMIN_SESSION: 'barry_aliou_admin_session_v2',
  ADMIN_PIN: 'barry_aliou_admin_pin_v1',
  LOGIN_ATTEMPTS: 'barry_aliou_login_attempts_v1',
  SHOP_NAME: 'barry_aliou_shop_name_v2',
  CUSTOMERS: 'barry_aliou_customers_v1',
  CURRENT_CUSTOMER: 'barry_aliou_current_customer_v1',
  GNF_RATE: 'barry_aliou_gnf_rate_v1',
  DISPLAY_CURRENCY: 'barry_aliou_display_currency_v1'
};

const PRESET_COLORS = [
  { name: 'Noir', hex: '#141413' },
  { name: 'Blanc', hex: '#FFFFFF' },
  { name: 'Beige Sable', hex: '#D8C3A5' },
  { name: 'Bleu Marine', hex: '#1E293B' },
  { name: 'Bleu Ciel', hex: '#60A5FA' },
  { name: 'Rouge Bordeaux', hex: '#7F1D1D' },
  { name: 'Rouge Vif', hex: '#DC2626' },
  { name: 'Vert Émeraude', hex: '#047857' },
  { name: 'Kaki', hex: '#57534E' },
  { name: 'Marron Chocolat', hex: '#5C3A21' },
  { name: 'Gris Anthracite', hex: '#4B5563' },
  { name: 'Rose Poudré', hex: '#F4ACB7' },
  { name: 'Doré / Champagne', hex: '#C59B27' }
];

const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Ensemble Costume Croisé Prestige',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80',
    colors: [
      { name: 'Noir', hex: '#141413' },
      { name: 'Bleu Marine', hex: '#1E293B' },
      { name: 'Beige Sable', hex: '#D8C3A5' }
    ],
    status: 'published',
    createdAt: Date.now() - 3600000 * 24
  },
  {
    id: 'prod-2',
    name: 'Robe Longue Fluide en Soie Satinée',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80',
    colors: [
      { name: 'Rouge Bordeaux', hex: '#7F1D1D' },
      { name: 'Vert Émeraude', hex: '#047857' },
      { name: 'Doré / Champagne', hex: '#C59B27' }
    ],
    status: 'published',
    createdAt: Date.now() - 3600000 * 20
  },
  {
    id: 'prod-3',
    name: 'Chemise Oxford Coupe Ajustée',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80',
    colors: [
      { name: 'Blanc', hex: '#FFFFFF' },
      { name: 'Bleu Ciel', hex: '#60A5FA' },
      { name: 'Noir', hex: '#141413' }
    ],
    status: 'published',
    createdAt: Date.now() - 3600000 * 16
  },
  {
    id: 'prod-4',
    name: 'Sneakers Urbaines Cuir Premium',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80',
    colors: [
      { name: 'Blanc', hex: '#FFFFFF' },
      { name: 'Marron Chocolat', hex: '#5C3A21' },
      { name: 'Noir', hex: '#141413' }
    ],
    status: 'published',
    createdAt: Date.now() - 3600000 * 12
  },
  {
    id: 'prod-5',
    name: 'Ensemble Tunique & Pantalon Chic',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
    colors: [
      { name: 'Beige Sable', hex: '#D8C3A5' },
      { name: 'Rose Poudré', hex: '#F4ACB7' },
      { name: 'Blanc', hex: '#FFFFFF' }
    ],
    status: 'published',
    createdAt: Date.now() - 3600000 * 8
  },
  {
    id: 'prod-6',
    name: 'Mocassins en Daim Véritable',
    price: 22000,
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=900&q=80',
    colors: [
      { name: 'Marron Chocolat', hex: '#5C3A21' },
      { name: 'Noir', hex: '#141413' },
      { name: 'Bleu Marine', hex: '#1E293B' }
    ],
    status: 'published',
    createdAt: Date.now() - 3600000 * 4
  }
];

let state = {
  products: [],
  orders: [],
  customers: [],
  currentCustomer: null,
  pendingFavoriteProductId: null,
  isAdmin: false,
  shopName: 'Barry Aliou Shop',
  gnfRate: DEFAULT_GNF_RATE,
  displayCurrency: 'FCFA',
  searchQuery: '',
  activeDetailProduct: null,
  activeOrderProduct: null,
  selectedOrderColor: '',
  selectedPaymentMethod: 'Wave',
  editingColors: [],
  uploadedPhotoDataUrl: ''
};

// ============================================================================
// UTILITAIRES DE FORMATAGE & CONVERSION (FCFA, FRANC GUINÉEN GNF, USD, EUR)
// ============================================================================
function formatFCFA(amount) {
  const num = Math.round(Number(amount) || 0);
  return num.toLocaleString('fr-FR') + ' FCFA';
}

function convertToGNF(amountFCFA) {
  const num = Number(amountFCFA) || 0;
  // Arrondi au multiple de 50 GNF le plus proche pour un affichage guinéen propre
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
  return `≈ ${usd} $ USD • ${eur} € EUR`;
}

function formatPrimaryPriceByCurrency(amountFCFA) {
  const cur = state.displayCurrency;
  if (cur === 'GNF') return formatGNF(amountFCFA);
  if (cur === 'USD') {
    const usd = Math.max(1, Math.round((Number(amountFCFA) || 0) / RATE_USD));
    return `${usd} $ USD`;
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

function sanitizeInput(str) {
  return String(str || '')
    .replace(/[<>]/g, '')
    .trim();
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

// ============================================================================
// CHARGEMENT & SAUVEGARDE DES DONNÉES
// ============================================================================
function loadStateFromStorage() {
  try {
    const savedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (savedProducts) {
      state.products = JSON.parse(savedProducts);
    } else {
      state.products = INITIAL_PRODUCTS;
      saveProducts();
    }

    const savedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
    state.orders = savedOrders ? JSON.parse(savedOrders) : [];

    const savedCustomers = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
    state.customers = savedCustomers ? JSON.parse(savedCustomers) : [];

    const savedCurrentCustomerPhone = localStorage.getItem(STORAGE_KEYS.CURRENT_CUSTOMER);
    if (savedCurrentCustomerPhone) {
      const found = state.customers.find(c => c.phone === savedCurrentCustomerPhone);
      if (found) state.currentCustomer = found;
    }

    const savedGnfRate = parseFloat(localStorage.getItem(STORAGE_KEYS.GNF_RATE));
    if (!isNaN(savedGnfRate) && savedGnfRate > 0) {
      state.gnfRate = savedGnfRate;
    }

    const savedCurrency = localStorage.getItem(STORAGE_KEYS.DISPLAY_CURRENCY);
    if (savedCurrency && ['FCFA', 'GNF', 'USD', 'EUR'].includes(savedCurrency)) {
      state.displayCurrency = savedCurrency;
      const sel = document.getElementById('currencySelector');
      if (sel) sel.value = savedCurrency;
    }

    const rawSession = localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION);
    if (rawSession) {
      const parsed = JSON.parse(rawSession);
      const twelveHours = 12 * 60 * 60 * 1000;
      if (parsed.email === ADMIN_EMAIL && Date.now() - parsed.timestamp < twelveHours) {
        state.isAdmin = true;
      } else {
        localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
        state.isAdmin = false;
      }
    }

    const savedShopName = localStorage.getItem(STORAGE_KEYS.SHOP_NAME);
    if (savedShopName && savedShopName !== 'MAB Élégance') {
      state.shopName = savedShopName;
    } else {
      state.shopName = 'Barry Aliou Shop';
      localStorage.setItem(STORAGE_KEYS.SHOP_NAME, 'Barry Aliou Shop');
    }
  } catch (err) {
    console.error('Erreur lors du chargement :', err);
    state.products = INITIAL_PRODUCTS;
  }
}

async function apiRequest(endpoint, method = 'GET', body = null) {
  if (window.location.protocol === 'file:') return null;
  try {
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' }
    };
    if (body) options.body = JSON.stringify(body);
    const res = await fetch(endpoint, options);
    if (!res.ok) return null;
    return await res.json();
  } catch (_) {
    return null;
  }
}

async function syncWithServerDatabase() {
  const data = await apiRequest('/api/bootstrap', 'GET');
  if (!data) return;

  if (Array.isArray(data.products)) {
    state.products = data.products;
    saveProducts();
  }
  if (Array.isArray(data.orders)) {
    state.orders = data.orders;
    saveOrders();
  }
  if (Array.isArray(data.customers)) {
    state.customers = data.customers;
    if (state.currentCustomer) {
      const updatedMe = state.customers.find(c => c.phone === state.currentCustomer.phone);
      if (updatedMe) state.currentCustomer = updatedMe;
    }
    saveCustomers();
  }
  if (data.settings) {
    if (data.settings.shopName) {
      state.shopName = data.settings.shopName;
      localStorage.setItem(STORAGE_KEYS.SHOP_NAME, state.shopName);
    }
    if (data.settings.gnfRate) {
      const r = parseFloat(data.settings.gnfRate);
      if (!isNaN(r) && r > 0) {
        state.gnfRate = r;
        localStorage.setItem(STORAGE_KEYS.GNF_RATE, String(r));
      }
    }
    if (data.settings.adminPin) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_PIN, data.settings.adminPin);
    }
  }

  updateCustomerHeaderUI();
  renderAdminUI();
  renderPublicCatalogue();
}

function saveProducts() {
  try {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(state.products));
  } catch (err) {
    showToast('Attention : espace de stockage local presque plein.');
  }
}

function saveOrders() {
  try {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(state.orders));
  } catch (err) {
    console.error(err);
  }
}

function saveCustomers() {
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(state.customers));
    if (state.currentCustomer) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_CUSTOMER, state.currentCustomer.phone);
      apiRequest('/api/customers', 'POST', state.currentCustomer);
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_CUSTOMER);
    }
  } catch (err) {
    console.error(err);
  }
}

function showToast(message) {
  const toast = document.getElementById('toastNotification');
  const msgEl = document.getElementById('toastMessage');
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  toast.classList.remove('hidden');

  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    toast.classList.add('hidden');
  }, 3600);
}

// ============================================================================
// GESTION DU COMPTE CLIENT & APPLICATION DE FAVORIS ❤️
// ============================================================================
function isProductFavorited(productId) {
  if (!state.currentCustomer || !Array.isArray(state.currentCustomer.favorites)) {
    return false;
  }
  return state.currentCustomer.favorites.includes(productId);
}

function updateCustomerHeaderUI() {
  const favCountEl = document.getElementById('favoritesHeaderCount');
  const custLabelEl = document.getElementById('customerHeaderLabel');

  if (state.currentCustomer) {
    const favCount = (state.currentCustomer.favorites || []).length;
    favCountEl.textContent = favCount;
    custLabelEl.textContent = state.currentCustomer.firstName;
  } else {
    favCountEl.textContent = '0';
    custLabelEl.textContent = 'Compte Client';
  }
}

function handleToggleFavorite(productId) {
  // Si le client n'a pas encore de compte connecté, on ouvre obligatoirement le formulaire d'inscription
  if (!state.currentCustomer) {
    state.pendingFavoriteProductId = productId;
    openCustomerAuthModal(true);
    showToast('Créez votre compte (Nom, Prénom, Téléphone) pour ajouter cet article en favoris ❤️');
    return;
  }

  if (!Array.isArray(state.currentCustomer.favorites)) {
    state.currentCustomer.favorites = [];
  }

  const idx = state.currentCustomer.favorites.indexOf(productId);
  if (idx !== -1) {
    state.currentCustomer.favorites.splice(idx, 1);
    showToast('Article retiré de vos favoris.');
  } else {
    state.currentCustomer.favorites.push(productId);
    showToast('❤️ Article ajouté à vos favoris !');
  }

  // Synchroniser dans la liste globale des clients
  const custIdx = state.customers.findIndex(c => c.phone === state.currentCustomer.phone);
  if (custIdx !== -1) {
    state.customers[custIdx] = state.currentCustomer;
  }
  saveCustomers();

  updateCustomerHeaderUI();
  renderPublicCatalogue();
  renderAdminUI();

  // Mettre à jour le bouton dans la modale détail si elle est ouverte
  if (state.activeDetailProduct && state.activeDetailProduct.id === productId) {
    updateDetailModalFavButton(productId);
  }
}

function openCustomerAuthModal(fromFavoriteClick = false) {
  const modal = document.getElementById('customerAuthModalBackdrop');
  const form = document.getElementById('customerRegisterForm');
  const profileView = document.getElementById('customerProfileView');
  const titleEl = document.getElementById('customerAuthTitle');
  const banner = document.getElementById('authPromptBanner');

  if (state.currentCustomer) {
    titleEl.textContent = 'Mon Compte Client';
    form.classList.add('hidden');
    profileView.classList.remove('hidden');
    document.getElementById('profileFullNameDisplay').textContent =
      `${state.currentCustomer.firstName} ${state.currentCustomer.lastName}`;
    document.getElementById('profilePhoneDisplay').textContent = state.currentCustomer.phone;
  } else {
    titleEl.textContent = 'Inscription Client (Favoris ❤️)';
    form.classList.remove('hidden');
    profileView.classList.add('hidden');
    if (fromFavoriteClick) {
      banner.textContent =
        'Pour ajouter cette publication en favoris et la retrouver plus tard, inscrivez-vous avec votre nom, prénom et numéro de téléphone :';
    } else {
      banner.textContent =
        'Créez votre compte ou connectez-vous avec votre nom, prénom et numéro de téléphone pour gérer vos favoris :';
    }
  }

  modal.classList.remove('hidden');
}

function handleCustomerRegisterSubmit(e) {
  e.preventDefault();

  const lastName = sanitizeInput(document.getElementById('clientLastNameInput').value);
  const firstName = sanitizeInput(document.getElementById('clientFirstNameInput').value);
  const phone = sanitizeInput(document.getElementById('clientPhoneInput').value);

  if (!lastName || !firstName || phone.replace(/[^\d]/g, '').length < 7) {
    showToast('Veuillez renseigner votre nom, prénom et un numéro de téléphone valide.');
    return;
  }

  // Vérifier si ce numéro existe déjà pour restaurer ses favoris
  const cleanDigits = phone.replace(/[^\d]/g, '');
  let existingCustomer = state.customers.find(
    c => c.phone.replace(/[^\d]/g, '') === cleanDigits
  );

  if (existingCustomer) {
    existingCustomer.lastName = lastName;
    existingCustomer.firstName = firstName;
    existingCustomer.phone = phone;
    state.currentCustomer = existingCustomer;
  } else {
    const newCustomer = {
      id: 'cust-' + Date.now(),
      lastName,
      firstName,
      phone,
      favorites: [],
      createdAt: Date.now()
    };
    state.customers.unshift(newCustomer);
    state.currentCustomer = newCustomer;
  }

  // Si le client avait cliqué sur "Ajouter en favoris" avant de s'inscrire, l'ajouter immédiatement !
  if (state.pendingFavoriteProductId) {
    if (!state.currentCustomer.favorites.includes(state.pendingFavoriteProductId)) {
      state.currentCustomer.favorites.push(state.pendingFavoriteProductId);
    }
    if (
      state.activeDetailProduct &&
      state.activeDetailProduct.id === state.pendingFavoriteProductId
    ) {
      updateDetailModalFavButton(state.pendingFavoriteProductId);
    }
    state.pendingFavoriteProductId = null;
    showToast(`Bienvenue ${firstName} ! L'article a été ajouté à vos favoris ❤️`);
  } else {
    showToast(`Bienvenue ${firstName} ${lastName} ! Votre compte client est actif.`);
  }

  saveCustomers();
  updateCustomerHeaderUI();
  renderPublicCatalogue();
  renderAdminUI();

  document.getElementById('customerRegisterForm').reset();
  document.getElementById('customerAuthModalBackdrop').classList.add('hidden');
}

function handleCustomerLogout() {
  state.currentCustomer = null;
  saveCustomers();
  updateCustomerHeaderUI();
  renderPublicCatalogue();
  document.getElementById('customerAuthModalBackdrop').classList.add('hidden');
  showToast('Vous êtes déconnecté de votre compte client.');
}

function openFavoritesModal() {
  if (!state.currentCustomer) {
    openCustomerAuthModal(true);
    showToast('Connectez-vous ou inscrivez-vous pour accéder à vos favoris ❤️');
    return;
  }

  document.getElementById('favBarUserName').textContent =
    `${state.currentCustomer.firstName} ${state.currentCustomer.lastName} (${state.currentCustomer.phone})`;

  renderFavoritesList();
  document.getElementById('favoritesModalBackdrop').classList.remove('hidden');
}

function renderFavoritesList() {
  const container = document.getElementById('favoritesListContainer');
  const favIds = (state.currentCustomer && state.currentCustomer.favorites) || [];
  const favProducts = state.products.filter(p => favIds.includes(p.id));

  if (favProducts.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align:center; padding: 36px 20px; color: var(--text-secondary);">
        <div style="font-size:2.2rem; margin-bottom:8px;">🤍</div>
        <h4>Vous n'avez aucun article en favoris pour le moment</h4>
        <p style="font-size:0.88rem; margin-top:4px;">Cliquez sur le cœur ❤️ sur les articles de la boutique pour les retrouver facilement ici plus tard.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = favProducts
    .map(product => {
      const isAvailable = product.status === 'published';
      const deposit = calculateTenPercent(product.price);
      return `
        <div class="fav-item-card">
          <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" />
          <div class="fav-item-body">
            <span class="status-badge ${isAvailable ? 'status-published' : 'status-ordered'}">
              ${isAvailable ? '● Disponible' : '● Déjà commandé'}
            </span>
            <h4>${escapeHtml(product.name)}</h4>
            <div style="font-weight:800; font-size:0.98rem;">${formatFCFA(product.price)}</div>
            <div class="product-gnf-price">🇬🇳 ${formatGNF(product.price)}</div>
            <div style="font-size:0.76rem; color:var(--wave-dark); font-weight:700;">
              Acompte 10 % : ${formatFCFA(deposit)} (${formatGNF(deposit)})
            </div>

            <div class="fav-item-actions">
              ${
                isAvailable
                  ? `<button type="button" class="btn btn-primary btn-sm" style="flex:1;" data-fav-action="order" data-id="${escapeHtml(product.id)}">Commander</button>
                     <button type="button" class="btn btn-secondary btn-sm" data-fav-action="view" data-id="${escapeHtml(product.id)}">Voir</button>`
                  : `<span style="font-size:0.78rem; color:var(--text-muted); flex:1;">Cet article a été vendu</span>`
              }
              <button type="button" class="btn btn-ghost btn-sm" style="color:var(--danger);" data-fav-action="remove" data-id="${escapeHtml(product.id)}" title="Retirer des favoris">✕</button>
            </div>
          </div>
        </div>
      `;
    })
    .join('');
}

// ============================================================================
// RENDU DU CATALOGUE PUBLIC (UNIQUEMENT LES ARTICLES PUBLIÉS)
// ============================================================================
function renderPublicCatalogue() {
  const grid = document.getElementById('productsGrid');
  const emptyState = document.getElementById('emptyCatalogueState');
  const countLabel = document.getElementById('catalogueCountLabel');
  const emptyStateAddBtn = document.getElementById('emptyStateAddBtn');
  const catalogueAddBtn = document.getElementById('catalogueAddBtn');

  const publishedProducts = state.products.filter(p => p.status === 'published');

  const query = state.searchQuery.trim().toLowerCase();
  const filteredProducts = publishedProducts.filter(product => {
    if (!query) return true;
    const matchName = product.name.toLowerCase().includes(query);
    const matchColor = (product.colors || []).some(c => c.name.toLowerCase().includes(query));
    return matchName || matchColor;
  });

  const count = filteredProducts.length;
  countLabel.textContent = count > 1 ? `${count} articles disponibles` : `${count} article disponible`;

  if (state.isAdmin) {
    catalogueAddBtn.classList.remove('hidden');
    emptyStateAddBtn.classList.remove('hidden');
  } else {
    catalogueAddBtn.classList.add('hidden');
    emptyStateAddBtn.classList.add('hidden');
  }

  if (filteredProducts.length === 0) {
    grid.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  grid.innerHTML = filteredProducts
    .map(product => {
      const isFav = isProductFavorited(product.id);
      const colorsList = product.colors || [];

      const colorDotsHtml = colorsList
        .map(
          c =>
            `<span class="color-dot-clean" style="background-color: ${escapeHtml(c.hex)};" title="${escapeHtml(c.name)}"></span>`
        )
        .join('');

      const colorCountLabel =
        colorsList.length > 1
          ? `${colorsList.length} couleurs`
          : `${colorsList.length} couleur`;

      const adminOverlayBtns = state.isAdmin
        ? `
        <div class="card-admin-controls">
          <button type="button" class="card-admin-btn" data-action="edit" data-id="${escapeHtml(product.id)}" title="Modifier cet article">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          </button>
          <button type="button" class="card-admin-btn delete" data-action="delete" data-id="${escapeHtml(product.id)}" title="Supprimer cet article">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>
      `
        : '';

      return `
        <article class="product-card" data-product-id="${escapeHtml(product.id)}">
          <div class="product-image-wrap" data-action="view-ad" data-id="${escapeHtml(product.id)}" title="Voir l'annonce en grand">
            <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" loading="lazy" />
            ${adminOverlayBtns}
            <button
              type="button"
              class="card-fav-btn ${isFav ? 'active' : ''}"
              data-action="toggle-fav"
              data-id="${escapeHtml(product.id)}"
              title="${isFav ? 'Retirer des favoris' : 'Ajouter en favoris'}"
            >
              <span>${isFav ? '❤️' : '🤍'}</span>
            </button>
          </div>

          <div class="product-card-body">
            <div class="product-top-row">
              <h3 class="product-title" data-action="view-ad" data-id="${escapeHtml(product.id)}">${escapeHtml(product.name)}</h3>
              <span class="product-price">${formatPrimaryPriceByCurrency(product.price)}</span>
            </div>

            <div class="card-color-dots">
              ${colorDotsHtml}
              <span class="color-count-text">${colorCountLabel}</span>
            </div>

            <div class="product-card-footer">
              <button type="button" class="btn-card-action btn-view" data-action="view-ad" data-id="${escapeHtml(product.id)}">
                Voir l'annonce
              </button>
              <button type="button" class="btn-card-action btn-order" data-action="order" data-id="${escapeHtml(product.id)}">
                Commander
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join('');
}

// ============================================================================
// MODALE 0 : VOIR L'ANNONCE EN DÉTAIL + WHATSAPP + BOUTON FAVORIS
// ============================================================================
function updateDetailModalFavButton(productId) {
  const btn = document.getElementById('detailToggleFavBtn');
  if (!btn) return;
  const isFav = isProductFavorited(productId);
  btn.classList.toggle('active', isFav);
  btn.textContent = isFav ? '❤️ Dans vos favoris' : '🤍 Ajouter en favoris';
}

function openProductDetailModal(productId) {
  const product = state.products.find(p => p.id === productId && p.status === 'published');
  if (!product) {
    showToast("Cet article n'est plus disponible.");
    return;
  }

  state.activeDetailProduct = product;
  const deposit = calculateTenPercent(product.price);

  document.getElementById('detailProductImage').src = product.image;
  document.getElementById('detailProductImage').alt = product.name;
  document.getElementById('detailProductName').textContent = product.name;
  document.getElementById('detailProductPrice').textContent = formatFCFA(product.price);
  document.getElementById('detailProductPriceGnf').textContent = `🇬🇳 Prix Guinée : ${formatGNF(product.price)}`;
  document.getElementById('detailProductPriceIntl').textContent = formatIntlEquivalent(product.price);
  document.getElementById('detailDepositAmount').textContent =
    `${formatFCFA(deposit)} • 🇬🇳 ${formatGNF(deposit)} (${formatIntlEquivalent(deposit)})`;

  updateDetailModalFavButton(product.id);

  const colorsHtml = (product.colors || [])
    .map(
      c => `
      <span class="color-chip">
        <span class="color-dot" style="background-color: ${escapeHtml(c.hex)};"></span>
        ${escapeHtml(c.name)}
      </span>
    `
    )
    .join('');
  document.getElementById('detailColorsList').innerHTML = colorsHtml;

  const colorListText = (product.colors || []).map(c => c.name).join(', ');
  const waMessage = [
    `Bonjour ${state.shopName} !`,
    `Je consulte votre annonce sur le site et j'aimerais vous contacter à propos de :`,
    `- Article : ${product.name}`,
    `- Prix : ${formatFCFA(product.price)} (${formatGNF(product.price)})`,
    `- Acompte 10 % : ${formatFCFA(deposit)} (${formatGNF(deposit)})`,
    `- Couleurs disponibles : ${colorListText}`
  ].join('\n');

  const waUrl = `https://wa.me/${MERCHANT_WHATSAPP}?text=${encodeURIComponent(waMessage)}`;
  document.getElementById('detailWhatsappBtn').href = waUrl;

  document.getElementById('detailModalBackdrop').classList.remove('hidden');
}

// ============================================================================
// RENDU DU TABLEAU DE BORD ADMINISTRATEUR
// ============================================================================
function renderAdminUI() {
  const loginBtn = document.getElementById('openLoginModalBtn');
  const adminControls = document.getElementById('adminHeaderControls');
  const adminDashboard = document.getElementById('adminDashboardSection');
  const adminOrdersBadge = document.getElementById('adminOrdersBadge');

  document.getElementById('brandNameDisplay').textContent = state.shopName;
  document.getElementById('footerBrandName').textContent = state.shopName;
  document.title = `${state.shopName} — Boutique Internationale de Vêtements & Chaussures`;

  const gnfLabel = document.getElementById('currentGnfRateLabel');
  if (gnfLabel) gnfLabel.textContent = state.gnfRate;

  if (!state.isAdmin) {
    loginBtn.classList.remove('hidden');
    adminControls.classList.add('hidden');
    adminDashboard.classList.add('hidden');
    return;
  }

  loginBtn.classList.add('hidden');
  adminControls.classList.remove('hidden');
  adminDashboard.classList.remove('hidden');

  const publishedCount = state.products.filter(p => p.status === 'published').length;
  const ordersCount = state.orders.length;
  const totalDeposits = state.orders.reduce((sum, o) => sum + (Number(o.depositAmount) || 0), 0);
  const customersCount = state.customers.length;

  adminOrdersBadge.textContent = ordersCount;
  document.getElementById('statPublishedCount').textContent = publishedCount;
  document.getElementById('statOrdersCount').textContent = ordersCount;
  document.getElementById('statDepositsTotal').textContent = formatFCFA(totalDeposits);
  document.getElementById('statCustomersCount').textContent = customersCount;

  document.getElementById('tabOrdersCount').textContent = ordersCount;
  document.getElementById('tabInventoryCount').textContent = state.products.length;
  document.getElementById('tabCustomersCount').textContent = customersCount;

  renderAdminOrdersList();
  renderAdminInventoryList();
  renderAdminCustomersList();
}

function renderAdminOrdersList() {
  const container = document.getElementById('ordersListContainer');
  if (state.orders.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding: 28px; color: var(--text-secondary);">
        Aucune commande reçue pour le moment.
      </div>
    `;
    return;
  }

  container.innerHTML = state.orders
    .map(order => {
      const dateStr = new Date(order.createdAt).toLocaleString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      const cleanPhone = String(order.customerPhone || '').replace(/[^\d]/g, '');
      const waClientUrl = `https://wa.me/${cleanPhone}`;

      const linkedProduct = state.products.find(p => p.id === order.productId);
      const canRepublish = linkedProduct && linkedProduct.status === 'ordered';
      const locationDisplay = [order.customerCountry, order.customerAddress].filter(Boolean).join(' — ') || 'Sénégal';

      return `
        <div class="order-admin-item">
          <div class="order-admin-left">
            <img src="${escapeHtml(order.productImage)}" alt="${escapeHtml(order.productName)}" class="order-admin-thumb" />
            <div class="order-admin-meta">
              <h4>${escapeHtml(order.productName)}</h4>
              <div class="order-client-badges">
                <span class="client-pill">👤 ${escapeHtml(order.customerName)}</span>
                <span class="client-pill">📞 ${escapeHtml(order.customerPhone)}</span>
                <span class="client-pill">🌍 ${escapeHtml(locationDisplay)}</span>
                <span class="client-pill">🎨 ${escapeHtml(order.selectedColor)}</span>
                <span class="client-pill">💳 ${escapeHtml(order.paymentMethod)} (Réf: ${escapeHtml(order.paymentReference || 'Validé')})</span>
                <span>🕒 ${escapeHtml(dateStr)}</span>
              </div>
            </div>
          </div>

          <div class="order-admin-right">
            <div class="order-financials">
              <span class="deposit-tag">10 % : ${formatFCFA(order.depositAmount)} (${formatGNF(order.depositAmount)})</span>
              <span class="total-sub">Total : ${formatFCFA(order.productPrice)} • ${formatGNF(order.productPrice)}</span>
            </div>

            <div class="order-admin-actions">
              <a href="${escapeHtml(waClientUrl)}" target="_blank" rel="noopener" class="btn btn-secondary btn-sm">
                WhatsApp Client
              </a>
              ${
                canRepublish
                  ? `<button type="button" class="btn btn-outline-gold btn-sm" data-admin-order-action="republish" data-product-id="${escapeHtml(order.productId)}">
                      Remettre en vente
                    </button>`
                  : ''
              }
              <button type="button" class="btn btn-ghost btn-sm" data-admin-order-action="delete-order" data-order-id="${escapeHtml(order.id)}">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      `;
    })
    .join('');
}

function renderAdminInventoryList() {
  const container = document.getElementById('adminInventoryContainer');
  if (state.products.length === 0) {
    container.innerHTML = `<p style="padding:20px; text-align:center;">Aucun article enregistré.</p>`;
    return;
  }

  container.innerHTML = `
    <div class="admin-inventory-grid">
      ${state.products
        .map(product => {
          const isPublished = product.status === 'published';
          const deposit = calculateTenPercent(product.price);
          const colorNames = (product.colors || []).map(c => c.name).join(', ');
          return `
            <div class="inventory-card">
              <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" />
              <div class="inventory-info">
                <span class="status-badge ${isPublished ? 'status-published' : 'status-ordered'}">
                  ${isPublished ? '● Publié en boutique' : '● Commandé (Retiré du site)'}
                </span>
                <h4>${escapeHtml(product.name)}</h4>
                <div class="inventory-price">${formatFCFA(product.price)} • 🇬🇳 ${formatGNF(product.price)}</div>
                <div style="font-size:0.75rem; color:var(--wave-dark); font-weight:700; margin-bottom:4px;">
                  10 % = ${formatFCFA(deposit)} (${formatGNF(deposit)})
                </div>
                <div style="font-size:0.75rem; color:var(--text-secondary); margin-bottom:8px;">
                  Couleurs : ${escapeHtml(colorNames)}
                </div>
                <div class="inventory-actions">
                  <button type="button" class="btn btn-secondary btn-sm" data-inv-action="edit" data-id="${escapeHtml(product.id)}">Modifier</button>
                  ${
                    !isPublished
                      ? `<button type="button" class="btn btn-outline-gold btn-sm" data-inv-action="republish" data-id="${escapeHtml(product.id)}">Remettre en vente</button>`
                      : ''
                  }
                  <button type="button" class="btn btn-ghost btn-sm" style="color:var(--danger);" data-inv-action="delete" data-id="${escapeHtml(product.id)}">Supprimer</button>
                </div>
              </div>
            </div>
          `;
        })
        .join('')}
    </div>
  `;
}

function renderAdminCustomersList() {
  const container = document.getElementById('adminCustomersContainer');
  if (!container) return;

  if (state.customers.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding: 28px; color: var(--text-secondary);">
        Aucun client inscrit pour le moment. Dès qu'un visiteur s'inscrira pour ajouter un article en favoris, ses coordonnées s'afficheront ici.
      </div>
    `;
    return;
  }

  container.innerHTML = state.customers
    .map(cust => {
      const favCount = (cust.favorites || []).length;
      const cleanPhone = String(cust.phone || '').replace(/[^\d]/g, '');
      const waUrl = `https://wa.me/${cleanPhone}`;
      return `
        <div class="order-admin-item">
          <div class="order-admin-left">
            <div class="profile-avatar" style="margin:0; width:44px; height:44px; font-size:1.1rem;">👤</div>
            <div class="order-admin-meta">
              <h4>${escapeHtml(cust.firstName)} ${escapeHtml(cust.lastName)}</h4>
              <div class="order-client-badges">
                <span class="client-pill">📞 ${escapeHtml(cust.phone)}</span>
                <span class="client-pill">❤️ ${favCount} article(s) en favoris</span>
              </div>
            </div>
          </div>
          <div class="order-admin-right">
            <a href="${escapeHtml(waUrl)}" target="_blank" rel="noopener" class="btn btn-secondary btn-sm">
              Contacter sur WhatsApp
            </a>
          </div>
        </div>
      `;
    })
    .join('');
}

// ============================================================================
// FLUX DE COMMANDE MONDIALE (10 % WAVE, ORANGE MONEY SN/GN, CARTE -> WAVE)
// ============================================================================
function openOrderModal(productId) {
  const product = state.products.find(p => p.id === productId && p.status === 'published');
  if (!product) {
    showToast("Cet article vient d'être commandé et n'est plus disponible.");
    renderPublicCatalogue();
    return;
  }

  document.getElementById('detailModalBackdrop').classList.add('hidden');
  document.getElementById('favoritesModalBackdrop').classList.add('hidden');

  state.activeOrderProduct = product;
  const colors = product.colors && product.colors.length > 0
    ? product.colors
    : [{ name: 'Standard', hex: '#141413' }];
  state.selectedOrderColor = colors[0].name;
  state.selectedPaymentMethod = 'Wave';

  document.getElementById('orderProductId').value = product.id;
  document.getElementById('orderProductImage').src = product.image;
  document.getElementById('orderProductImage').alt = product.name;
  document.getElementById('orderProductName').textContent = product.name;
  document.getElementById('orderProductPrice').textContent = formatFCFA(product.price);
  document.getElementById('orderProductPriceGnf').textContent = `🇬🇳 ${formatGNF(product.price)}`;
  document.getElementById('orderProductPriceIntl').textContent = formatIntlEquivalent(product.price);

  const fullPrice = Number(product.price) || 0;
  const deposit10 = calculateTenPercent(fullPrice);
  const remaining90 = fullPrice - deposit10;

  document.getElementById('calcFullPrice').textContent = `${formatFCFA(fullPrice)} (🇬🇳 ${formatGNF(fullPrice)})`;
  document.getElementById('calcDepositAmount').textContent = `${formatFCFA(deposit10)} (${formatIntlEquivalent(deposit10)})`;
  document.getElementById('calcDepositGnfSub').textContent = `🇬🇳 Soit exactement ${formatGNF(deposit10)} en Franc Guinéen`;
  document.getElementById('calcRemainingAmount').textContent = `${formatFCFA(remaining90)} (🇬🇳 ${formatGNF(remaining90)})`;
  document.getElementById('instructionDepositText').textContent = `${formatFCFA(deposit10)} / ${formatGNF(deposit10)}`;
  document.getElementById('checkboxDepositAmount').textContent = `${formatFCFA(deposit10)} (${formatGNF(deposit10)})`;
  const cardSol1El = document.getElementById('cardSolution1Amount');
  if (cardSol1El) {
    cardSol1El.textContent = `${formatFCFA(deposit10)} (${formatIntlEquivalent(deposit10)})`;
  }

  renderOrderColorChoices(colors);
  document.getElementById('orderForm').reset();

  // Pré-remplir automatiquement le nom complet et le téléphone si le client est connecté à son compte !
  if (state.currentCustomer) {
    document.getElementById('customerFullName').value =
      `${state.currentCustomer.firstName} ${state.currentCustomer.lastName}`;
    document.getElementById('customerPhone').value = state.currentCustomer.phone;
  }

  document.getElementById('gpsStatusNote').classList.add('hidden');
  updatePaymentMethodUI('Wave');

  document.getElementById('orderForm').classList.remove('hidden');
  document.getElementById('orderSuccessView').classList.add('hidden');
  document.getElementById('orderModalBackdrop').classList.remove('hidden');
}

function renderOrderColorChoices(colors) {
  const container = document.getElementById('orderColorOptions');
  container.innerHTML = colors
    .map(color => {
      const isSelected = color.name === state.selectedOrderColor;
      return `
        <button
          type="button"
          class="color-choice-btn ${isSelected ? 'selected' : ''}"
          data-color-name="${escapeHtml(color.name)}"
        >
          <span class="color-dot" style="background-color: ${escapeHtml(color.hex)};"></span>
          <span>${escapeHtml(color.name)}</span>
        </button>
      `;
    })
    .join('');
}

function updatePaymentMethodUI(method) {
  state.selectedPaymentMethod = method;
  document.querySelectorAll('.pay-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.payMethod === method);
  });

  const mobilePanel = document.getElementById('mobileMoneyInstructions');
  const cardPanel = document.getElementById('cardPaymentPanel');
  const mobileLabel = document.getElementById('mobileMoneyLabel');
  const refInput = document.getElementById('paymentReferenceInput');

  const deposit = state.activeOrderProduct ? calculateTenPercent(state.activeOrderProduct.price) : 0;

  if (method.includes('Wave') && !method.includes('Carte')) {
    mobilePanel.classList.remove('hidden');
    cardPanel.classList.add('hidden');
    mobileLabel.innerHTML = `Envoyez les 10 % (<strong>${formatFCFA(deposit)}</strong> / <strong>${formatGNF(deposit)}</strong>) sur notre <strong>Wave</strong> au :`;
    refInput.placeholder = 'Réf. transfert Wave ou numéro expéditeur *';
  } else if (method.includes('Orange Money')) {
    mobilePanel.classList.remove('hidden');
    cardPanel.classList.add('hidden');
    mobileLabel.innerHTML = `Envoyez les 10 % (<strong>${formatFCFA(deposit)}</strong> ou <strong>🇬🇳 ${formatGNF(deposit)}</strong>) par <strong>Orange Money</strong> au :`;
    refInput.placeholder = 'Réf. transfert Orange Money (Sénégal ou Guinée) *';
  } else {
    mobilePanel.classList.add('hidden');
    cardPanel.classList.remove('hidden');
    refInput.placeholder = 'Réf. transfert Sendwave / TapTap Send / Remitly *';
  }
}

function detectCustomerLocation() {
  const noteEl = document.getElementById('gpsStatusNote');
  const addressInput = document.getElementById('customerAddress');
  const countrySelect = document.getElementById('customerCountry');

  noteEl.textContent = '⏳ Détection de votre position en cours...';
  noteEl.classList.remove('hidden');

  if (!navigator.geolocation) {
    noteEl.textContent = 'Veuillez saisir manuellement votre ville et pays ci-dessus.';
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async pos => {
      const { latitude, longitude } = pos.coords;
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=fr`
        );
        const data = await res.json();
        if (data && data.address) {
          const city = data.address.city || data.address.town || data.address.suburb || data.address.state || '';
          const country = data.address.country || '';
          const road = data.address.road || data.address.neighbourhood || '';

          addressInput.value = [road, city, country].filter(Boolean).join(', ');

          const options = Array.from(countrySelect.options);
          const match = options.find(opt =>
            opt.value.toLowerCase().includes(country.toLowerCase()) ||
            country.toLowerCase().includes(opt.value.toLowerCase().split(' ')[0])
          );
          if (match) {
            countrySelect.value = match.value;
          } else {
            countrySelect.value = 'Autre pays (Monde)';
          }

          noteEl.textContent = `✅ Position détectée : ${addressInput.value}`;
          return;
        }
      } catch (_) {}

      addressInput.value = `Coordonnées GPS (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`;
      noteEl.textContent = '✅ Coordonnées GPS détectées et ajoutées à votre commande !';
    },
    () => {
      noteEl.textContent = 'ℹ️ Autorisez la localisation ou saisissez directement votre ville et adresse.';
    },
    { timeout: 8000 }
  );
}

function handleOrderSubmit(e) {
  e.preventDefault();

  const product = state.activeOrderProduct;
  if (!product) return;

  const customerName = sanitizeInput(document.getElementById('customerFullName').value);
  const customerPhone = sanitizeInput(document.getElementById('customerPhone').value);
  const customerCountry = sanitizeInput(document.getElementById('customerCountry').value);
  const customerAddress = sanitizeInput(document.getElementById('customerAddress').value);
  const paymentReference = sanitizeInput(document.getElementById('paymentReferenceInput').value);
  const depositConfirmed = document.getElementById('confirmWaveDeposit').checked;

  if (customerName.length < 2) {
    showToast('Veuillez saisir votre nom complet valide.');
    return;
  }

  const digitsOnlyPhone = customerPhone.replace(/[^\d]/g, '');
  if (digitsOnlyPhone.length < 7) {
    showToast('Veuillez saisir un numéro de téléphone valide.');
    return;
  }

  if (!customerAddress || customerAddress.length < 2) {
    showToast('Veuillez préciser votre ville ou adresse de livraison.');
    return;
  }

  if (!paymentReference || paymentReference.length < 2) {
    showToast('Sécurité anti-fraude : veuillez indiquer la référence du transfert de 10 %.');
    return;
  }

  if (!depositConfirmed) {
    showToast(`Veuillez confirmer le règlement des 10 % (${MERCHANT_PHONE_INTL}).`);
    return;
  }

  const fullPrice = Number(product.price) || 0;
  const depositAmount = calculateTenPercent(fullPrice);
  const remainingAmount = fullPrice - depositAmount;

  const newOrder = {
    id: 'cmd-' + Date.now(),
    productId: product.id,
    productName: product.name,
    productImage: product.image,
    productPrice: fullPrice,
    depositAmount: depositAmount,
    remainingAmount: remainingAmount,
    selectedColor: state.selectedOrderColor || 'Standard',
    customerName: customerName,
    customerPhone: customerPhone,
    customerCountry: customerCountry,
    customerAddress: customerAddress,
    paymentMethod: state.selectedPaymentMethod,
    paymentReference: paymentReference,
    createdAt: Date.now()
  };

  state.orders.unshift(newOrder);
  saveOrders();

  // Retirer immédiatement l'article des articles publiés
  const prodIndex = state.products.findIndex(p => p.id === product.id);
  if (prodIndex !== -1) {
    state.products[prodIndex].status = 'ordered';
    saveProducts();
  }

  // Enregistrer dans la base de données SQLite centrale
  apiRequest('/api/orders', 'POST', newOrder);

  renderPublicCatalogue();
  renderAdminUI();

  const fullLocation = `${customerCountry} (${customerAddress})`;
  document.getElementById('successCustomerName').textContent = customerName;
  document.getElementById('successProductName').textContent = product.name;
  document.getElementById('receiptClient').textContent = `${customerName} (${customerPhone})`;
  document.getElementById('receiptLocation').textContent = fullLocation;
  document.getElementById('receiptItem').textContent = product.name;
  document.getElementById('receiptColor').textContent = newOrder.selectedColor;
  document.getElementById('receiptMethod').textContent = `${state.selectedPaymentMethod} — Réf: ${paymentReference}`;
  document.getElementById('receiptDeposit').textContent =
    `${formatFCFA(depositAmount)} • 🇬🇳 ${formatGNF(depositAmount)}`;
  document.getElementById('receiptRemaining').textContent =
    `${formatFCFA(remainingAmount)} (🇬🇳 ${formatGNF(remainingAmount)})`;

  const waText = [
    `Bonjour ${state.shopName} ! Je viens de valider une commande sur votre site :`,
    `- Article : ${product.name}`,
    `- Couleur : ${newOrder.selectedColor}`,
    `- Prix total : ${formatFCFA(fullPrice)} (🇬🇳 ${formatGNF(fullPrice)})`,
    `- Acompte 10 % payé : ${formatFCFA(depositAmount)} (🇬🇳 ${formatGNF(depositAmount)}) via ${state.selectedPaymentMethod} (Réf: ${paymentReference})`,
    `- Client : ${customerName}`,
    `- Téléphone : ${customerPhone}`,
    `- Pays / Adresse de livraison : ${fullLocation}`
  ].join('\n');

  const waUrl = `https://wa.me/${MERCHANT_WHATSAPP}?text=${encodeURIComponent(waText)}`;
  document.getElementById('whatsappConfirmLink').href = waUrl;

  document.getElementById('orderForm').classList.add('hidden');
  document.getElementById('orderSuccessView').classList.remove('hidden');

  showToast("Commande validée ! L'article a été retiré des articles publiés.");
}

// ============================================================================
// SÉCURITÉ ADMINISTRATEUR ANTI-PIRATAGE & GESTION CATALOGUE
// ============================================================================
function handleAdminLogin(e) {
  e.preventDefault();
  const errorEl = document.getElementById('loginErrorMsg');

  const rawAttempts = localStorage.getItem(STORAGE_KEYS.LOGIN_ATTEMPTS);
  let attemptsData = rawAttempts ? JSON.parse(rawAttempts) : { count: 0, lockedUntil: 0 };

  if (Date.now() < attemptsData.lockedUntil) {
    const remainingSec = Math.ceil((attemptsData.lockedUntil - Date.now()) / 1000);
    errorEl.textContent = `Sécurité anti-piratage : trop de tentatives. Réessayez dans ${remainingSec}s.`;
    errorEl.classList.remove('hidden');
    return;
  }

  const emailInput = document.getElementById('adminEmailInput').value.trim().toLowerCase();
  const pinInput = document.getElementById('adminPinInput').value.trim();
  const validPin = getAdminPin();

  if (emailInput === ADMIN_EMAIL.toLowerCase() && pinInput === validPin) {
    state.isAdmin = true;
    localStorage.setItem(
      STORAGE_KEYS.ADMIN_SESSION,
      JSON.stringify({ email: ADMIN_EMAIL, timestamp: Date.now() })
    );
    localStorage.removeItem(STORAGE_KEYS.LOGIN_ATTEMPTS);

    errorEl.classList.add('hidden');
    document.getElementById('loginModalBackdrop').classList.add('hidden');
    document.getElementById('loginForm').reset();

    renderAdminUI();
    renderPublicCatalogue();
    showToast('Connexion Administrateur sécurisée réussie !');
  } else {
    attemptsData.count += 1;
    if (attemptsData.count >= 4) {
      attemptsData.lockedUntil = Date.now() + 120 * 1000;
      attemptsData.count = 0;
      errorEl.textContent = 'Alerte sécurité : 4 tentatives échouées. Accès bloqué pendant 2 minutes.';
    } else {
      errorEl.textContent = `Email ou Code PIN incorrect (${4 - attemptsData.count} essai(s) restant(s)).`;
    }
    localStorage.setItem(STORAGE_KEYS.LOGIN_ATTEMPTS, JSON.stringify(attemptsData));
    errorEl.classList.remove('hidden');
  }
}

function handleAdminLogout() {
  state.isAdmin = false;
  localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
  renderAdminUI();
  renderPublicCatalogue();
  showToast('Session administrateur fermée en toute sécurité.');
}

function openProductModal(productToEdit = null) {
  if (!state.isAdmin) return;

  const titleEl = document.getElementById('productModalTitle');
  const submitBtn = document.getElementById('saveProductSubmitBtn');
  const editIdInput = document.getElementById('editProductId');
  const nameInput = document.getElementById('productNameInput');
  const priceInput = document.getElementById('productPriceInput');
  const photoUrlInput = document.getElementById('productPhotoUrlInput');

  document.getElementById('productForm').reset();
  state.uploadedPhotoDataUrl = '';

  if (productToEdit) {
    titleEl.textContent = "Modifier l'article";
    submitBtn.textContent = 'Enregistrer les modifications';
    editIdInput.value = productToEdit.id;
    nameInput.value = productToEdit.name;
    priceInput.value = productToEdit.price;
    state.editingColors = JSON.parse(JSON.stringify(productToEdit.colors || []));

    if (productToEdit.image && productToEdit.image.startsWith('data:')) {
      state.uploadedPhotoDataUrl = productToEdit.image;
      photoUrlInput.value = '';
    } else {
      photoUrlInput.value = productToEdit.image || '';
    }
    showPhotoPreview(productToEdit.image);
  } else {
    titleEl.textContent = 'Ajouter un nouvel article';
    submitBtn.textContent = "Publier l'article";
    editIdInput.value = '';
    state.editingColors = [
      { name: 'Noir', hex: '#141413' },
      { name: 'Blanc', hex: '#FFFFFF' }
    ];
    hidePhotoPreview();
  }

  updateLiveAdminDepositPreview();
  renderPresetColorsSelector();
  renderSelectedColorsTags();

  document.getElementById('productModalBackdrop').classList.remove('hidden');
}

function updateLiveAdminDepositPreview() {
  const priceVal = Number(document.getElementById('productPriceInput').value) || 0;
  const dep = calculateTenPercent(priceVal);
  const previewEl = document.getElementById('adminLiveDepositPreview');
  previewEl.innerHTML =
    `Prix Guinée : <strong>🇬🇳 ${formatGNF(priceVal)}</strong> • Acompte 10 % : <strong>${formatFCFA(dep)}</strong> (${formatGNF(dep)})`;
}

function renderPresetColorsSelector() {
  const container = document.getElementById('presetColorsContainer');
  container.innerHTML = PRESET_COLORS.map(preset => {
    const isSelected = state.editingColors.some(
      c => c.name.toLowerCase() === preset.name.toLowerCase()
    );
    return `
      <button
        type="button"
        class="preset-color-btn ${isSelected ? 'active' : ''}"
        data-preset-name="${escapeHtml(preset.name)}"
        data-preset-hex="${escapeHtml(preset.hex)}"
      >
        <span class="color-dot" style="background-color: ${escapeHtml(preset.hex)};"></span>
        <span>${escapeHtml(preset.name)}</span>
      </button>
    `;
  }).join('');
}

function renderSelectedColorsTags() {
  const listEl = document.getElementById('selectedColorsList');
  if (state.editingColors.length === 0) {
    listEl.innerHTML = `<span style="font-size:0.8rem; color:var(--danger);">Aucune couleur sélectionnée. Choisissez au moins une couleur ci-dessus.</span>`;
    return;
  }

  listEl.innerHTML = state.editingColors
    .map(
      (c, idx) => `
      <span class="selected-color-tag">
        <span class="color-dot" style="background-color: ${escapeHtml(c.hex)};"></span>
        <span>${escapeHtml(c.name)}</span>
        <button type="button" class="remove-color-btn" data-remove-color-idx="${idx}" title="Retirer cette couleur">&times;</button>
      </span>
    `
    )
    .join('');
}

function showPhotoPreview(src) {
  if (!src) {
    hidePhotoPreview();
    return;
  }
  document.getElementById('productPhotoPreview').src = src;
  document.getElementById('photoUploadPlaceholder').classList.add('hidden');
  document.getElementById('photoPreviewWrapper').classList.remove('hidden');
}

function hidePhotoPreview() {
  document.getElementById('productPhotoPreview').src = '';
  document.getElementById('photoUploadPlaceholder').classList.remove('hidden');
  document.getElementById('photoPreviewWrapper').classList.add('hidden');
}

function handlePhotoFileSelected(file) {
  if (!file || !file.type.startsWith('image/')) {
    showToast('Veuillez sélectionner un fichier image valide.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    const img = new Image();
    img.onload = function () {
      const MAX_WIDTH = 900;
      const MAX_HEIGHT = 1100;
      let width = img.width;
      let height = img.height;

      if (width > MAX_WIDTH || height > MAX_HEIGHT) {
        const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
      state.uploadedPhotoDataUrl = compressedDataUrl;
      document.getElementById('productPhotoUrlInput').value = '';
      showPhotoPreview(compressedDataUrl);
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

function handleSaveProduct(e) {
  e.preventDefault();
  if (!state.isAdmin) return;

  const editId = document.getElementById('editProductId').value.trim();
  const name = sanitizeInput(document.getElementById('productNameInput').value);
  const price = Number(document.getElementById('productPriceInput').value);
  const urlInput = document.getElementById('productPhotoUrlInput').value.trim();
  const finalImage = state.uploadedPhotoDataUrl || urlInput;

  if (!name || !price || price <= 0) {
    showToast('Veuillez renseigner un nom et un prix valides.');
    return;
  }

  if (!finalImage) {
    showToast("Veuillez ajouter la photo de l'annonce.");
    return;
  }

  if (state.editingColors.length === 0) {
    showToast('Veuillez préciser au moins une couleur disponible.');
    return;
  }

  let savedProd = null;
  if (editId) {
    const idx = state.products.findIndex(p => p.id === editId);
    if (idx !== -1) {
      state.products[idx] = {
        ...state.products[idx],
        name,
        price,
        image: finalImage,
        colors: [...state.editingColors]
      };
      savedProd = state.products[idx];
      showToast('Article modifié avec succès !');
    }
  } else {
    const newProduct = {
      id: 'prod-' + Date.now(),
      name,
      price,
      image: finalImage,
      colors: [...state.editingColors],
      status: 'published',
      createdAt: Date.now()
    };
    state.products.unshift(newProduct);
    savedProd = newProduct;
    showToast('Nouvel article publié sur Barry Aliou Shop !');
  }

  saveProducts();
  if (savedProd) {
    apiRequest('/api/products', 'POST', savedProd);
  }
  renderPublicCatalogue();
  renderAdminUI();
  document.getElementById('productModalBackdrop').classList.add('hidden');
}

function deleteProduct(productId) {
  if (!state.isAdmin) return;
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  if (!window.confirm(`Voulez-vous vraiment supprimer l'article "${product.name}" ?`)) return;

  state.products = state.products.filter(p => p.id !== productId);
  saveProducts();
  apiRequest(`/api/products/${encodeURIComponent(productId)}`, 'DELETE');
  renderPublicCatalogue();
  renderAdminUI();
  showToast('Article supprimé.');
}

function republishProduct(productId) {
  if (!state.isAdmin) return;
  const prod = state.products.find(p => p.id === productId);
  if (!prod) return;

  prod.status = 'published';
  saveProducts();
  apiRequest('/api/products', 'POST', prod);
  renderPublicCatalogue();
  renderAdminUI();
  showToast(`L'article "${prod.name}" est de nouveau en vente sur le site !`);
}

// ============================================================================
// INITIALISATION DES ÉVÉNEMENTS
// ============================================================================
function initEventListeners() {
  // Sélecteur de Devise (FCFA, Franc Guinéen GNF, USD, EUR)
  const currencySel = document.getElementById('currencySelector');
  if (currencySel) {
    currencySel.addEventListener('change', e => {
      state.displayCurrency = e.target.value;
      localStorage.setItem(STORAGE_KEYS.DISPLAY_CURRENCY, state.displayCurrency);
      renderPublicCatalogue();
      showToast(`Devise d'affichage : ${e.target.options[e.target.selectedIndex].text}`);
    });
  }

  // Recherche
  document.getElementById('searchInput').addEventListener('input', e => {
    state.searchQuery = e.target.value;
    renderPublicCatalogue();
  });

  // Partage du lien de la boutique
  document.getElementById('shareShopTopBtn').addEventListener('click', async () => {
    const shareData = {
      title: state.shopName,
      text: `Découvrez ${state.shopName} ! Vêtements et chaussures de qualité (Prix en FCFA & Franc Guinéen GNF). Réservez avec 10 % d'acompte.`,
      url: window.location.href
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (_) {}
    }
    navigator.clipboard?.writeText(window.location.href);
    showToast('Lien de Barry Aliou Shop copié !');
  });

  // Copier le numéro 77 453 22 55
  const copyWaveHandler = () => {
    navigator.clipboard?.writeText('+221774532255');
    showToast(`Numéro (${MERCHANT_PHONE_INTL}) copié !`);
  };
  document.getElementById('copyWaveModalBtn').addEventListener('click', copyWaveHandler);
  document.getElementById('copyWaveFooterBtn').addEventListener('click', copyWaveHandler);

  // Boutons Compte Client & Favoris dans l'en-tête
  document.getElementById('openCustomerAuthBtn').addEventListener('click', () => {
    state.pendingFavoriteProductId = null;
    openCustomerAuthModal(false);
  });
  document.getElementById('openFavoritesModalBtn').addEventListener('click', openFavoritesModal);

  const closeCustomerAuth = () => {
    state.pendingFavoriteProductId = null;
    document.getElementById('customerAuthModalBackdrop').classList.add('hidden');
  };
  document.getElementById('closeCustomerAuthBtn').addEventListener('click', closeCustomerAuth);
  document.getElementById('cancelCustomerAuthBtn').addEventListener('click', closeCustomerAuth);
  document.getElementById('customerRegisterForm').addEventListener('submit', handleCustomerRegisterSubmit);
  document.getElementById('logoutCustomerBtn').addEventListener('click', handleCustomerLogout);
  document.getElementById('goToFavoritesFromProfileBtn').addEventListener('click', () => {
    document.getElementById('customerAuthModalBackdrop').classList.add('hidden');
    openFavoritesModal();
  });

  // Modale Mes Favoris
  const closeFavModal = () => document.getElementById('favoritesModalBackdrop').classList.add('hidden');
  document.getElementById('closeFavoritesModalBtn').addEventListener('click', closeFavModal);
  document.getElementById('favSwitchAccountBtn').addEventListener('click', () => {
    closeFavModal();
    openCustomerAuthModal(false);
  });

  document.getElementById('favoritesListContainer').addEventListener('click', e => {
    const btn = e.target.closest('[data-fav-action]');
    if (!btn) return;
    const action = btn.dataset.favAction;
    const id = btn.dataset.id;
    if (action === 'order') {
      openOrderModal(id);
    } else if (action === 'view') {
      closeFavModal();
      openProductDetailModal(id);
    } else if (action === 'remove') {
      handleToggleFavorite(id);
      renderFavoritesList();
    }
  });

  // Clics sur la grille de produits (Favoris, Voir l'annonce, Commander, Modifier, Supprimer)
  document.getElementById('productsGrid').addEventListener('click', e => {
    const favBtn = e.target.closest('[data-action="toggle-fav"]');
    if (favBtn) {
      e.stopPropagation();
      handleToggleFavorite(favBtn.dataset.id);
      return;
    }

    const editBtn = e.target.closest('[data-action="edit"]');
    if (editBtn) {
      e.stopPropagation();
      const prod = state.products.find(p => p.id === editBtn.dataset.id);
      if (prod) openProductModal(prod);
      return;
    }

    const deleteBtn = e.target.closest('[data-action="delete"]');
    if (deleteBtn) {
      e.stopPropagation();
      deleteProduct(deleteBtn.dataset.id);
      return;
    }

    const orderBtn = e.target.closest('[data-action="order"]');
    if (orderBtn) {
      openOrderModal(orderBtn.dataset.id);
      return;
    }

    const viewAdTrigger = e.target.closest('[data-action="view-ad"]');
    if (viewAdTrigger) {
      openProductDetailModal(viewAdTrigger.dataset.id);
    }
  });

  // Modale 0 : Fiche détaillée de l'annonce
  const closeDetailModal = () => document.getElementById('detailModalBackdrop').classList.add('hidden');
  document.getElementById('closeDetailModalBtn').addEventListener('click', closeDetailModal);
  document.getElementById('detailModalBackdrop').addEventListener('click', e => {
    if (e.target.id === 'detailModalBackdrop') closeDetailModal();
  });
  document.getElementById('detailOrderNowBtn').addEventListener('click', () => {
    if (state.activeDetailProduct) {
      openOrderModal(state.activeDetailProduct.id);
    }
  });
  document.getElementById('detailToggleFavBtn').addEventListener('click', () => {
    if (state.activeDetailProduct) {
      handleToggleFavorite(state.activeDetailProduct.id);
    }
  });

  // Choix d'une couleur dans la modale de commande
  document.getElementById('orderColorOptions').addEventListener('click', e => {
    const btn = e.target.closest('.color-choice-btn');
    if (!btn) return;
    state.selectedOrderColor = btn.dataset.colorName;
    if (state.activeOrderProduct) {
      renderOrderColorChoices(state.activeOrderProduct.colors || []);
    }
  });

  // Choix du mode de paiement
  document.getElementById('paymentMethodTabs').addEventListener('click', e => {
    const btn = e.target.closest('.pay-tab-btn');
    if (!btn) return;
    updatePaymentMethodUI(btn.dataset.payMethod);
  });

  const cardInput = document.getElementById('cardNumberInput');
  if (cardInput) {
    cardInput.addEventListener('input', e => {
      let digits = e.target.value.replace(/\D/g, '').slice(0, 16);
      e.target.value = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
      if (digits.length >= 4) {
        document.getElementById('paymentReferenceInput').value = 'CB-****-' + digits.slice(-4);
      }
    });
  }

  // Détection GPS
  document.getElementById('detectLocationBtn').addEventListener('click', detectCustomerLocation);

  // Soumission et fermeture de la modale de commande
  document.getElementById('orderForm').addEventListener('submit', handleOrderSubmit);
  const closeOrderModal = () => document.getElementById('orderModalBackdrop').classList.add('hidden');
  document.getElementById('closeOrderModalBtn').addEventListener('click', closeOrderModal);
  document.getElementById('cancelOrderBtn').addEventListener('click', closeOrderModal);
  document.getElementById('closeSuccessModalBtn').addEventListener('click', closeOrderModal);

  // Modale de connexion Admin
  document.getElementById('openLoginModalBtn').addEventListener('click', () => {
    document.getElementById('loginErrorMsg').classList.add('hidden');
    document.getElementById('loginModalBackdrop').classList.remove('hidden');
    setTimeout(() => document.getElementById('adminEmailInput').focus(), 80);
  });
  const closeLoginModal = () => document.getElementById('loginModalBackdrop').classList.add('hidden');
  document.getElementById('closeLoginModalBtn').addEventListener('click', closeLoginModal);
  document.getElementById('cancelLoginBtn').addEventListener('click', closeLoginModal);
  document.getElementById('loginForm').addEventListener('submit', handleAdminLogin);
  document.getElementById('logoutAdminBtn').addEventListener('click', handleAdminLogout);

  // Boutons Admin
  document.getElementById('toggleAdminPanelBtn').addEventListener('click', () => {
    const dash = document.getElementById('adminDashboardSection');
    dash.classList.toggle('hidden');
    if (!dash.classList.contains('hidden')) {
      dash.scrollIntoView({ behavior: 'smooth' });
    }
  });

  const openNewProductHandler = () => openProductModal(null);
  document.getElementById('openAddProductBtn').addEventListener('click', openNewProductHandler);
  document.getElementById('adminBannerAddBtn').addEventListener('click', openNewProductHandler);
  document.getElementById('catalogueAddBtn').addEventListener('click', openNewProductHandler);
  document.getElementById('emptyStateAddBtn').addEventListener('click', openNewProductHandler);

  // Modifier le Taux du Franc Guinéen (GNF)
  document.getElementById('changeGnfRateBtn').addEventListener('click', () => {
    const input = window.prompt(
      'Combien vaut 1 FCFA en Franc Guinéen (GNF) ? (Ex: 14.3 pour que 10 000 FCFA = 143 000 GNF) :',
      state.gnfRate
    );
    if (input === null) return;
    const parsed = parseFloat(input.replace(',', '.'));
    if (!isNaN(parsed) && parsed > 0) {
      state.gnfRate = parsed;
      localStorage.setItem(STORAGE_KEYS.GNF_RATE, String(parsed));
      apiRequest('/api/settings', 'POST', { gnfRate: String(parsed) });
      renderAdminUI();
      renderPublicCatalogue();
      showToast(`Taux mis à jour : 1 FCFA = ${parsed} GNF !`);
    } else {
      showToast('Veuillez entrer un nombre valide.');
    }
  });

  // Modifier le Code PIN de sécurité Admin
  document.getElementById('changeAdminPinBtn').addEventListener('click', () => {
    const currentPin = getAdminPin();
    const enteredCurrent = window.prompt('Saisissez votre code PIN actuel :', '');
    if (enteredCurrent === null) return;
    if (enteredCurrent.trim() !== currentPin) {
      showToast('Code PIN actuel incorrect.');
      return;
    }
    const newPin = window.prompt('Choisissez votre nouveau Code PIN Administrateur (au moins 4 caractères) :');
    if (newPin && newPin.trim().length >= 4) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_PIN, newPin.trim());
      apiRequest('/api/settings', 'POST', { adminPin: newPin.trim() });
      showToast('Nouveau Code PIN de sécurité enregistré !');
    } else {
      showToast('Le code PIN doit comporter au moins 4 caractères.');
    }
  });

  // Modifier le nom de la boutique
  document.getElementById('editShopNameBtn').addEventListener('click', () => {
    const newName = window.prompt('Entrez le nom de votre boutique :', state.shopName);
    if (newName && newName.trim()) {
      state.shopName = sanitizeInput(newName);
      localStorage.setItem(STORAGE_KEYS.SHOP_NAME, state.shopName);
      apiRequest('/api/settings', 'POST', { shopName: state.shopName });
      renderAdminUI();
      showToast('Nom de la boutique mis à jour !');
    }
  });

  // Onglets Admin (Commandes / Inventaire / Clients inscrits)
  document.querySelectorAll('.admin-tab').forEach(tabBtn => {
    tabBtn.addEventListener('click', () => {
      document.querySelectorAll('.admin-tab').forEach(b => b.classList.remove('active'));
      tabBtn.classList.add('active');
      const target = tabBtn.dataset.tab;
      document.getElementById('adminTabOrders').classList.toggle('hidden', target !== 'orders');
      document.getElementById('adminTabInventory').classList.toggle('hidden', target !== 'inventory');
      document.getElementById('adminTabCustomers').classList.toggle('hidden', target !== 'customers');
    });
  });

  // Actions commandes Admin
  document.getElementById('ordersListContainer').addEventListener('click', e => {
    const btn = e.target.closest('[data-admin-order-action]');
    if (!btn) return;
    const action = btn.dataset.adminOrderAction;
    if (action === 'republish') {
      republishProduct(btn.dataset.productId);
    } else if (action === 'delete-order') {
      const orderId = btn.dataset.orderId;
      state.orders = state.orders.filter(o => o.id !== orderId);
      saveOrders();
      apiRequest(`/api/orders/${encodeURIComponent(orderId)}`, 'DELETE');
      renderAdminUI();
      showToast('Commande supprimée de la liste.');
    }
  });

  // Actions inventaire Admin
  document.getElementById('adminInventoryContainer').addEventListener('click', e => {
    const btn = e.target.closest('[data-inv-action]');
    if (!btn) return;
    const action = btn.dataset.invAction;
    const id = btn.dataset.id;
    if (action === 'edit') {
      const prod = state.products.find(p => p.id === id);
      if (prod) openProductModal(prod);
    } else if (action === 'republish') {
      republishProduct(id);
    } else if (action === 'delete') {
      deleteProduct(id);
    }
  });

  // Formulaire Ajout/Édition d'article
  document.getElementById('productPriceInput').addEventListener('input', updateLiveAdminDepositPreview);

  const photoFileInput = document.getElementById('productPhotoFile');
  document.getElementById('photoDropzone').addEventListener('click', e => {
    if (
      e.target.id === 'changePhotoBtn' ||
      e.target.closest('#photoUploadPlaceholder') ||
      e.target.id === 'photoDropzone'
    ) {
      photoFileInput.click();
    }
  });
  photoFileInput.addEventListener('change', e => {
    if (e.target.files && e.target.files[0]) {
      handlePhotoFileSelected(e.target.files[0]);
    }
  });

  document.getElementById('productPhotoUrlInput').addEventListener('input', e => {
    const url = e.target.value.trim();
    if (url) {
      state.uploadedPhotoDataUrl = '';
      showPhotoPreview(url);
    } else if (!state.uploadedPhotoDataUrl) {
      hidePhotoPreview();
    }
  });

  document.getElementById('presetColorsContainer').addEventListener('click', e => {
    const btn = e.target.closest('.preset-color-btn');
    if (!btn) return;
    const name = btn.dataset.presetName;
    const hex = btn.dataset.presetHex;

    const existingIdx = state.editingColors.findIndex(
      c => c.name.toLowerCase() === name.toLowerCase()
    );
    if (existingIdx !== -1) {
      state.editingColors.splice(existingIdx, 1);
    } else {
      state.editingColors.push({ name, hex });
    }
    renderPresetColorsSelector();
    renderSelectedColorsTags();
  });

  document.getElementById('addCustomColorBtn').addEventListener('click', () => {
    const nameInput = document.getElementById('customColorName');
    const hexInput = document.getElementById('customColorHex');
    const name = sanitizeInput(nameInput.value);
    const hex = hexInput.value || '#141413';

    if (!name) {
      showToast('Veuillez saisir le nom de la couleur à ajouter.');
      return;
    }

    const exists = state.editingColors.some(c => c.name.toLowerCase() === name.toLowerCase());
    if (!exists) {
      state.editingColors.push({ name, hex });
      nameInput.value = '';
      renderPresetColorsSelector();
      renderSelectedColorsTags();
    } else {
      showToast('Cette couleur est déjà dans la liste.');
    }
  });

  document.getElementById('selectedColorsList').addEventListener('click', e => {
    const btn = e.target.closest('[data-remove-color-idx]');
    if (!btn) return;
    const idx = Number(btn.dataset.removeColorIdx);
    state.editingColors.splice(idx, 1);
    renderPresetColorsSelector();
    renderSelectedColorsTags();
  });

  document.getElementById('productForm').addEventListener('submit', handleSaveProduct);
  const closeProductModal = () => document.getElementById('productModalBackdrop').classList.add('hidden');
  document.getElementById('closeProductModalBtn').addEventListener('click', closeProductModal);
  document.getElementById('cancelProductModalBtn').addEventListener('click', closeProductModal);
}

document.addEventListener('DOMContentLoaded', () => {
  loadStateFromStorage();
  initEventListeners();
  updateCustomerHeaderUI();
  renderAdminUI();
  renderPublicCatalogue();
  syncWithServerDatabase();
});

