import { Card, Form, Alert, Button, Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { authenticateUser } from '@/lib/authenticate';
import { useRouter } from 'next/router';
import { favouritesAtom, searchHistoryAtom } from '@/store';
import { getFavourites, getHistory } from '@/lib/userData';
import { useAtom } from 'jotai';

export default function Login(props) {

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState('');
  const [FavouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();


  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (await authenticateUser(user, password)) {
        await updateAtoms();
        router.push('/favourites')
      }
    } catch (err) {
      setWarning(err.message);
    }
  }

  async function updateAtoms() {
    setFavouritesList(await getFavourites());
    setSearchHistory(await getHistory());
  }

  return (
    <Container className='mt-4'>
      <Row className='justify-content-center'>
        <Col xs='auto' md={4}>
          <Card bg="light">
            <Card.Body><h2>Login</h2>Enter your login information below:</Card.Body>
          </Card>
          <br />
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>User:</Form.Label><Form.Control type="text" value={user} id="userName" name="userName" onChange={e => setUser(e.target.value)} />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Password:</Form.Label><Form.Control type="password" value={password} id="password" name="password" onChange={e => setPassword(e.target.value)} />
              {warning && (<><br /><Alert variant="danger">{warning}</Alert></>)}
            </Form.Group>
            <br />
            <Button variant="primary" className="pull-right" type="submit">Login</Button>
          </Form>
        </Col>

      </Row>


    </Container>
  );
}