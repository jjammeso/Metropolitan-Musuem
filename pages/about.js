import React from 'react'
import { Container } from 'react-bootstrap'

export default function about() {
    return (
        <Container className='my-5'>
            <h2>About This Project</h2>
            <p>This website is a platform for exploring and curating artworks from the Metropolitan Museum of Art API. It allows users to browse a vast collection, find detailed information about each piece, and create an account to save their favorite artworks.</p>
            <h3>Project Overview</h3>
            <p>The goal of this project was to build an interactive and user-friendly experience for art enthusiasts. By integrating an external API, implementing authentication, and managing user data, the site provides a seamless way to discover and organize artworks.</p>
            <h3>Tech Stack</h3>
            <ul>
                <li><strong>Next.js</strong> for a responsive and optimized frontend.</li>
                <li><strong>Node.js & Express</strong> for handling backend operations.</li>
                <li><strong>MongoDB</strong> for securely storing user data and collections.</li>
                <li>JWT-based Authentication for secure, token-based user login and session management.</li>
                <li>API Integration with the Metropolitan Museum of Art to dynamically fetch artwork details.</li>
            </ul>
            <h3>Key Features</h3>
            <ul>
                <li>User Authentication: Secure account creation and login using JWT (JSON Web Token) authentication.</li>
                <li>Artwork Collection: Users can save and organize their favorite pieces.</li>
                <li>Detailed Information: Each artwork comes with descriptions, artist details, and historical context.</li>
                <li>Efficient Data Handling: Optimized API requests and database queries ensure smooth performance.</li>
            </ul>
            <p>This project was an opportunity to work on real-world challenges—handling external data, building a structured backend, managing secure authentication, and configuring server deployments. It reflects an interest in developing well-architected applications that are both functional and secure.</p>
    </Container>
    )
}
