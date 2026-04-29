const CART_KEY = "telidokon_cart";
const FAVORITES_KEY = "telidokon_favorites";
const LOCATION_KEY = "telidokon_location";
const LANGUAGE_KEY = "telidokon_language";
const STOCK_KEY = "telidokon_stock";
const BOT_OFFSET_KEY = "telidokon_bot_offset";
const BOT_TOKEN = "8661079419:AAH5kVfk6Eu7bZReioDwnvxb0WhKixiOR6k";
const CHAT_ID = "8085252809";
const MAX_QUANTITY = 10;
const TOAST_DURATION = 2000;
const BATTERY_REFRESH_MS = 30000;
const STOCK_POLL_MS = 5000;

const page = document.body.dataset.page || "home";
let currentLanguage = localStorage.getItem(LANGUAGE_KEY) || "uz";
let currentSearchQuery = "";
let stockPollTimer = null;
let batteryRefreshTimer = null;

const i18n = {
  uz: {
    brand_tagline: "Elektronika do'koni",
    delivery_label: "Yetkazib berish",
    select_region: "Hududni tanlang",
    cart: "Savat",
    order: "Buyurtma",
    home: "Bosh sahifa",
    catalog: "Katalog",
    search: "Qidirish",
    search_placeholder: "Mahsulot nomi yoki ID bo'yicha qidirish",
    popular_products: "Ommabop mahsulotlar",
    products_title: "Bugun xarid qilinayotgan texnikalar",
    favorites: "Sevimlilar",
    favorites_title: "Saqlangan mahsulotlar",
    favorites_empty: "Hali sevimli mahsulotlar yo'q.",
    add_to_cart: "Savatga qo'shish",
    go_to_cart: "Savatga o'tish",
    out_of_stock: "Omborda mavjud emas",
    in_stock: "Sotuvda",
    product_id: "ID",
    empty_products: "Qidiruv bo'yicha mahsulot topilmadi.",
    summary_title: "Buyurtma xulosasi",
    summary_items: "Mahsulotlar",
    summary_delivery: "Yetkazib berish",
    free: "Bepul",
    total: "Jami",
    empty_cart_title: "Savatingiz hozircha bo'sh",
    empty_cart_text: "Mahsulot tanlang va buyurtmani davom ettiring.",
    browse_products: "Mahsulotlarga o'tish",
    no_selected_products: "Tanlangan mahsulotlar yo'q.",
    remove: "O'chirish",
    proceed_to_order: "Buyurtmaga o'tish",
    your_order: "Sizning buyurtmangiz",
    edit_cart: "Savatni tahrirlash",
    checkout_empty: "Savatingiz bo'sh. Avval mahsulot tanlang.",
    order_sending: "Buyurtma yuborilmoqda...",
    order_success: "Buyurtma muvaffaqiyatli yuborildi.",
    order_error: "Telegramga yuborilmadi. Token, chat ID va tarmoqni tekshiring.",
    cart_empty_short: "Savatingiz bo'sh.",
    location_not_found: "Hudud topilmadi",
    city_not_found: "Shahar topilmadi",
    center: "Markaz",
    all_fields_required: "Barcha maydonlarni to'ldiring",
    internet_lost: "Internet connection lost",
    internet_restored: "Internet connection restored",
    product_added_to_cart: "Product added to cart",
    stock_unavailable_notice: "Bu mahsulot vaqtincha mavjud emas.",
    added_to_favorites: "Mahsulot sevimlilarga qo'shildi",
    removed_from_favorites: "Mahsulot sevimlilardan olib tashlandi",
    stock_updated: "Mahsulot holati yangilandi",
    account: "Kabinet",
    close: "Yopish"
  },
  ru: {
    brand_tagline: "Магазин электроники",
    delivery_label: "Доставка",
    select_region: "Выберите регион",
    cart: "Корзина",
    order: "Заказ",
    home: "Главная",
    catalog: "Каталог",
    search: "Поиск",
    search_placeholder: "Поиск по названию товара или ID",
    popular_products: "Популярные товары",
    products_title: "Техника, которую покупают сегодня",
    favorites: "Избранное",
    favorites_title: "Сохраненные товары",
    favorites_empty: "Пока нет избранных товаров.",
    add_to_cart: "Добавить в корзину",
    go_to_cart: "В корзину",
    out_of_stock: "Нет в наличии",
    in_stock: "В наличии",
    product_id: "ID",
    empty_products: "По вашему запросу ничего не найдено.",
    summary_title: "Сводка заказа",
    summary_items: "Товары",
    summary_delivery: "Доставка",
    free: "Бесплатно",
    total: "Итого",
    empty_cart_title: "Ваша корзина пока пуста",
    empty_cart_text: "Выберите товар и продолжите заказ.",
    browse_products: "Перейти к товарам",
    no_selected_products: "Нет выбранных товаров.",
    remove: "Удалить",
    proceed_to_order: "Перейти к заказу",
    your_order: "Ваш заказ",
    edit_cart: "Редактировать корзину",
    checkout_empty: "Корзина пуста. Сначала выберите товары.",
    order_sending: "Отправляем заказ...",
    order_success: "Заказ успешно отправлен.",
    order_error: "Не удалось отправить в Telegram.",
    cart_empty_short: "Корзина пуста.",
    location_not_found: "Регион не найден",
    city_not_found: "Город не найден",
    center: "Центр",
    all_fields_required: "Заполните все поля",
    internet_lost: "Internet connection lost",
    internet_restored: "Internet connection restored",
    product_added_to_cart: "Product added to cart",
    stock_unavailable_notice: "Этот товар временно недоступен.",
    added_to_favorites: "Товар добавлен в избранное",
    removed_from_favorites: "Товар удален из избранного",
    stock_updated: "Статус товара обновлен",
    account: "Аккаунт",
    close: "Закрыть"
  },
  en: {
    brand_tagline: "Electronics store",
    delivery_label: "Delivery",
    select_region: "Choose region",
    cart: "Cart",
    order: "Order",
    home: "Home",
    catalog: "Catalog",
    search: "Search",
    search_placeholder: "Search by product name or ID",
    popular_products: "Popular products",
    products_title: "Electronics customers are buying today",
    favorites: "Favorites",
    favorites_title: "Saved products",
    favorites_empty: "No favorite products yet.",
    add_to_cart: "Add to cart",
    go_to_cart: "Go to cart",
    out_of_stock: "Out of stock",
    in_stock: "In stock",
    product_id: "ID",
    empty_products: "No products matched your search.",
    summary_title: "Order summary",
    summary_items: "Products",
    summary_delivery: "Delivery",
    free: "Free",
    total: "Total",
    empty_cart_title: "Your cart is empty",
    empty_cart_text: "Choose products and continue your order.",
    browse_products: "Browse products",
    no_selected_products: "No products selected.",
    remove: "Remove",
    proceed_to_order: "Proceed to order",
    your_order: "Your order",
    edit_cart: "Edit cart",
    checkout_empty: "Your cart is empty. Add products first.",
    order_sending: "Sending your order...",
    order_success: "Order sent successfully.",
    order_error: "Telegram send failed.",
    cart_empty_short: "Your cart is empty.",
    location_not_found: "Region not found",
    city_not_found: "City not found",
    center: "Center",
    all_fields_required: "Please fill in all fields",
    internet_lost: "Internet connection lost",
    internet_restored: "Internet connection restored",
    product_added_to_cart: "Product added to cart",
    stock_unavailable_notice: "This product is temporarily unavailable.",
    added_to_favorites: "Product added to favorites",
    removed_from_favorites: "Product removed from favorites",
    stock_updated: "Product status updated",
    account: "Account",
    close: "Close"
  }
};

