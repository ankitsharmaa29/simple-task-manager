import React from "react";
import { Layout } from "antd";

const Header = ({ title }) => (
  <Layout.Header className="bg-blue-600 text-white text-xl font-bold py-4 px-6">
    {title}
  </Layout.Header>
);

export default Header;
