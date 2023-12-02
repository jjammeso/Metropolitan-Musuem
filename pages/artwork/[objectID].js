import ArtworkCardDetail from "@/components/ArtworkCardDetail";
import { useRouter } from "next/router";

export default function ArtworkById(){
    const router = useRouter()
    const {objectID} = router.query
    
    return (
        <ArtworkCardDetail objectID={objectID}/>
    )
}