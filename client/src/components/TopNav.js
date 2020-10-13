import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

const TopNav = () => {
    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);

    const logoutHandler = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("user_id");
    }

    return (
        <div>
        <Navbar color="faded" light>
            {/* <NavbarBrand href="/" className="mr-auto">reactstrap</NavbarBrand> */}
            <NavbarToggler onClick={toggleNavbar} />
            <Link to="/login" onClick={logoutHandler}>Logout</Link>
            <Collapse isOpen={!collapsed} navbar>
            <Nav navbar>
                <NavItem>
                    <Link to="/events">Create Event</Link>
                </NavItem>
                <NavItem>
                    <Link to="/">Dashboard</Link>
                </NavItem>
            </Nav>
            </Collapse>
        </Navbar>
        </div>
    );
}

export default TopNav;