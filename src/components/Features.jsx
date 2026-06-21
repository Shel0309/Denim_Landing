import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './Features.module.css';

const specData = [
  {
    num: "01",
    tag: "RAW TEXTURE",
    title: "14.5 OZ JAPANESE SHUTTLE LOOM SELVEDGE",
    details: "Woven in Kojima, Okayama on legacy Toyoda shuttle looms. High-density weave featuring a red-line selvedge ID. A heavy, stiff fabric that breaks in uniquely to the wearer's anatomy."
  },
  {
    num: "02",
    tag: "ECOLOGICAL PROCESS",
    title: "95% WATER-FREE INDIGO WASH",
    details: "Sourced from mills using dry-ozone clean technology. Eliminates toxic sludge runoff and saves over 80 liters of water per garment compared to commercial stone washes."
  },
  {
    num: "03",
    tag: "CONSTRUCTION DETAILS",
    title: "ANATOMICAL TWISTED STACK",
    details: "Engineered panel-twists at the knee guide the heavy fabric into sculptural stacks. High-tensile strength contrast stitching and reinforced pocket rivets."
  },
  {
    num: "04",
    tag: "CIRCULAR ARCHIVE",
    title: "LIFETIME REPAIR & HARDWARE PROGRAM",
    details: "Every garment includes a registered archival serial code. Return the denim at any point for complimentary pocket bags restoration, hem repair, and custom metal hardware replacements."
  }
];

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="features" className={styles.section} ref={ref}>
      <div className="container">
        
        <div className={styles.header}>
          <span className="mono-tag">[ SPECIFICATION SHEET ]</span>
          <h2 className={styles.title}>CRAFTED WITHOUT COMPROMISE</h2>
        </div>

        <div className={styles.specTable}>
          {specData.map((spec, index) => (
            <motion.div 
              key={spec.num}
              className={styles.row}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.numberCol}>
                <span className={styles.num}>[{spec.num}]</span>
                <span className={styles.tag}>{spec.tag}</span>
              </div>
              <div className={styles.contentCol}>
                <h3 className={styles.specTitle}>{spec.title}</h3>
                <p className={styles.specDesc}>{spec.details}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;
