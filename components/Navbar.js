import {Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link';
import { useTheme } from 'providers/ThemeProvider';
import ThemeToggle from "components/ThemeToggle";

const BlogNavbar = () => {
  const { theme, toggleTheme } = useTheme();

    return ( 
        <Navbar className="fj-navbar fj-nav-base" bg="transparent" expand="lg">
        <Navbar.Brand className="fj-navbar-brand">
          <Link href='/'>
          <a style={{color: theme.fontColor}}>HESHA</a>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <ThemeToggle onChange={toggleTheme} />
            <Nav.Link as={()=> (<Link href='/'>
                <a className="fj-navbar-item fj-navbar-link">Home</a>
              </Link>)}>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
     );
}
 
export default BlogNavbar;