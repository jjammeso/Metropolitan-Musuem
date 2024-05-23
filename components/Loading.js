import { Spinner } from "react-bootstrap";
import React from 'react'

export default function Loading() {
    return (
        <Spinner animation="border" role="status" style={{position:'absolute', top: '50%', left:'50%'}}>
            <span className="visually-hidden">Loading...</span>
        </Spinner>)
}
