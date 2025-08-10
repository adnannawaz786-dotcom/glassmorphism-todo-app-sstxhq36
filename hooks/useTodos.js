import { useState, useEffect, useCallback } from 'react';
import { saveTodos, loadTodos } from '../lib/storage';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Load todos from localStorage on mount
  useEffect(() => {
    const loadedTodos = loadTodos();
    setTodos(loadedTodos);
    setIsLoading(false);
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    if (!isLoading) {
      saveTodos(todos);
    }
  }, [todos, isLoading]);

  // Add a new todo
  const addTodo = useCallback((text) => {
    if (!text.trim()) return;
    
    const newTodo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setTodos(prev => [newTodo, ...prev]);
  }, []);

  // Toggle todo completion status
  const toggleTodo = useCallback((id) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id 
          ? { 
              ...todo, 
              completed: !todo.completed,
              updatedAt: new Date().toISOString()
            }
          : todo
      )
    );
  }, []);

  // Delete a todo
  const deleteTodo = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  // Edit todo text
  const editTodo = useCallback((id, newText) => {
    if (!newText.trim()) return;
    
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id 
          ? { 
              ...todo, 
              text: newText.trim(),
              updatedAt: new Date().toISOString()
            }
          : todo
      )
    );
  }, []);

  // Clear all completed todos
  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  }, []);

  // Mark all todos as completed or uncompleted
  const toggleAll = useCallback(() => {
    const allCompleted = todos.every(todo => todo.completed);
    setTodos(prev => 
      prev.map(todo => ({
        ...todo,
        completed: !allCompleted,
        updatedAt: new Date().toISOString()
      }))
    );
  }, [todos]);

  // Get filtered todos based on current filter
  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  // Get todo statistics
  const stats = {
    total: todos.length,
    active: todos.filter(todo => !todo.completed).length,
    completed: todos.filter(todo => todo.completed).length,
  };

  // Check if all todos are completed
  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);

  return {
    // State
    todos: filteredTodos,
    filter,
    isLoading,
    stats,
    allCompleted,
    
    // Actions
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    toggleAll,
    setFilter,
  };
};

// Hook for managing individual todo edit state
export const useTodoEdit = (initialText = '') => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(initialText);

  const startEdit = useCallback(() => {
    setIsEditing(true);
    setEditText(initialText);
  }, [initialText]);

  const cancelEdit = useCallback(() => {
    setIsEditing(false);
    setEditText(initialText);
  }, [initialText]);

  const saveEdit = useCallback((onSave) => {
    if (editText.trim() && editText.trim() !== initialText) {
      onSave(editText.trim());
    }
    setIsEditing(false);
  }, [editText, initialText]);

  return {
    isEditing,
    editText,
    setEditText,
    startEdit,
    cancelEdit,
    saveEdit,
  };
};