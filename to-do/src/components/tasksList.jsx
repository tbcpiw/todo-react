import TaskItem from './TaskItem';

export default function TasksList({ tasks, filter, onToggle, onDelete, onEdit }) {
  const filtered = tasks.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  if (tasks.length === 0) {
    return <p className="tasks-empty">No tasks yet. Add one above!</p>;
  }

  if (filtered.length === 0) {
    return <p className="tasks-empty">No tasks match this filter.</p>;
  }

  return (
    <ul className="tasks-list">
      {filtered.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
