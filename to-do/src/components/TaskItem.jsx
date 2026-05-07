import { useState } from 'react';

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleSave = () => {
    const trimmed = editText.trim();
    if (trimmed) {
      onEdit(task.id, trimmed);
    } else {
      setEditText(task.text);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setEditText(task.text);
      setIsEditing(false);
    }
  };

  return (
    <li className={`task-item ${task.completed ? 'task-item--completed' : ''}`}>
      <label className="task-item__toggle">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span className="task-item__check" />
      </label>

      {isEditing ? (
        <input
          className="task-item__edit"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <span
          className="task-item__text"
          onDoubleClick={() => setIsEditing(true)}
          title="Double-click to edit"
        >
          {task.text}
        </span>
      )}

      <div className="task-item__actions">
        {!isEditing && (
          <button
            className="task-item__action task-item__action--edit"
            onClick={() => setIsEditing(true)}
            aria-label="Edit task"
          >
            ✎
          </button>
        )}
        <button
          className="task-item__action task-item__action--delete"
          onClick={() => onDelete(task.id)}
          aria-label="Delete task"
        >
          ✕
        </button>
      </div>
    </li>
  );
}
