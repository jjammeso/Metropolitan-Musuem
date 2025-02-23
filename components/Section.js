import React from 'react'
import { Button, Container, Col } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import useSWR from 'swr';
import Error from 'next/error';
import SectionCard from './SectionCard';
import { useRouter } from 'next/router';


const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Section({ title, query }) {
  const router = useRouter()
  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${query}`, fetcher);
  if (error) return <Error statusCode={404} />
  if (!data) return null;
  const search = query;

  const array = data?.objectIDs.slice(0, 3)

  function handleClick(q) {
    router.push(`./artwork?${q}`)
  }

  return (
    <>
      <Container className='py-3'>
        <Row className='text-center w-100 my-4'>
          <Col><h2 className='fw-bold'>{title}</h2></Col>
        </Row>
        <Row className='d-flex gap-4 justify-content-around my-4'>
            {array.map((obj, idx) => {
              return (
                <SectionCard key={idx} objectID={obj} />
              )
            })}
        </Row>
        <Row className='text-center my-4'>
          <Col className='' ><Button variant='outline-dark rounded-pill' onClick={() => handleClick(search)}>View more &gt;&gt;</Button></Col>

        </Row>
      </Container>
    </>
  )
}