const categories = {
  smartphones: { uz: "Smartfon", ru: "Смартфон", en: "Smartphone" },
  accessories: { uz: "Aksessuar", ru: "Аксессуар", en: "Accessory" }
};

const products = [
  {
    id: 1001,
    name: "iPhone 11",
    names: { uz: "iPhone 11", ru: "iPhone 11", en: "iPhone 11" },
    price: 7290000,
    rating: 4.5,
    categoryKey: "smartphones",
    image: "images/iphone-15.jpg",
    aliases: ["iphone 11"]
  },
  {
    id: 1002,
    name: "iPhone 12",
    names: { uz: "iPhone 12", ru: "iPhone 12", en: "iPhone 12" },
    price: 8890000,
    rating: 4.6,
    categoryKey: "smartphones",
    image: "images/iphone-15.jpg",
    aliases: ["iphone 12"]
  },
  {
    id: 1003,
    name: "iPhone 13",
    names: { uz: "iPhone 13", ru: "iPhone 13", en: "iPhone 13" },
    price: 10890000,
    rating: 4.7,
    categoryKey: "smartphones",
    image: "images/iphone-15.jpg",
    aliases: ["iphone 13"]
  },
  {
    id: 1004,
    name: "iPhone 14",
    names: { uz: "iPhone 14", ru: "iPhone 14", en: "iPhone 14" },
    price: 13290000,
    rating: 4.8,
    categoryKey: "smartphones",
    image: "images/iphone-15.jpg",
    aliases: ["iphone 14"]
  },
  {
    id: 1005,
    name: "iPhone 15",
    names: { uz: "iPhone 15", ru: "iPhone 15", en: "iPhone 15" },
    price: 16490000,
    rating: 4.8,
    categoryKey: "smartphones",
    image: "images/iphone-15.jpg",
    aliases: ["iphone 15", "iphone15"]
  },
  {
    id: 1006,
    name: "Samsung Galaxy S21",
    names: { uz: "Samsung Galaxy S21", ru: "Samsung Galaxy S21", en: "Samsung Galaxy S21" },
    price: 8390000,
    rating: 4.4,
    categoryKey: "smartphones",
    image: "images/samsung.jpg",
    aliases: ["samsung galaxy s21", "galaxy s21", "s21"]
  },
  {
    id: 1007,
    name: "Samsung Galaxy S22",
    names: { uz: "Samsung Galaxy S22", ru: "Samsung Galaxy S22", en: "Samsung Galaxy S22" },
    price: 10490000,
    rating: 4.6,
    categoryKey: "smartphones",
    image: "images/samsung.jpg",
    aliases: ["samsung galaxy s22", "galaxy s22", "s22"]
  },
  {
    id: 1008,
    name: "Samsung Galaxy S23",
    names: { uz: "Samsung Galaxy S23", ru: "Samsung Galaxy S23", en: "Samsung Galaxy S23" },
    price: 12890000,
    rating: 4.7,
    categoryKey: "smartphones",
    image: "images/S24-1.jpg",
    aliases: ["samsung galaxy s23", "galaxy s23", "s23"]
  },
  {
    id: 1009,
    name: "Redmi Note 12",
    names: { uz: "Redmi Note 12", ru: "Redmi Note 12", en: "Redmi Note 12" },
    price: 3690000,
    rating: 4.3,
    categoryKey: "smartphones",
    image: "images/redmi-1.jpg",
    aliases: ["redmi note 12", "note 12"]
  },
  {
    id: 1010,
    name: "Redmi Note 13",
    names: { uz: "Redmi Note 13", ru: "Redmi Note 13", en: "Redmi Note 13" },
    price: 4290000,
    rating: 4.5,
    categoryKey: "smartphones",
    image: "images/redmi-1.jpg",
    aliases: ["redmi note 13", "note 13"]
  },
  {
    id: 1011,
    name: "Poco X5",
    names: { uz: "Poco X5", ru: "Poco X5", en: "Poco X5" },
    price: 4890000,
    rating: 4.4,
    categoryKey: "smartphones",
    image: "images/poco-1.jpg",
    aliases: ["poco x5", "x5"]
  },
  {
    id: 1012,
    name: "Tecno Spark 10",
    names: { uz: "Tecno Spark 10", ru: "Tecno Spark 10", en: "Tecno Spark 10" },
    price: 2790000,
    rating: 4.1,
    categoryKey: "smartphones",
    image: "images/tel-1.jpg",
    aliases: ["tecno spark 10", "spark 10"]
  }
].map((product) => ({
  ...product,
  category: product.categoryKey
}));

