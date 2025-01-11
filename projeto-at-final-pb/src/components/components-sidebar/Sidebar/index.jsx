import React from "react";
import { Container, Content } from "./styles";
import { FaTimes, FaHome, FaRegSun, FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import SidebarItem from "../SidebarItem";

const Sidebar = ({ active }) => {
  const closeSidebar = () => {
    active(false);
  };

  return (
    <Container sidebar={active}>
      <FaTimes onClick={closeSidebar} />
      <Content>
        <Link to="/home" onClick={closeSidebar}>
          <SidebarItem Icon={FaHome} Text="Início" />
        </Link>
        <Link to="/user" onClick={closeSidebar}>
          <SidebarItem Icon={FaUserAlt} Text="Usuário" />
        </Link>
        <Link to="/settings" onClick={closeSidebar}>
          <SidebarItem Icon={FaRegSun} Text="Configurações" />
        </Link>
      </Content>
    </Container>
  );
};

export default Sidebar;
