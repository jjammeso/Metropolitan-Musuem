import Head from 'next/head'
import { Inter } from 'next/font/google'
import { Row, Col, Container, Nav, Button } from 'react-bootstrap';
import Slide from '@/components/Slide';
import Gallery from '@/components/Gallery';
import Section from '@/components/Section';
import Feature from '@/components/Feature';
import CurrentlyOnView from '@/components/CurrentlyOnView';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  console.log('hello')


  return (
    <>
      <Head>
        <title>My Art Collection</title>
      </Head>
      <Slide />
      <Feature />
      <CurrentlyOnView/>
      {/* <Gallery />
      <Container>
        <Section title={'Currently on View'} query={'isOnView=true&hasImages=true&q=amazing'} />
        <Section title={'Paintings'} query={'medium=Paintings&hasImages=true&q=good'} />
        <Section title={'Ceramics'} query={'medium=Ceramics&hasImages=true&q=good'} />
        <Section title={'Textiles'} query={'medium=Textiles&hasImages=true&q=good'} />
        <Section title={'Sculpture'} query={'medium=Sculpture&hasImages=true&q=possession'} />
      </Container> */}
    </>
  )
}
