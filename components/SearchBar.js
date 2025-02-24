import React from 'react'
import { addToHistory } from '@/lib/userData'
import { readToken } from '@/lib/authenticate'
import { useRouter } from 'next/router'
import { Form, Button } from 'react-bootstrap'
import { searchHistoryAtom } from '@/store';
import { useAtom } from 'jotai'

export default function SearchBar() {
    const router = useRouter()
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    let token = readToken();
    const submitForm = async (e) => {
        e.preventDefault();
        const searchField = e.target.elements.search.value;
        console.log(searchField)
        if (token) {
            setSearchHistory(await addToHistory(`title=true&q=${searchField}`))
        }
        router.push(`/artwork?title=true&q=${searchField}`)
    }


    return (
        <Form className="d-flex bg-secondary rounded-pill p-4" onSubmit={submitForm}>
            <Form.Control
                type="search"
                name="search"
                placeholder="Type here"
                className="rounded-pill"
                aria-label="Search"
            />
            <Button type="submit" className='btn btn-warning rounded-pill d-flex' style={{ marginLeft: '-80px' }} ><i className="bi bi-search"></i>&nbsp;&nbsp;Search</Button>
        </Form>
    )
}
