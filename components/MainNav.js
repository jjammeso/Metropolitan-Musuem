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
import { addToHistory } from '@/lib/userData';
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

  const submitForm = async (e) => {
    e.preventDefault();
    changeExpanded();
    const searchField = e.target.elements.search.value;
    console.log(searchField)
    if (token) {
      setSearchHistory(await addToHistory(`title=true&q=${searchField}`))
    }
    router.push(`/artwork?title=true&q=${searchField}`)
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
            <Link href="/search" passHref legacyBehavior><Nav.Link onClick={handleNavLink} active={router.pathname === "/search"}>Advanced Search</Nav.Link></Link>
          </Nav>
          <Nav className="me-auto my-2 my-lg-0">
          <Form className="d-flex" onSubmit={submitForm}>
            <Form.Control
              type="search"
              name="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button type="submit" variant="success"><i className="bi bi-search"></i></Button>
          </Form>&nbsp;
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
            {!token && <><Link href="/register" passHref legacyBehavior><Nav.Link onClick={handleNavLink} active={router.pathname === "/register"}>Register</Nav.Link></Link>
              <Link href="/login" passHref legacyBehavior><Nav.Link onClick={handleNavLink} active={router.pathname === "/login"}>Login</Nav.Link></Link></>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar></>
  );
}