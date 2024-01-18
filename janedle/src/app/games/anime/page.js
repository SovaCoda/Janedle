'use client'
import { useEffect, useState } from "react"

export default function Anime() {
    const [animeList, setAnimeList] = useState([]);
    useEffect (() => {
        const getAnime = async () => {
            console.log('getting anime');
            var res = await fetch('anime/api')
            res = await res.json();
            setAnimeList(res.data.data);
        }
        getAnime();
    }, []);

    useEffect(() => {
        if(!animeList) return;
        const getRandomAnimeDetails = async () => {
            const randomIndex = Math.floor(Math.random() * animeList.length);
            const randomAnime = animeList[randomIndex];
            var res = await fetch(`anime/api?id=${randomAnime.node.id}`)
            res = await res.json();
            console.log(res);
        }
        getRandomAnimeDetails();
    }, [animeList]);

    return(
        <div>

        </div>
    )
}