const locationData = {
  Tashkent: ["Yunusabad", "Chilonzor", "Sergeli", "Mirzo Ulugbek", "Olmazor"],
  "Tashkent Region": ["Chirchiq", "Bekabad", "Yangiyul", "Angren", "Gazalkent"],
  Samarkand: ["Samarkand City", "Urgut", "Kattakurgan", "Pastdargom", "Payariq"],
  Bukhara: ["Bukhara City", "Gijduvan", "Kogon", "Vobkent", "Jondor"],
  Andijan: ["Andijan City", "Asaka", "Shahrixon", "Marhamat", "Baliqchi"],
  Namangan: ["Namangan City", "Chortoq", "Kosonsoy", "Pop", "Uychi"],
  Fergana: ["Fergana City", "Kokand", "Margilan", "Quva", "Rishton"],
  Jizzakh: ["Jizzakh City", "Gallaorol", "Zomin", "Paxtakor", "Forish"],
  Syrdarya: ["Gulistan", "Shirin", "Yangiyer", "Boyovut", "Sardoba"],
  Kashkadarya: ["Karshi", "Shahrisabz", "Kitob", "Yakkabog", "Muborak"],
  Surkhandarya: ["Termiz", "Denov", "Sherobod", "Boysun", "Jarqorgon"],
  Khorezm: ["Urgench", "Khiva", "Hazorasp", "Shovot", "Pitnak"],
  Navoi: ["Navoi City", "Zarafshan", "Karmana", "Nurota", "Konimex"],
  Karakalpakstan: ["Nukus", "Beruniy", "Tortkol", "Khodjeyli", "Chimboy"]
};

document.addEventListener("DOMContentLoaded", () => {
  injectSharedUi();
  applyLanguage();
  updateCartCount();
  setupLanguageButtons();
  setupMobileMenu();
  applySavedLocation();
  setupConnectionStatus();
  setupBatteryIndicator();
  setupStorageSync();
  startTelegramStockPolling();

  if (page === "home") {
    setupSearch();
    setupLocationModal();
  }

  if (page === "checkout") {
    setupCheckoutForm();
  }

  rerenderActiveViews();
});

function t(key) {
  return i18n[currentLanguage]?.[key] || i18n.uz[key] || key;
}

function safeJsonParse(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    return fallback;
  }
}

function getProductById(id) {
  return products.find((product) => product.id === Number(id));
}

function getProductName(product) {
  return product.names?.[currentLanguage] || product.name;
}

function getProductCategory(product) {
  return categories[product.categoryKey]?.[currentLanguage] || categories[product.categoryKey]?.uz || "";
}

function formatNumberWithSpaces(value) {
  return Math.round(value).toLocaleString("en-US").replace(/,/g, " ");
}

function formatPrice(price) {
  return `${formatNumberWithSpaces(price)} so'm`;
}

function clampQuantity(quantity) {
  return Math.max(1, Math.min(MAX_QUANTITY, Number(quantity) || 1));
}

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function readStorageArray(key) {
  return safeJsonParse(localStorage.getItem(key), []);
}

