import Head from 'next/head'
import Slide from '@/components/Slide';
import Section from '@/components/Section';
import Feature from '@/components/Feature';
import CurrentlyOnView from '@/components/CurrentlyOnView';
import Banner from '@/components/Banner';
import BannerBottom from '@/components/BannerBottom';


export default function Home() {


  return (
    <>
      <Head>
        <title>My Art Collection</title>
      </Head>
      <Slide />
      <Feature />
      <CurrentlyOnView />
      <Banner />
      <Section title={'Paintings'} query={'medium=Paintings&hasImages=true&q=good'} />
      <Section title={'Sculpture'} query={'medium=Sculpture&hasImages=true&q=possession'} />

      <Section title={'Ceramics'} query={'medium=Ceramics&hasImages=true&q=good'} />
      <BannerBottom />
    </>
  )
}
