import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import TaskFormModal from "./TaskFormModal";
import TaskList from "./TaskList";
import FilterControls from "./FilterControls";
import { v4 as uuidv4 } from "uuid";

const TaskManagementApp = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (newTask) => {
    if (editingTask) {
      setTasks(
        tasks.map((task) =>
          task.id === editingTask.id ? { ...task, ...newTask } : task
        )
      );
      setEditingTask(null);
    } else {
      setTasks([...tasks, { ...newTask, id: uuidv4() }]);
    }
    setShowModal(false);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleUpdateTask = (id, updates) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const filteredTasks = tasks.filter((task) => {
    const searchMatch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const priorityMatch =
      filterPriority === "all" || task.priority === filterPriority;
    const statusMatch =
      filterStatus === "all" ||
      (filterStatus === "completed" && task.completed) ||
      (filterStatus === "incomplete" && !task.completed);
    return searchMatch && priorityMatch && statusMatch;
  });

  return (
    <Layout.Content className="bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <FilterControls
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterPriority={filterPriority}
          setFilterPriority={setFilterPriority}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          onAddTask={() => {
            setEditingTask(null);
            setShowModal(true);
          }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <TaskList
            title="Upcoming Tasks"
            tasks={filteredTasks.filter(
              (task) => !task.completed && new Date(task.dueDate) > new Date()
            )}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
          />
          <TaskList
            title="Overdue Tasks"
            tasks={filteredTasks.filter(
              (task) => !task.completed && new Date(task.dueDate) < new Date()
            )}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
          />
          <TaskList
            title="Completed Tasks"
            tasks={filteredTasks.filter((task) => task.completed)}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
          />
        </div>
      </div>

      <TaskFormModal
        visible={showModal}
        task={editingTask}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddTask}
      />
    </Layout.Content>
  );
};

export default TaskManagementApp;