function readStorageObject(key) {
  return safeJsonParse(localStorage.getItem(key), {});
}

function getCart() {
  const cleanCart = readStorageArray(CART_KEY)
    .map((item) => {
      const product = getProductById(item.id);
      return product ? { id: product.id, quantity: clampQuantity(item.quantity) } : null;
    })
    .filter(Boolean);
  localStorage.setItem(CART_KEY, JSON.stringify(cleanCart));
  return cleanCart;
}

function saveCart(cart) {
  const cleanCart = cart
    .map((item) => ({ id: Number(item.id), quantity: clampQuantity(item.quantity) }))
    .filter((item) => item.quantity > 0);
  localStorage.setItem(CART_KEY, JSON.stringify(cleanCart));
  updateCartCount();
}

function getDetailedCart() {
  return getCart()
    .map((item) => {
      const product = getProductById(item.id);
      return product ? { ...item, product } : null;
    })
    .filter(Boolean);
}

function getCartQuantity(productId) {
  return getCart().find((item) => item.id === productId)?.quantity || 0;
}

function updateCartCount() {
  const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll("#cartCount").forEach((element) => {
    element.textContent = count;
  });
}

function getFavorites() {
  const validIds = readStorageArray(FAVORITES_KEY)
    .map(Number)
    .filter((id) => Boolean(getProductById(id)));
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(validIds));
  return validIds;
}

function saveFavorites(favorites) {
  const uniqueFavorites = [...new Set(favorites.map(Number))].filter((id) => Boolean(getProductById(id)));
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(uniqueFavorites));
}

function isFavorite(productId) {
  return getFavorites().includes(productId);
}

function getFavoriteProducts() {
  return getFavorites()
    .map((id) => getProductById(id))
    .filter(Boolean);
}

function getStockMap() {
  const stockMap = readStorageObject(STOCK_KEY);
  products.forEach((product) => {
    if (typeof stockMap[product.id] !== "boolean") {
      stockMap[product.id] = true;
    }
  });
  localStorage.setItem(STOCK_KEY, JSON.stringify(stockMap));
  return stockMap;
}

function saveStockMap(stockMap) {
  localStorage.setItem(STOCK_KEY, JSON.stringify(stockMap));
}

function isInStock(productId) {
  return getStockMap()[productId] !== false;
}

function updateBottomNavState() {
  const links = document.querySelectorAll(".mobile-bottom-nav a");
  links.forEach((link) => {
    const isActive =
      (page === "home" && link.dataset.page === "home" && !location.hash) ||
      (page === "home" && link.dataset.section && location.hash === `#${link.dataset.section}`) ||
      (page === "cart" && link.dataset.page === "cart") ||
      (page === "checkout" && link.dataset.page === "checkout");
    link.classList.toggle("active", Boolean(isActive));
  });
}

function rerenderActiveViews() {
  if (page === "home") {
    renderProducts(filterProducts(currentSearchQuery));
    renderFavoritesSection();
  }
  if (page === "cart") {
    renderCartPage();
  }
  if (page === "checkout") {
    renderCheckoutSummary();
  }
  updateCartCount();
  updateBottomNavState();
}

function filterProducts(query) {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) {
    return products;
  }
  return products.filter((product) => {
    const names = Object.values(product.names || {}).map(normalizeText);
    return names.some((name) => name.includes(normalizedQuery)) || String(product.id).includes(normalizedQuery);
  });
}

function renderRating(rating) {
  const clamped = Math.max(1, Math.min(5, Number(rating) || 1));
  return `
    <div class="product-rating" aria-label="Rating ${clamped} out of 5">
      <span class="rating-stars" style="--rating-width: ${(clamped / 5) * 100}%"></span>
      <span class="rating-value">${clamped.toFixed(1)}</span>
    </div>
  `;
}

function renderProductCard(product) {
  const quantity = getCartQuantity(product.id);
  const favorite = isFavorite(product.id);
  const inStock = isInStock(product.id);
  const productName = getProductName(product);

  return `
    <article class="product-card ${inStock ? "" : "out-of-stock"}">
      ${inStock ? "" : `<span class="product-stock-badge">${t("out_of_stock")}</span>`}
      <div class="product-image">
        <img src="${product.image}" alt="${productName}">
      </div>
      <div class="product-body">
        <div class="product-header">
          <span class="product-category">${getProductCategory(product)}</span>
          <button
            class="favorite-btn ${favorite ? "active" : ""}"
            type="button"
            onclick="toggleFavorite(${product.id})"
            aria-label="${t("favorites")}"
            aria-pressed="${favorite}"
          >&#9829;</button>
        </div>
        <h3 class="product-title">${productName}</h3>
        <small class="product-id">${t("product_id")}: ${product.id}</small>
        ${renderRating(product.rating)}
        <p class="product-price">${formatPrice(product.price)}</p>
        ${quantity > 0 ? `
          <div class="product-counter">
            <div class="counter-controls">
              <button class="quantity-btn" type="button" onclick="changeProductCardQuantity(${product.id}, -1)">-</button>
              <span class="counter-box">${quantity}</span>
              <button class="quantity-btn" type="button" onclick="changeProductCardQuantity(${product.id}, 1)" ${quantity >= MAX_QUANTITY || !inStock ? "disabled" : ""}>+</button>
            </div>
            <a class="counter-link" href="cart.html">${t("go_to_cart")}</a>
          </div>
        ` : `
          <button class="primary-btn full-width ${inStock ? "" : "stock-disabled"}" type="button" onclick="addToCart(${product.id})" ${inStock ? "" : "disabled"}>${t("add_to_cart")}</button>
        `}
      </div>
    </article>
  `;
}

