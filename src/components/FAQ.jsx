import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './FAQ.module.css';

const faqs = [
  {
    num: "01",
    question: "WHAT DISTINGUISHES SHUTTLE LOOM DENIM?",
    answer: "Shuttle looms weave denim under slower, lower-tension conditions. This leaves the outer threads loose, giving the fabric its raw, uneven, and textured characteristic. A density that breaks down and molds dynamically over months of wear."
  },
  {
    num: "02",
    question: "HOW TO PRESERVE RAW HEAVYWEIGHT DENIM?",
    answer: "We recommend avoiding washes for the first 120 wearings. This allows the crease lines to set. When necessary, clean via gentle hand wash inside out in cold water, using mild detergent, then drip dry without wringing."
  },
  {
    num: "03",
    question: "WHAT IS THE TRANSIT PERIOD FOR DROPS?",
    answer: "Every order is packed and dispatched from our Tokyo archive. Custom courier shipment takes 3-7 business days depending on location. Full tracking and customs specifications are provided via automated dispatch logs."
  },
  {
    num: "04",
    question: "TERMS OF THE CIRCULAR HARDWARE REPAIR?",
    answer: "We repair structural blowouts, rivets, buttons, and hem tears for the lifespan of the garment. There is no repair fee. Submit an inquiry with your registered serial code to initialize the shipping transit process."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection} id="faq">
      <div className="container">
        
        <div className={styles.faqHeader}>
          <span className="mono-tag">[ FAQ DOCUMENTATION // ST SPEC ]</span>
          <h2>TECHNICAL INQUIRIES</h2>
        </div>
        
        <div className={styles.faqList}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`${styles.faqItem} ${isOpen ? styles.open : ''}`}
                onClick={() => toggleFAQ(index)}
              >
                <div className={styles.faqQuestion}>
                  <div className={styles.qLeft}>
                    <span className={styles.num}>[{faq.num}]</span>
                    <h3>{faq.question}</h3>
                  </div>
                  <span className={styles.stateIcon}>{isOpen ? "// CLOSE" : "// OPEN"}</span>
                </div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className={styles.faqAnswerWrap}
                    >
                      <div className={styles.faqAnswer}>
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
