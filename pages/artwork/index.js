import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Row, Col, Card, Pagination, Container } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";
import useSWR from "swr";
import Error from "next/error";
import validObjectIDList from '@/public/data/validObjectIDList.json'
import Loading from "@/components/Loading";


const PER_PAGE = 12

const fetcher = (url) => fetch(url).then((res)=>res.json());

export default function Artwork(){
    const [artworkList, setArtworkList] = useState()
    const [page, setPage] = useState(1)
    const router = useRouter()

      let finalQuery = router.asPath.split('?')[1];
    

    const {data, error} = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`, fetcher);
    console.log('final query', finalQuery)

    function previousPage(){
        if (page > 1){
            setPage(page-1)
        }
    }

    function nextPage(){
        if (page< artworkList.length){
            setPage(page+1)
        }
    }
    
    useEffect(()=>{
        if(data){
            const results = []
            let filteredResults = validObjectIDList.objectIDs.filter(x=> data.objectIDs?.includes(x));
            for(let i= 0; i < filteredResults.length; i += PER_PAGE){
                const chunk = filteredResults.slice(i, i+PER_PAGE);
                results.push(chunk);
            }
            setArtworkList(results)
            setPage(1);
        }
    }, [data])

    if (error)return <Error statusCode={404} /> 
    if (!artworkList) return <Loading />;

    return (
      <Container className="mt-4">

      {artworkList !== null ? (
        <Row className="gy-4">
          {artworkList.length > 0 ? (
            artworkList[page - 1].map((currentObjectID) => (
              <Col lg={3} key={currentObjectID}>
                <ArtworkCard objectID={currentObjectID} />
              </Col>
            ))
          ) : (
            <Card>
              <Card.Body>
                <h4>Nothing Here</h4>
                Try searching for something else.
              </Card.Body>
            </Card>
          )}
        </Row>
      ) : null}
      <br/>

      {artworkList !== null && artworkList.length > 0 && (
        <Row className="justify-content-center">
          <Col xs="auto">
            <Pagination>
              <Pagination.Prev onClick={previousPage} />
              <Pagination.Item>{page}</Pagination.Item>
              <Pagination.Next onClick={nextPage} />
            </Pagination>
          </Col>
        </Row>
      )}
      </Container>
    )
}