function renderProducts(productList) {
  const grid = document.getElementById("productsGrid");
  if (!grid) {
    return;
  }

  if (!productList.length) {
    grid.innerHTML = `<div class="empty-state"><h3>${t("empty_products")}</h3></div>`;
    return;
  }

  grid.innerHTML = productList.map(renderProductCard).join("");
}

function renderFavoritesSection() {
  const favoritesGrid = document.getElementById("favoritesGrid");
  if (!favoritesGrid) {
    return;
  }

  const favoriteProducts = getFavoriteProducts();
  if (!favoriteProducts.length) {
    favoritesGrid.innerHTML = `
      <div class="empty-state">
        <h3>${t("favorites_empty")}</h3>
        <a class="secondary-link" href="#products">${t("browse_products")}</a>
      </div>
    `;
    return;
  }

  favoritesGrid.innerHTML = favoriteProducts.map(renderProductCard).join("");
}

function setupSearch() {
  const input = document.getElementById("searchInput");
  const button = document.getElementById("searchButton");
  if (!input) {
    return;
  }

  const applySearch = () => {
    currentSearchQuery = input.value;
    renderProducts(filterProducts(currentSearchQuery));
  };

  input.addEventListener("input", applySearch);
  button?.addEventListener("click", applySearch);
}

function addToCart(productId) {
  const product = getProductById(productId);
  if (!product || !isInStock(productId)) {
    showToast({
      type: "error",
      message: t("stock_unavailable_notice")
    });
    return;
  }

  const cart = getCart();
  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    if (existing.quantity < MAX_QUANTITY) {
      existing.quantity += 1;
    }
  } else {
    cart.push({ id: productId, quantity: 1 });
  }

  saveCart(cart);
  rerenderActiveViews();
  showToast({
    type: "info",
    title: t("product_added_to_cart"),
    image: product.image,
    actionLabel: t("go_to_cart"),
    actionHref: "cart.html"
  });
}

function changeProductCardQuantity(productId, change) {
  if (change > 0 && !isInStock(productId)) {
    showToast({
      type: "error",
      message: t("stock_unavailable_notice")
    });
    return;
  }

  const cart = getCart();
  const item = cart.find((cartItem) => cartItem.id === productId);
  if (!item) {
    return;
  }

  const newQuantity = item.quantity + change;
  if (newQuantity <= 0) {
    saveCart(cart.filter((cartItem) => cartItem.id !== productId));
  } else if (newQuantity <= MAX_QUANTITY) {
    item.quantity = newQuantity;
    saveCart(cart);
  }

  rerenderActiveViews();
}

function changeQuantity(productId, amount) {
  if (amount > 0 && !isInStock(productId)) {
    showToast({
      type: "error",
      message: t("stock_unavailable_notice")
    });
    return;
  }

  const cart = getCart();
  const item = cart.find((cartItem) => cartItem.id === productId);
  if (!item) {
    return;
  }

  const newQuantity = item.quantity + amount;
  if (newQuantity <= 0) {
    saveCart(cart.filter((cartItem) => cartItem.id !== productId));
  } else if (newQuantity <= MAX_QUANTITY) {
    item.quantity = newQuantity;
    saveCart(cart);
  }

  rerenderActiveViews();
}

function removeFromCart(productId) {
  saveCart(getCart().filter((item) => item.id !== productId));
  rerenderActiveViews();
}

function toggleFavorite(productId) {
  const product = getProductById(productId);
  if (!product) {
    return;
  }

  const favorites = getFavorites();
  const exists = favorites.includes(productId);
  const updatedFavorites = exists
    ? favorites.filter((id) => id !== productId)
    : [...favorites, productId];

  saveFavorites(updatedFavorites);
  rerenderActiveViews();
  showToast({
    type: "success",
    image: product.image,
    message: exists ? t("removed_from_favorites") : t("added_to_favorites")
  });
}

