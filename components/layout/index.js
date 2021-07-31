import { Layout as AntLayout, Menu, Breadcrumb, Space } from "antd";
import Header from "../header";

const Layout = ({ children }) => {
  return (
    <AntLayout>
      <Space direction="vertical" size="large">
        <Header />
        <AntLayout.Content
          style={{
            padding: "0 50px",
            marginTop: 64,
            minHeight: "calc(100vh - 64px - 24px)",
          }}
        >
          <div style={{ minHeight: 380 }}>{children}</div>
        </AntLayout.Content>
      </Space>
    </AntLayout>
  );
};

export default Layout;
