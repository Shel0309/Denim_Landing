import { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Trash2 } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = ({ cart, removeFromCart, updateQuantity, clearCart, isCartOpen, setIsCartOpen, theme, setTheme }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Disable body scroll when cart is open to prevent double scrolling
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => {
    const priceNum = parseFloat(item.price.replace('$', ''));
    return sum + priceNum * item.quantity;
  }, 0);

  const handleCheckout = () => {
    alert("ORDER SYSTEM STUB INITIALIZED // SUCCESSFUL CONCEPT CHECKOUT.");
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <a href="#" className={styles.logo}>
            VOID DENIM
          </a>

          <div className={styles.desktopMenu}>
            <a href="#collection" className={styles.navLink}>
              <span className={styles.linkNum}>[01]</span> COLLECTION
            </a>
            <a href="#features" className={styles.navLink}>
              <span className={styles.linkNum}>[02]</span> CRAFT SPEC
            </a>
            <a href="#faq" className={styles.navLink}>
              <span className={styles.linkNum}>[03]</span> DOCUMENTATION
            </a>
          </div>

          <div className={styles.actions}>
            <button 
              className={styles.themeBtn}
              onClick={(e) => {
                const nextTheme = theme === 'dark' ? 'light' : 'dark';
                const isReversing = theme === 'light';
                
                if (!document.startViewTransition) {
                  setTheme(nextTheme);
                  return;
                }

                if (isReversing) {
                  document.documentElement.classList.add('theme-transition-reversing');
                }

                const x = e.clientX;
                const y = e.clientY;
                const endRadius = Math.hypot(
                  Math.max(x, window.innerWidth - x),
                  Math.max(y, window.innerHeight - y)
                );

                document.documentElement.style.setProperty('--click-x', `${x}px`);
                document.documentElement.style.setProperty('--click-y', `${y}px`);
                document.documentElement.style.setProperty('--end-radius', `${endRadius}px`);

                const transition = document.startViewTransition(() => {
                  flushSync(() => {
                    setTheme(nextTheme);
                  });
                });

                transition.finished.then(() => {
                  document.documentElement.classList.remove('theme-transition-reversing');
                });
              }}
              title="Toggle Theme"
            >
              [ {theme === 'dark' ? 'LIGHT' : 'DARK'} ]
            </button>
            <button 
              className={styles.cartBtn}
              onClick={() => setIsCartOpen(true)}
            >
              BAG // ({totalItems})
            </button>
            <button 
              className={styles.menuBtn}
              onClick={() => setIsOpen(true)}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className={styles.mobileMenu}
          >
            <div className={styles.mobileMenuHeader}>
              <span className={styles.logo}>VOID DENIM</span>
              <button onClick={() => setIsOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <div className={styles.mobileLinks}>
              <a href="#collection" onClick={() => setIsOpen(false)}>01 // COLLECTION</a>
              <a href="#features" onClick={() => setIsOpen(false)}>02 // CRAFT SPEC</a>
              <a href="#faq" onClick={() => setIsOpen(false)}>03 // DOCUMENTATION</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer Overlay */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.cartOverlay}
            onClick={() => setIsCartOpen(false)}
          >
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className={styles.cartContent}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.cartHeader}>
                <span className="mono-tag">[ REGISTRY // BAG ]</span>
                <button 
                  className={styles.closeCartBtn}
                  onClick={() => setIsCartOpen(false)}
                >
                  [ CLOSE ]
                </button>
              </div>

              {cart.length === 0 ? (
                <div className={styles.emptyCart}>
                  <p>YOUR ARCHIVAL BAG IS EMPTY.</p>
                </div>
              ) : (
                <>
                  <div className={styles.cartItemsList}>
                    <AnimatePresence>
                      {cart.map((item) => (
                        <motion.div 
                          key={`${item.id}-${item.size}`} 
                          layout
                          initial={{ opacity: 0, scale: 0.95, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, x: -50, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className={styles.cartItem}
                        >
                          <img src={item.image} alt={item.title} className={styles.itemThumb} />
                          <div className={styles.itemInfo}>
                            <div className={styles.itemTitleRow}>
                              <h3>{item.title}</h3>
                              <span className={styles.itemSize}>SIZE: {item.size}</span>
                            </div>
                            <span className={styles.itemPrice}>{item.price}</span>
                            
                            <div className={styles.quantityControls}>
                              <button onClick={() => updateQuantity(item.id, item.size, -1)}>-</button>
                              <span>{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, item.size, 1)}>+</button>
                              
                              <button 
                                className={styles.trashBtn}
                                onClick={() => removeFromCart(item.id, item.size)}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  <div className={styles.cartFooter}>
                    <div className={styles.totalRow}>
                      <span>TOTAL EST.</span>
                      <span className={styles.totalPrice}>${totalPrice.toFixed(2)}</span>
                    </div>
                    <button className={styles.checkoutBtn} onClick={handleCheckout}>
                      PLACE ORDER // ЗАКАЗАТЬ
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
