import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import styles from './Showcase.module.css';

const showcaseItems = [
  {
    id: "01",
    title: "THE PIPE",
    subtitle: "RAW WIDE-LEG SILHOUETTE",
    image: "images/pipe_model.png",
    spec: "FIT: WIDE STRAIGHT // WEIGHT: 14.5 OZ",
    price: "$280.00",
    details: "Crafted from unprocessed Japanese selvedge denim. This raw straight fit maintains its rigid geometry, forming personalized creases over time. Features a signature silver button fly and reinforced contrast stitching.",
    origin: "KOJIMA, OKAYAMA (JP)",
    care: "DRY CLEAN OR HAND WASH IN COLD WATER ONLY. DO NOT TUMBLE DRY."
  },
  {
    id: "02",
    title: "GRAVITY BAGGY",
    subtitle: "EXTREME STACKED VOLUME",
    image: "images/baggy_model.png",
    spec: "FIT: EXTREME OVERSURFACE // WEIGHT: 14 OZ",
    price: "$295.00",
    details: "Designed with an anatomical leg twist to guide heavy denim into sculptural stacks at the ankle. Features an ultra-relaxed drop rise, wide-cut leg opening, and heavy faded wash treatment.",
    origin: "KOJIMA, OKAYAMA (JP)",
    care: "WASH COLD INSIDE OUT. DAMP HANG DRY."
  },
  {
    id: "03",
    title: "RETRO BOOTCUT",
    subtitle: "FITTED THIGH FLARED HEM",
    image: "images/bootcut_model.png",
    spec: "FIT: SLIGHT FLARE // WEIGHT: 13.5 OZ",
    price: "$260.00",
    details: "A nod to retro industrial wear. Fitted through the thigh and seat, then flaring subtly from the knee to sit cleanly over boots. Vintage washed deep indigo finish with copper rivets.",
    origin: "KOJIMA, OKAYAMA (JP)",
    care: "DRY CLEAN RECOMMENDED FOR FIRST WASH TO PRESERVE DEEP INDIGO HUES."
  },
  {
    id: "04",
    title: "VOID FLARE",
    subtitle: "WASHED BLACK BELL-BOTTOM",
    image: "images/flare_model.png",
    spec: "FIT: OVER FLARE // WEIGHT: 14.2 OZ",
    price: "$275.00",
    details: "Extreme flare silhouette inspired by 90s grunge culture. Heavy stone-washed black denim with raw distressed hems and custom VOID branded hardware. Built to wear out and drag on the floor.",
    origin: "KOJIMA, OKAYAMA (JP)",
    care: "MACHINE WASH COLD. DISTRESSING WILL BECOME MORE UNIQUE WITH WORN EDGES."
  }
];

const sizeMeasurements = {
  "XS": { waist: "76cm", rise: "33cm", inseam: "74cm", opening: "25cm" },
  "S": { waist: "80cm", rise: "34cm", inseam: "76cm", opening: "26cm" },
  "M": { waist: "84cm", rise: "35cm", inseam: "78cm", opening: "27cm" },
  "L": { waist: "88cm", rise: "36cm", inseam: "80cm", opening: "28cm" },
  "XL": { waist: "92cm", rise: "37cm", inseam: "82cm", opening: "29cm" }
};

