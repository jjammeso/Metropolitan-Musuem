import { Container, Spinner } from "react-bootstrap";
import React from 'react'

export default function Loading() {
    return (
        <Container className="w-100 h-100" style={{height:'100vh', width:'100%'}}>
            <Spinner animation="border" role="status" style={{ position: 'absolute', top: '50%', left: '50%' }}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Container>
    )
}
