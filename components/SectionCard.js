import React from 'react'
import { Col, Card } from 'react-bootstrap';
import useSWR from 'swr';
import Loading from '@/components/Loading';
import Error from 'next/error';
import { useRouter } from 'next/router';

const fetcher = (url) => fetch(url).then((res) => res.json());


export default function SectionCard({ objectID }) {
    const router = useRouter()
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`, fetcher);
    if (error) return <Error statusCode={404} />
    if (!data) return null;

    function handleClick(id) {
        router.push(`/artwork/${id}`)
    }

    

    return (
        <Col>
            <Card
                
                className="w-100 h-100"
                style={{
                    maxWidth: '350px',  // Fixed width for all cards
                    maxHeight: '420px', // Fixed height for all cards
                    overflow: 'hidden'
                }}
            >
                <Card.Img
                    variant="top"
                    src={data.primaryImageSmall || 'noimage.jpg'}
                    style={{
                        height: '70%',  // Image covers 60% of the card height
                        width: '100%',
                        objectFit: 'cover'
                    }}
                />
                <Card.Body style={{ height: '35%', overflowY: 'hidden' }}>
                    <Card.Title className='my-0' style={{ fontSize: '1.3rem', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {data.title || 'N/A'}
                    </Card.Title>
                    <Card.Text style={{ fontSize: '0.9rem' }}>
                        <strong>Artist:</strong> {data?.artistDisplayName || 'N/A'}<br/>
                        <strong>Classification: </strong>{data.classification || 'N/A'}<br />
                    </Card.Text>
                    <button className='fading rounded-pill bg-dark text-light px-3 py-1' onClick={() => handleClick(data.objectID)}>View</button>
                </Card.Body>
            </Card>
        </Col>

    )
}
