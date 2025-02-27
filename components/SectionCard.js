import React, { useState } from 'react'
import { Col, Card, Row, Container, Button } from 'react-bootstrap';
import useSWR from 'swr';
import Loading from '@/components/Loading';
import Error from 'next/error';
import { useRouter } from 'next/router';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function SectionCard({ objectID }) {
    const router = useRouter()
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`, fetcher);
    const [isHovered, setIsHovered] = useState(false);

    const hoverStyle = {
        opacity: isHovered? 1:0,
        transition: "transform 0.4s ease-in-out, opacity 0.3s ease-in-out",
        transform: isHovered ? "translateY(0%)" : "translateY(30%)",
        top:'45%', left:'40%',
    }

    const containerStyle = {
        backgroundColor: isHovered? "rgba(0, 0, 0, 0.5)":'transparent', // Semi-transparent overlay
        height: '85%',
        transition: "all 0.4s ease-in-out",
        maxWidth: '400px',
    }


    if (error) return <Error statusCode={404} />

    function handleClick(id) {
        router.push(`/artwork/${id}`)
    }

    return (
        <Container className='position-relative m-0 p-0' style={{
            width: '350px', 
            height: '320px', 
            overflow: 'hidden',
        }} onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}>
            <Card
                className="h-100 border-0 m-0 p-0 rounded-0 bg-transparent"
            >
                <Card.Img
                    variant="top"
                    className='m-0 p-0 rounded-0'
                    src={data?.primaryImageSmall || 'noimage.jpg'}
                    style={{
                        height: '85%',  
                        width: '100%',
                        objectFit: 'cover'
                    }}
                />
                <Card.Body className='bg-transparent px-0'  style={{ height: '15%', overflowY: 'hidden' }}>
                    <Card.Title className='my-0' style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {data?.title || 'N/A'}
                    </Card.Title>
                </Card.Body>
            </Card>
            <Container className='w-100 position-absolute top-0 start-0' style={containerStyle}>
                <Button variant='light' className='rounded-pill px-3 py-1 position-relative' style={hoverStyle} onClick={() => handleClick(data.objectID)}>View</Button>
            </Container>
        </Container>

    )
}
