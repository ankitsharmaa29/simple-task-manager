import React from "react";
import { Input, Select, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const FilterControls = ({
  searchQuery,
  setSearchQuery,
  filterPriority,
  setFilterPriority,
  filterStatus,
  setFilterStatus,
  onAddTask,
}) => (
  <div className="flex items-center justify-between mb-4">
    <Input.Search
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search tasks..."
      className="mr-4"
    />
    <div className="flex space-x-4">
      <Select
        value={filterPriority}
        onChange={setFilterPriority}
        style={{ width: 150 }}
      >
        <Select.Option value="all">All Priorities</Select.Option>
        <Select.Option value="high">High</Select.Option>
        <Select.Option value="medium">Medium</Select.Option>
        <Select.Option value="low">Low</Select.Option>
      </Select>
      <Select
        value={filterStatus}
        onChange={setFilterStatus}
        style={{ width: 150 }}
      >
        <Select.Option value="all">All Statuses</Select.Option>
        <Select.Option value="completed">Completed</Select.Option>
        <Select.Option value="incomplete">Incomplete</Select.Option>
      </Select>
      <Button type="primary" icon={<PlusOutlined />} onClick={onAddTask}>
        Add Task
      </Button>
    </div>
  </div>
);

export default FilterControls;