function renderCartPage() {
  const container = document.getElementById("cartItemsContainer");
  const summary = document.getElementById("cartSummary");
  if (!container || !summary) {
    return;
  }

  const cart = getDetailedCart();
  if (!cart.length) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>${t("empty_cart_title")}</h3>
        <p>${t("empty_cart_text")}</p>
        <a class="primary-btn" href="index.html">${t("browse_products")}</a>
      </div>
    `;
    summary.innerHTML = `
      <h3>${t("summary_title")}</h3>
      <p class="form-note">${t("no_selected_products")}</p>
    `;
    return;
  }

  container.innerHTML = cart.map((item) => {
    const inStock = isInStock(item.product.id);
    return `
      <article class="cart-item">
        <img class="cart-item-image" src="${item.product.image}" alt="${getProductName(item.product)}">
        <div class="cart-item-meta">
          <h3>${getProductName(item.product)}</h3>
          <p>${getProductCategory(item.product)}</p>
          <p>${t("product_id")}: ${item.product.id}</p>
          <p>${formatPrice(item.product.price)}</p>
          ${inStock ? "" : `<p style="color:#dc2626;font-weight:700;">${t("out_of_stock")}</p>`}
          <div class="cart-item-actions">
            <div class="quantity-box">
              <button class="quantity-btn" type="button" onclick="changeQuantity(${item.product.id}, -1)">-</button>
              <strong>${item.quantity}</strong>
              <button class="quantity-btn" type="button" onclick="changeQuantity(${item.product.id}, 1)" ${item.quantity >= MAX_QUANTITY || !inStock ? "disabled" : ""}>+</button>
            </div>
            <button class="remove-btn" type="button" onclick="removeFromCart(${item.product.id})">${t("remove")}</button>
          </div>
        </div>
        <strong>${formatPrice(item.product.price * item.quantity)}</strong>
      </article>
    `;
  }).join("");

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  summary.innerHTML = `
    <h3>${t("summary_title")}</h3>
    <div class="summary-list">
      <span>${t("summary_items")}</span>
      <span>${totalItems}</span>
    </div>
    <div class="summary-list">
      <span>${t("summary_delivery")}</span>
      <span>${t("free")}</span>
    </div>
    <div class="summary-total">
      <span>${t("total")}</span>
      <span>${formatPrice(totalPrice)}</span>
    </div>
    <a class="primary-btn full-width" href="checkout.html">${t("proceed_to_order")}</a>
  `;
}

function renderCheckoutSummary() {
  const summary = document.getElementById("checkoutSummary");
  if (!summary) {
    return;
  }

  const cart = getDetailedCart();
  if (!cart.length) {
    summary.innerHTML = `
      <h3>${t("summary_title")}</h3>
      <p class="form-note">${t("checkout_empty")}</p>
      <a class="primary-btn full-width" href="index.html">${t("browse_products")}</a>
    `;
    return;
  }

  const itemsHtml = cart.map((item) => `
    <div class="summary-list">
      <span>${getProductName(item.product)} x${item.quantity}</span>
      <span>${formatPrice(item.product.price * item.quantity)}</span>
    </div>
  `).join("");

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  summary.innerHTML = `
    <h3>${t("your_order")}</h3>
    ${itemsHtml}
    <div class="summary-total">
      <span>${t("total")}</span>
      <span>${formatPrice(total)}</span>
    </div>
    <a class="secondary-link full-width" href="cart.html">${t("edit_cart")}</a>
  `;
}

function setupCheckoutForm() {
  const form = document.getElementById("checkoutForm");
  const status = document.getElementById("checkoutStatus");
  if (!form || !status) {
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const cart = getDetailedCart();
    if (!cart.length) {
      status.textContent = t("cart_empty_short");
      status.style.color = "#dc2626";
      return;
    }

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const address = document.getElementById("customerAddress").value.trim();
    if (!name || !phone || !address) {
      status.textContent = t("all_fields_required");
      status.style.color = "#dc2626";
      return;
    }

    const orderId = `ORD-${Date.now()}`;
    const date = new Date().toLocaleString();
    const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const lines = cart
      .map((item) => `- ${getProductName(item.product)} [${item.product.id}] x${item.quantity}`)
      .join("\n");

    const message = [
      "New Order",
      `Order ID: ${orderId}`,
      "",
      "Products:",
      lines,
      "",
      `Total: ${formatPrice(total)}`,
      "",
      "Customer Info:",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Address: ${address}`,
      "",
      `Date: ${date}`
    ].join("\n");

    status.textContent = t("order_sending");
    status.style.color = "#6b7280";

    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text: message })
      });
      localStorage.removeItem(CART_KEY);
      updateCartCount();
      form.reset();
      renderCheckoutSummary();
      status.textContent = t("order_success");
      status.style.color = "#16a34a";
    } catch (error) {
      status.textContent = t("order_error");
      status.style.color = "#dc2626";
      console.error(error);
    }
  });
}
// internet
function setupLocationModal() {
  const modal = document.getElementById("locationModal");
  const openButton = document.getElementById("openLocationModal");
  const closeButton = document.getElementById("closeLocationModal");
  const saveButton = document.getElementById("saveLocationBtn");
  const regionSearch = document.getElementById("regionSearch");
  const citySearch = document.getElementById("citySearch");
  const regionSelect = document.getElementById("regionSelect");
  const citySelect = document.getElementById("citySelect");

  if (!modal || !openButton || !closeButton || !saveButton || !regionSearch || !citySearch || !regionSelect || !citySelect) {
    return;
  }

  let filteredRegions = Object.keys(locationData);

  function renderRegions() {
    if (!filteredRegions.length) {
      regionSelect.innerHTML = `<option value="">${t("location_not_found")}</option>`;
      citySelect.innerHTML = `<option value="">${t("city_not_found")}</option>`;
      return;
    }

    regionSelect.innerHTML = filteredRegions
      .map((region) => `<option value="${region}">${region}</option>`)
      .join("");
    renderCities(regionSelect.value, normalizeText(citySearch.value));
  }

  function renderCities(region, query = "") {
    const cities = locationData[region] || [];
    const filteredCities = cities.filter((city) => normalizeText(city).includes(query));
    citySelect.innerHTML = filteredCities.length
      ? filteredCities.map((city) => `<option value="${city}">${city}</option>`).join("")
      : `<option value="">${t("city_not_found")}</option>`;
  }

  openButton.addEventListener("click", () => modal.classList.add("open"));
  closeButton.addEventListener("click", () => modal.classList.remove("open"));
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.remove("open");
    }
  });

  regionSearch.addEventListener("input", () => {
    const query = normalizeText(regionSearch.value);
    filteredRegions = Object.keys(locationData).filter((region) => normalizeText(region).includes(query));
    renderRegions();
  });

  regionSelect.addEventListener("change", () => {
    renderCities(regionSelect.value, normalizeText(citySearch.value));
  });

  citySearch.addEventListener("input", () => {
    renderCities(regionSelect.value, normalizeText(citySearch.value));
  });

  saveButton.addEventListener("click", () => {
    const city = citySelect.value || t("center");
    localStorage.setItem(LOCATION_KEY, `${regionSelect.value}, ${city}`);
    applySavedLocation();
    modal.classList.remove("open");
  });

  renderRegions();
}

