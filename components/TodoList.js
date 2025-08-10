import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Edit2, Check, X } from 'lucide-react';

const TodoList = ({ 
  todos, 
  onToggleComplete, 
  onDeleteTodo, 
  onEditTodo, 
  filter = 'all' 
}) => {
  const [editingId, setEditingId] = React.useState(null);
  const [editText, setEditText] = React.useState('');

  const filteredTodos = React.useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const handleEditStart = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const handleEditSave = () => {
    if (editText.trim()) {
      onEditTodo(editingId, editText.trim());
    }
    setEditingId(null);
    setEditText('');
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditText('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEditSave();
    } else if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  if (filteredTodos.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="text-gray-400 text-lg">
          {filter === 'active' && 'No active todos'}
          {filter === 'completed' && 'No completed todos'}
          {filter === 'all' && 'No todos yet'}
        </div>
        <div className="text-gray-500 text-sm mt-2">
          {filter === 'all' && 'Add your first todo above'}
          {filter === 'active' && 'All tasks completed!'}
          {filter === 'completed' && 'Complete some tasks to see them here'}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {filteredTodos.map((todo) => (
          <motion.div
            key={todo.id}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="group relative"
          >
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 hover:bg-white/15 transition-all duration-200 shadow-lg hover:shadow-xl">
              <div className="flex items-center gap-3">
                {/* Complete Toggle */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onToggleComplete(todo.id)}
                  className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    todo.completed
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'border-gray-400 hover:border-emerald-400'
                  }`}
                >
                  {todo.completed && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Check size={14} />
                    </motion.div>
                  )}
                </motion.button>

                {/* Todo Text */}
                <div className="flex-1 min-w-0">
                  {editingId === todo.id ? (
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={handleKeyPress}
                      onBlur={handleEditSave}
                      autoFocus
                      className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none text-lg"
                      placeholder="Edit todo..."
                    />
                  ) : (
                    <motion.span
                      className={`block text-lg transition-all duration-200 ${
                        todo.completed
                          ? 'text-gray-400 line-through'
                          : 'text-white'
                      }`}
                      onDoubleClick={() => handleEditStart(todo)}
                    >
                      {todo.text}
                    </motion.span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {editingId === todo.id ? (
                    <>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={handleEditSave}
                        className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors duration-200"
                      >
                        <Check size={16} />
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={handleEditCancel}
                        className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors duration-200"
                      >
                        <X size={16} />
                      </motion.button>
                    </>
                  ) : (
                    <>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEditStart(todo)}
                        className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors duration-200"
                      >
                        <Edit2 size={16} />
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onDeleteTodo(todo.id)}
                        className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors duration-200"
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    </>
                  )}
                </div>
              </div>

              {/* Todo Metadata */}
              {todo.createdAt && (
                <div className="mt-2 text-xs text-gray-500">
                  Created {new Date(todo.createdAt).toLocaleDateString()}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TodoList;