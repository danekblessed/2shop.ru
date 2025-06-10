// ========== HERO BACKGROUND ROTATOR ==========
document.addEventListener('DOMContentLoaded', () => {
  const layer1 = document.querySelector('.layer1');
  const layer2 = document.querySelector('.layer2');
  const images = [
    'url("fonn.png")',
    'url("fonn2.png")',
    'url("fonn3.png")',
    'url("fonn4.png")'
  ];
  let index = 0;
  let showingLayer1 = true;

  layer1.style.backgroundImage = images[index];

  setInterval(() => {
    index = (index + 1) % images.length;
    const nextImage = images[index];

    if (showingLayer1) {
      layer2.style.backgroundImage = nextImage;
      layer2.style.opacity = 1;
      layer1.style.opacity = 0;
    } else {
      layer1.style.backgroundImage = nextImage;
      layer1.style.opacity = 1;
      layer2.style.opacity = 0;
    }
    showingLayer1 = !showingLayer1;
  }, 5000);
});

// ========== SLIDER ============= //
document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider-track");
  const items = document.querySelectorAll(".slider-item");
  const itemWidth = items[0].offsetWidth + 20;
  const totalWidth = itemWidth * items.length;

  // Клонируем элементы для бесконечной прокрутки
  items.forEach(item => {
    slider.appendChild(item.cloneNode(true));
  });

  // Устанавливаем анимацию
  slider.style.display = "flex";
  slider.style.width = `${totalWidth * 2}px`;
  slider.style.animation = "scrollSlider 30s linear infinite";

  // Остановка при наведении
  slider.addEventListener("mouseenter", () => {
    slider.style.animationPlayState = "paused";
  });

  slider.addEventListener("mouseleave", () => {
    slider.style.animationPlayState = "running";
  });
});

// ========== GLOBAL EVENT HANDLERS ==========
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggleFilters');
  const filterPanel = document.getElementById('filterPanel');
  const resetBtn = document.getElementById('resetButton');
  const applyBtn = document.querySelector('.apply');
  const searchInput = document.getElementById('searchInput');
  const minPriceSlider = document.getElementById("minPrice");
  const maxPriceSlider = document.getElementById("maxPrice");
  const minPriceInput = document.getElementById("priceMinInput");
  const maxPriceInput = document.getElementById("priceMaxInput");

  // Toggle filter panel
  toggleBtn?.addEventListener('click', () => {
    const isVisible = filterPanel.style.display === 'block';
    filterPanel.style.display = isVisible ? 'none' : 'block';
    toggleBtn.textContent = isVisible ? 'Показать фильтры' : 'Скрыть фильтры';
  });

  // Reset filters
  resetBtn?.addEventListener('click', () => {
    minPriceSlider.value = 7600;
    maxPriceSlider.value = 279700;
    minPriceInput.value = 7600;
    maxPriceInput.value = 279700;
    updateRange();

    document.querySelectorAll('.filter-panel select').forEach(select => {
      select.selectedIndex = 0;
    });

    document.querySelectorAll('.product-card').forEach(card => {
      card.style.display = 'block';
    });

    if (searchInput) searchInput.value = '';
  });

  // Price slider input sync
  minPriceSlider?.addEventListener('input', updateRange);
  maxPriceSlider?.addEventListener('input', updateRange);

  // Manual price input sync
  minPriceInput?.addEventListener('input', () => {
    const val = parseInt(minPriceInput.value);
    const max = parseInt(maxPriceSlider.value);
    if (!isNaN(val) && val >= 7600 && val <= max - 1000) {
      minPriceSlider.value = val;
      updateRange();
    }
  });

  maxPriceInput?.addEventListener('input', () => {
    const val = parseInt(maxPriceInput.value);
    const min = parseInt(minPriceSlider.value);
    if (!isNaN(val) && val <= 279700 && val >= min + 1000) {
      maxPriceSlider.value = val;
      updateRange();
    }
  });

  // Apply filters
  applyBtn?.addEventListener('click', applyFilters);

  // Search with Enter
  searchInput?.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      applySearch();
    }
  });
});

