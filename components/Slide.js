import React from 'react'
import { Carousel, Container, Image, Form, Button, Row, Col } from 'react-bootstrap'
import { Sansita } from 'next/font/google'
import SearchBar from './SearchBar'

const sansita = Sansita({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export default function Slide() {

  return (
    <>
      <Container fluid className='text-center p-md-5 pb-md-0 m-0 d-grid gap-1'>
        <Row className='justify-content-sm-center pt-4 pt-md-0'>
          <Col xs={11} sm={8} md={6} lg={5}>
            <h1 className='fw-bold'>Discover the Art of the Metropolitan museum</h1>
          </Col>
        </Row>
        <Row className='justify-content-sm-center'>
          <Col className='' sm={10} md={7}>
            <p>Explore a vast collection of art from the Metropolitan Museum through our intuitive platform. Create an account to curate your favourite pieces and dive into the world of art like never before.</p>
          </Col>
        </Row>
        <Row className='justify-content-sm-center'>
          <Col className='' style={{minWidth:'300px', maxWidth:'600px'}} sm={8} md={6}>
           <SearchBar/>
          </Col>
        </Row>
        <Row className='p-md-5  d-flex justify-content-center'>
          <Col xs={12} md={4} className='p-md-3 py-3 d-none d-md-block'>
            <Image alt='' fluid className='px-3' src='image (3).jpg' style={{ width: '100%', height: '350px', objectFit: 'cover' }}></Image>
          </Col>
          <Col xs={12} md={4} className='p-md-3 py-3'>
            <Image alt='' fluid className='px-3' src='image (10).jpg' style={{ width: '100%', height: '350px', objectFit: 'cover' }}></Image>
          </Col>
          <Col xs={12} md={4} className='p-md-3 py-3 d-none d-md-block'>
            <Image alt='' fluid className='px-3' src='image (7).jpg' style={{ width: '100%', height: '350px', objectFit: 'cover' }}></Image>
          </Col>
        </Row>

      </Container>
    </>
  )
}
