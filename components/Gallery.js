import React, { useEffect, useRef } from 'react'
import { Container } from 'react-bootstrap'
import styles from '@/styles/Gallery.module.css'
import DepartmentCard from './DepartmentCard'
import departmentList from '@/public/data/departmentList.json'


export default function Gallery() {
    const scrollRef = useRef(null)
    const departments = departmentList.departments

    useEffect(() => {
        if (scrollRef.current)
            scrollRef.current.scrollLeft = 100;
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
        <Container className={`p-3 m-0 bg-dark text-white ${styles.container}`} fluid style={{ position: 'relative' }}>
            <h2 className='m-4 fw-bold'>Browse by Department</h2>
            <button className={styles.previous} onClick={scrollLeft}><i class="bi bi-chevron-left"></i></button>
            <Container ref={scrollRef} style={{ width: '100%', display: 'flex', whiteSpace: 'nowrap', height: 'auto', overflowX: 'auto' }}>
                {departments.map((dept, index) => {
                    return (
                        <Container key={index} className='p-5'>
                            <DepartmentCard department={dept}/>
                        </Container>
                    )
                })}
            </Container>
            <button className={styles.next} onClick={scrollRight}><i class="bi bi-chevron-right"></i></button>
        </Container>

    )
}