const Showcase = ({ addToCart, setIsCartOpen }) => {
  const targetRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState("M");

  // Disable body scroll when modal is open to fix double scrolling bug
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedItem]);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Limit horizontal scroll range strictly so it stops perfectly
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  const handleOpenItem = (item) => {
    setSelectedItem(item);
    setSelectedSize("M");
  };

  return (
    <section ref={targetRef} className={styles.showcaseSection} id="collection">
      <div className={styles.stickyContainer}>
        
        <div className={styles.header}>
          <span className="mono-tag">[ VOLUMETRIC COLLECTION // 01 ]</span>
          <h2>THE SILHOUETTES</h2>
        </div>
        
        <div className={styles.scrollWrapper}>
          <motion.div style={{ x }} className={styles.itemsContainer}>
            {showcaseItems.map((item) => (
              <div 
                key={item.id} 
                className={styles.item}
                onClick={() => handleOpenItem(item)}
              >
                <div className={styles.imageWrapper}>
                  <img src={item.image} alt={item.title} className={styles.image} />
                  <div className={styles.metaOverlay}>
                    <span className={styles.specTag}>{item.spec}</span>
                  </div>
                </div>
                <div className={styles.itemInfo}>
                  <span className={styles.itemId}>[{item.id}]</span>
                  <div className={styles.textBlock}>
                    <h3>{item.title}</h3>
                    <p className={styles.subText}>{item.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

      </div>

      {/* Model Detail Modal Overlay */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.modalOverlay}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                className={styles.closeBtn}
                onClick={() => setSelectedItem(null)}
              >
                [ CLOSE // ESC ]
              </button>

              <div className={styles.modalGrid}>
                
                {/* Left Side: Campaign Image */}
                <div className={styles.modalImageCol}>
                  <img 
                    src={selectedItem.image} 
                    alt={selectedItem.title} 
                    className={styles.modalImage}
                  />
                </div>

                {/* Right Side: Specs & Info */}
                <div className={styles.modalInfoCol}>
                  <div className={styles.modalMeta}>
                    <span className="mono-tag">MODEL SPEC // {selectedItem.id}</span>
                  </div>
                  
                  <h2 className={styles.modalTitle}>{selectedItem.title}</h2>
                  <span className={styles.modalSubtitle}>{selectedItem.subtitle}</span>
                  
                  <div className={styles.priceTag}>
                    {selectedItem.price}
                  </div>

                  <div className={styles.divider}></div>

                  {/* Size Selector */}
                  <div className={styles.sizeSection}>
                    <span className={styles.blockTitle}>[ CHOOSE SIZE // SPECS ]</span>
                    <div className={styles.sizeGrid}>
                      {["XS", "S", "M", "L", "XL"].map((size) => (
                        <button
                          key={size}
                          className={`${styles.sizeBtn} ${selectedSize === size ? styles.activeSize : ''}`}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size Chart / Metrics Table */}
                  <div className={styles.metricsSection}>
                    <span className={styles.blockTitle}>[ FIT METRICS // CM ]</span>
                    <div className={styles.metricsTable}>
                      <div className={styles.metricsHeader}>
                        <span>SZ</span>
                        <span>WAIST</span>
                        <span>RISE</span>
                        <span>INSEAM</span>
                        <span>LEG OPENING</span>
                      </div>
                      {Object.entries(sizeMeasurements).map(([size, metrics]) => (
                        <div 
                          key={size} 
                          className={`${styles.metricsRow} ${selectedSize === size ? styles.highlightedRow : ''}`}
                          onClick={() => setSelectedSize(size)}
                        >
                          <span>{size}</span>
                          <span>{metrics.waist}</span>
                          <span>{metrics.rise}</span>
                          <span>{metrics.inseam}</span>
                          <span>{metrics.opening}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={styles.divider}></div>

                  <div className={styles.specList}>
                    <div className={styles.specRow}>
                      <span className={styles.specLabel}>SILHOUETTE</span>
                      <span className={styles.specValue}>{selectedItem.spec.split(' // ')[0].replace('FIT: ', '')}</span>
                    </div>
                    <div className={styles.specRow}>
                      <span className={styles.specLabel}>FABRIC DENSITY</span>
                      <span className={styles.specValue}>{selectedItem.spec.split(' // ')[1].replace('WEIGHT: ', '')}</span>
                    </div>
                    <div className={styles.specRow}>
                      <span className={styles.specLabel}>ORIGIN</span>
                      <span className={styles.specValue}>{selectedItem.origin}</span>
                    </div>
                  </div>

                  <div className={styles.divider}></div>

                  <div className={styles.descriptionBlock}>
                    <span className={styles.blockTitle}>[ DESIGN NOTES ]</span>
                    <p>{selectedItem.details}</p>
                  </div>

                  <div className={styles.careBlock}>
                    <span className={styles.blockTitle}>[ CARE PROTOCOL ]</span>
                    <p>{selectedItem.care}</p>
                  </div>

                  <button 
                    className={styles.orderBtn} 
                    onClick={() => {
                      if (!selectedSize) {
                        alert("PLEASE SELECT A SIZE SPECIFICATION.");
                        return;
                      }
                      addToCart(selectedItem, selectedSize);
                      setSelectedItem(null);
                      setIsCartOpen(true);
                    }}
                  >
                    ADD TO BAG
                  </button>

                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Showcase;
