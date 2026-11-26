/**
 * Barry Aliou Shop — Serveur Backend & Base de Données SQLite
 * Administrateur : mamadoualioubarry1871@gmail.com
 * Numéro Wave / Orange Money : +221 77 453 22 55
 */

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');

const PORT = process.env.PORT || 3000;
const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'barry_aliou_shop.db');
const ADMIN_EMAIL = 'mamadoualioubarry1871@gmail.com';

// Initialisation de la base de données SQLite
const db = new DatabaseSync(DB_PATH);

function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      image TEXT NOT NULL,
      colors_json TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'published',
      created_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      product_id TEXT NOT NULL,
      product_name TEXT NOT NULL,
      product_image TEXT NOT NULL,
      product_price REAL NOT NULL,
      deposit_amount REAL NOT NULL,
      remaining_amount REAL NOT NULL,
      selected_color TEXT NOT NULL,
      customer_name TEXT NOT NULL,
      customer_phone TEXT NOT NULL,
      customer_country TEXT NOT NULL,
      customer_address TEXT NOT NULL,
      payment_method TEXT NOT NULL,
      payment_reference TEXT NOT NULL,
      created_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS customers (
      id TEXT PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      phone TEXT UNIQUE NOT NULL,
      favorites_json TEXT NOT NULL DEFAULT '[]',
      created_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `);

  // Paramètres initiaux
  const insertSetting = db.prepare(`INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)`);
  insertSetting.run('shopName', 'Barry Aliou Shop');
  insertSetting.run('gnfRate', '14.3');
  insertSetting.run('adminPin', '1871');

  // Insérer les articles initiaux si la table products est vide
  const countRow = db.prepare(`SELECT COUNT(*) AS cnt FROM products`).get();
  if (!countRow || countRow.cnt === 0) {
    const initialProducts = [
      {
        id: 'prod-1',
        name: 'Gilet Matelassé Colombe',
        price: 45000,
        image: 'assets/vest-orange-front.jpg',
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
        status: 'published',
        createdAt: Date.now() - 3600000 * 24
      },
      {
        id: 'prod-2',
        name: 'Veste Biker en Toile Canvas & Velours',
        price: 65000,
        image: 'assets/jacket-front.jpg',
        colors: [
          {
            name: 'Kaki & Charcoal',
            hex: '#373D3F',
            front: 'assets/jacket-front.jpg',
            back: 'assets/jacket-back.jpg'
          }
        ],
        status: 'published',
        createdAt: Date.now() - 3600000 * 20
      },
      {
        id: 'prod-3',
        name: 'Sweat à Capuche Boxy Coton Épais',
        price: 38000,
        image: 'assets/hoodie-front.jpg',
        colors: [
          {
            name: 'Gris Anthracite Délavé',
            hex: '#2B2B2B',
            front: 'assets/hoodie-front.jpg',
            back: 'assets/hoodie-back.jpg'
          }
        ],
        status: 'published',
        createdAt: Date.now() - 3600000 * 16
      },
      {
        id: 'prod-4',
        name: 'Pull Zippé en Maille Côtelée Rayée',
        price: 42000,
        image: 'assets/knit-front.jpg',
        colors: [
          {
            name: 'Bleu Marine & Blanc',
            hex: '#1D2A44',
            front: 'assets/knit-front.jpg',
            back: 'assets/knit-back.jpg'
          }
        ],
        status: 'published',
        createdAt: Date.now() - 3600000 * 12
      },
      {
        id: 'prod-5',
        name: 'T-Shirt Coupe Boxy Coton Lourd',
        price: 22000,
        image: 'assets/tee-front.jpg',
        colors: [
          {
            name: 'Blanc Vintage',
            hex: '#F0EFEA',
            front: 'assets/tee-front.jpg',
            back: 'assets/tee-back.jpg'
          }
        ],
        status: 'published',
        createdAt: Date.now() - 3600000 * 8
      },
      {
        id: 'prod-6',
        name: 'Sneakers Rétro Streetwear Cuir Premium',
        price: 55000,
        image: 'assets/sneakers-front.jpg',
        colors: [
          {
            name: 'Blanc & Noir',
            hex: '#FFFFFF',
            front: 'assets/sneakers-front.jpg',
            back: 'assets/sneakers-back.jpg'
          }
        ],
        status: 'published',
        createdAt: Date.now() - 3600000 * 4
      }
    ];

    const insertProd = db.prepare(`
      INSERT INTO products (id, name, price, image, colors_json, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    for (const p of initialProducts) {
      insertProd.run(p.id, p.name, p.price, p.image, JSON.stringify(p.colors), p.status, p.createdAt);
    }
  }
}

