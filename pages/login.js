import { Card, Form, Alert, Button, Container, Row, Col, Image } from 'react-bootstrap';
import { useState } from 'react';
import { authenticateUser } from '@/lib/authenticate';
import { useRouter } from 'next/router';
import { favouritesAtom, searchHistoryAtom } from '@/store';
import { getFavourites, getHistory } from '@/lib/userData';
import { useAtom } from 'jotai';
import Link from 'next/link';

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
    <Container className='my-5 text-light vh-100' >
      <Row className='justify-content-center'  style={{height:'80%'}}>
        <Col md={6} className='text-dark d-none p-5 d-md-flex flex-column justify-content-center'>
          <h1 className='mx-5 my-3 fw-bold fs-1'>Welcome Back!</h1>
          {/* <h3 className='mx-5 my-3'>Easily save your favorite arts and explore a world of arts at your fingertips.</h3> */}
        </Col>
        <Col md={6} className='py-4 py-md-0 d-flex bg-dark flex-column justify-content-center align-items-center'>
          <h2>Login</h2>
          <p>Enter your login information below</p>
          <Form onSubmit={handleSubmit} className='w-100' style={{ maxWidth: '300px' }} >
            <Form.Group className='my-2'>
              <Form.Label>User Name</Form.Label><Form.Control className='bg-dark text-light' type="text" value={user} id="userName" name="userName" onChange={e => setUser(e.target.value)} />
            </Form.Group>
            <Form.Group className='my-2'>
              <Form.Label>Password</Form.Label><Form.Control className='bg-dark text-light' type="password" value={password} id="password" name="password" onChange={e => setPassword(e.target.value)} />
              {warning && (<><br /><Alert variant="danger">{warning}</Alert></>)}
            </Form.Group>
            <br />
            <p>Don&apos;t have an account? <Link href='/register' className='text-decoration-none text-warning'>Sign Up</Link></p>
            <Button variant="light" className="pull-right w-100 rounded-pill fw-bold my-2" type="submit">Login</Button>
          </Form>
        </Col>

      </Row>


    </Container>
  );
}