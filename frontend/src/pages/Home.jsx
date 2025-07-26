import { motion } from 'framer-motion';

const bgVariants = {
  animate: {
    backgroundPosition: [
      '0% 50%',
      '100% 50%',
      '0% 50%'
    ],
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: 'linear'
    }
  }
};

const heroVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } }
};

const Home = () => (
  <motion.div
    className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden"
    variants={bgVariants}
    animate="animate"
    style={{
      background: 'linear-gradient(270deg, #ff6e7f, #bfe9ff, #43cea2, #185a9d)',
      backgroundSize: '600% 600%'
    }}
  >
    {/* Animated floating circles */}
    <motion.div
      className="absolute inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.3 }}
      style={{ pointerEvents: 'none' }}
    >
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="rounded-full bg-white/30 absolute"
          style={{
            width: `${80 + i * 20}px`,
            height: `${80 + i * 20}px`,
            top: `${10 + i * 8}%`,
            left: `${5 + i * 10}%`,
            filter: 'blur(8px)'
          }}
          animate={{
            y: [0, 30, 0],
            x: [0, 20, 0]
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5
          }}
        />
      ))}
    </motion.div>

    {/* Hero Section */}
    <motion.div
      className="z-10 text-center p-10 bg-white/80 rounded-xl shadow-xl backdrop-blur-md"
      variants={heroVariants}
      initial="hidden"
      animate="visible"
    >
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-green-400 to-pink-500">
        Welcome to CodePen Clone
      </h1>
      <p className="text-xl md:text-2xl mb-8 text-gray-700">
        Build, save, and preview HTML/CSS/JS projects easily.
      </p>
      <motion.a
        href="/signup"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-green-400 text-white font-semibold rounded-full shadow-lg transition-all duration-300"
      >
        Get Started
      </motion.a>
    </motion.div>
  </motion.div>
);

export default Home;
