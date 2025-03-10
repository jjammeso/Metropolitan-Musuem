import React from 'react'
import { Container, Row, Col, Nav } from 'react-bootstrap'
import Link from 'next/link'

export default function Footer() {
  return (
    <Container fluid className='p-0 m-0 bg-dark text-secondary' >
      <Row className='text-center fst-italic fs-5 pt-5 m-0'>
        <p>&quot;This Website is powered by the Metropolitan Museum of Art&apos;s API.&quot;</p>
      </Row>
      <Row className='p-md-4 m-md-4 m-3 pb-md-0'>
        <Col md={4}>
          <h4>About</h4>
          <p>This website is a platform for exploring and curating artworks from the Metropolitan Museum of Art API. It allows users to browse a vast collection, find detailed information about each piece, and create an account to save their favorite artworks.</p>
        </Col>
        <Col md={4}>
          <h4>LINKS</h4>          
          <Link  href="https://metmuseum.github.io/#search" passHref legacyBehavior><Nav.Link>API link: https://metmuseum.github.io/#search</Nav.Link></Link><br/>
        </Col>
        <Col md={{span:'3', offset:'1'}} >
          <h4>CONTACT</h4>
          <p><i className="bi bi-geo-alt-fill"></i>&nbsp;Toronto, ON, Canada</p>
          <p><i className="bi bi-envelope-at-fill"></i>&nbsp;sjjamtsho@gmail.com</p>
        </Col>
      </Row>
      <Row className='p-4 m-0 pb-0 justify-content-center'>
          <p className='text-center'><i className="bi bi-c-circle"></i> 2024 Copyright:Sonam Jamtsho</p>
      </Row>
    </Container>
  )
}
