import { Card, Form, Alert, Button, Container, Row, Col, Image } from 'react-bootstrap';
import { useState } from 'react';
import { registerUser } from '@/lib/authenticate';
import { useRouter } from 'next/router';

export default function Register(props) {

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState('');
  const [warning, setWarning] = useState('');
  const router = useRouter();


  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await registerUser(user, password, password2);
      router.push('/login')
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <Container className='my-5' style={{ height: '100vh' }}>
      <Row className='justify-content-center'>
        <Col md={6} className='overflow-hidden d-sm-none d-md-block'>
          <Image src='image (5).jpg' />
        </Col>
        <Col md={6} className=' bg-dark text-light d-flex flex-column align-items-center justify-content-center'>
          <h2>Sign Up</h2>
          <p>Enter your information to sign up</p>
          <Form onSubmit={handleSubmit} className='w-100' style={{ maxWidth: '300px' }}>
            <Form.Group className='my-2'>
              <Form.Label>User Name</Form.Label><Form.Control type="text" value={user} id="userName" name="userName" onChange={e => setUser(e.target.value)} />
            </Form.Group>
            <Form.Group className='my-2'>
              <Form.Label>Email</Form.Label><Form.Control type="text" value={user} id="userName" name="userName" onChange={e => setUser(e.target.value)} />
            </Form.Group>
            <Form.Group className='my-2'>
              <Form.Label>Password</Form.Label><Form.Control type="password" value={password} id="password" name="password" onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group className='my-2'>
              <Form.Label>Confirm Password</Form.Label><Form.Control type="password" value={password2} id="password2" name="password2" onChange={e => setPassword2(e.target.value)} />
              {warning && (<><br /><Alert variant="danger">{warning}</Alert></>)}
            </Form.Group>
            <br />
            <Button variant="warning" className="w-100 rounded-pill" type="submit">Sign Up</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}