// ========== HELPER FUNCTIONS ==========

// Update visible price values and keep sliders in sync
function updateRange() {
  const minSlider = document.getElementById("minPrice");
  const maxSlider = document.getElementById("maxPrice");
  const minInput = document.getElementById("priceMinInput");
  const maxInput = document.getElementById("priceMaxInput");

  let minVal = parseInt(minSlider.value);
  let maxVal = parseInt(maxSlider.value);

  if (minVal > maxVal - 1000) {
    minVal = maxVal - 1000;
    minSlider.value = minVal;
  }

  if (maxVal < minVal + 1000) {
    maxVal = minVal + 1000;
    maxSlider.value = maxVal;
  }

  minInput.value = minVal;
  maxInput.value = maxVal;
}

// Filter by price only
function applyFilters() {
  const min = parseInt(document.getElementById("minPrice").value);
  const max = parseInt(document.getElementById("maxPrice").value);
  const products = document.querySelectorAll('.product-card');

  products.forEach(product => {
    const priceText = product.querySelector("p")?.textContent || "";
    const match = priceText.match(/\d+/g);
    const price = match ? parseInt(match.join("")) : 0;

    product.style.display = (price >= min && price <= max) ? 'block' : 'none';
  });
}

// Search by name
function applySearch() {
  const value = document.getElementById('searchInput').value.toLowerCase();
  const products = document.querySelectorAll('.product-card');

  products.forEach(product => {
    const name = product.dataset.name?.toLowerCase() || '';
    product.style.display = name.includes(value) ? 'block' : 'none';
  });
}
function applyFilters() {
  const minVal = parseInt(document.getElementById("minPrice").value);
  const maxVal = parseInt(document.getElementById("maxPrice").value);
  const selectedType = document.getElementById("deviceType")?.value || "";
  const selectedBrand = document.getElementById("brandFilter")?.value || "";

  const products = document.querySelectorAll('.product-card');

  products.forEach(product => {
    const priceText = product.querySelector("p")?.textContent || "";
    const priceMatch = priceText.match(/\d+/g);
    const price = priceMatch ? parseInt(priceMatch.join("")) : 0;

    const type = product.dataset.type || "";
    const brand = product.dataset.brand || "";

    const matchesPrice = price >= minVal && price <= maxVal;
    const matchesType = selectedType === "" || type === selectedType;
    const matchesBrand = selectedBrand === "" || brand === selectedBrand;

    product.style.display = (matchesPrice && matchesType && matchesBrand) ? 'block' : 'none';
  });
}

    document.addEventListener('DOMContentLoaded', () => {
    const nicknameInput = document.getElementById('nickname');
    const profileName = document.getElementById('profileName');

    nicknameInput.addEventListener('input', () => {
      profileName.textContent = nicknameInput.value.trim() || 'Имя пользователя';
    });
  });
document.addEventListener('DOMContentLoaded', () => {
  const avatarWrapper = document.querySelector('.avatar-wrapper');
  const avatarInput = document.getElementById('avatarInput');
  const avatarPreview = document.getElementById('avatarPreview');

  // Загрузка аватара из localStorage при старте
  const savedAvatar = localStorage.getItem('userAvatar');
  if (savedAvatar) {
    avatarPreview.src = savedAvatar;
  }

  // Клик по аватару — откроем input
  avatarWrapper.addEventListener('click', () => {
    avatarInput.click();
  });

  // Когда выбран файл — показать и сохранить
  avatarInput.addEventListener('change', () => {
    const file = avatarInput.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        avatarPreview.src = dataUrl;
        localStorage.setItem('userAvatar', dataUrl); // сохраняем
      };
      reader.readAsDataURL(file);
    }
  });
});
// ========== КОРЗИНА через localStorage ========== //

