import { useState } from 'react';

export default function TaskInput({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-input">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        className="task-input__field"
      />
      <button type="submit" className="task-input__btn" aria-label="Add task">
        Add
      </button>
    </form>
  );
}
