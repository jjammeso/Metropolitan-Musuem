import { Container } from 'react-bootstrap';
import MainNav from '@/components/MainNav';
import Footer from './Footer';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] })

export default function Layout(props) {
    return <><MainNav />
        <br />
        <Container fluid className='m-0 p-0'>
            {props.children}
        </Container>
        <Footer/>
        </>
}