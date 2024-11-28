import { useState, useEffect, useRef } from 'preact/hooks';
import register from 'preact-custom-element';
import GiftWithPurchasePopup from '@/components/gift-with-purchase-popup'; // Import the standard component

function GiftWithPurchaseBar() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [activeGiftData, setActiveGiftData] = useState(null);
  const [unlockedItems, setUnlockedItems] = useState(null);
  const [nextToUnlockedItems, setNextToUnlockedItems] = useState([]);
  const [isVariantModalVisible, setVariantModalVisible] = useState(false);
  const [productToSelect, setProductToSelect] = useState(null);
  const [nextToUnlockMessage, setNextToUnlockeMessage] = useState("");
  const [nextProgressPercentage, setNextProgressPercentage] = useState('0%');
  const [hasRemovedLockedItems, setHasRemovedLockedItems] = useState(false);
  const [lastCartState, setLastCartState] = useState(null)
  const variantModalRef = useRef(null);

  // Load JSON data from script element
  useEffect(() => {
    const scriptElement = document.getElementById('giftItemData');
    if (scriptElement) {
      const jsonData = JSON.parse(scriptElement.textContent);

      // Find the data with isActive: true
      const activeData = jsonData.find(item => item.isActive);
      setActiveGiftData(activeData);
    }
  }, []);

  const removeLockedItemsFromCart = async function(lockedItems) {
    if (lockedItems.length === 0 || hasRemovedLockedItems) return; // Exit if no items or already removed
  
    const updates = {};
    lockedItems.forEach(item => {
      if (item.isInCart) {
        updates[item.added_variant] = 0;
      }
    });

    const inCartItem = lockedItems.find(item => item.isInCart)
    if(!inCartItem) {
      setHasRemovedLockedItems(true);
      return
    }
  
    const response = await fetch('/cart/update.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        updates,
        sections: ['gift-item-data', 'mini-cart', 'cart-icon-bubble', 'mobile-cart-icon-bubble'],
        sections_url: window.location.pathname,
      }),
    });
  
    if (response.ok) {
      const data = await response.json();
  
      // Extract the HTML string from the "gift-item-data" section
      const giftItemDataHtml = data.sections['gift-item-data'];
  
      // Parse the HTML string into DOM elements
      const parser = new DOMParser();
      const doc = parser.parseFromString(giftItemDataHtml, 'text/html');
  
      // Find the script tag with the ID "giftItemData"
      const giftItemDataScript = doc.querySelector('#giftItemData');
  
      if (giftItemDataScript) {
        // Parse the JSON data from the script tag content
        const giftItemData = JSON.parse(giftItemDataScript.textContent);
  
        // Log the parsed giftItemData
        console.log('Parsed giftItemData:', giftItemData);
  
        // Find the data with isActive: true
        const activeData = giftItemData.find(item => item.isActive);
  
        // If active data is found, set it as the active gift
        if (activeData) {
          setActiveGiftData(activeData);
          console.log('Active gift data:', activeData);
        } else {
          console.log('No active gift found');
        }

        const miniCart = document.querySelector('mini-cart');
        if(miniCart) {
          console.log(data)
          miniCart && miniCart.renderContents(data)
        }
        document.dispatchEvent(new CustomEvent('ajaxProduct:added', {
          detail: {
            product: data
          }
        }))
      }
  
      // Mark locked items as removed
      setHasRemovedLockedItems(true);
      console.log('Locked items removed from cart.');
    } else {
      console.error('Failed to remove locked items from cart');
    }
  };

  // set locked and unlocked items
  useEffect(() => {
    if (activeGiftData) {
      const filteredItems = activeGiftData.products.filter(item => item.is_unlocked);
      setUnlockedItems(filteredItems);

      const filteredLockedItems = activeGiftData.products.filter(item => !item.is_unlocked)
      console.log('LockedItems: ', filteredLockedItems)
      setNextToUnlockedItems(filteredLockedItems)
      setNextToUnlockeMessage(filteredLockedItems[0]?.message_to_unlock)

      if (filteredLockedItems.length > 0 && !hasRemovedLockedItems) {
        removeLockedItemsFromCart(filteredLockedItems);
      }

      if(filteredLockedItems[0]) {
        let progressPercentage = 0
        if(filteredLockedItems[0].amount_to_reach > 0) {
          // Calculate the progress percentage
          if(activeGiftData.amount_to_reach > 0) {
            progressPercentage = ((activeGiftData.price_threshold - activeGiftData.amount_to_reach) / activeGiftData.price_threshold) * 100;
          } else {
            progressPercentage = ((filteredLockedItems[0].price_threshold - filteredLockedItems[0].amount_to_reach) / filteredLockedItems[0].price_threshold) * 100;
          }
        } else {
          if(activeGiftData.amount_to_reach > 0) {
            progressPercentage = ((activeGiftData.price_threshold - activeGiftData.amount_to_reach) / activeGiftData.price_threshold) * 100;
          } else {
            progressPercentage = 100
          }
        }
        // Set the --progress CSS variable
        setNextProgressPercentage(`${progressPercentage}%`)
      }

      if(filteredItems.length > 0) {
        setModalVisible(true)
      }

      const handleAjaxAdded = (event) => {
        if(filteredItems.length > 0) {
          setTimeout(() => {
            setModalVisible(true)
          }, 1000)
        }
      };
  
      document.addEventListener('mini-cart:open', handleAjaxAdded);
  
      return () => {
        document.removeEventListener('mini-cart:open', handleAjaxAdded);
      };
    }
  }, [activeGiftData]);

  // Listen to "cart-update" event and update activeGiftData
  useEffect(() => {
    const handleCartUpdate = (event) => {
      if (event.detail) {
        const activeData = event.detail.find(item => item.isActive);
        setActiveGiftData(activeData);
      }
    };

    document.addEventListener('cart-update', handleCartUpdate);
    
    return () => {
      document.removeEventListener('cart-update', handleCartUpdate);
    };
  }, []);

  // Function to show the modal popup
  const handleSeeGiftClick = () => {
    setModalVisible(true);
  };

  // Function to close the modal popup
  const handleCloseModal = () => {
    setModalVisible(false);
    if(lastCartState) {
      const miniCart = document.querySelector('mini-cart');
      if(miniCart) {
        miniCart && miniCart.renderContents(lastCartState)
      }
      document.dispatchEvent(new CustomEvent('ajaxProduct:added', {
        detail: {
          product: lastCartState
        }
      }))
    }
  };

  // Function to add item to cart
  const handleAddToCart = async (event, variantId, product) => {
    if(event) {
      event.preventDefault()
      event.stopPropagation()
    }
    
    try {
      if(product) {
        if(product.added_variant) {
          if(variantId === product.added_variant) {
            return
          }

          const remove_response = await fetch(`/cart/change.js`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: product.added_variant.toString(),
              quantity: 0 
            })
          })
          const data = await remove_response.json()
        }
      }
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [{ id: variantId, quantity: 1, properties: { isGiftItem: true } }],
          sections: ['gift-item-data', 'mini-cart', 'cart-icon-bubble', 'mobile-cart-icon-bubble'],
          sections_url: window.location.pathname
        }),
      });
      if (response.ok) {
        // Optionally handle successful addition to the cart
        const data = await response.json();
      
        // Log the response data
        console.log('Response data:', data);

        // Extract the HTML string from the "gift-item-data" section
        const giftItemDataHtml = data.sections['gift-item-data'];

        // Create a DOM parser to convert the HTML string into DOM elements
        const parser = new DOMParser();
        const doc = parser.parseFromString(giftItemDataHtml, 'text/html');

        // Find the script tag with the ID "giftItemData"
        const giftItemDataScript = doc.querySelector('#giftItemData');

        if (giftItemDataScript) {
          // Parse the JSON data from the script tag content
          const giftItemData = JSON.parse(giftItemDataScript.textContent);

          // Log the parsed giftItemData
          console.log('Parsed giftItemData:', giftItemData);

          // Find the data with isActive: true
          const activeData = giftItemData.find(item => item.isActive);

          // If active data is found, set it as the active gift
          if (activeData) {
            setActiveGiftData(activeData);
            console.log('Active gift data:', activeData);
          } else {
            console.log('No active gift found');
          }
        }

        setLastCartState(data)

        // Optionally handle successful addition to the cart
        console.log('Item added to cart');
      } else {
        console.error('Failed to add item to cart');
      }
    } catch (error) {
      console.error('Error adding item to cart', error);
    }
  };

  // Function to handle "Add to Cart" button click
  const handleAddToCartClick = (event, item) => {
    event.preventDefault();

    if (item.variants && item.variants.length > 1) {
      console.log(item.variants)
      // If there are multiple variants, open the variant modal
      setProductToSelect(item);
      // setVariantModalVisible(true);
      showVariantModal()
    } else {
      // If only one variant, directly add the item to the cart
      handleAddToCart(event, item.variants[0].id);
    }
  };

  function decodeHTMLEntities(text) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  }
  
  useEffect(() => {
    if (activeGiftData) {
      let encodedUnlockMessage = activeGiftData?.content?.cart_drawer?.unlock_message;
      if(activeGiftData.amount_to_reach == 0) {
        encodedUnlockMessage = activeGiftData?.content?.cart_drawer?.goal_reached_message;
      }
      const messageContainer = document.querySelector('.free-gift__text');
      const progressElement = document.querySelector('.free-gift__progress');


      if (messageContainer && encodedUnlockMessage && activeGiftData.cart_total > 0) {
        // Decode HTML entities in the unlock message
        const unlockMessage = decodeHTMLEntities(encodedUnlockMessage);
  
        // Set the decoded message as HTML
        messageContainer.innerHTML = unlockMessage;
  
        // Find the popup trigger element and attach onClick
        const popupTrigger = document.querySelector('.gwp_popup_trigger');
        if (popupTrigger) {
          popupTrigger.style.cursor = 'pointer';
          popupTrigger.addEventListener('click', handleSeeGiftClick);
        }
      }

      if (progressElement) {
        let progressPercentage = 0
        if(activeGiftData.price_threshold > 0 && activeGiftData.amount_to_reach > 0) {
           // Calculate the progress percentage
          progressPercentage = ((activeGiftData.price_threshold - activeGiftData.amount_to_reach) / activeGiftData.price_threshold) * 100;
        } else {
          progressPercentage = 100
        }
       
  
        // Set the --progress CSS variable
        progressElement.style.setProperty('--progress', `${progressPercentage}%`);
      }
    }
  }, [activeGiftData]);

  // Function to show the variant modal
  const showVariantModal = () => {
    setVariantModalVisible(true);
    setTimeout(() => {
      // Ensure the element is visible before applying the visible class
      if (variantModalRef.current) {
        variantModalRef.current.classList.remove('kv-hidden');
        setTimeout(() => {
          variantModalRef.current.classList.add('kv-visible');
        }, 20)
      }
    }, 10); // Small delay to allow reflow
  };

  // Function to hide the variant modal
  const hideVariantModal = (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (variantModalRef.current) {
      variantModalRef.current.classList.remove('kv-visible');
      variantModalRef.current.classList.add('kv-hidden');
    }
    setVariantModalVisible(false);
  };

  return (
    <>
      {(activeGiftData && activeGiftData.cart_total > 0) && (
        <div className='free-gift typeset0'>
          <span className='free-gift__text free-gift__text--success'>
            Spend $141.00 more to reach Gift With Purchase. 
            <span 
              className="see-gift-link" 
              onClick={handleSeeGiftClick} 
              style={{ cursor: 'pointer', textDecoration: 'underline' }}>
              SEE GIFT
            </span>.
          </span>
          <span className="free-gift__progress" style={{ '--progress': `0%` }}></span>
        </div>
      )}
      <GiftWithPurchasePopup isVisible={isModalVisible} onClose={handleCloseModal} giftData={activeGiftData}>
        {unlockedItems?.length > 0 && (
          <div class="kv-items-available kv-overflow-hidden kv-relative kv-block kv-p-6 kv-bg-white kv-border kv-border-green-500 kv-rounded-lg kv-dark:bg-gray-800 kv-dark:border-gray-700">
            <h5 class="kv-mb-2 kv-text-xl kv-font-bold kv-tracking-tight kv-text-gray-900 kv-dark:text-white">
              You got this
            </h5>
            <p class="kv-mb-4 kv-text-lg kv-font-normal kv-text-gray-700 kv-dark:text-gray-400">
              Enjoy your free gift.
            </p>
            {unlockedItems?.map((item, i) => (
              <div className={`kv-unlocked-product kv-flex kv-items-center kv-py-5 kv-border-t kv-border-gray-200 ${i === unlockedItems.length - 1 ? 'kv-pb-0' : '' }`} key={item.id}>
                <div className=''>
                  <div className="kv-w-24">
                    <div class="kv-unlocked-product-image kv-w-24 kv-h-24 kv-relative kv-rounded-md kv-bg-gray-300">
                      <img
                        src={item.featured_image}
                        alt={item.title}
                        className="kv-w-full kv-h-full kv-object-cover kv-rounded-md"
                      />
                      {item.isInCart && (
                        <div className='kv-unlocked-product-cart-status kv-absolute -kv-right-3 -kv-top-3'>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="kv-size-8 kv-fill-green-500 kv-stroke-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="kv-flex kv-flex-col kv-justify-between kv-pl-4 kv-leading-normal kv-flex-grow">
                  <h5 class="kv-unlocked-product-title kv-text-lg kv-font-medium kv-tracking-tight kv-text-gray-900 kv-dark:text-white">{item.title}</h5>
                </div>
                <div className="kv-flex kv-atc-btn--wrapper kv-w-auto">
                  <button className="kv-atc-btn kv-relative kv-inline-flex kv-items-center kv-justify-center kv-p-0.5 kv-mb-2 kv-me-2 kv-overflow-hidden kv-text-sm kv-font-medium kv-text-gray-900 kv-rounded-lg kv-group kv-bg-gradient-to-br kv-from-pink-500 kv-to-orange-400 group-hover:kv-from-pink-500 group-hover:kv-to-orange-400 hover:kv-text-white kv-focus:kv-ring-4 focus:kv-outline-none focus:kv-ring-pink-200"
                    onClick={(event) => handleAddToCartClick(event, item)}
                    disabled={item.isInCart && item.variants.length === 1}
                  >
                    <span className="kv-relative kv-px-2.5 kv-py-2.5 kv-transition-all kv-ease-in kv-duration-75 kv-bg-white kv-dark:bg-gray-900 kv-rounded-md group-hover:kv-bg-opacity-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="kv-size-6 kv-transition-colors kv-duration-300 group-hover:kv-stroke-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
                    </svg>
                    </span>
                  </button>
                </div>
              </div>
            ))}
            {isVariantModalVisible && (
              <div
                ref={variantModalRef}
                className="kv-variant-information kv-hidden kv-p-6 kv-pt-10 kv-border-t kv-flex kv-gap-2"
                style={{ left: '0', width: '100%' }}
              >
                <button className="kv-absolute kv-top-3 kv-right-6" onClick={(event) => hideVariantModal(event)}>
                  <svg class="kv-w-6 kv-h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><use href="#icon-close"></use></svg>
                </button>
                {productToSelect.variants.map(variant => (
                  <button
                    className='kv-text-xl kv-inline-flex kv-items-center kv-justify-center kv-p-0.5
                    disabled:kv-line-through disabled:kv-bg-gradient-to-br disabled:kv-from-pink-500 disabled:kv-to-orange-400
                    kv-me-2 kv-font-medium kv-text-gray-900 kv-rounded-lg kv-group
                    kv-bg-gradient-to-br kv-from-pink-500 kv-to-orange-400
                    group-hover:kv-from-pink-500 group-hover:kv-to-orange-400
                    hover:kv-text-white kv-focus:kv-ring-4 focus:kv-outline-none focus:kv-ring-pink-200
                    disabled:hover:kv-bg-gradient-to-br disabled:hover:kv-from-pink-500 disabled:hover:kv-to-orange-400'
                    key={variant.id}
                    onClick={(event) => {
                      handleAddToCart(event, variant.id, productToSelect);
                      hideVariantModal(event);
                      setProductToSelect(null);
                    }}
                    disabled={!variant.available}>
                    <span className="kv-relative kv-px-2.5 kv-py-2.5 kv-transition-all kv-ease-in kv-duration-75 kv-bg-white kv-dark:bg-gray-900 kv-rounded-md
                    group-hover:kv-bg-opacity-0
                    disabled:group-hover:kv-bg-opacity-100 disabled:hover:kv-bg-white">{variant.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        {nextToUnlockedItems?.length > 0 && (
          <div class="kv-block kv-items-to-unlock kv-mt-6 kv-p-6 kv-bg-white kv-border kv-border-gray-200 kv-rounded-lg kv-dark:bg-gray-800 kv-dark:border-gray-700">
            <h5 class="kv-mb-2 kv-text-xl kv-font-bold kv-tracking-tight kv-text-gray-900 kv-dark:text-white">
              {nextToUnlockMessage}
            </h5>
            <p class="kv-mb-4 kv-text-lg kv-font-normal kv-text-gray-700 kv-dark:text-gray-400">
              {activeGiftData?.content?.popup?.next_unlock_section?.subtitle}
            </p>
            <div className="kv-flex">
              <span className="free-gift__progress free-gift__progress--popup" style={{ "--progress": nextProgressPercentage }}></span>
            </div>
            {nextToUnlockedItems?.map((item, i) => (
              <div className={`kv-flex kv-items-center kv-py-5 ${ i !== 0 ? 'kv-border-t kv-border-gray-200' : '' } ${ i != nextToUnlockedItems.length - 1 ? 'kv-pb-5' : 'kv-pb-0' }`}>
                <div className="kv-w-24">
                  <div className="kv-w-24 kv-h-24 kv-rounded-md kv-bg-gray-300">
                    <img
                      src={item.featured_image}
                      alt={item.title}
                      className="kv-w-full kv-h-full kv-object-cover kv-rounded-md"
                    />
                  </div>
                </div>
                <div className="kv-flex kv-flex-col kv-justify-between kv-pl-4 kv-leading-normal kv-flex-grow">
                  <h5 className="kv-text-lg kv-font-medium kv-tracking-tight kv-text-gray-900 kv-dark:text-white">{item?.title}</h5>
                </div>
              </div>
            ))}
          </div>
        )}
      </GiftWithPurchasePopup>
    </>
  );
}

register(GiftWithPurchaseBar, 'gift-with-purchase-bar');
