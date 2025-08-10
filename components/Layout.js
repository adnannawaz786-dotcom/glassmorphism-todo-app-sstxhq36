import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 left-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

      {/* Main content container */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <motion.header
          className="p-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="inline-block p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Glassmorphism Todo
              </h1>
              <p className="text-white/70 text-lg">
                Elegant task management with a modern twist
              </p>
            </motion.div>
          </div>
        </motion.header>

        {/* Main content area */}
        <main className="px-6 pb-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl p-8 min-h-[600px]"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <AnimatePresence mode="wait">
                {children}
              </AnimatePresence>
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <motion.footer
          className="text-center pb-8 px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="inline-block px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
              <p className="text-white/50 text-sm">
                Built with Next.js & Glassmorphism Design
              </p>
            </div>
          </div>
        </motion.footer>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Layout;