import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import PokemonList from "./components/PokemonList";
import PokemonDetail from "./components/PokemonDetail";
import { Layout, Menu, Typography } from "antd";
import "./App.css";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh", background: "-webkit-linear-gradient(45deg, #900069d9, #b378ace1, #fff 100%)" }}>
        <Header style={{ background: "#00aaff", padding: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "0 20px",
            }}
          >
            <Title style={{ color: "#fff", margin: 0 }} level={2}>
              <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                PokéApp
              </Link>
            </Title>
            <Menu
              className="custom-header-menu"
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["1"]}
              style={{ background: "transparent", color: "#fff" }}
            >
              <Menu.Item key="1" style={{ color: "#fff" }}>
                <Link to="/">Home</Link>
              </Menu.Item>
            </Menu>
          </div>
        </Header>
        <Content
          style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}
        >
          <Switch>
            <Route exact path="/" component={PokemonList} />
            <Route path="/pokemon/:id" component={PokemonDetail} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: "center", background: "#00aaff", color: "#fff" }}>
          PokéApp ©2023 Created by ABDOTECH
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;