function applySavedLocation() {
  const label = document.getElementById("selectedLocationLabel");
  if (!label) {
    return;
  }
  label.textContent = localStorage.getItem(LOCATION_KEY) || t("select_region");
}

function applyLanguage() {
  document.documentElement.lang = currentLanguage;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder));
  });
  document.querySelectorAll(".lang-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === currentLanguage);
  });
  document.querySelectorAll(".mobile-bottom-nav a[data-i18n]").forEach((link) => {
    const label = link.querySelector(".mobile-bottom-nav-label");
    if (label) {
      label.textContent = t(link.dataset.i18n);
    }
  });
  applySavedLocation();
}

function setupLanguageButtons() {
  document.querySelectorAll(".lang-btn").forEach((button) => {
    button.addEventListener("click", () => {
      currentLanguage = button.dataset.lang;
      localStorage.setItem(LANGUAGE_KEY, currentLanguage);
      applyLanguage();
      rerenderActiveViews();
    });
  });
}

function setupMobileMenu() {
  const toggle = document.getElementById("menuToggle");
  const menu = document.getElementById("mobileMenu");
  if (!toggle || !menu) {
    return;
  }

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function injectSharedUi() {
  if (!document.getElementById("statusStack")) {
    const statusStack = document.createElement("div");
    statusStack.className = "status-stack";
    statusStack.id = "statusStack";
    document.body.appendChild(statusStack);
  }

  if (!document.getElementById("batteryIndicator")) {
    const batteryIndicator = document.createElement("div");
    batteryIndicator.className = "battery-indicator";
    batteryIndicator.id = "batteryIndicator";
    batteryIndicator.hidden = true;
    document.body.appendChild(batteryIndicator);
  }

  if (!document.querySelector(".mobile-bottom-nav")) {
    const nav = document.createElement("nav");
    nav.className = "mobile-bottom-nav";
    nav.setAttribute("aria-label", "Mobile navigation");
    nav.innerHTML = `
      <a href="index.html" data-page="home" data-i18n="home">
        <span class="mobile-bottom-nav-icon">&#8962;</span>
        <span class="mobile-bottom-nav-label">${t("home")}</span>
      </a>
      <a href="${page === "home" ? "#products" : "index.html#products"}" data-section="products" data-i18n="catalog">
        <span class="mobile-bottom-nav-icon">&#9638;</span>
        <span class="mobile-bottom-nav-label">${t("catalog")}</span>
      </a>
      <a href="cart.html" data-page="cart" data-i18n="cart">
        <span class="mobile-bottom-nav-icon">&#128722;</span>
        <span class="mobile-bottom-nav-label">${t("cart")}</span>
      </a>
      <a href="${page === "home" ? "#favorites" : "index.html#favorites"}" data-section="favorites" data-i18n="favorites">
        <span class="mobile-bottom-nav-icon">&#9829;</span>
        <span class="mobile-bottom-nav-label">${t("favorites")}</span>
      </a>
      <a href="checkout.html" data-page="checkout" data-i18n="account">
        <span class="mobile-bottom-nav-icon">&#128100;</span>
        <span class="mobile-bottom-nav-label">${t("account")}</span>
      </a>
    `;
    document.body.appendChild(nav);
  }

  window.addEventListener("hashchange", updateBottomNavState);
  updateBottomNavState();
}

function showToast({
  type = "info",
  title = "",
  message = "",
  image = "",
  actionLabel = "",
  actionHref = ""
}) {
  const stack = document.getElementById("statusStack");
  if (!stack) {
    return;
  }

  const toast = document.createElement("div");
  toast.className = `status-toast ${type}`;

  const imageMarkup = image ? `<img class="status-toast-thumb" src="${image}" alt="">` : "";
  const bodyTitle = title ? `<strong>${title}</strong>` : "";
  const bodyMessage = message ? `<p>${message}</p>` : "";
  const actionMarkup = actionLabel && actionHref
    ? `<a class="status-toast-action" href="${actionHref}">${actionLabel}</a>`
    : "";

  toast.innerHTML = `
    ${imageMarkup}
    <div class="status-toast-copy">
      ${bodyTitle}
      ${bodyMessage}
    </div>
    ${actionMarkup}
    <button class="status-toast-close" type="button" aria-label="${t("close")}">X</button>
  `;

  stack.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("show"));

  const removeToast = () => {
    toast.classList.remove("show");
    toast.classList.add("hide");
    window.setTimeout(() => toast.remove(), 280);
  };

  const closeButton = toast.querySelector(".status-toast-close");
  closeButton?.addEventListener("click", removeToast);
  window.setTimeout(removeToast, TOAST_DURATION);
}

