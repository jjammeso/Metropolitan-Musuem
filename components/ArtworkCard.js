import useSWR from "swr"
import { Button, Card, Container } from "react-bootstrap";
import Link from "next/link";
import Error from "next/error";
import Loading from "./Loading";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ArtworkCard({ objectID }) {
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`, fetcher);
    if (error) return <Error statusCode={404} />
    if (!data) return <Loading/>;


    return (
        <Card className="w-100 h-100">
            <Container className="mt-2">
            <Card.Img 
                variant="top"
                src={
                    data.primaryImageSmall ||
                    'https://via.placeholder.com/375x375.png?text=[+Not+Available+]'
                }
                
            />
            </Container>
            
            <Card.Body style={{ height:'45%'}}>
                <Card.Title>{data.title || 'N/A'}</Card.Title>
                <Card.Text >
                    <strong>Date: </strong>{data.objectDate || 'N/A'}<br/>
                    <strong>Classification: </strong>{data.classification || 'N/A'}{' '}<br/>
                    <strong>Medium: </strong>{data.medium || 'N/A'}
                </Card.Text>
                <Link href={`/artwork/${data.objectID}`} passHref >
                    <Button variant="warning">View More Details</Button>
                </Link>
            </Card.Body>
        </Card>

    )
}