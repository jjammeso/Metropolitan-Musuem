import React from 'react'
import { Container, Row, Col, Figure } from 'react-bootstrap'

export default function Feature() {
    return (
        <>
            <Container fluid className='pb-5 text-light bg-dark'>
                <Row className=''>
                    <Col md={8} className='my-3 m-md-5 px-md-5'>
                        <h2 className=' fw-bold px-2'>Explore a diverse range of art categories at your fingertips.</h2>
                    </Col>
                </Row>

                {/* Ensure Row is directly inside Container */}
                <Row className='row-cols-1 row-cols-md-2 row-cols-lg-3 px-sm-5 g-md-0 g-3'>
                    <Col>
                        <Figure className='m-sm-3 mx-md-5 my-md-0 border border-dark p-3 h-100 rounded' >
                            <Col className='row gap-3 '>
                                <i class="bi bi-binoculars-fill fs-1"></i>
                                <Figure.Caption className=' fs-3 text-light' >Browse by Art <br />Category</Figure.Caption>
                                <Figure.Caption className=' fs-6 text-light'>Select from categories like Paintings, Sculptures, and more.</Figure.Caption>
                            </Col>
                        </Figure>
                    </Col>
                    <Col>
                        <Figure className='m-sm-3 mx-md-5 my-md-0 border border-dark p-3 h-100 rounded' >
                            <Col className='row gap-3 '>
                                <i class="bi bi-search-heart-fill fs-1"></i>
                                <Figure.Caption className=' fs-3 text-light'>Search for Your Favourite Art</Figure.Caption>
                                <Figure.Caption className=' fs-6 text-light'>Use our search feature to find specific artworks.</Figure.Caption>
                            </Col>

                        </Figure>
                    </Col>
                    <Col>
                        <Figure className='m-sm-3 mx-md-5 my-md-0 border border-dark p-3 h-100 rounded' >
                            <Col className='row gap-3 '>
                                <i class="bi bi-collection-fill fs-1"></i>
                                <Figure.Caption className=' fs-3 text-light'>Create your Personal Art Collection</Figure.Caption>
                                <Figure.Caption className=' fs-6 text-light'>Save and curate favourite pieces easily in one place.</Figure.Caption>
                            </Col>
                        </Figure>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
