/**
 * Local Storage Utilities for Todo Persistence
 * Handles saving, loading, and managing todos in browser localStorage
 */

const STORAGE_KEY = 'glassmorphism-todos';

/**
 * Load todos from localStorage
 * @returns {Array} Array of todo objects
 */
export const loadTodos = () => {
  try {
    if (typeof window === 'undefined') {
      return [];
    }
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }
    
    const todos = JSON.parse(stored);
    
    // Validate the structure of loaded todos
    if (!Array.isArray(todos)) {
      console.warn('Invalid todos format in localStorage, returning empty array');
      return [];
    }
    
    // Validate each todo object has required properties
    return todos.filter(todo => {
      return (
        todo &&
        typeof todo.id === 'string' &&
        typeof todo.text === 'string' &&
        typeof todo.completed === 'boolean' &&
        typeof todo.createdAt === 'string'
      );
    });
  } catch (error) {
    console.error('Error loading todos from localStorage:', error);
    return [];
  }
};

/**
 * Save todos to localStorage
 * @param {Array} todos - Array of todo objects to save
 * @returns {boolean} Success status
 */
export const saveTodos = (todos) => {
  try {
    if (typeof window === 'undefined') {
      return false;
    }
    
    if (!Array.isArray(todos)) {
      console.error('saveTodos: todos must be an array');
      return false;
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    return true;
  } catch (error) {
    console.error('Error saving todos to localStorage:', error);
    return false;
  }
};

/**
 * Add a new todo to storage
 * @param {Object} todo - Todo object to add
 * @returns {Array} Updated todos array
 */
export const addTodoToStorage = (todo) => {
  const todos = loadTodos();
  const newTodos = [...todos, todo];
  saveTodos(newTodos);
  return newTodos;
};

/**
 * Update an existing todo in storage
 * @param {string} id - Todo ID to update
 * @param {Object} updates - Properties to update
 * @returns {Array} Updated todos array
 */
export const updateTodoInStorage = (id, updates) => {
  const todos = loadTodos();
  const updatedTodos = todos.map(todo => 
    todo.id === id 
      ? { ...todo, ...updates, updatedAt: new Date().toISOString() }
      : todo
  );
  saveTodos(updatedTodos);
  return updatedTodos;
};

/**
 * Delete a todo from storage
 * @param {string} id - Todo ID to delete
 * @returns {Array} Updated todos array
 */
export const deleteTodoFromStorage = (id) => {
  const todos = loadTodos();
  const filteredTodos = todos.filter(todo => todo.id !== id);
  saveTodos(filteredTodos);
  return filteredTodos;
};

/**
 * Toggle todo completion status
 * @param {string} id - Todo ID to toggle
 * @returns {Array} Updated todos array
 */
export const toggleTodoInStorage = (id) => {
  const todos = loadTodos();
  const updatedTodos = todos.map(todo => 
    todo.id === id 
      ? { 
          ...todo, 
          completed: !todo.completed,
          completedAt: !todo.completed ? new Date().toISOString() : null,
          updatedAt: new Date().toISOString()
        }
      : todo
  );
  saveTodos(updatedTodos);
  return updatedTodos;
};

/**
 * Clear all todos from storage
 * @returns {boolean} Success status
 */
export const clearAllTodos = () => {
  try {
    if (typeof window === 'undefined') {
      return false;
    }
    
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing todos from localStorage:', error);
    return false;
  }
};

/**
 * Get storage statistics
 * @returns {Object} Storage stats
 */
export const getStorageStats = () => {
  const todos = loadTodos();
  const completed = todos.filter(todo => todo.completed).length;
  const pending = todos.length - completed;
  
  return {
    total: todos.length,
    completed,
    pending,
    storageSize: JSON.stringify(todos).length
  };
};

/**
 * Export todos as JSON string for backup
 * @returns {string} JSON string of all todos
 */
export const exportTodos = () => {
  const todos = loadTodos();
  return JSON.stringify(todos, null, 2);
};

/**
 * Import todos from JSON string
 * @param {string} jsonString - JSON string containing todos
 * @returns {boolean} Success status
 */
export const importTodos = (jsonString) => {
  try {
    const importedTodos = JSON.parse(jsonString);
    
    if (!Array.isArray(importedTodos)) {
      throw new Error('Invalid format: expected array of todos');
    }
    
    // Validate imported todos
    const validTodos = importedTodos.filter(todo => {
      return (
        todo &&
        typeof todo.id === 'string' &&
        typeof todo.text === 'string' &&
        typeof todo.completed === 'boolean'
      );
    });
    
    if (validTodos.length === 0) {
      throw new Error('No valid todos found in import data');
    }
    
    saveTodos(validTodos);
    return true;
  } catch (error) {
    console.error('Error importing todos:', error);
    return false;
  }
};

/**
 * Check if localStorage is available
 * @returns {boolean} Availability status
 */
export const isStorageAvailable = () => {
  try {
    if (typeof window === 'undefined') {
      return false;
    }
    
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (error) {
    return false;
  }
};