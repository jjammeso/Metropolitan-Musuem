import React from 'react'
import { Carousel, Container, Image } from 'react-bootstrap'
import { Sansita } from 'next/font/google'

const sansita = Sansita({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})


export default function Slide() {
  return (
    <Carousel pause={false} controls={false} className='m-0 p-0'>
      <Carousel.Item>
        <Image src='metropolitan-museum-of-art-new-york-city.jpg' fluid style={{ width: '100%', height: '60vh', objectFit: 'cover' }} />
        <Carousel.Caption>
          <Container className={sansita.className} style={{background:'#333333', padding: '10px', border:'solid' }}>
            <h3 className='fw-bold ' >Welcome to Art Explorer</h3>
            <p className='fw-bold'>Your Gateway to the Wonders of the Metropolitan Museum of Art</p>
          </Container>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src='Screenshot 2024-05-19 220130.png' fluid style={{ width: '100%', height: '60vh', objectFit: 'cover' }} />
        <Carousel.Caption>
        <Container  className={sansita.className} style={{background:'#5F4842', padding: '10px', border:'solid'}}>
            <h3 className='fw-bold '>Create an Account</h3>
            <p className='fw-bold ' >Discover a world of art tailored just for you.</p>
          </Container>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src='sothebys-com.brightspotcdn.jpg' fluid style={{ width: '100%', height: '60vh', objectFit: 'cover' }} />
        <Carousel.Caption>
          
          <Container  className={sansita.className} style={{background:'#98473E', padding: '10px', border:'solid'}}>
            <h3 className='fw-bold '>Start Collecting Arts</h3>
            <p className='fw-bold '>Store your favourite arts in Your Collection</p>
          </Container>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}
