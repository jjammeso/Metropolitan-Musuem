import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { useRouter } from "next/router";
import { ListGroup, Button, Card, Container, Row, Col } from "react-bootstrap";
import styles from '@/styles/History.module.css'
import { removeFromHistory } from "@/lib/userData";

export default function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();
  if (!searchHistory) return null;

  let parsedHistory = [];

  searchHistory.forEach(h => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  function historyClicked(e, index) {
    e.preventDefault();

    const destinationUrl = `/artwork?${searchHistory[index]}`;

    router.push(destinationUrl);
  }

  async function removeHistoryClicked(e, index) {
    e.stopPropagation(); //stop the event from trigging other events
    setSearchHistory(await removeFromHistory(searchHistory[index]))
  }


  return (<>
    <Container className="my-4 " >
      <Row className='justify-content-center'>
        <Col xs='auto' md={6} className="d-flex justify-content-center align-items-center">
          {parsedHistory.length > 0 && (
            <ListGroup>
              {parsedHistory.map((historyItem, index) => (
                  <ListGroup.Item key={index} onClick={(e) => historyClicked(e, index)} className={styles.historyListItem}>
                    {" "}
                    {Object.keys(historyItem).map((key) => (
                      <span className="m-2" key={key}>
                        {key}: <strong>{historyItem[key]}</strong>&nbsp;
                      </span>
                    ))}
                    <Button
                      className="float-end rounded-0 fs-3 text-danger"
                      variant="transparent"
                      size="sm"
                      onClick={(e) => removeHistoryClicked(e, index)}
                    >
                      <i class="bi bi-x-circle"></i>
                    </Button>
                  </ListGroup.Item>))}  
            </ListGroup>
          )}
          {parsedHistory.length === 0 && (
            <Row className="d-flex justify-content-center align-items-center" style={{minHeight:'50vh'}}>
              <Col>
              <Card >
              <Card.Body>
                <Card.Text as="div" >
                  <h4>Search History is Empty</h4>
                  {" "}
                </Card.Text>
              </Card.Body>
            </Card>
              </Col>
            </Row>
            )}
        </Col>
      </Row>
    </Container>

  </>)
}