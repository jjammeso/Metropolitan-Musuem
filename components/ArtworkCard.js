import useSWR from "swr"
import { Button, Card } from "react-bootstrap";
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


    async function favouritesClicked() {
        if (token) {
            if (showAdded) {
                setFavouritesList(await removeFromFavourites(objectID));
                setShowAdded(false);

            } else {
                setFavouritesList(await addToFavourites(objectID));
                setShowAdded(true);

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
        <Card className="w-100 h-100 rounded-0" style={{ maxHeight: '440px' }}>
            <Card.Img
                className="rounded-0"
                variant="top"
                src={
                    data.primaryImageSmall ? data.primaryImageSmall : 'noimage.jpg'
                }
                style={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover'
                }}
            />
            <Card.Body>
                <Card.Title className="fs-5 py-1" style={{ whiteSpace: 'nowrap', overflowX: 'hidden', textOverflow: 'ellipsis' }}>
                    {data.title || 'N/A'}
                </Card.Title>
                <Card.Text className="fs-6 bg-transparent">
                    <strong>Date: </strong>{data.objectDate || 'N/A'}<br />
                    <strong>Classification: </strong>{data.classification || 'N/A'}
                </Card.Text>
                <Card.Link href={`/artwork/${data.objectID}`}><Button variant="warning">View More Details</Button></Card.Link>&nbsp;
                {token && (
                    <Button onClick={favouritesClicked} className=" border-0 bg-transparent text-danger fs-1">
                        {<i className={showAdded ? "bi bi-heart-fill" : "bi bi-heart"}></i>}
                    </Button>
                )}
            </Card.Body >
        </Card >
    )
}