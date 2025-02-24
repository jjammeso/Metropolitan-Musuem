import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Row, Col, Card, Pagination, Container } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";
import useSWR from "swr";
import Error from "next/error";
import validObjectIDList from '@/public/data/validObjectIDList.json'
import Loading from "@/components/Loading";
import SearchBar from "@/components/SearchBar";


const PER_PAGE = 12

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Artwork() {
  const [artworkList, setArtworkList] = useState()
  const [page, setPage] = useState(1)
  const router = useRouter()

  let finalQuery = router.asPath.split('?')[1];


  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`, fetcher);

  function previousPage() {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  function nextPage() {
    if (page < artworkList.length) {
      setPage(page + 1)
    }
  }

  useEffect(() => {
    if (data) {
      const results = []
      let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x));
      for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
        const chunk = filteredResults.slice(i, i + PER_PAGE);
        results.push(chunk);
      }
      setArtworkList(results)
      setPage(1);
    }
  }, [data])

  if (error) return <Error statusCode={404} />
  if (!artworkList) return <Loading />;
  console.log('check this out', artworkList)

  return (
    <Container className="mt-4">
      <Row className="d-flex justify-content-center p-4">
        <Col style={{maxWidth:'550px'}}>
          <SearchBar />
        </Col>
      </Row>

      {artworkList !== null ? (
        <Row className="gy-4 py-3">
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
      <br />

      {artworkList !== null && artworkList.length > 0 && (
        <Row className="justify-content-center">
          <Col xs="auto">
            <Pagination>
              <Pagination.Prev onClick={previousPage} disabled={page == 1 ? true : false} />
              {page > 2 && <Pagination.Item>1</Pagination.Item>}
              {page > 2 && <Pagination.Ellipsis />}
              {page - 1 > 0 && <Pagination.Item>{page - 1}</Pagination.Item>}
              <Pagination.Item active>{page}</Pagination.Item>
              {page + 1 < artworkList.length && <Pagination.Item>{page + 1}</Pagination.Item>}
              <Pagination.Ellipsis />
              {page != artworkList.length && <Pagination.Item>{artworkList.length}</Pagination.Item>}
              <Pagination.Next onClick={nextPage} disabled={page == artworkList.length ? true : false} />
            </Pagination>
          </Col>
        </Row>
      )}
    </Container>
  )
}
