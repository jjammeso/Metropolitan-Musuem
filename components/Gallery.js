import React, { useEffect, useRef } from 'react'
import { Container, Image, Row } from 'react-bootstrap'
import useSWR from 'swr'
import Error from 'next/error'
import styles from '@/styles/Gallery.module.css'
import DepartmentCard from './DepartmentCard'
import departmentList from '@/public/data/departmentList.json'


export default function Gallery() {
    const scrollRef = useRef(null)
    const departments = departmentList.departments

    useEffect(() => {
        if (scrollRef.current)
            scrollRef.current.scrollLeft = 500;
    }, [])

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
        <Container className={`p-2 m-0 bg-dark text-white ${styles.container}`} fluid style={{ position: 'relative' }}>
            <h2 style={{marginLeft:'5%'}}>Browse by Department</h2>
            <button className={styles.previous} onClick={scrollLeft}><i className="bi bi-arrow-left-circle-fill"></i></button>
            <Container ref={scrollRef} style={{ width: '100%', display: 'flex', left: '10%', whiteSpace: 'nowrap', height: 'auto', overflowX: 'auto' }}>
                {departments.map((dept, index) => {
                    return (
                        <Container key={index}>
                            <DepartmentCard department={dept}/>
                        </Container>
                    )
                })}
            </Container>
            <button className={styles.next} onClick={scrollRight}><i className="bi bi-arrow-right-circle-fill"></i></button>
        </Container>

    )
}
