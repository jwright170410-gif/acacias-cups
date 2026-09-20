function productCard(p) {
  return `
    <article class="product-card">
      <a href="product.html?id=${p.id}">
        <div class="product-image">
          <img src="${p.image}" alt="${p.name}">
        </div>
      </a>

      <div class="product-copy">
        <span class="tag">${p.category}</span>

        <h3>
          <a href="product.html?id=${p.id}">${p.name}</a>
        </h3>

        <p>${p.description}</p>

        <div class="product-row">
          <strong>${money(p.price)}</strong>
          <a class="small-link" href="product.html?id=${p.id}">
            View product →
          </a>
        </div>
      </div>
    </article>
  `;
}

function renderShop() {
  const grid = document.getElementById('productGrid');

  if (grid) {
    grid.innerHTML = PRODUCTS.map(productCard).join('');
  }
}

function renderProduct() {
  const el = document.getElementById('productDetail');

  if (!el) return;

  const id = new URLSearchParams(location.search).get('id');
  const p = PRODUCTS.find(x => x.id === id) || PRODUCTS[0];

  el.innerHTML = `
    <section class="section detail-grid">

      <div class="detail-image">
        <img src="${p.image}" alt="${p.name}">
      </div>

      <div class="detail-copy">

        <p class="eyebrow">${p.category}</p>

        <h1>${p.name}</h1>

        <div class="detail-price">
          ${money(p.price)}
        </div>

        <p>${p.description}</p>

        <ul>
          ${p.details.map(x => `<li>${x}</li>`).join('')}
        </ul>

        <label>
          Personalisation / name
          <input id="personalisation" placeholder="e.g. Emma ♡">
        </label>

        <label>
          Quantity
          <input id="qty" type="number" min="1" value="1">
        </label>

        <button class="button primary" id="addProduct">
          Add to basket
        </button>

        <p id="added" class="message"></p>

        <p class="small-note">
          This demo basket does not process payment. Use the custom enquiry
          route to confirm the design, postage and final order.
        </p>

      </div>

    </section>
  `;

  document.getElementById('addProduct').onclick = () => {
    const qty = Math.max(
      1,
      Number(document.getElementById('qty').value) || 1
    );

    addToBasket(
      p.id,
      qty,
      document.getElementById('personalisation').value
    );

    document.getElementById('added').textContent =
      'Added to your basket ♡';

    updateBasketCount();
  };
}

function renderBasket() {
  const box = document.getElementById('basketItems');
  const summary = document.getElementById('basketSummary');

  if (!box) return;

  const b = getBasket();

  if (!b.length) {
    box.innerHTML = `
      <div class="empty">
        <h2>Your basket is empty</h2>
        <p>
          Have a look through the cups and choose your favourites.
        </p>
        <a class="button primary" href="index.html#shop">
          Shop cups
        </a>
      </div>
    `;

    if (summary) summary.innerHTML = '';

    return;
  }

  let total = 0;

  box.innerHTML = b.map(item => {
    const p = PRODUCTS.find(x => x.id === item.id);

    if (!p) return '';

    const line = p.price * item.qty;

    total += line;

    return `
      <div class="basket-item">

        <img src="${p.image}" alt="${p.name}">

        <div>
          <h3>${p.name}</h3>

          <p>
            ${
              item.personalisation
                ? `Personalisation: ${item.personalisation}`
                : 'No personalisation added'
            }
          </p>

          <strong>${money(line)}</strong>
        </div>

        <div class="qty">

          <button onclick="changeQty('${item.key}', -1)">
            −
          </button>

          <span>${item.qty}</span>

          <button onclick="changeQty('${item.key}', 1)">
            +
          </button>

        </div>

        <button
          class="remove"
          onclick="removeFromBasket('${item.key}')"
        >
          Remove
        </button>

      </div>
    `;
  }).join('');

  if (summary) {
    summary.innerHTML = `
      <div class="summary">

        <div>
          <span>Items</span>
          <strong>${money(total)}</strong>
        </div>

        <p>
          Postage and any final customisation costs can be confirmed
          with Acacia's Cups before payment.
        </p>

     <a class="button primary" href="index.html#custom">
       Continue to enquiry
    </a>

      </div>
    `;
  }
}

function setupMobileMenu() {
  const menuButton = document.querySelector('.menu');
  const nav = document.querySelector('.site-header nav');

  if (!menuButton || !nav) return;

  menuButton.setAttribute('aria-expanded', 'false');

  menuButton.addEventListener('click', () => {
    nav.classList.toggle('open');

    const open = nav.classList.contains('open');

    menuButton.setAttribute(
      'aria-expanded',
      open ? 'true' : 'false'
    );
  });
}

function updateBasketCount() {
  const basketCount = document.getElementById('basketCount');

  if (!basketCount) return;

  const basket = getBasket();

  const total = basket.reduce(
    (sum, item) => sum + Number(item.qty || 0),
    0
  );

  basketCount.textContent = total;
}

document.addEventListener('DOMContentLoaded', () => {

  renderShop();
  renderProduct();
  renderBasket();
  updateBasketCount();
  setupMobileMenu();

  const basketDetails = document.getElementById('basketDetails');

  if (basketDetails) {
    const basket = getBasket();

    if (basket.length) {
      basketDetails.value = basket.map(item => {
        const product = PRODUCTS.find(x => x.id === item.id);

        if (!product) return '';

        return `${product.name}
Quantity: ${item.qty}
Personalisation: ${item.personalisation || 'None'}
Price: ${money(product.price * item.qty)}`;
      }).filter(Boolean).join('\n\n');
    } else {
      basketDetails.value = 'No items added to basket.';
    }
  }

  const year = document.getElementById('year');

  if (year) {
    year.textContent = new Date().getFullYear();
  }

});

function fillBasketDetails() {
  const basketDetails = document.getElementById('basketDetails');

  if (!basketDetails) return;

  const basket = getBasket();

  if (!basket.length) {
    basketDetails.value = 'No items added to basket.';
    return;
  }

  basketDetails.value = basket.map(item => {
    const product = PRODUCTS.find(x => x.id === item.id);

    if (!product) return '';

    return `${product.name}
Quantity: ${item.qty}
Personalisation: ${item.personalisation || 'None'}
Price: ${money(product.price * item.qty)}`;
  }).filter(Boolean).join('\n\n');
}

document.querySelector('a[href="index.html#custom"]')?.addEventListener('click', () => {
  setTimeout(fillBasketDetails, 500);
});
