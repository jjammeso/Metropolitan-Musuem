import React from 'react'
import { Col, Nav, Dropdown } from 'react-bootstrap'

export default function SideBar({dept}) {
    const departments = dept;

  return (
    <Col className='bg-light width-auto' style={{height:'auto'}}>
        
        <Nav className='flex-column pt-1'>
        <h2>Departments</h2>
            {departments.map(dept=>{
                return (
                    <Nav.Link > {dept.displayName}</Nav.Link>
                )
            })}
            <Nav.Link></Nav.Link>
        </Nav>
    </Col>
  )
}
