import { useEffect, useRef, useState } from 'preact/hooks';

function GiftWithPurchasePopup({ isVisible, onClose, children, giftData }) {
  const modalRef = useRef(null);
  const [show, setShow] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
    } else {
      const timer = setTimeout(() => setShow(false), 310);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  useEffect(() => {
    document.body.style.overflow = show ? 'hidden' : '';
  }, [show]);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [show]);

  if (!show && !isVisible) {
    return null;
  }

  return (
    <div className="kv-fixed kv-inset-0 kv-z-50 kv-flex kv-items-center kv-justify-center kv-p-4 kv-bg-black kv-bg-opacity-50">
      <div
        ref={modalRef}
        className={`kv-relative kv-w-full kv-max-w-2xl kv-bg-white kv-rounded-lg kv-shadow-lg 
          ${isVisible ? 'kv-modal-enter' : 'kv-modal-exit'}`}
      >
        <div className='free-gift-popup--header kv-p-6'>
          <div className="kv-flex kv-items-center kv-justify-between">
            <h3 className="kv-popup-title kv-text-2xl kv-font-bold">{giftData?.content?.popup?.title}</h3>
            <button
              type="button"
              className="kv-text-gray-400 kv-hover:text-gray-900"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
            >
              <svg className="kv-w-6 kv-h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <use href="#icon-close"></use>
              </svg>
            </button>
          </div>
          <p className='kv-text-xl kv-popup-subtitle'>{giftData?.content?.popup?.subtitle}</p>
        </div>
        <div className="kv-p-6 kv-pt-0">
          {children}
        </div>
      </div>
    </div>
  );
}

export default GiftWithPurchasePopup;
