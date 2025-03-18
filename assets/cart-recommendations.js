class CartRecommendations extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    new IntersectionObserver(this.handleIntersection.bind(this)).observe(this);
  }

  handleIntersection(entries, observer) {
    if (!entries[0].isIntersecting) return;
    observer.unobserve(this);
    
    fetch(this.dataset.url)
      .then(response => response.text())
      .then(text => {
        
        const html = document.createElement('div');
        html.innerHTML = text;
        const recommendations = html.querySelector('cart-recommendations');
        if (recommendations && recommendations.innerHTML.trim().length) {
          this.innerHTML = recommendations.innerHTML;

          const miniCartMain = this.closest('.mini-cart__main');
          const cartItems = miniCartMain?.querySelector('cart-items');
          
          if (cartItems) {
            cartItems.scrollIntoView({
              behavior: 'instant',
              block: 'start'
            });
          }
        }
      })
      .catch(e => {
        console.error(e);
      });
  }
}
customElements.define('cart-recommendations', CartRecommendations);
