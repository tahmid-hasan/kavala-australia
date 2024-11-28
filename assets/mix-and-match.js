class MixMatchComponent extends HTMLElement {
  constructor() {
    super();

    this.top = {
      product: null,
      variant: null
    };

    this.bottom = {
      product: null,
      variant: null
    };

    this.currencyInfo = Shopify.currency;
    this.miniCart = document.querySelector('mini-cart');

  }

  connectedCallback() {
    const variantButtons = this.querySelectorAll('.mix-match--option-list li');
    variantButtons.forEach(button => {
      button.addEventListener('click', this.handleVariantChange.bind(this));
    });

    const actionBtn = this.querySelector('button[data-submit]');
    actionBtn.addEventListener('click', this.handleAction.bind(this));

    this.cartErrorEl = this.querySelector('.mix-match--cart-error')

    // Listen for the custom event
    this.addEventListener('splide:loaded', this.handleSplideLoaded.bind(this));

    this.sliderConfig = {
      type: 'loop',
      perPage: 3,
      perMove: 1,
      gap: '2rem',
      pagination: false,
      breakpoints: {
        750: {
          perPage: 1.6,
          focus: 'center',
          gap: '1rem'
        },
      }
    }

    // Initialize Intersection Observer
    this.initIntersectionObserver();
  }

  formatMoney(amount, currencyInfo) {
    const currencyFormats = {
      "USD": { symbol: "$", format: "${amount}" },
      "EUR": { symbol: "€", format: "{amount}€" },
      "GBP": { symbol: "£", format: "£{amount}" },
      "SEK": { symbol: "kr", format: "{amount} kr" },
      "JPY": { symbol: "¥", format: "¥{amount}" },
      "AUD": { symbol: "A$", format: "A${amount}" },
      "CAD": { symbol: "C$", format: "C${amount}" },
      "CHF": { symbol: "CHF", format: "CHF {amount}" },
      "CNY": { symbol: "¥", format: "¥{amount}" },
      "DKK": { symbol: "kr", format: "{amount} kr" },
      "HKD": { symbol: "HK$", format: "HK${amount}" },
      "INR": { symbol: "₹", format: "₹{amount}" },
      "KRW": { symbol: "₩", format: "₩{amount}" },
      "MXN": { symbol: "Mex$", format: "Mex${amount}" },
      "MYR": { symbol: "RM", format: "RM{amount}" },
      "NOK": { symbol: "kr", format: "kr {amount}" },
      "NZD": { symbol: "NZ$", format: "NZ${amount}" },
      "PHP": { symbol: "₱", format: "₱{amount}" },
      "SGD": { symbol: "S$", format: "S${amount}" },
      "THB": { symbol: "฿", format: "฿{amount}" },
      "ZAR": { symbol: "R", format: "R {amount}" },
      "RUB": { symbol: "₽", format: "₽{amount}" },
      "BRL": { symbol: "R$", format: "R${amount}" },
      "PLN": { symbol: "zł", format: "{amount} zł" },
      "IDR": { symbol: "Rp", format: "Rp {amount}" },
      "TRY": { symbol: "₺", format: "₺{amount}" },
      "HUF": { symbol: "Ft", format: "Ft {amount}" },
      "CZK": { symbol: "Kč", format: "{amount} Kč" },
      "ILS": { symbol: "₪", format: "₪{amount}" },
      "CLP": { symbol: "CLP$", format: "CLP${amount}" },
      "PKR": { symbol: "₨", format: "₨{amount}" },
      "SAR": { symbol: "﷼", format: "{amount} ﷼" },
      "AED": { symbol: "د.إ", format: "د.إ{amount}" },
      "ARS": { symbol: "AR$", format: "AR${amount}" },
      "COP": { symbol: "COL$", format: "COL${amount}" },
      "EGP": { symbol: "E£", format: "E£{amount}" },
      "NGN": { symbol: "₦", format: "₦{amount}" },
      "UAH": { symbol: "₴", format: "₴{amount}" },
      "BDT": { symbol: "Tk", format: "Tk {amount}" }
    };
  
    const { active: currencyCode } = currencyInfo;
    const { symbol, format } = currencyFormats[currencyCode] || { symbol: '$', format: "${amount}" };
  
    const precision = 2;
    const thousand = ',';
    const decimal = '.';
  
    // Divide the amount by 100 to adjust for Shopify's representation
    const adjustedAmount = amount / 100;
  
    const negative = adjustedAmount < 0 ? '-' : '';
    const i = parseInt(Math.abs(Number(adjustedAmount) || 0).toFixed(precision), 10).toString();
    const j = (i.length > 3) ? i.length % 3 : 0;
  
    const formattedAmount = negative + (j ? i.substr(0, j) + thousand : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${thousand}`) + (precision ? decimal + Math.abs(adjustedAmount - i).toFixed(precision).slice(2) : '');
  
    return format.replace('{amount}', formattedAmount);
  }

  initIntersectionObserver() {
    const scriptTag = this.querySelector('script[data-src]');

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Load the script
            const script = document.createElement('script');
            script.src = scriptTag.dataset.src;
            script.onload = () => {
              // Fire the custom event
              const event = new CustomEvent('splide:loaded');
              this.dispatchEvent(event);
            };
            document.body.appendChild(script);

            // Unobserve after loading the script
            observer.unobserve(this);
          }
        });
      });

      observer.observe(this);
    }
  }

  findVariant(product, selectedOption) {
    return product.variants.find(variant => {
      return variant.options.includes(selectedOption);
    });
  }

  handleVariantChange(e) {
    const isDisabled = e.currentTarget.dataset.disabled
    if(isDisabled) return

    const parent = e.target.closest('.mix-match--option');
    const location = parent.dataset.id == 'productBottom' ? 'bottom' : 'top';
    const currentSelected = parent.querySelector('li.selected');
    if (currentSelected && !e.currentTarget.isSameNode(currentSelected)) {
      currentSelected.classList.remove('selected');
    }
    e.currentTarget.classList.add('selected');

    const selectedOption = e.currentTarget.getAttribute('data-value');
    // this[location].variant.selectedOption = selectedOption;

    const product = this[location].product;
    if (product && selectedOption) {
      const variant = this.findVariant(product, selectedOption);
      if (variant) {
        this[location].variant = variant;
      }
    }

    const errorEl = this.querySelector('.mix-match--error');
    const errorHiddenClass = 'hidden';
    if (errorEl && !errorEl.classList.contains(errorHiddenClass)) {
      errorEl.classList.add(errorHiddenClass);
    }

    this.updateProductPrice(location, this[location].variant)
    this.updateTotalPrice();

    console.log(selectedOption, this[location].variant)
  }

  fetchConfig(type = 'json') {
    return {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': `application/${type}` }
    };
  }

  async handleAction(e) {
    const errorEl = this.querySelector('.mix-match--error.variant--error');
    const errorHiddenClass = 'hidden';

    const actionBtn = e.currentTarget
  
    // Check if top or bottom variant is null
    if (!this.top.variant || !this.bottom.variant) {
      await this.showError(errorEl)
      return;
    } else {
      if (errorEl) {
        errorEl.classList.add(errorHiddenClass);
      }
    }

    actionBtn.classList.add('loading')
    const items = [
      {
        id: this.top.variant.id,
        quantity: 1
      },
      {
        id: this.bottom.variant.id,
        quantity: 1
      }
    ];

    const formData = new FormData();
    items.forEach((item, index) => {
      formData.append(`items[${index}][id]`, item.id);
      formData.append(`items[${index}][quantity]`, item.quantity);
    });

    formData.append('sections', this.miniCart.getSectionsToRender().map((section) => section.id));

    const config = fetchConfig('javascript');
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    delete config.headers['Content-Type'];
    config.body = formData

    fetch(`${theme.routes.cart_add_url}`, config)
    .then(response => response.json())
    .then(async data => {
      actionBtn.classList.remove('loading')
      if(data.status != 422) {
        if (this.miniCart) {
          data.items.forEach(item => {
            item.sections = data.sections
            item.sections_url = window.location.pathname
          })
  
          const event = new CustomEvent('mix-match:cart-update', {
            detail: {
              response: data
            }
          })
          this.miniCart.dispatchEvent(event)
        }
      } else {
        this.cartErrorEl.textContent = data.message
        this.cartErrorEl.classList.remove('hidden')

        await this.showError(this.cartErrorEl)

        this.cartErrorEl.textContent = ""
      }
    })
    .catch(error => {
      console.error('Error adding items to cart:', error);
      actionBtn.classList.remove('loading')
    });
  }

  showError(el) {
    return new Promise((resolve, reject) => {
      if (!el) reject();
      el.classList.remove('hidden');
  
      const height = el.scrollHeight;
    
      el.style.height = '0px';
      el.offsetHeight;
    
      el.style.height = height + 'px';
    
      setTimeout(() => {
        el.style.height = '0px';
    
        const afterTransitionEnd = () => {
          el.classList.add('hidden');
          el.style.height = '';
          resolve(el)
          el.removeEventListener('transitionend', afterTransitionEnd);
        };
    
        el.addEventListener('transitionend', afterTransitionEnd);
      }, 5000);
    })
  }

  handleSplideLoaded(e) {
    const sliderTopEl = this.querySelector('.slider-top .splide');
    const sliderBottomEl = this.querySelector('.slider-bottom .splide');

    if (sliderTopEl) {
      this.sliderTop = new Splide(sliderTopEl, this.sliderConfig);
      this.sliderTop.on('ready', () => {
        const initialTopSlide = this.sliderTop.Components.Slides.getAt(this.sliderTop.index);
        this.updateProductData(initialTopSlide.slide, 'top');
      });

      this.sliderTop.mount();

      const debouncedSlideChangeTop = this.debounce((event) => {
        this.onSlideChange(event, 'top');
      }, 250);

      this.sliderTop.on('active', debouncedSlideChangeTop);
    }

    if (sliderBottomEl) {
      this.sliderBottom = new Splide(sliderBottomEl, this.sliderConfig);

      this.sliderBottom.on('ready', () => {
        const initialBottomSlide = this.sliderBottom.Components.Slides.getAt(this.sliderBottom.index);
        this.updateProductData(initialBottomSlide.slide, 'bottom');
      });
      this.sliderBottom.mount();

      const debouncedSlideChangeBottom = this.debounce((event) => {
        this.onSlideChange(event, 'bottom');
      }, 250);

      this.sliderBottom.on('active', debouncedSlideChangeBottom);
    }
  }

  onSlideChange(e, location) {
    const slide = e.slide;
    this.updateProductData(slide, location);
  }

  updateProductData(slide, location) {
    const scriptTag = slide.querySelector('script[data-product-data]');
    
    if (scriptTag) {
      try {
        const productData = JSON.parse(scriptTag.textContent);
        this[location].product = productData;
        this[location].variant = null
        this.updateDOM(location, productData);
      } catch (error) {
        console.error('Error parsing product data:', error);
      }
    } else {
      console.warn('No product data script found in the slide.');
    }
  }

  updateProductPrice(location, variant) {
    const priceEl = this.querySelector(`.mix-match--price-${location}`);
    if(priceEl) {
      priceEl.textContent = this.formatMoney(variant.price, this.currencyInfo)
    }
  }

  updateTotalPrice() {
    const totalEl = this.querySelector('.mix-match--total-amount');
    const topPrice = this.top.product ? this.top.product.price : 0;
    const bottomPrice = this.bottom.product ? this.bottom.product.price : 0;
    const totalPrice = topPrice + bottomPrice;

    if (totalEl) {// Convert the total price
      totalEl.textContent = this.formatMoney(totalPrice, this.currencyInfo);
      // totalEl.textContent = totalPrice
    }
  }

  updateDOM(location, productData) {
    const priceEl = this.querySelector(`.mix-match--price-${location}`);
    const titleEl = this.querySelector(`.mix-match--title-${location} h3`);
    const optionListEl = this.querySelector(`.mix-match--option[data-id="product${location.charAt(0).toUpperCase() + location.slice(1)}"] .mix-match--option-list`);

    if (priceEl) {
      priceEl.textContent = this.formatMoney(productData.price, this.currencyInfo)
      // priceEl.textContent = productData.price
    }

    if (titleEl) {
      titleEl.textContent = productData.title;
    }

    if (optionListEl) {
      // Clear existing options
      optionListEl.innerHTML = '';

      // Add new options
      productData.option_with_values.forEach(option => {
        if(option.name == 'Size') {
          option.values.forEach(value => {
            const li = document.createElement('li');
            const variant = this.findVariant(productData, value)

            li.textContent = value;
            li.setAttribute('data-value', value)

            if(!variant.available || variant.inventory_quantity <= 0) {
              li.setAttribute('data-disabled', true)
            }
            optionListEl.appendChild(li);
          });
        }
      });

      // Reattach event listeners
      const variantButtons = optionListEl.querySelectorAll('li');
      variantButtons.forEach(button => {
        button.addEventListener('click', this.handleVariantChange.bind(this));
      });
    }

    this.updateTotalPrice();
  }

  debounce(func, wait, immediate) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;

      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };

      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);

      if (callNow) func.apply(context, args);
    };
  }
}

customElements.define('mix-match-component', MixMatchComponent);