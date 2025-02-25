import { Button, Card, Container, Row, Col } from "react-bootstrap";
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
      setShowAdded(favouritesList?.includes(objectID))
    }
  }, [favouritesList])

  if (error) return <Error statusCode={404} />
  if (!data) return <Loading />;
  console.log(data);

  const primaryImage = data.primaryImage && data.primaryImage.trim() !== "" ? data.primaryImage : '/noimage.jpg';
  const artistDisplayName = data.artistDisplayName || 'N/A';
  const creditLine = data.creditLine || 'N/A';
  const dimensions = data.dimensions || 'N/A';
  const artistWikidataURL = data.artistWikidata_URL;
  const repository = data.repository;

  return (
    <Container className="my-4">
      <Card className="py-1 px-md-32" >
        <Card.Title className="fs-1 m-2 fw-bold p-2">{data.title || 'N/A'}</Card.Title>

        <Card.Img className="my-3 rounded-0" variant="top" src={primaryImage} style={{ maxHeight: '80vh', objectFit: 'contain' }} />
        <Card.Body>
          <Card.Text>
            {data.objectDate && (
              <>
                <Row className="px-md-3 py-1">
                  <Col sm={4} className="fw-bold">Date</Col>
                  <Col sm={8}>{data.objectDate}</Col>
                </Row>
              </>
            )}
            {data.classification && (
              <>
                <Row className="px-md-3 py-1">
                  <Col sm={4} className="fw-bold">Classification</Col>
                  <Col sm={8}>{data.classification}</Col>
                </Row>
              </>
            )}
            {data.medium && (
              <>
                <Row className="px-md-3 py-1">
                  <Col sm={4} className="fw-bold">Medium</Col>
                  <Col sm={8}>{data.medium}</Col>
                </Row>
              </>
            )}
            <Row className="px-md-3 py-1">
              <Col sm={4} className="fw-bold">Artist</Col>
              <Col sm={8}>{artistDisplayName}</Col>
            </Row>
            <Row className="px-md-3 py-1">
              {artistWikidataURL && (
                <a
                  href={artistWikidataURL}
                  target="_blank"
                  rel="noreferrer"
                  style={{ marginLeft: '5px' }}
                >
                  Wikidata URL
                </a>
              )}
            </Row>
            <Row className="px-md-3 py-1">
              <Col sm={4} className="fw-bold">Credit Line</Col>
              <Col sm={8}>{creditLine}</Col>
            </Row>
            <Row className="px-md-3 py-1">
              <Col sm={4} className="fw-bold">Dimensions</Col>
              <Col sm={8}>{dimensions}</Col>
            </Row>
            {repository && (
              <>
                <Row className="px-md-3 py-1">
                  <Col sm={4} className="fw-bold">Repository</Col>
                  <Col sm={8}>{repository}</Col>
                </Row>
              </>
            )}
          </Card.Text>
          <Row className="px-md-3 py-1">
            <Col onClick={favouritesClicked}>
              <Button
                className="fw-bold"
                variant={showAdded ? "outline-danger" : "warning"}
              >
                {showAdded ? "Remove from My Favourites" : "Add to My Favourites"}
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  )
}