import React, { useEffect, useRef } from 'react'
import { Container } from 'react-bootstrap'
import styles from '@/styles/Gallery.module.css'
import { useRouter } from 'next/router'
import useSWR from 'swr';
import SectionCard from './SectionCard';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function CurrentlyOnView() {
    const scrollRef = useRef(null)

    const router = useRouter()
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?isOnView=true&hasImages=true&q=amazing`, fetcher);

    useEffect(() => {
        if (scrollRef.current)
            scrollRef.current.scrollLeft = 100;
    }, [])

    if (error) return <Error statusCode={404} />
    if (!data) return null;

    const array = data?.objectIDs
    console.log(array)


    function handleClick(q) {
        router.push(`./artwork?${q}`)
    }



    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -960, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 960, behavior: 'smooth' });
        }
    };

    return (
        <Container fluid className='m-0 p-0'>
            <h2 className='m-4 fw-bold'>Currently on View</h2>
            {/* <button className={styles.previous} onClick={scrollLeft}><i class="bi bi-chevron-left"></i></button> */}
            <div className={styles.container}>
                <div className={styles.slider} ref={scrollRef} >
                    {array.map((item, index) =>
                    (
                        <SectionCard key={index} objectID={item} />
                    )
                    )}
                </div>
                <div className={styles.slider} ref={scrollRef} >
                    {array.map((item, index) =>
                    (
                        <SectionCard key={index} objectID={item} />
                    )
                    )}
                </div>
            </div>
            {/* <button className={styles.next} onClick={scrollRight}><i class="bi bi-chevron-right"></i></button> */}
        </Container>
    )
}
