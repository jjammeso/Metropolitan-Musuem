import React from 'react'
import { Col, Container, Row, Button } from 'react-bootstrap'
import Link from 'next/link'
import { useRouter } from 'next/router';

export default function BannerBottom() {
    const router = useRouter();

    return (
        <Container fluid className='px-4 px-md-5 py-4'>
            <Row className='border border-secondary m-md-5 py-4 bg-dark'>
                <Col md={7} className='ms-md-5 text-light'>
                    <p className='fs-1 fw-bold'>Start Your Art Collection Today</p>
                    <p>Sign Up to explore and collect amazing artworks</p>
                </Col>
                <Col md={4} className='d-flex justify-content-md-end my-auto gap-2 pe-4 me-md-4'>
                    <Link href="/register" className='btn rounded-pill btn-warning text-decoration-none fs-5' >Sign Up</Link>
                    <Link href="/login" className='btn rounded-pill btn-light text-decoration-none fs-5' >Login</Link>
                </Col>
            </Row>
        </Container>
    )
}
