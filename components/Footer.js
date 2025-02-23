import React from 'react'
import { Container, Row, Col, Nav } from 'react-bootstrap'
import Link from 'next/link'

export default function Footer() {
  return (
    <Container fluid className='p-0 m-0 bg-dark text-secondary' >
      <Row className='text-center fst-italic fs-5 pt-5 m-0'>
        <p>"This Website is powered by the Metropolitan Museum of Art's API."</p>
      </Row>
      <Row className='p-4 m-4 pb-0'>
        <Col md={4}>
          <h4>About</h4><br />
          <p>This website is a platform for exploring and curating artworks from the Metropolitan Museum of Art API. It allows users to browse a vast collection, find detailed information about each piece, and create an account to save their favorite artworks.</p>
        </Col>
        <Col md={4}>
          <h4>LINKS</h4><br />
          
          <Link  href="https://metmuseum.github.io/#search" passHref legacyBehavior><Nav.Link>API link: https://metmuseum.github.io/#search</Nav.Link></Link>
        </Col>
        <Col md={{span:'3', offset:'1'}} >
          <h4>CONTACT</h4><br />
          <p><i className="bi bi-geo-alt-fill"></i>&nbsp;Address, City, Country</p>
          <p><i className="bi bi-mailbox2"></i>&nbsp;XXX XXX</p>
          <p><i className="bi bi-envelope-at-fill"></i>&nbsp;example@gmail.com</p>
          <p><i className="bi bi-person-lines-fill"></i>&nbsp;+0 000 000 000</p>
        </Col>
      </Row>
      <Row className='p-4 m-0 pb-0 justify-content-center'>
          <p className='text-center'><i className="bi bi-c-circle"></i> 2024 Copyright:Sonam Jamtsho</p>
      </Row>
    </Container>
  )
}