function setupConnectionStatus() {
  if (!navigator.onLine) {
    showToast({ type: "error", message: t("internet_lost") });
  }

  window.addEventListener("offline", () => {
    showToast({ type: "error", message: t("internet_lost") });
  });

  window.addEventListener("online", () => {
    showToast({ type: "success", message: t("internet_restored") });
  });
}

async function setupBatteryIndicator() {
  const indicator = document.getElementById("batteryIndicator");
  if (!indicator || typeof navigator.getBattery !== "function") {
    if (indicator) {
      indicator.hidden = true;
    }
    return;
  }

  const battery = await navigator.getBattery();
  const renderBattery = () => {
    indicator.hidden = false;
    indicator.textContent = `🔋 ${Math.round(battery.level * 100)}%`;
  };

  renderBattery();
  battery.addEventListener("levelchange", renderBattery);
  if (batteryRefreshTimer) {
    window.clearInterval(batteryRefreshTimer);
  }
  batteryRefreshTimer = window.setInterval(renderBattery, BATTERY_REFRESH_MS);
}

function setupStorageSync() {
  window.addEventListener("storage", (event) => {
    if ([CART_KEY, FAVORITES_KEY, STOCK_KEY, LANGUAGE_KEY, LOCATION_KEY].includes(event.key)) {
      if (event.key === LANGUAGE_KEY) {
        currentLanguage = localStorage.getItem(LANGUAGE_KEY) || "uz";
        applyLanguage();
      }
      if (event.key === LOCATION_KEY) {
        applySavedLocation();
      }
      rerenderActiveViews();
    }
  });
}

function processStockCommand(text) {
  const match = String(text || "").trim().match(/^(.*)\s+(out of stock|in stock)$/i);
  if (!match) {
    return false;
  }

  const [, rawName, stockState] = match;
  const normalizedName = normalizeText(rawName);
  const product = products.find((item) => {
    const candidates = [
      item.name,
      ...(item.aliases || []),
      ...Object.values(item.names || {})
    ].map(normalizeText);
    return candidates.includes(normalizedName) || candidates.some((candidate) => candidate.includes(normalizedName));
  });

  if (!product) {
    return false;
  }

  const stockMap = getStockMap();
  stockMap[product.id] = stockState.toLowerCase() === "in stock";
  saveStockMap(stockMap);
  rerenderActiveViews();
  showToast({
    type: stockMap[product.id] ? "success" : "error",
    image: product.image,
    message: `${getProductName(product)}: ${stockMap[product.id] ? t("in_stock") : t("out_of_stock")}`
  });
  return true;
}

async function pollTelegramStockUpdates() {
  if (!BOT_TOKEN) {
    return;
  }

  const offset = Number(localStorage.getItem(BOT_OFFSET_KEY) || 0);
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/getUpdates?timeout=0&offset=${offset}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return;
    }
    const payload = await response.json();
    const updates = Array.isArray(payload.result) ? payload.result : [];
    if (!updates.length) {
      return;
    }

    let latestOffset = offset;
    updates.forEach((update) => {
      latestOffset = Math.max(latestOffset, Number(update.update_id) + 1);
      const message = update.message?.text || update.edited_message?.text || "";
      const chatId = String(update.message?.chat?.id || update.edited_message?.chat?.id || "");
      if (CHAT_ID && chatId && chatId !== CHAT_ID) {
        return;
      }
      processStockCommand(message);
    });

    localStorage.setItem(BOT_OFFSET_KEY, String(latestOffset));
  } catch (error) {
    console.error("Stock polling failed", error);
  }
}

function startTelegramStockPolling() {
  pollTelegramStockUpdates();
  if (stockPollTimer) {
    window.clearInterval(stockPollTimer);
  }
  stockPollTimer = window.setInterval(pollTelegramStockUpdates, STOCK_POLL_MS);
}

window.addToCart = addToCart;
window.changeProductCardQuantity = changeProductCardQuantity;
window.changeQuantity = changeQuantity;
window.removeFromCart = removeFromCart;
window.toggleFavorite = toggleFavorite;
window.handleStockCommand = processStockCommand;
