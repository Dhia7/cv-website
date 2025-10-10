// pages/_app.js
import '../styles/global/globals.css';
import '../styles/SmoothScroll.css';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import PageLoader from '../components/PageLoader';
import { ThemeProvider } from '../components/ThemeContext';

function MyApp({ Component, pageProps, router }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0
    },
    exit: {
      opacity: 0,
      y: -20
    }
  };

  const pageTransition = {
    duration: 0.5,
    ease: "easeInOut"
  };

  if (loading) {
    return <PageLoader onLoadComplete={() => setLoading(false)} />;
  }

  return (
    <ThemeProvider>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={router.route}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={pageTransition}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default MyApp;