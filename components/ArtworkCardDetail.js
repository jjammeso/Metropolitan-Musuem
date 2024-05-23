import { Button, Card, Container} from "react-bootstrap";
import useSWR from "swr";
import Error from "next/error";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { useState } from "react";
import { addToFavourites, removeFromFavourites } from "@/lib/userData";
import { useEffect } from "react";
import { removeToken, readToken } from '@/lib/authenticate';
import { useRouter } from "next/router";
import Loading from '@/components/Loading';



const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ArtworkCardDetail({ objectID }) {
  const { data, error } = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null, fetcher);
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom)
  const [showAdded, setShowAdded] = useState(false);
  let token = readToken()
  const router = useRouter()


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
    setShowAdded(favouritesList?.includes(objectID))
  }, [favouritesList])

  if (error) return <Error statusCode={404} />
  if (!data) return <Loading />;

  const primaryImage = data.primaryImage;
  const artistDisplayName = data.artistDisplayName || 'N/A';
  const creditLine = data.creditLine || 'N/A';
  const dimensions = data.dimensions || 'N/A';
  const artistWikidataURL = data.artistWikidata_URL;

  return (
    <Container className="mt-4">

      <Card style={{ width: 'auto' }}>
        {primaryImage && (
          <Card.Img variant="top" src={primaryImage} alt="Artwork" />
        )}
        <Card.Body>
          <Card.Title>{data.title || 'N/A'}</Card.Title>
          <Card.Text>
            {data.objectDate && (
              <>
                <strong>Date:</strong> {data.objectDate}
                <br />
              </>
            )}
            {data.classification && (
              <>
                <strong>Classification:</strong> {data.classification}
                <br />
              </>
            )}
            {data.medium && (
              <>
                <strong>Medium:</strong> {data.medium}
                <br />
                <br />
              </>
            )}
            <strong>Artist:</strong> {artistDisplayName}
            {artistWikidataURL && (
              <a
                href={artistWikidataURL}
                target="_blank"
                rel="noreferrer"
                style={{ marginLeft: '5px' }}
              >
                wiki
              </a>
            )}
            <br />
            <strong>Credit Line:</strong> {creditLine}<br />
            <strong>Dimensions:</strong> {dimensions}
          </Card.Text>
          <Container onClick={favouritesClicked}>
          <Button
          className="fw-bold"
            variant={showAdded ? "primary" : "outline-primary"}
          >
            {showAdded ? "Remove from My Collection" : "Add to My Collection"}
          </Button>
          </Container>
          
        </Card.Body>
      </Card>
    </Container>
  )
}