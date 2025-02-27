import React from 'react'
import { Container, Row, Col, Carousel, Image } from 'react-bootstrap'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Banner() {
    const router = useRouter()
    return (
        <Container fluid className='px-md-5 my-5 ' >
            <Row className='row-cols-1 row-cols-md-2 h-100 px-md-5 gap-0'>
                <Col className='p-3 py-4 p-md-5 d-flex flex-column justify-content-center gap-3 bg-dark text-light'>
                    <h1 className='fw-bold'>Explore a World of Art</h1>
                    <p className=''>Dive into a rich tapestry of artistic expression spanning centuries and cultures. Browse through thousands of artworks meticulously curated from the Metropolitan Museum of Art&apos;s extensive collection.</p>
                    <Link href="/register" className='btn rounded-pill btn-warning text-decoration-none fs-4'>Sign Up</Link>
                </Col>
                <Col className=' m-0 p-0 overflow-hidden' style={{maxHeight:'60vh'}}>
                    <Carousel pause={false} controls={false} className='m-0 p-0'>
                        <Carousel.Item>
                            <Image alt='' src='a.jpg' fluid style={{ width: '100%', objectFit: 'cover', height:'100%' }} />
                            <Carousel.Caption>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Image alt='' src='b.jpg' fluid style={{ width: '100%', objectFit: 'cover' }} />
                            <Carousel.Caption>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Image alt='' src='c.jpg' fluid style={{ width: '100%', objectFit: 'cover' }} />
                            <Carousel.Caption>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Col>
            </Row>
        </Container>
    )
}
