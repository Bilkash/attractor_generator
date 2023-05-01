import React from "react";
import { Layout, Space } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";

import { Canvas } from "../../components";

export default function MainPage () {

	return (
		<Space>
			<Layout>
				<Sider style={siderStyle}>Sider</Sider>
				<Layout>
					<Content style={contentStyle}>
						<Canvas/>
					</Content>
				</Layout>
			</Layout>
		</Space>
	);
}

const contentStyle: React.CSSProperties = {
	textAlign: "center",
	lineHeight: "120px",
	backgroundColor: "#108ee9",
	height: "100vh",
	width: "100%"
};

const siderStyle: React.CSSProperties = {
	textAlign: "center",
	lineHeight: "120px",
	backgroundColor: "#3ba0e9",
};
