import React from 'react';
import { Navbar, NavItem, Dropdown, Icon } from 'react-materialize';

function Menu() {
    return (
        <Navbar
        alignLinks="right"
        className="menu-app"
        brand={<a className="brand-logo" href="/">Task manager <Icon>local_activity</Icon></a>}
        id="mobile-nav"
        menuIcon={<Icon>menu</Icon>}
        options={{
          draggable: true,
          edge: 'left',
          inDuration: 250,
          onCloseEnd: null,
          onCloseStart: null,
          onOpenEnd: null,
          onOpenStart: null,
          outDuration: 200,
          preventScrolling: true
        }}
      >
        <NavItem href="/projects">
          <Icon left>business_center</Icon> PROYECTOS
        </NavItem>
        <Dropdown
          id="Dropdown_6"
          options={{
            alignment: 'left',
            autoTrigger: true,
            closeOnClick: false,
            constrainWidth: false,
            container: null,
            coverTrigger: true,
            hover: true,
            edge: 'left',
            draggable: true,
            inDuration: 150,
            onCloseEnd: null,
            onCloseStart: null,
            onOpenEnd: null,
            onOpenStart: null,
            outDuration: 250
          }}
          trigger={<a href="#!">MI CUENTA{' '}<Icon right>arrow_drop_down</Icon></a>}
        >
          <a href="/account">
            <Icon>account_circle</Icon>MIS DATOS
          </a>
          <a href="/logout">
            <Icon>power_settings_new</Icon> SALIR
          </a>
        </Dropdown>
      </Navbar>
    );
}

export default Menu;