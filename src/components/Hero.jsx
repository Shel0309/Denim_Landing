import { motion } from 'framer-motion';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroGrid}>
        
        {/* Left Side Content */}
        <div className={styles.contentCol}>
          <div className={styles.metaRow}>
            <span className="mono-tag">[ SYSTEM DESIGN: 08-2026 ]</span>
          </div>
          
          {/* Plain Title (No bulge/magnifier lens) */}
          <h1 className={styles.title}>
            VOID<br />
            DENIM
          </h1>
          
          <div className={styles.manifestoBlock}>
            <span className={styles.sectionNumber}>[ MANIFESTO ]</span>
            <p className={styles.description}>
              We reject the constraint of narrow cuts. Our silhouettes are built on raw volume, architectural stacking, and 14.5oz Japanese selvedge. Sculpted shapes designed for weight, movement, and presence.
            </p>
          </div>
          
          <div className={styles.actions}>
            <a href="#collection" className={`${styles.actionBtn} ${styles.primary}`}>
              VIEW ARCHIVE // COLLECTION
            </a>
            <a href="#features" className={`${styles.actionBtn} ${styles.secondary}`}>
              SPECIFICATION SHEET
            </a>
          </div>
        </div>

        {/* Right Side Image Campaign */}
        <div className={styles.imageCol}>
          <motion.div 
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className={styles.imageContainer}
          >
            <img 
              src="images/hero_model.png" 
              alt="VOID Baggy Denim Campaign" 
              className={styles.campaignImage}
            />
            <div className={styles.scanlineOverlay}></div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
