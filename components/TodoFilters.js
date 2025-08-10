import React from 'react';
import { motion } from 'framer-motion';

const TodoFilters = ({ filter, onFilterChange, counts }) => {
  const filters = [
    { key: 'all', label: 'All', count: counts.total },
    { key: 'active', label: 'Active', count: counts.active },
    { key: 'completed', label: 'Completed', count: counts.completed }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex items-center justify-center gap-2 p-4"
    >
      <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
        {filters.map((filterOption) => (
          <motion.button
            key={filterOption.key}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onFilterChange(filterOption.key)}
            className={`
              relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${filter === filterOption.key
                ? 'text-white bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-sm border border-purple-400/30 shadow-lg shadow-purple-500/20'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
              }
            `}
          >
            <span className="relative z-10 flex items-center gap-2">
              {filterOption.label}
              <span className={`
                px-1.5 py-0.5 rounded-full text-xs
                ${filter === filterOption.key
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-600/50 text-gray-400'
                }
              `}>
                {filterOption.count}
              </span>
            </span>
            
            {filter === filterOption.key && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default TodoFilters;