import React from 'react'
import { Container, Row, Col, Figure } from 'react-bootstrap'

export default function Feature() {
    return (
        <>
            <Container fluid className='pb-5'>

                <Row>
                    <Col md={8} className='m-md-5 px-md-5'>
                        <h2 className=' fw-bold px-2'>Explore a diverse range of art categories at your fingertips.</h2>
                    </Col>
                </Row>
                {/* <div className='p-5 d-flex flex-column align-items-center gap-3'>
                    <h5 className='text-light'>Explore</h5>
                    <h1 className='text-light text-center' style={{ maxWidth: '500px' }}>
                        Discover Art Across Various Categories
                    </h1>
                    <p className='text-light text-center' style={{ maxWidth: '700px' }}>
                        Dive into an extensive collection of art. Whether you're a fan of classic paintings or modern sculptures, we have it for you.
                    </p>
                </div> */}

                {/* Ensure Row is directly inside Container */}
                <Row className='row-cols-1 row-cols-md-2 row-cols-lg-3 px-sm-5 g-4'>
                    <Col>
                        <Figure className='m-sm-3 mx-md-5 my-md-0 border border-dark p-3 h-100 rounded' >
                            <Col className='row gap-3  '>
                                <i class="bi bi-binoculars-fill fs-1"></i>
                                <Figure.Caption className=' fs-3 fw-bold' >Browse by Art <br />Category</Figure.Caption>
                                <Figure.Caption className=' fs-6'>Select from categories like Paintings, Sculptures, and more.</Figure.Caption>
                            </Col>
                        </Figure>
                    </Col>
                    <Col>
                        <Figure className='m-sm-3 mx-md-5 my-md-0 border border-dark p-3 h-100 rounded' >
                            <Col className='row gap-3 '>
                                <i class="bi bi-search-heart-fill fs-1"></i>
                                <Figure.Caption className='fw-bold fs-3'>Search for Your Favourite Art</Figure.Caption>
                                <Figure.Caption className=' fs-6'>Use our search feature to find specific artworks.</Figure.Caption>
                            </Col>

                        </Figure>
                    </Col>
                    <Col>
                        <Figure className='m-sm-3 mx-md-5 my-md-0 border border-dark p-3 h-100 rounded' >
                            <Col className='row gap-3 '>
                                <i class="bi bi-collection-fill fs-1"></i>
                                <Figure.Caption className='fw-bold fs-3'>Create your Personal Art Collection</Figure.Caption>
                                <Figure.Caption className=' fs-6'>Save and curate favourite pieces easily in one place.</Figure.Caption>
                            </Col>
                        </Figure>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
