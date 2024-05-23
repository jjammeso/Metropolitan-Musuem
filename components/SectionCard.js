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

    function handleClick(id){
        router.push(`/artwork/${id}`)
    }

    return (
        <Col>
            <Card onClick={()=>handleClick(data.objectID)} className='fading w-100 h-100' style={{cursor:'pointer'}}>
                <Card.Img variant="top" style={{ objectFit: 'cover' }} src={data.primaryImageSmall||'https://via.placeholder.com/375x375.png?text=[+Not+Available+]'} />
                <Card.Body className='mt-auto'>
                    <Card.Title>{data.title}</Card.Title>
                    <Card.Text>
                        <strong>Artist:</strong> {data?.artistDisplayName?data.artistDisplayName:'N/A'}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}
