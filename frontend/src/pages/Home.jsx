// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen pt-24 flex flex-col justify-center items-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating geometric shapes */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
          >
            <div 
              className={`w-16 h-16 border border-cyber-400/20 ${
                i % 2 === 0 ? 'rounded-full' : 'rounded-lg rotate-45'
              }`}
            />
          </motion.div>
        ))}

        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(14, 165, 233, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(14, 165, 233, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Hero Content */}
      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Main Title */}
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="bg-gradient-to-r from-cyber-400 via-purple-400 to-neon-400 bg-clip-text text-transparent">
            Code.
          </span>
          <span className="text-white"> Create. </span>
          <span className="bg-gradient-to-r from-neon-400 via-cyan-400 to-cyber-400 bg-clip-text text-transparent">
            Deploy.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          The future of web development is here. Build, experiment, and share your creations 
          in our next-generation code editor.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link 
            to="/signup"
            className="btn-primary text-lg px-8 py-4 group"
          >
            Start Building
            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
          
          <Link 
            to="/login"
            className="btn-ghost text-lg px-8 py-4"
          >
            Sign In
          </Link>
        </motion.div>

        {/* Features */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[
            {
              title: "Real-time Preview",
              description: "See your changes instantly with our live preview system",
              icon: "⚡"
            },
            {
              title: "Cloud Sync",
              description: "Your projects, available everywhere, synced in real-time",
              icon: "☁️"
            },
            {
              title: "Collaborative",
              description: "Share and collaborate on projects with your team",
              icon: "👥"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="card-futuristic text-center group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-4xl mb-4 group-hover:animate-bounce">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
