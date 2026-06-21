import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import styles from './Jeans3DScene.module.css';

const Jeans3DScene = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();

  // Mouse tilt effect (only active near the top of the page)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const tiltX = useSpring(mouseY, springConfig);
  const tiltY = useSpring(mouseX, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Only tilt when near the top of the page (Hero section)
      if (window.scrollY < window.innerHeight) {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = (clientX / innerWidth - 0.5) * 30; // max 15deg tilt
        const y = (clientY / innerHeight - 0.5) * -30;
        mouseX.set(x);
        mouseY.set(y);
      } else {
        mouseX.set(0);
        mouseY.set(0);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Scroll transforms for Apple-like story telling
  const x = useTransform(scrollYProgress, [0, 0.25, 0.55, 0.8], ["0%", "30%", "0%", "-30%"]);
  const y = useTransform(scrollYProgress, [0, 0.25, 0.55, 0.8], ["0%", "10%", "5%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 0.25, 0.55, 0.8], [1, 0.8, 1.6, 0.5]);
  const rotateScroll = useTransform(scrollYProgress, [0, 0.25, 0.55, 0.8], [0, -15, 35, -45]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.35, 0.55, 0.7, 0.8], [0.95, 0.95, 0.8, 0.15, 0.15, 0]);

  // Combine scroll rotation and mouse tilt
  const combinedRotateX = useTransform(tiltX, (val) => `${val}deg`);
  const combinedRotateY = useTransform(tiltY, (val) => `${val}deg`);

  return (
    <div className={styles.sceneContainer} ref={containerRef}>
      <motion.div
        style={{
          x,
          y,
          scale,
          rotate: rotateScroll,
          rotateX: combinedRotateX,
          rotateY: combinedRotateY,
          opacity,
          transformStyle: "preserve-3d",
          perspective: 1000
        }}
        className={styles.jeansWrapper}
      >
        <img 
          src="images/hero_jeans.png" 
          alt="AURA Baggy Denim" 
          className={styles.jeansImage} 
        />
        <div className={styles.reflectionGlow}></div>
      </motion.div>
    </div>
  );
};

export default Jeans3DScene;
