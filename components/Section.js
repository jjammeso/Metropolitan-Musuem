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
  if(!data) return null;
  const search = query;

  const array = data?.objectIDs.slice(0,3)

  function handleClick(q){
      router.push(`./artwork?${q}`)
  }

  return (
    <>
      <Container className='my-4 p-4'>
        <Row>
          <Col md={4}><h2>{title}</h2></Col>
          <Col md={{offset:'6'}} className='pr-0 fs-4' >&nbsp;&nbsp;<Button variant='light' onClick={()=>handleClick(search)}>View more &gt;&gt;</Button></Col>
        </Row>
        
        <Row xs={1} md={3} className="gx-4 my-3">
          {array.map((obj, idx) =>{
            return (
              <SectionCard key={idx} objectID={obj} />
            )
          })}
        </Row>
      </Container>
    </>
  )
}


