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
import departmentList from '@/public/data/departmentList.json'

export default function MainNav() {
  const router = useRouter()
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  let token = readToken();
  const departments = departmentList.departments

  function changeExpanded() {
    setIsExpanded(!isExpanded);
  }

  function handleNavLink() {
    setIsExpanded(false);
  }

  function handleClick(id) {
    router.push(`/artwork?departmentId=${id}&hasImages=true&q=good`)
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
            <Link href="/about" passHref legacyBehavior><Nav.Link onClick={handleNavLink} active={router.pathname === "/about"}>About</Nav.Link></Link>
            <Link href="https://metmuseum.github.io/" passHref legacyBehavior><Nav.Link onClick={handleNavLink}>API Link</Nav.Link></Link>
            <NavDropdown title="Departments" id="nav-dropdown">
              <Container className='overflow-scroll' style={{ height: '50vh' }}>

                {departments.map((dept, index) => {
                  return (
                    <NavDropdown.Item className='bg-light text-dark' onClick={() => handleClick(dept.departmentID)} active={router.pathname === "/favourites"}>{dept.department}</NavDropdown.Item>
                  )
                })}
              </Container>

            </NavDropdown>
          </Nav>

          <Nav>
            {token &&
              <NavDropdown title={token.userName} className='border border-light mx-3 px-2 rounded-pill' id="basic-nav-dropdown" active={router.pathname === "/favourites" || router.pathname === "/history"}>
                <Link href="/favourites" passHref legacyBehavior>
                  <NavDropdown.Item onClick={handleNavLink} active={router.pathname === "/favourites"}>Favourites</NavDropdown.Item>
                </Link>
                <Link href="/history" passHref legacyBehavior>
                  <NavDropdown.Item onClick={handleNavLink} active={router.pathname === "/history"}>Search History</NavDropdown.Item>
                </Link>
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            }
            {!token && <>
              <Container className='d-flex column-gap-4 align-items-center py-1'>
                <Button className='btn btn-warning fw-bold py-0 rounded-pill' ><Link href="/register" passHref legacyBehavior ><Nav.Link className='text-dark' onClick={handleNavLink} active={router.pathname === "/register"}>Sign Up</Nav.Link></Link>
                </Button>

                <Button className='btn btn-light fw-bold py-0 rounded-pill' >
                  <Link href="/login" passHref legacyBehavior><Nav.Link className='text-dark' onClick={handleNavLink} active={router.pathname === "/login"}>Login</Nav.Link></Link>
                </Button>
              </Container></>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar></>
  );
}

