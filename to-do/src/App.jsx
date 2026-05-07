import { useState, useEffect } from 'react';
import TaskInput from './components/TaskInput';
import TasksList from './components/tasksList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text, completed: false },
    ]);
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const editTask = (id, newText) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: newText } : t))
    );
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  };

  const activeCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.length - activeCount;

  return (
    <div className="todo-app">
      <header className="todo-app__header">
        <h1>Todo App</h1>
      </header>

      <TaskInput onAdd={addTask} />

      <div className="todo-app__filters">
        {['all', 'active', 'completed'].map((f) => (
          <button
            key={f}
            className={`todo-app__filter ${filter === f ? 'todo-app__filter--active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f[0].toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <TasksList
        tasks={tasks}
        filter={filter}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
      />

      {tasks.length > 0 && (
        <footer className="todo-app__footer">
          <span>
            {activeCount} active
            {completedCount > 0 && ` · ${completedCount} completed`}
          </span>
          {completedCount > 0 && (
            <button className="todo-app__clear" onClick={clearCompleted}>
              Clear completed
            </button>
          )}
        </footer>
      )}
    </div>
  );
}

export default App;
