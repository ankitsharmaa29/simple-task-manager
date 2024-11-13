import React from "react";
import TaskCard from "./TaskCard";

const TaskList = ({ title, tasks, onUpdateTask, onDeleteTask, onEditTask }) => (
  <div className="bg-gray-100 rounded-lg p-4">
    <h2 className="text-xl font-bold mb-2 text-gray-800">{title}</h2>
    {tasks.map((task) => (
      <TaskCard
        key={task.id}
        task={task}
        onComplete={() => onUpdateTask(task.id, { completed: true })}
        onDelete={() => onDeleteTask(task.id)}
        onEdit={() => onEditTask(task)}
      />
    ))}
  </div>
);

export default TaskList;
