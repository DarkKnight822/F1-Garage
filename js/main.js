// ========================================
// АНИМАЦИЯ HEADER
// ========================================

const header = document.querySelector('.header');
const hero = document.querySelector('.hero');
const infoSection = document.querySelector('.Info');
const ferrariDivider = document.getElementById('ferrari-divider');

function updateHeaderStyle() {
  const infoTop = infoSection.getBoundingClientRect().top;
  const headerHeight = header.offsetHeight;

  if (infoTop > headerHeight / 2) {
    header.classList.add('header--light');
    header.classList.remove('header--dark');
  } else {
    header.classList.add('header--dark');
    header.classList.remove('header--light');
  }
}

function updateHeaderPosition() {
  if (!ferrariDivider) return;
  const scrollPosition = window.scrollY;
  const dividerPosition = ferrariDivider.offsetTop;

  if (scrollPosition >= dividerPosition - 10) {
    header.classList.add('header--static');
  } else {
    header.classList.remove('header--static');
  }
}

function updateHeader() {
  updateHeaderStyle();
  updateHeaderPosition();
}
updateHeader();
window.addEventListener('scroll', () => {
  updateHeader();
});

// ========================================
// ГАЛЕРЕЯ БОЛИДОВ — ПЕРЕКЛЮЧЕНИЕ СЛАЙДОВ
// ========================================

const galleries = document.querySelectorAll('.car-gallery');
galleries.forEach(gallery => {
  const slides = gallery.querySelectorAll('.car-gallery__slide');
  const dots = gallery.querySelectorAll('.car-gallery__dot');
  const prevBtn = gallery.querySelector('.car-gallery__arrow--left');
  const nextBtn = gallery.querySelector('.car-gallery__arrow--right');
  let currentSlide = 0;
  let autoSlideInterval;
  
  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (index >= slides.length) {
      currentSlide = 0; // Вернулись к началу
    } else if (index < 0) {
      currentSlide = slides.length - 1; // Ушли в конец
    } else {
      currentSlide = index;
    }
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }
  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 8000);
  }
  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }
  function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
  }

  nextBtn.addEventListener('click', () => {
    showSlide(currentSlide + 1);
    resetAutoSlide();
  });
  prevBtn.addEventListener('click', () => {
    showSlide(currentSlide - 1);
    resetAutoSlide();
  });
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      resetAutoSlide();
    });
  });
  startAutoSlide();
});

// ========================================
// КОРЗИНА
// ========================================

const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartEmpty = document.getElementById('cart-empty');
const cartTotal = document.getElementById('cart-total');
const cartForm = document.getElementById('cart-form');
const cartNotification = document.getElementById('cart-notification');
const headerCart = document.querySelector('.header__cart');

let cart = [];

if (headerCart) {
  headerCart.addEventListener('click', () => {
    cartModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    renderCart();
  });
}

function closeCart() {
  if (cartModal) {
    cartModal.classList.remove('active');
    document.body.style.overflow = '';
  }
}
if (cartModal) {
  const closeBtn = cartModal.querySelector('.cart-modal__close');
  const overlay = cartModal.querySelector('.cart-modal__overlay');
  if (closeBtn) closeBtn.addEventListener('click', closeCart);
  if (overlay) overlay.addEventListener('click', closeCart);
}

window.removeFromCart = function(index) {
  cart.splice(index, 1);
  renderCart();
};

function renderCart() {
  if (!cartItemsContainer || !cartEmpty || !cartTotal) return;
  if (cart.length === 0) {
    cartItemsContainer.style.display = 'none';
    cartEmpty.classList.add('active');
    cartTotal.textContent = '€ 0';
    return;
  }
  cartItemsContainer.style.display = 'flex';
  cartEmpty.classList.remove('active');
  
  cartItemsContainer.innerHTML = cart.map((item, index) => `
    <div class="cart-item-row">
      <img src="${item.logo}" alt="${item.name}" class="cart-item-row__logo">
      <div class="cart-item-row__info">
        <p class="cart-item-row__name">${item.name}</p>
      </div>
      <button class="cart-item-row__remove" onclick="removeFromCart(${index})" aria-label="Удалить">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
      <span class="cart-item-row__price">${item.price}</span>
    </div>
  `).join('');
  
  const total = cart.reduce((sum, item) => {
    const price = parseInt(item.price.replace(/[^0-9]/g, ''));
    return sum + price;
  }, 0);
  cartTotal.textContent = `€ ${total.toLocaleString()}`;
}

if (cartForm) {
  cartForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      showNotification('Корзина пуста!', 'error');
      return;
    }

    const formData = new FormData(cartForm);
    const orderData = {
      items: [...cart],
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      payment: formData.get('payment')
    };
    console.log('✅ ЗАКАЗ ОФОРМЛЕН:', orderData);
    closeCart();
    cartForm.reset();
    cart = [];
    showSuccessNotification();
  });
}

document.querySelectorAll('.car-item__buy-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const carItem = btn.closest('.car-item');
    if (!carItem) return;

    const name = carItem.querySelector('.car-item__name').textContent.trim();
    const price = carItem.querySelector('.car-item__price').textContent.trim();
    let logo = './images/F1_Icon.svg';
    if (name.includes('Ferrari')) {
      logo = './images/logo/Ferrari.webp';
    } 
    else if (name.includes('Mercedes')) {
      logo = './images/logo/Mercedes.webp';
    } 
    else if (name.includes('RedBull')) {
      logo = './images/logo/Redbull.webp';
    } 
    else if (name.includes('Audi')) {
      logo = './images/logo/Audi.webp';
    }
    
    cart.push({ name, price, logo });
    showNotification('Товар добавлен в корзину');
  });
});

function showNotification(message) {
  if (!cartNotification) return;
  
  const title = cartNotification.querySelector('.cart-notification__title');
  const subtitle = cartNotification.querySelector('.cart-notification__subtitle');
  title.textContent = message;
  subtitle.textContent = '';

  const icon = cartNotification.querySelector('svg');
  if(icon) icon.style.color = '#22c55e';

  cartNotification.classList.add('active');
  
  setTimeout(() => {
    cartNotification.classList.remove('active');
  }, 2000);
}
function showSuccessNotification() {
  if (!cartNotification) return;

  const title = cartNotification.querySelector('.cart-notification__title');
  const subtitle = cartNotification.querySelector('.cart-notification__subtitle');
  const icon = cartNotification.querySelector('svg');

  title.textContent = 'Заказ оформлен!';
  subtitle.textContent = 'Ожидайте звонка менеджера в течение 15 минут.';
  
  if(icon) icon.style.color = '#22c55e'; 

  cartNotification.classList.add('active');

  setTimeout(() => {
    cartNotification.classList.remove('active');
  }, 3000);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && cartModal && cartModal.classList.contains('active')) {
    closeCart();
  }
});