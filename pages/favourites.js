import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Row, Card, Col, Container } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";
import SearchBar from "@/components/SearchBar";

export default function Favourites() {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  if (!favouritesList) return null;

  return (
    <>
      <Container className=" my-4">
        <Row className="my-5">
          <Col sm={12} md={6}><p className="fs-1 fw-bold">My <span className="text-primary">Favourites</span></p></Col>
           <Col className="m-auto" style={{maxWidth:'600px'}}>
          <SearchBar />
          </Col>
        </Row>
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