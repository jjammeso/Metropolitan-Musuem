import useSWR from "swr"
import { Button, Card, Container } from "react-bootstrap";
import Link from "next/link";
import Error from "next/error";
import Loading from "./Loading";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { useState, useEffect } from "react";
import { readToken } from "@/lib/authenticate";
import { addToFavourites, removeFromFavourites } from "@/lib/userData";


const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ArtworkCard({ objectID }) {
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`, fetcher);
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom)
    const [showAdded, setShowAdded] = useState(false);
    let token = readToken()

    console.log('here is list', favouritesList)

    async function favouritesClicked() {
        console.log('here is 1', showAdded)
        if (token) {
            if (showAdded) {
                setFavouritesList(await removeFromFavourites(objectID));
                setShowAdded(false);
                console.log('here is 2', showAdded)

            } else {
                setFavouritesList(await addToFavourites(objectID));
                setShowAdded(true);
                console.log('here is 3', showAdded)

            }
        } else {
            alert('Login to add to Your Collection')
        }
    }

    useEffect(() => {
        if (token) {
            setShowAdded(favouritesList?.includes(objectID.toString()))
        }
    }, [favouritesList])


    if (error) return <Error statusCode={404} />
    if (!data) return <Loading />;


    return (
        <Card className="w-100 h-100" style={{ maxHeight: '440px' }}>
            <Container className="p-0" style={{ height: '65%', overflow: 'hidden' }}>
                <Card.Img
                    variant="top"
                    src={
                        data.primaryImageSmall || 'noimage.jpg'
                    }
                    style={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'cover'
                    }}
                />
            </Container>

            <Card.Body style={{ height: '40%', overflowY: 'hidden' }}>
                <Card.Title style={{ fontSize: '1.3rem', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {data.title || 'N/A'}
                </Card.Title>
                <Card.Text style={{ fontSize: '0.9rem' }}>
                    <strong>Date: </strong>{data.objectDate || 'N/A'}<br />
                    <strong>Classification: </strong>{data.classification || 'N/A'}<br />
                </Card.Text>
                <Link href={`/artwork/${data.objectID}`} passHref>
                    <Button variant="warning">View More Details</Button>
                </Link>
                {token && (
                        <Button onClick={favouritesClicked} className=" border-0 bg-transparent text-danger fs-3">
                            {<i className={showAdded ? "bi bi-heart-fill" : "bi bi-heart"}></i>}
                        </Button>
                )}

            </Card.Body >
        </Card >
    )
}