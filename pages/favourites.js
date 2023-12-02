import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Row, Card, Col } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";

export default function Favourites(){
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

    if(!favouritesList) return null;

    return (
        <>
        {favouritesList !== null ? (
          <Row className="gy-4">
            {favouritesList.length > 0 ? (
              favouritesList.map((currentObjectID) => (
                <Col lg={3} key={currentObjectID}>
                  <ArtworkCard objectID={currentObjectID} />
                </Col>
              ))
            ) : (
              <Card>
                <Card.Body>
                    <Card.Text as="div">
                    <h4>Nothing Here</h4>
                    Try adding some new artwork to the list.{" "}
                    </Card.Text>
                </Card.Body>
              </Card>
            )}
          </Row>
        ) : null}
      </>
      )
}