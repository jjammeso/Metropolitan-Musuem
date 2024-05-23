import { Spinner, Container } from "react-bootstrap";
import React from 'react'

export default function Loading() {
    return (
        <Container className="w-100" style={{position:'relative', height:'100vh'}}>
            <Spinner animation="border" role="status" style={{ position:'absolute', top: '50%', left: '50%' }}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Container>
    )
}
