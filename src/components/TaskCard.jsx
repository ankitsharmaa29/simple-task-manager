import React from "react";
import { Card, Button } from "antd";
import { CheckOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";

const TaskCard = ({ task, onComplete, onDelete, onEdit }) => (
  <Card
    className={`border-l-4 mt-2 ${
      task.priority === "high"
        ? "border-red-500"
        : task.priority === "medium"
        ? "border-yellow-500"
        : "border-green-500"
    }`}
  >
    <Card.Meta
      title={
        <span className={task.completed ? "line-through" : ""}>
          {task.title}
        </span>
      }
      description={
        <div>
          <p className="text-gray-500 text-sm">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </p>
          <p className="text-gray-700">{task.description}</p>
        </div>
      }
    />
    <div className="flex justify-end space-x-2 mt-4">
      {!task.completed && (
        <>
          <Button
            type="primary"
            onClick={onComplete}
            icon={<CheckOutlined />}
          />
          <Button type="default" onClick={onEdit} icon={<EditOutlined />} />
          <Button type="danger" onClick={onDelete} icon={<CloseOutlined />} />
        </>
      )}
    </div>
  </Card>
);

export default TaskCard;
