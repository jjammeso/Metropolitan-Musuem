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
        <Container fluid onClick={()=>handleClick(object.departmentID)} className='m-4 p-1 mb-3' style={{cursor:'pointer'}}>
          <Image 
          src={object.primaryImageSmall||'https://via.placeholder.com/375x375.png?text=[+Not+Available+]'}
          alt=''
          width={300}
          height={300}
          style={{ objectFit: 'cover', }} 
          />
          <h3>{object.department}</h3>
          <h3>{object.departmentId}</h3>
        </Container>
  );
}
