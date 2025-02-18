import React from 'react'
import { Container, Image } from 'react-bootstrap'
import { useRouter } from 'next/router';

export default function DepartmentCard({ department }) {
  const router = useRouter()
  const object = department;

  function handleClick(id){
    router.push(`/artwork?departmentId=${id}&hasImages=true&q=good`)
  }

  return (
        <Container fluid onClick={()=>handleClick(object.departmentID)} className='d-flex flex-column rounded p-2 bg-light text-dark' style={{cursor:'pointer', width:'100%', maxwidth:'316px', gap:'25px', height:'400px'}}>
          <Image 
          src={object.primaryImageSmall || 'noimage.jpg'}
          className=''
          alt=''
          width={300}
          height={300}
          style={{ objectFit: 'cover', }} 
          />
          <h4 className='text-wrap fw-bold'>{object.department}</h4>
        </Container>
  );
}
