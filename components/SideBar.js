import React from 'react'
import { Col, Nav } from 'react-bootstrap'

export default function SideBar({dept}) {
    const departments = dept;

  return (
    <Col className='bg-light width-auto' style={{height:'auto'}}>
        
        <Nav className='flex-column pt-1'>
        <h2>Departments</h2>
            {departments.map((dept,idx)=>{
                return (
                    <Nav.Link key={idx} > {dept.displayName}</Nav.Link>
                )
            })}
            <Nav.Link></Nav.Link>
        </Nav>
    </Col>
  )
}