// Добавление товара в корзину
function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Добавляем товар с количеством 1 по умолчанию
  const item = {
    ...product,
    quantity: 1
  };

  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Товар добавлен в корзину');
}

// Считываем и отображаем товары в корзине (только на korzina.html)
function renderCart() {
  const cartItemsContainer = document.querySelector('.cart-items');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (!cartItemsContainer) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p style="color:#ccfffb; font-size:50px;">Корзина пуста</p>';
  } else {
    cartItemsContainer.innerHTML = '';
    cart.forEach((item, index) => {
      const itemElement = document.createElement('div');
      itemElement.classList.add('cart-item');
      itemElement.innerHTML = `
        <img src="${item.image}" class="cart-product-image" alt="${item.title}">
        <div class="cart-product-info">
          <h3>${item.title}</h3>
          <p class="in-stock">В наличии</p>
        </div>
        <div class="cart-price">
          <p>${item.price}</p>
          <button class="remove-btn" onclick="removeFromCart(${index})">✕</button>
        </div>
      `;
      cartItemsContainer.appendChild(itemElement);
    });
  }

  updateSummary(); // 🟢 Обновляем правую панель после отрисовки
}


// Удаление товара из корзины
function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart(); // Перерисуем корзину
}

// Инициализация (автоматически вызываем renderCart при загрузке korzina.html)
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  updateCartSummary();
});

// Обновление правой панели (итого)
function updateSummary() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  const totalCount = cart.length;
  const totalPrice = cart.reduce((sum, item) => {
    // Преобразуем цену в число (убираем пробелы и "тг")
    const price = parseInt(item.price.replace(/\D/g, ''));
    return sum + price;
  }, 0);

  const countEl = document.querySelector('.summary-count');
  const priceEl = document.querySelector('.summary-price');

  if (countEl) countEl.textContent = `${totalCount} ${getPlural(totalCount, ['товар', 'товара', 'товаров'])}`;
  if (priceEl) priceEl.textContent = `${formatNumber(totalPrice)} тг`;
}


// Формат числа с пробелами
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// Склонение слова "товар"
function getPlural(n, forms) {
  if (n % 10 === 1 && n % 100 !== 11) {
    return forms[0];
  } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
    return forms[1];
  } else {
    return forms[2];
  }
}
function updateCartSummary() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Обновляем правую панель
  const totalItemsElement = document.querySelector(".total-items");
  const totalPriceElement = document.querySelector(".total-price");
  if (totalItemsElement) totalItemsElement.textContent = `${itemCount} ${getPlural(itemCount, ["товар", "товара", "товаров"])}`;
  if (totalPriceElement) totalPriceElement.textContent = `${total.toLocaleString()} тг`;

  // Обновляем заголовок h1 "Корзина"
  const cartCountText = document.querySelector(".cart-count-text");
  if (cartCountText) cartCountText.textContent = `${itemCount} ${getPlural(itemCount, ["товар", "товара", "товаров"])}`;
} 

// ========== ОФОРМЛЕНИЕ ЗАКАЗА - РАДИОКНОПКИ ========== //

// ФУНКЦИЯ ОБНОВЛЕНИЯ ПЛЕЙСХОЛДЕРА
document.addEventListener('DOMContentLoaded', () => {
  const contactInput = document.getElementById('contact-input');
  const radios = document.querySelectorAll('input[name="contact-method"]');

  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      const method = radio.value;
      switch (method) {
        case 'Телефон':
          contactInput.placeholder = 'Введите номер телефона';
          break;
        case 'Email':
          contactInput.placeholder = 'Введите email';
          break;
        case 'Telegram':
          contactInput.placeholder = 'Введите @username';
          break;
      }
    });
  });
});

