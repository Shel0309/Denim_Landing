import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import styles from './Footer.module.css';

const Footer = () => {
  const footerRef = useRef(null);
  const ctaRef = useRef(null);
  const isInView = useInView(ctaRef, { once: true, margin: "-10%" });

  // Scroll parallax for the footer
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  // Dramatic background logo effects
  const logoScale = useTransform(scrollYProgress, [0, 1], [0.8, 1.3]);
  const logoOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.08]);
  const logoLetterSpacing = useTransform(scrollYProgress, [0, 1], ["-0.05em", "0.25em"]);
  const logoY = useTransform(scrollYProgress, [0, 1], ["10%", "-5%"]);

  // Content sliding up effect
  const contentY = useTransform(scrollYProgress, [0, 1], ["40px", "0px"]);

  return (
    <footer ref={footerRef} className={styles.footer}>
      <motion.div 
        ref={ctaRef}
        className={styles.ctaContainer}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="mono-tag">[ ACQUISITION CHANNEL ]</span>
        <h2 className={styles.ctaTitle}>JOIN THE REGISTRY</h2>
        <p className={styles.ctaDesc}>Get notified upon limited drops and production logs release.</p>
        
        <div className={styles.inputGroup}>
          <input type="email" placeholder="ENTER YOUR EMAIL" className={styles.input} />
          <button className={styles.submitBtn}>
            SUBMIT //
          </button>
        </div>
      </motion.div>

      <motion.div style={{ y: contentY }} className={styles.footerBottom}>
        <div className={styles.footerNav}>
          <div className={styles.col}>
            <span className={styles.colTitle}>[ ARCHIVE SHOP ]</span>
            <a href="#">THE PIPE</a>
            <a href="#">GRAVITY BAGGY</a>
            <a href="#">RETRO BOOTCUT</a>
            <a href="#">VOID FLARE</a>
          </div>
          <div className={styles.col}>
            <span className={styles.colTitle}>[ HELP CENTER ]</span>
            <a href="#">SPEC MANUAL</a>
            <a href="#">TRANSIT LOGS</a>
            <a href="#">RETURNS SYSTEM</a>
            <a href="#">DIRECT CONTACT</a>
          </div>
          <div className={styles.col}>
            <span className={styles.colTitle}>[ METADATA ]</span>
            <a href="#">THE STORY</a>
            <a href="#">ECOLOGICAL PROTOCOL</a>
            <a href="#">RAW WEAVE LOGS</a>
          </div>
        </div>
        
        <div className={styles.bottomBar}>
          <p>&copy; {new Date().getFullYear()} VOID DENIM. SPEC-DESIGNS ALL RIGHTS RESERVED.</p>
          <div className={styles.socials}>
            <a href="#">INSTAGRAM</a>
            <a href="#">TWITTER</a>
            <a href="#">DISCORD</a>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className={styles.giantLogo}
        style={{
          x: "-50%",
          scale: logoScale,
          opacity: logoOpacity,
          letterSpacing: logoLetterSpacing,
          paddingLeft: logoLetterSpacing,
          y: logoY
        }}
      >
        VOID
      </motion.div>
    </footer>
  );
};

export default Footer;
