import Head from 'next/head'
import { Inter } from 'next/font/google'
import { Row, Col, Container, Nav, Button } from 'react-bootstrap';
import Slide from '@/components/Slide';
import Gallery from '@/components/Gallery';
import Section from '@/components/Section';
import { Ultra } from 'next/font/google'

const ultra = Ultra({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  console.log('hello')


  return (
    <>
      <Head>
        <title>My Art Collection</title>
      </Head>
      <Slide />
      <Container fluid>
        <Row className='m-4'></Row>
        <Row className='p-0 mt-0 m-0'>
          <Container fluid>
            <Col className='p-0' md={12}>
              <h4 style={{ textAlign: 'center', fontSize: '100%', fontWeight: '800' }} >THE</h4>
              <h1 className={ultra.className} style={{ textAlign: 'center', lineHeight: '65px' }}><span style={{ fontWeight: '900', fontSize: '140%' }}>Metropolitan Musuem</span></h1>
              <h4 style={{ textAlign: 'center', fontSize: '120%', fontWeight: '800' }}>OF ART
              </h4>
            </Col>
          </Container>
        </Row>
        <Row className='m-4'></Row>
      </Container>
      <Gallery />
      <Container>
        <Section title={'Currently on View'} query={'isOnView=true&hasImages=true&q=amazing'} />
        <Section title={'Paintings'} query={'medium=Paintings&hasImages=true&q=good'} />
        <Section title={'Ceramics'} query={'medium=Ceramics&hasImages=true&q=good'} />
        <Section title={'Textiles'} query={'medium=Textiles&hasImages=true&q=good'} />
        <Section title={'Sculpture'} query={'medium=Sculpture&hasImages=true&q=possession'} />
      </Container>
    </>
  )
}