// ========== ОФОРМЛЕНИЕ ЗАКАЗА - ОТПРАВКА СООБЩЕНИЯ В ТГ ========== //
document.addEventListener("DOMContentLoaded", function () {
  const token = "8013248828:AAGU1ktZdMzKrDrP_mgjOBVazfBbpLatrc0";
  const chatId = "1194230882";
  const sendButton = document.getElementById("confirm-order");
  const inputField = document.getElementById("contact-input");

  sendButton.addEventListener("click", function () {
    const contact = inputField.value.trim();
    if (contact === "") {
      alert("Пожалуйста, введите контактные данные.");
      return;
    }

    // Извлекаем корзину из localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
      alert("Корзина пуста!");
      return;
    }

    // Составляем сообщение о заказе
    let message = `🛒 Новый заказ с сайта 2SHOP\n\n📞 Контакт: ${contact}\n\n📦 Товары:\n`;

    let total = 0;
    cart.forEach((item, index) => {
     // Извлекаем числовое значение из строки цены
const numericPrice = parseInt(item.price.replace(/\D/g, ""));
total += numericPrice * item.quantity;

message += `${index + 1}) ${item.title}\n   Кол-во: ${item.quantity}, Цена: ${numericPrice.toLocaleString()} тг\n`;
    });

    message += `\n💰 Общая сумма заказа: ${total} ₸`;

    // Отправляем в Telegram
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const data = {
      chat_id: chatId,
      text: message
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.ok) {
          alert("Заказ отправлен! Мы свяжемся с вами.");
          inputField.value = "";
          localStorage.removeItem("cart"); // очищаем корзину
        } else {
          alert("Ошибка при отправке. Попробуйте снова.");
        }
      })
      .catch(error => {
        console.error("Ошибка:", error);
        alert("Ошибка при отправке.");
      });
  });
});


// ========== ПОИСК С ЛЮБОЙ СТРАНИЦЫ ========== //

document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const query = params.get("query");

  if (query) {
    const search = query.toLowerCase();
    const products = document.querySelectorAll(".product-card");

    products.forEach(card => {
      const text = card.textContent.toLowerCase();
      if (text.includes(search)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }
});

// ========== АКТИВАЦИЯ КНОПКИ ОТПРАВКИ С ПОМОЩЬЮ ЧЕКБОКСА ========== //

document.addEventListener("DOMContentLoaded", () => {
  const agreeCheckbox = document.getElementById("newsletter-agree");
  const submitButton = document.getElementById("newsletter-submit");

  if (agreeCheckbox && submitButton) {
    submitButton.disabled = true;

    agreeCheckbox.addEventListener("change", () => {
      submitButton.disabled = !agreeCheckbox.checked;
    });
  }
});

// ========== НОВОСТНАЯ РАССЫЛКА ========== //

document.addEventListener("DOMContentLoaded", () => {
  const agree = document.getElementById("newsletter-agree");
  const submit = document.getElementById("newsletter-submit");
  const emailInput = document.getElementById("newsletter-email");

  agree.addEventListener("change", () => {
    submit.disabled = !agree.checked;
  });

  const botToken = "8013248828:AAGU1ktZdMzKrDrP_mgjOBVazfBbpLatrc0";
  const chatId = "1194230882";

  document.querySelector(".newsletter-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    if (!email) return;

    const message = `📰 Новая подписка на рассылку:\nEmail: ${email}`;

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text: message })
        }
      );

      if (response.ok) {
        alert("Спасибо за подписку!");
        emailInput.value = "";
        agree.checked = false;
        submit.disabled = true;
      } else {
        alert("Ошибка при отправке. Попробуйте позже.");
      }
    } catch (err) {
      alert("Ошибка соединения.");
      console.error(err);
    }
  });
});

// =============== МОБИЛЬНОЕ МЕНЮ ========= //
document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("mobile-menu");

  toggle.addEventListener("click", function () {
    menu.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  });
}); 
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu.style.display === 'flex') {
    menu.style.display = 'none';
  } else {
    menu.style.display = 'flex';
    menu.style.flexDirection = 'column';
  }
}
// ===== Боковое меню для мобильной версии =====
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
}

