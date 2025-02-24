import { Form, Row, Col, Button, Container } from "react-bootstrap"
import { useForm } from 'react-hook-form'
import { useRouter } from "next/router"
import { useAtom } from "jotai"
import { searchHistoryAtom } from "@/store"
import { addToHistory } from "@/lib/userData"
import { readToken } from "@/lib/authenticate"
import objects from "@/public/data/validObjectIDList.json"

// const validObject = []

// let x = 0;
// let y = 79;

// async function getData(start,end){
//     const smallArray =  objects.objectIDs.slice(start,end);
//     try {
//         for(const obj of smallArray){
//             const res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${obj}`);
//             const data =await res.json();
//             if(data.primaryImage){
//                 validObject.push(data.objectID);
//             }
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }

// function startFetching(){
//     if(x >= objects.objectIDs.length){
//         console.log('all is done')
//         return;
//     }

//     getData(x,x+y).then(()=>{
//         x += y;
//         setTimeout(startFetching, 1000);
//     })


// }

// startFetching();

export default function AdvancedSearch() {
    let queryString = ''
    const router = useRouter()
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const token = readToken()

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            searchBy: "",
            geoLocation: "",
            medium: "",
            isOnView: false,
            isHighlight: false,
            q: ""
        }
    })

    const submitForm = async (data) => {
        queryString += `searchBy=${data.searchBy}`;
        if (data.geoLocation) {
            queryString += `&geoLocation=${data.geoLocation}`;
        }

        if (data.medium) {
            queryString += `&medium=${data.medium}`;
        }

        queryString += `&isOnView=${data.isOnView}`;
        queryString += `&isHighlight=${data.isHighlight}`;
        queryString += `&q=${data.q}`;
        token ? setSearchHistory(await addToHistory(`title=true&q=${queryString}`)) : null;
        console.log(queryString);
        router.push(`/artwork?${queryString}`);
    }


    return (

        <Container className="py-5 d-flex flex-column align-items-center">
            <h2 className="fw-bold" >Advanced Search</h2>
            <Form onSubmit={handleSubmit(submitForm)} style={{maxWidth:'500px'}}>
                <Row>
                    <Col className="m-2">
                        <Form.Group>
                            <Form.Label className="">Search Query</Form.Label>
                            <Form.Control className={errors.q && "is-invalid"} type="text" {...register("q", { required: true })} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col className="m-2">
                        <Form.Label>Search By</Form.Label>
                        <Form.Select {...register("searchBy")} >
                            <option value="title">Title</option>
                            <option value="tags">Tags</option>
                            <option value="artistOrCulture">Artist or Culture</option>
                        </Form.Select>
                    </Col>

                </Row>
                <Row>
                    <Col className="m-2">
                        <Form.Group >
                            <Form.Label>Geo Location</Form.Label>
                            <Form.Control type="text" {...register("geoLocation")} />
                            <Form.Text className="text-muted">
                                Case Sensitive String (ie &quot;Europe&quot;, &quot;France&quot;, &quot;Paris&quot;, &quot;China&quot;, &quot;New York&quot;, etc.), with multiple values separated by the | operator
                            </Form.Text>
                        </Form.Group>
                    </Col>

                </Row>
                <Row>
                    <Col className="m-2">
                        <Form.Group >
                            <Form.Label>Medium</Form.Label>
                            <Form.Control type="text" {...register("medium")} />
                            <Form.Text className="text-muted">
                                Case Sensitive String (ie: &quot;Ceramics&quot;, &quot;Furniture&quot;, &quot;Paintings&quot;, &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with multiple values separated by the | operator
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col className="m-3">
                        <Form.Check
                            type="checkbox"
                            label="Highlighted"
                            {...register("isHighlight")}
                        />
                        <Form.Check
                            type="checkbox"
                            label="Currently on View"
                            {...register("isOnView")}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col className="m-3 ">
                        <Button className='w-100 rounded-pill fs-5' variant="warning" type="submit" disabled={Object.keys(errors).length > 0}>
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}