import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Row, Card, Col, Container } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";

export default function Favourites() {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  if (!favouritesList) return null;

  return (
    <>
      <Container className="mt-4">
        {favouritesList !== null ? (
          <Row className="gy-4">
            {favouritesList.length > 0 ? (
              favouritesList.map((currentObjectID) => (
                <Col lg={3} key={currentObjectID}>
                  <ArtworkCard objectID={currentObjectID} />
                </Col>
              ))
            ) : (
              <Card className="w-100" style={{height:'60vh', display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Card.Body className="d-flex justify-content-cetter align-items-center">
                  <Card.Text as="div" className="text-center">
                    <h4>Your Art Collection is Empty</h4>
                    Browse and Start Collecting Arts{" "}
                  </Card.Text>
                </Card.Body>
              </Card>
            )}
          </Row>
        ) : null}
      </Container>

    </>
  )
}