import { getToken } from "./authenticate";

// addToFavourites(id) -  PUT request to /favourites/id
export async function addToFavourites(id){
    let token = getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json",
            Authorization: `JWT ${token}`
        },
    })

    const data = await res.json();

    if(res.status == 200){
        return data;        
    }else{
        return [];
    }
}

// removeFromFavourites(id) – DELETE request to /favourites/id
export async function removeFromFavourites(id){
    let token = getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json",
            Authorization: `JWT ${token}`
        },
    })

    const data = await res.json();

    if(res.status == 200){
        return data;        
    }else{
        return [];
    }
}

// getFavourites() – GET request to /favourites
export async function getFavourites(){
    let token = getToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
        method:'GET',
        headers:{
            "content-type": "application/json",
            Authorization: `JWT ${token}`
        }
    })

    const data = await res.json()
    if(res.status == 200 || res.status == 304){
        return data
    }else{
        return []
    }
}

// addToHistory(id) – PUT request to /history/id
export async function addToHistory(id){
    let token = getToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
        method:'PUT',
        headers:{
            "content-type": "application/json",
            Authorization: `JWT ${token}`
        }
    })

    const data = await res.json()
    if(res.status == 200){
        return data
    }else{
        return []
    }
}
// removeFromHistory(id) – DELETE request to /history/id
export async function removeFromHistory(id){
    let token = getToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
        method:'DELETE',
        headers:{
            "content-type": "application/json",
            Authorization: `JWT ${token}`
        }
    })

    const data = await res.json()
    if(res.status == 200){
        return data
    }else{
        return []
    }
}

// getHistory() – GET request to /history
export async function getHistory(){
    let token = getToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
        method:'GET',
        headers:{
            "content-type": "application/json",
            Authorization: `JWT ${token}`
        }
    })

    const data = await res.json()
    if(res.status == 200 || res.status == 304){
        return data
    }else{
        return []
    }
}
