import { Container } from 'react-bootstrap'
import styles from '@/styles/Gallery.module.css'
import useSWR from 'swr';
import SectionCard from './SectionCard';
import Error from 'next/error';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function CurrentlyOnView() {
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?isOnView=true&hasImages=true&q=amazing`, fetcher);

    if (error) return <Error statusCode={404} />
    if (!data) return null;

    const array = data?.objectIDs

    return (
        <Container fluid className='m-0 p-0 pb-4'>
            <h2 className='px-3 px-md-5 py-5 mx-md-5 fw-bold'>Featured Arts</h2>
            <div className={styles.container}>
                <div className={styles.slider}  >
                    {array.map((item, index) =>
                    (
                        <SectionCard key={index} objectID={item} />
                    )
                    )}
                </div>
                <div className={styles.slider} >
                    {array.map((item, index) =>
                    (
                        <SectionCard key={index} objectID={item} />
                    )
                    )}
                </div>
            </div>
        </Container>
    )
}
