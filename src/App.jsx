import React from "react";
import { Layout } from "antd";
import TaskManagementApp from "./components/TaskManagment";
import Header from "./components/Header";

const App = () => {
  return (
    <Layout className="min-h-screen">
      <Header title="Task Management" />
      <TaskManagementApp />
    </Layout>
  );
};

export default App;