initDatabase();

// Utilitaires HTTP
function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
    'Cache-Control': 'no-store'
  });
  res.end(JSON.stringify(payload));
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 12 * 1024 * 1024) {
        reject(new Error('Payload trop volumineux'));
        req.destroy();
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

function getAllStateFromDb() {
  const productRows = db.prepare(`SELECT * FROM products ORDER BY created_at DESC`).all();
  const products = productRows.map(r => ({
    id: r.id,
    name: r.name,
    price: r.price,
    image: r.image,
    colors: JSON.parse(r.colors_json || '[]'),
    status: r.status,
    createdAt: r.created_at
  }));

  const orderRows = db.prepare(`SELECT * FROM orders ORDER BY created_at DESC`).all();
  const orders = orderRows.map(r => ({
    id: r.id,
    productId: r.product_id,
    productName: r.product_name,
    productImage: r.product_image,
    productPrice: r.product_price,
    depositAmount: r.deposit_amount,
    remainingAmount: r.remaining_amount,
    selectedColor: r.selected_color,
    customerName: r.customer_name,
    customerPhone: r.customer_phone,
    customerCountry: r.customer_country,
    customerAddress: r.customer_address,
    paymentMethod: r.payment_method,
    paymentReference: r.payment_reference,
    createdAt: r.created_at
  }));

  const customerRows = db.prepare(`SELECT * FROM customers ORDER BY created_at DESC`).all();
  const customers = customerRows.map(r => ({
    id: r.id,
    firstName: r.first_name,
    lastName: r.last_name,
    phone: r.phone,
    favorites: JSON.parse(r.favorites_json || '[]'),
    createdAt: r.created_at
  }));

  const settingRows = db.prepare(`SELECT key, value FROM settings`).all();
  const settings = {};
  for (const s of settingRows) {
    settings[s.key] = s.value;
  }

  return { products, orders, customers, settings };
}

// Serveur HTTP principal
const server = http.createServer(async (req, res) => {
  const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = urlObj.pathname;

  try {
    // 1. Récupérer toutes les données de la base SQLite
    if (pathname === '/api/bootstrap' && req.method === 'GET') {
      return sendJson(res, 200, getAllStateFromDb());
    }

    // 2. Créer ou modifier un article
    if (pathname === '/api/products' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const { id, name, price, image, colors, status, createdAt } = body;
      if (!name || !price || !image) {
        return sendJson(res, 400, { error: 'Champs obligatoires manquants' });
      }
      const prodId = id || 'prod-' + Date.now();
      const now = createdAt || Date.now();
      db.prepare(`
        INSERT INTO products (id, name, price, image, colors_json, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
          name = excluded.name,
          price = excluded.price,
          image = excluded.image,
          colors_json = excluded.colors_json,
          status = excluded.status
      `).run(prodId, name, Number(price), image, JSON.stringify(colors || []), status || 'published', now);

      return sendJson(res, 200, { ok: true, state: getAllStateFromDb() });
    }

    // 3. Supprimer un article
    if (pathname.startsWith('/api/products/') && req.method === 'DELETE') {
      const prodId = decodeURIComponent(pathname.replace('/api/products/', ''));
      db.prepare(`DELETE FROM products WHERE id = ?`).run(prodId);
      return sendJson(res, 200, { ok: true, state: getAllStateFromDb() });
    }

    // 4. Enregistrer une commande de 10 % + Retirer automatiquement l'article du catalogue publié
    if (pathname === '/api/orders' && req.method === 'POST') {
      const o = await readJsonBody(req);
      const orderId = o.id || 'cmd-' + Date.now();
      const now = o.createdAt || Date.now();

      db.prepare(`
        INSERT INTO orders (
          id, product_id, product_name, product_image, product_price,
          deposit_amount, remaining_amount, selected_color,
          customer_name, customer_phone, customer_country, customer_address,
          payment_method, payment_reference, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        orderId,
        o.productId,
        o.productName,
        o.productImage,
        Number(o.productPrice),
        Number(o.depositAmount),
        Number(o.remainingAmount),
        o.selectedColor || 'Standard',
        o.customerName,
        o.customerPhone,
        o.customerCountry || 'Sénégal',
        o.customerAddress || '',
        o.paymentMethod || 'Wave',
        o.paymentReference || '',
        now
      );

      // Passer l'article en statut "ordered" pour qu'il disparaisse immédiatement des articles publiés
      db.prepare(`UPDATE products SET status = 'ordered' WHERE id = ?`).run(o.productId);

      return sendJson(res, 200, { ok: true, state: getAllStateFromDb() });
    }

    // 5. Supprimer une commande de l'historique
    if (pathname.startsWith('/api/orders/') && req.method === 'DELETE') {
      const orderId = decodeURIComponent(pathname.replace('/api/orders/', ''));
      db.prepare(`DELETE FROM orders WHERE id = ?`).run(orderId);
      return sendJson(res, 200, { ok: true, state: getAllStateFromDb() });
    }

    // 6. Inscrire un client ou mettre à jour ses favoris ❤️
    if (pathname === '/api/customers' && req.method === 'POST') {
      const c = await readJsonBody(req);
      if (!c.phone || !c.firstName || !c.lastName) {
        return sendJson(res, 400, { error: 'Nom, prénom et téléphone requis' });
      }
      const existing = db.prepare(`SELECT * FROM customers WHERE phone = ?`).get(c.phone);
      if (existing) {
        const mergedFavs = Array.isArray(c.favorites)
          ? c.favorites
          : JSON.parse(existing.favorites_json || '[]');
        db.prepare(`
          UPDATE customers
          SET first_name = ?, last_name = ?, favorites_json = ?
          WHERE phone = ?
        `).run(c.firstName, c.lastName, JSON.stringify(mergedFavs), c.phone);
      } else {
        db.prepare(`
          INSERT INTO customers (id, first_name, last_name, phone, favorites_json, created_at)
          VALUES (?, ?, ?, ?, ?, ?)
        `).run(
          c.id || 'cust-' + Date.now(),
          c.firstName,
          c.lastName,
          c.phone,
          JSON.stringify(c.favorites || []),
          Date.now()
        );
      }
      return sendJson(res, 200, { ok: true, state: getAllStateFromDb() });
    }

    // 7. Mettre à jour les paramètres (Nom boutique, Taux GNF, Code PIN Admin)
    if (pathname === '/api/settings' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const upsert = db.prepare(`
        INSERT INTO settings (key, value) VALUES (?, ?)
        ON CONFLICT(key) DO UPDATE SET value = excluded.value
      `);
      for (const [k, v] of Object.entries(body)) {
        if (['shopName', 'gnfRate', 'adminPin'].includes(k)) {
          upsert.run(k, String(v));
        }
      }
      return sendJson(res, 200, { ok: true, state: getAllStateFromDb() });
    }

    // Fichiers statiques (index.html, styles.css, app.js)
    let filePath = pathname === '/' ? '/index.html' : pathname;
    const safePath = path.normalize(filePath).replace(/^(\.\.[\/\\])+/, '');
    const fullPath = path.join(__dirname, safePath);

    if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
      const ext = path.extname(fullPath).toLowerCase();
      const mimeTypes = {
        '.html': 'text/html; charset=utf-8',
        '.css': 'text/css; charset=utf-8',
        '.js': 'application/javascript; charset=utf-8',
        '.json': 'application/json; charset=utf-8',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.svg': 'image/svg+xml'
      };
      res.writeHead(200, {
        'Content-Type': mimeTypes[ext] || 'application/octet-stream',
        'X-Content-Type-Options': 'nosniff'
      });
      fs.createReadStream(fullPath).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Page introuvable');
    }
  } catch (err) {
    console.error('Erreur serveur :', err);
    sendJson(res, 500, { error: 'Erreur interne du serveur' });
  }
});

server.on('error', err => {
  if (err.code === 'EADDRINUSE') {
    console.log(`ℹ️ Le serveur Barry Aliou Shop est déjà en cours d'exécution sur : http://localhost:${PORT}`);
    process.exit(0);
  } else {
    console.error('Erreur au démarrage du serveur :', err);
  }
});

server.listen(PORT, () => {
  console.log(`✅ Serveur Barry Aliou Shop + Base de données SQLite démarrés sur : http://localhost:${PORT}`);
});

