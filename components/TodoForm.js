import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';

const TodoForm = ({ onAddTodo, isOpen, onToggle }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('personal');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    const newTodo = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      priority,
      category,
      dueDate: dueDate || null,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    onAddTodo(newTodo);
    
    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
    setCategory('personal');
    setDueDate('');
    onToggle();
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setPriority('medium');
    setCategory('personal');
    setDueDate('');
    onToggle();
  };

  return (
    <>
      {/* Add Todo Button */}
      <motion.button
        onClick={onToggle}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg backdrop-blur-md border border-white/20 flex items-center justify-center z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Plus className="w-6 h-6 text-white" />
        </motion.div>
      </motion.button>

      {/* Form Modal */}
      <motion.div
        className={`fixed inset-0 z-40 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={handleCancel}
        />
        
        {/* Form Container */}
        <div className="flex items-center justify-center min-h-screen p-4">
          <motion.div
            className="relative w-full max-w-md bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ 
              scale: isOpen ? 1 : 0.9, 
              opacity: isOpen ? 1 : 0, 
              y: isOpen ? 0 : 20 
            }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-semibold text-white">Add New Task</h2>
              <button
                onClick={handleCancel}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                  placeholder="Enter task title"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all resize-none"
                  placeholder="Enter task description"
                  rows={3}
                />
              </div>

              {/* Priority and Category */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                  >
                    <option value="low" className="bg-gray-800">Low</option>
                    <option value="medium" className="bg-gray-800">Medium</option>
                    <option value="high" className="bg-gray-800">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                  >
                    <option value="personal" className="bg-gray-800">Personal</option>
                    <option value="work" className="bg-gray-800">Work</option>
                    <option value="shopping" className="bg-gray-800">Shopping</option>
                    <option value="health" className="bg-gray-800">Health</option>
                    <option value="other" className="bg-gray-800">Other</option>
                  </select>
                </div>
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:bg-white/10 transition-all duration-200"
                >
                  Cancel
                </button>
                <motion.button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Add Task
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default TodoForm;