import React, { useState, useEffect } from "react";
import { Modal, Form, Input, DatePicker, Select } from "antd";

const TaskFormModal = ({ visible, onClose, onSubmit, task }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: null,
    priority: "medium",
  });

  useEffect(() => {
    if (task) {
      setFormData(task);
    } else {
      setFormData({
        title: "",
        description: "",
        dueDate: null,
        priority: "medium",
      });
    }
  }, [task]);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    if (formData.title) {
      onSubmit(formData);
      onClose();
    }
  };

  return (
    <Modal
      title={task ? "Edit Task" : "Add New Task"}
      open={visible}
      onCancel={onClose}
      onOk={handleSubmit}
      okText={task ? "Update Task" : "Add Task"}
    >
      <Form layout="vertical">
        <Form.Item label="Title" required>
          <Input
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Description">
          <Input.TextArea
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Due Date">
          <DatePicker
            value={formData.dueDate}
            onChange={(date) => handleInputChange("dueDate", date)}
          />
        </Form.Item>
        <Form.Item label="Priority">
          <Select
            value={formData.priority}
            onChange={(value) => handleInputChange("priority", value)}
          >
            <Select.Option value="high">High</Select.Option>
            <Select.Option value="medium">Medium</Select.Option>
            <Select.Option value="low">Low</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskFormModal;
