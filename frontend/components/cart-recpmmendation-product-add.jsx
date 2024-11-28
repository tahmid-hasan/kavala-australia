import { useState, useEffect, useRef } from 'preact/hooks';
import register from 'preact-custom-element';

function CartRecommendationProductAdd() {
  const [product, setProduct] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null); // To reference the component

  useEffect(() => {
    const handleProductData = (event) => {
      setProduct(event.detail);
      console.log(event.detail);
      setIsVisible(true);
    };

    const handleOutsideClick = (event) => {
      if (componentRef.current && !componentRef.current.contains(event.target)) {
        setIsVisible(false);
        setProduct(null)
      }
    };

    // Attach event listener for 'product-data:load'
    document.addEventListener('product-data:load', handleProductData);

    // Attach event listener for detecting outside clicks
    document.addEventListener('click', handleOutsideClick);

    // Clean up event listeners on component unmount
    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('product-data:load', handleProductData);
    };
  }, []);

  const handleOnClick = function(event) {
    event.preventDefault()
    event.stopPropagation()
    setIsVisible(false);
    setProduct(null)
  }

  return (
    <div
      ref={componentRef}
      className={`cart-recommendation-product-data ${isVisible ? 'show' : ''}`}
    >
      {product ? (
        <div className='kv-flex kv-flex-col kv-gap-4'>
          <div className="kv-flex kv-absolute kv-top-6 kv-right-8 kv-items-center kv-justify-between">
            <button
              type="button"
              className="kv-text-gray-400 kv-hover:text-gray-900"
              onClick={(e) => {
                e.stopPropagation();
                setIsVisible(false);
                setProduct(null)
              }}
            >
              <svg className="kv-w-6 kv-h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <use href="#icon-close"></use>
              </svg>
            </button>
          </div>
          <div className="kv-product-info kv-flex kv-gap-4">
            <div className="kv-product--image kv-w-24 kv-h-[150%]">
              <img
                src={product.featured_image}
                alt={product.title}
                className="kv-w-full kv-h-full kv-object-cover"
              />
            </div>
            <div className="kv-product--info">
              <div className="kv-product--title">
                <h5 className="kv-text-lg kv-font-medium kv-tracking-tight kv-text-gray-900 kv-dark:text-white">{product?.title}</h5>
                <p class="kv-mb-4 kv-text-lg kv-font-normal kv-text-gray-700 kv-dark:text-gray-400">
                  {product.price_text}
                </p>
                
              </div>
            </div>
          </div>
          <div className='kv-flex kv-size-options-wrapper'>
            {product.options_with_values.map((item, index) => (
              item.name === 'Size' ? (
                item.values.map((value, valueIndex) => {
                  const variant = product.variants.find(_ => _.options.includes(value));
                  return (
                    <add-to-cart class={`button button--small button--cta button-secondary ${!variant.available ? 'disabled' : ''}`} data-variant-id={variant.id}>
                      <span class="label">
                        {value}
                      </span>
                    </add-to-cart>
                  );
                })
              ) : null
            ))}
          </div>
        </div>
      ) : (
        <p>No product recommendation available</p>
      )}
    </div>
  );
}

register(CartRecommendationProductAdd, 'cart-recommendation-product-add');
