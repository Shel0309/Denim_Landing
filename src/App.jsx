import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Showcase from './components/Showcase';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('void_denim_cart');
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (e) {
        console.error("Failed to parse cart data", e);
      }
    }
    return [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('void_denim_theme');
    return savedTheme || 'dark';
  });

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('void_denim_theme', theme);
  }, [theme]);

  // Save cart to localStorage on changes
  useEffect(() => {
    localStorage.setItem('void_denim_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item, size) => {
    setCart((prevCart) => {
      // Check if item with same ID and size already exists
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.id === item.id && cartItem.size === size
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += 1;
        return newCart;
      }

      return [...prevCart, { ...item, size, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId, size) => {
    setCart((prevCart) => 
      prevCart.filter((item) => !(item.id === itemId && item.size === size))
    );
  };

  const updateQuantity = (itemId, size, delta) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === itemId && item.size === size) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: Math.max(1, newQty) };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <>
      <Navbar 
        cart={cart} 
        removeFromCart={removeFromCart} 
        updateQuantity={updateQuantity}
        clearCart={clearCart}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        theme={theme}
        setTheme={setTheme}
      />
      <main>
        <Hero />
        <div className="grid-line" />
        <Features />
        <div className="grid-line" />
        <Showcase addToCart={addToCart} setIsCartOpen={setIsCartOpen} />
        <div className="grid-line" />
        <FAQ />
      </main>
      <div className="grid-line" />
      <Footer />
    </>
  );
}

export default App;
