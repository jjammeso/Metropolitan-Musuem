import { favouritesAtom, searchHistoryAtom } from "../store"
import { useAtom } from "jotai"
import { getFavourites, getHistory } from "../lib/userData"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { isAuthenticated } from "../lib/authenticate"

export default function RouteGuard(props) {
	const router = useRouter()
	const PUBLIC_PATHS = ["/login", "/", "/register"]
	const [favourites, setFavouritesList] = useAtom(favouritesAtom)
	const [search, setSearchHistory] = useAtom(searchHistoryAtom)
	const [authorized, setAuthorized] = useState(false)

	function authCheck(url) {
		const path = url.split("?")[0]
		if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
			setAuthorized(false)
			router.push("/login")
		} else {
			setAuthorized(true)
		}
	}

	async function updateAtoms() {
		
		console.log("Updating atoms...");
		try {
			setFavouritesList(await getFavourites());
			setSearchHistory(await getHistory());
			console.log("Atoms updated successfully.");
		} catch (error) {
			console.error("Error updating atoms:", error);
		}
	}

	useEffect(() => {
		updateAtoms()
		authCheck(router.pathname)
		router.events.on("routeChangeComplete", authCheck)
		return () => {
			router.events.off("routeChangeComplete", authCheck)
		}
	}, [])

	return <>{authorized && props.children}</>
}
