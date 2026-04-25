const carsData = [
  {
    modifier: 1, /*числовой идентификатор*/
    title: 'Ferrari SF-26',
    name: 'Ferrari SF-26',
    description: 'Страсть и точность в одном шасси. SF-26 — это Ferrari, переосмысленный под новую эру: активная аэродинамика, звучный V6 и голодный взгляд Леклера на чемпионство.',
    price: '€ 15 600 000',
    images: [
      './images/cars/Ferrari/2026-Ferrari-SF-26.webp',
      './images/cars/Ferrari/2026-Ferrari-SF-26-2.webp',
      './images/cars/Ferrari/2026-Ferrari-SF-26-3.webp',
      './images/cars/Ferrari/2026-Ferrari-SF-26-4.webp'
    ],
    specs: [
      { label: 'Пилоты', value: 'C. Leclerc | L. Hamilton' },
      { label: 'Двигатель', value: '1.6L V6 Turbo Hybrid' },
      { label: 'Электрическая мощность', value: '730+ кВт (980+ л. с.)' },
      { label: 'Максимальная скорость', value: '360+ км/ч | 223+ миль/ч' },
      { label: 'Вес', value: '768 кг' },
      { label: 'Ливрея', value: 'Глянцевый Rosso Corsa' }
    ]
  },
  {
    modifier: 2,
    title: 'Mercedes AMG W17',
    name: 'Mercedes W17',
    description: 'Серебряные стрелы перезагружены. W17 — тихий, методичный, смертоносный. Брэкли вложили три года боли в одно шасси, чтобы напомнить всем, кто строил эту эпоху.',
    price: '€ 15 200 000',
    images: [
      './images/cars/Mercedes/2026-Mercedes-AMG-F1-W17-E-Performance-1.webp',
      './images/cars/Mercedes/2026-Mercedes-AMG-F1-W17-E-Performance-2.webp',
      './images/cars/Mercedes/2026-Mercedes-AMG-F1-W17-E-Performance-3.webp',
      './images/cars/Mercedes/2026-Mercedes-AMG-F1-W17-E-Performance-4.webp'
    ],
    specs: [
      { label: 'Пилоты', value: 'G. Russell | K. Antonelli' },
      { label: 'Двигатель', value: '1.6L V6 Turbo Hybrid' },
      { label: 'Электрическая мощность', value: '730+ кВт / (980+ л. с.)' },
      { label: 'Максимальная скорость', value: '360+ км/ч | 223+ миль/ч' },
      { label: 'Вес', value: '768 кг' },
      { label: 'Ливрея', value: 'Silver Arrow | Petronas Teal' }
    ]
  },
  {
    modifier: 3,
    title: 'RedBull RB22',
    name: 'RedBull RB22',
    description: 'Синий снаряд из Милтон-Кинс. RB22 создан в эпоху перемен, но с одной константой — Макс Верстаппен впереди всех. Новая формула, знакомый результат.',
    price: '€ 14 900 000',
    images: [
      './images/cars/RedBull/2026-Formula1-Red-Bull-Racing-RB22-1.webp',
      './images/cars/RedBull/2026-Formula1-Red-Bull-Racing-RB22-2.webp',
      './images/cars/RedBull/2026-Formula1-Red-Bull-Racing-RB22-3.webp',
      './images/cars/RedBull/2026-Formula1-Red-Bull-Racing-RB22-4.webp'
    ],
    specs: [
      { label: 'Пилоты', value: 'M. Verstappen | I. Hadjar' },
      { label: 'Двигатель', value: '1.6L V6 Turbo Hybrid' },
      { label: 'Электрическая мощность', value: '730+ кВт (980+ л. с.)' },
      { label: 'Максимальная скорость', value: '360+ км/ч | 223+ миль/ч' },
      { label: 'Вес', value: '768 кг' },
      { label: 'Ливрея', value: 'Navy Blue' }
    ]
  },
  {
    modifier: 4,
    title: 'Audi R26',
    name: 'Audi R26',
    description: 'Дебют, которого ждали много лет. Audi врывается в Формулу-1 с собственным мотором, двумя голодными пилотами и немецким упрямством доказать всё с первой гонки.',
    price: '€ 15 800 000',
    images: [
      './images/cars/Audi/2026-Audi-R26-2.webp',
      './images/cars/Audi/2026-Audi-R26-1.webp',
      './images/cars/Audi/2026-Audi-R26-3.webp'
    ],
    specs: [
      { label: 'Пилоты', value: 'G. Bortoleto | N. Hülkenberg' },
      { label: 'Двигатель', value: '1.6L V6 Turbo Hybrid' },
      { label: 'Электрическая мощность', value: '730+ кВт (980+ л. с.)' },
      { label: 'Максимальная скорость', value: '360+ км/ч | 223+ миль/ч' },
      { label: 'Вес', value: '768 кг' },
      { label: 'Ливрея', value: 'Audi Silver' }
    ]
  }
];

function renderCatalog() {
  const carsContainer = document.querySelector('.cars');
  if (!carsContainer) return;

  carsContainer.innerHTML = carsData.map((car, index) => { /*возвращает массив строк*/
    const slides = car.images.map((image, imageIndex) => `
                        <img src="${image}" class="car-gallery__slide${imageIndex === 0 ? ' active' : ''}" alt="${car.title}" loading="lazy">`).join('');

    const dots = car.images.map((_, dotIndex) => `
                        <span class="car-gallery__dot car-gallery__dot-${car.modifier}${dotIndex === 0 ? ' active' : ''}"></span>`).join('');

    const specs = car.specs.map((spec) => `
                    <div class="car-item__spec-row car-item__spec-row-${car.modifier}">
                        <span class="car-item__spec-label">${spec.label}</span>
                        <span class="car-item__spec-value">${spec.value}</span>
                    </div>`).join('');

    return `
        <article class="car-item">
            <div class="car-item__divider"${index === 0 ? ' id="ferrari-divider"' : ''}></div>
            <div class="car-gallery">
                
                <div class="car-item__title-wrapper car-item__title-wrapper-${car.modifier}">
                    <h3 class="car-item__title car-item__title-${car.modifier}">${car.title}</h3>
                </div>

                <div class="car-gallery__viewport">
                    <button class="car-gallery__arrow car-gallery__arrow--left car-gallery__arrow-${car.modifier}" aria-label="Предыдущее фото">
                        <img src="./images/icons/arrow-left.svg" alt="←">
                    </button>
                    <div class="car-gallery__slides car-gallery__slides-${car.modifier}">${slides}
                    </div>
                    <button class="car-gallery__arrow car-gallery__arrow--right car-gallery__arrow-${car.modifier}" aria-label="Следующее фото">
                        <img src="./images/icons/arrow-right.svg" alt="→">
                    </button>
                    
                    <div class="car-gallery__dots">${dots}
                    </div>
                </div>
            </div>
            <div class="car-item__card car-item__card-${car.modifier}">
                <div class="car-item__left">
                    <h3 class="car-item__name">${car.name}</h3>
                    
                    <p class="car-item__description">
                        ${car.description}
                    </p>

                    <div class="car-item__price-wrapper">
                        <span class="car-item__price">${car.price}</span>
                    </div>
                    
                    <button class="car-item__buy-btn car-item__buy-btn-${car.modifier}">
                        <span>В корзину</span>
                    </button>
                </div>

                <div class="car-item__specs car-item__specs-${car.modifier}">
                    <h4 class="car-item__specs-title">Характеристики</h4>
${specs}
                </div>
                
            </div>
        </article>`;
  }).join('');
}

renderCatalog();
