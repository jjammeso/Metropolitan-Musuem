import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { removeToken, readToken } from '@/lib/authenticate';


export default function MainNav() {
  const router = useRouter()
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  let token = readToken();

  function changeExpanded() {
    setIsExpanded(!isExpanded);
  }

  function handleNavLink() {
    setIsExpanded(false);
  }

  function logout() {
    setIsExpanded(false);
    removeToken();
    router.push('/');
  }


  return (<>

    <Navbar expanded={isExpanded} expand="lg" className="fixed-top navbar-dark bg-dark navbar flex-column" >
      <Container className='p-0 m-0'>
        <Navbar.Toggle aria-controls="navbarScroll" onClick={changeExpanded} />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link href="/" passHref legacyBehavior><Nav.Link onClick={handleNavLink} active={router.pathname === "/"}>Home</Nav.Link></Link>
            <Link href="/search" passHref legacyBehavior><Nav.Link onClick={handleNavLink} active={router.pathname === "/search"}>Categories</Nav.Link></Link>
            <Link href="/search" passHref legacyBehavior><Nav.Link onClick={handleNavLink} active={router.pathname === "/search"}>Advanced Search</Nav.Link></Link>
            <Link href="/search" passHref legacyBehavior><Nav.Link onClick={handleNavLink} active={router.pathname === "/search"}>About</Nav.Link></Link>
            <Link href="/search" passHref legacyBehavior><Nav.Link onClick={handleNavLink} active={router.pathname === "/search"}>API Link</Nav.Link></Link>
          </Nav>

          <Nav>
            {token &&
              <NavDropdown title={token.userName} id="basic-nav-dropdown" active={router.pathname === "/favourites" || router.pathname === "/history"}>
                <Link href="/favourites" passHref legacyBehavior>
                  <NavDropdown.Item onClick={handleNavLink} active={router.pathname === "/favourites"}>My Collection</NavDropdown.Item>
                </Link>
                <Link href="/history" passHref legacyBehavior>
                  <NavDropdown.Item onClick={handleNavLink} active={router.pathname === "/history"}>Search History</NavDropdown.Item>
                </Link>
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            }
            {!token && <>
            <Container className='d-flex column-gap-4'>
              <Button className='btn btn-warning fw-bold rounded-pill' ><Link href="/register" passHref legacyBehavior ><Nav.Link className='text-dark' onClick={handleNavLink} active={router.pathname === "/register"}>Register</Nav.Link></Link>
              </Button>

              <Button className='btn btn-light fw-bold rounded-pill' >
                <Link href="/login" passHref legacyBehavior><Nav.Link className='text-dark' onClick={handleNavLink} active={router.pathname === "/login"}>Login</Nav.Link></Link>
              </Button>
            </Container></>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar></>
  );
}

