'use client'
import { useEffect, useState } from "react"
import React from 'react'
import Image from 'next/image'

const Slider = React.memo(({value, setValue}) => {
    return (
    <div className="flex flex-col items-center justify-center w-full">
        <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={value}
            onChange={e => setValue(e.target.value)}
            className="w-full"
        />
        <div className="flex justify-between w-full mt-2">
            {Array.from({ length: 10 }, (_, i) => i + 1).map(number => (
            <span key={number} className="adaptive-text-md">{number}</span>
            ))}
        </div>
    </div>
    );
});

const totalAnime = 23000;

const AnimeScoreBar = ({ score, category, isScoreBasedOnTotal }) => {
    const [width, setWidth] = useState(0);
    var normalizedScore = 0;

    if (isScoreBasedOnTotal) {
        normalizedScore = 10 * (1 - (score / totalAnime))
        useEffect(() => {
        const timer = setTimeout(() => {

            setWidth(normalizedScore * 10); // Convert score to percentage
            console.log(normalizedScore);
        }, 250); // Delay of 1 second
        console.log(score);
        return () => clearTimeout(timer);
        }, [score]);
    }
    else{
        normalizedScore = score;
        useEffect(() => {
        const timer = setTimeout(() => {
            setWidth(score * 10); // Convert score to percentage
        }, 250); // Delay of 1 second
    
        return () => clearTimeout(timer);
        }, [score]);
    }
    function getGradientColor(score) {
        if (score <= 6) {
            return 'bg-red-500';
        } else if (score <= 6.5) {
            return 'bg-red-700';
        } else if (score <= 7) {
            return 'bg-orange-500';
        } else if (score <= 7.5) {
            return 'bg-orange-700';
        } else if (score <= 8) {
            return 'bg-yellow-500';
        } else if (score <= 8.5) {
            return 'bg-yellow-700';
        } else if (score <= 9) {
            return 'bg-green-500';
        } else if (score <= 9.5) {
            return 'bg-green-700';
        } else {
            return 'bg-blue-500';
        }
    };

    return (
        <div className="w-full p-2">
            <div className="h-4 transition-all duration-1000 rounded-md border-2 border-white relative overflow-hidden" style={{ width: `${100}%` }}>
                <div className={`bg-gradient-to-r ${getGradientColor(normalizedScore)} h-[20px] absolute transition-all duration-1000 rounded-md -translate-x-1 -translate-y-[3px]`} style={{ width: `${width}%` }}></div>
            </div>
            <p className="adaptive-text-sm">{category}: {score}</p>
        </div>
    );
};

export default function Anime() {
    const [animeList, setAnimeList] = useState([]);
    const [selectedAnime, setSelectedAnime] = useState(null);
    const [animeDetails, setAnimeDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [sliderValue, setSliderValue] = useState(1);

    const MAX_LENGTH = 200;

    const AnimeSynopsis = ({ synopsis }) => {
        const [expanded, setExpanded] = useState(false);

        const handleToggle = () => {
            setExpanded(!expanded);
        };

        if(!synopsis) return (<div></div>);
        const truncatedSynopsis = synopsis.length > MAX_LENGTH ? synopsis.substring(0, MAX_LENGTH) + '...' : synopsis;

        return (
            <div>
                <div className="adaptive-text-md text-left">Synopsis</div>
                <div className="adaptive-text-sm text-left">
                    {expanded ? synopsis : truncatedSynopsis}
                    {synopsis.length > MAX_LENGTH && (
                        <button className="text-blue-500 underline" onClick={handleToggle}>
                            {expanded ? 'Read Less' : 'Read More'}
                        </button>
                    )}
                </div>
            </div>
        );
    };

    function cullNonRatedAnime(animeList) {
        return animeList.filter((anime) => {
            return anime.list_status.score != 0;
        });
    }

    useEffect (() => {
        const getAnime = async () => {
            console.log('getting anime');
            var res = await fetch('anime/api')
            res = await res.json();
            setAnimeList(cullNonRatedAnime(res.data.data));
        }
        getAnime();
    }, []);

    useEffect(() => {
        if(animeList.length === 0) return;
        const getRandomAnimeDetails = async () => {
            console.log(animeList);
            const randomIndex = Math.floor(Math.random() * animeList.length);
            const randomAnime = animeList[randomIndex];
            var res = await fetch(`anime/api?id=${randomAnime.node.id}`)
            res = await res.json();
            setAnimeDetails(res.data);
            setSelectedAnime(randomAnime);
            console.log(randomAnime);
            setIsLoading(false);
        }
        getRandomAnimeDetails();
    }, [animeList]);

    function checkGuess() {
        if (selectedAnime.list_status.score == sliderValue) {
            alert('Correct!');
        }
        else {
            alert(`Incorrect! The correct answer was ${selectedAnime.list_status.score} you guessed ${sliderValue}`);
        }
    }

    return( 
        <div className="flex flex-col justify-center items-center p-4 gap-4">
            <div className="flex flex-col md:flex-row items-center text-center relative">
                <div className="relative mx-auto" style={{ width: '375px' }}>
                    <div className={`${isLoading ? '' : 'hidden'}`} style={{ height: '560px' }}></div>
                    <div className={`transition-opacity duration-500 absolute top-4 ${isLoading ? 'opacity-100' : 'opacity-0'}`}>
                        <Image className="rounded-lg border-2 border-white" 
                            src="/loading_gif.gif" 
                            alt="placeholder" 
                            width={375} 
                            height={560}
                            priority={true} 
                            placeholder="empty"
                            objectFit="fill"
                        />
                    </div>
                    <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'} mt-4`}>
                        {animeDetails && (
                            <Image className="rounded-lg border-2 border-white" 
                                src={animeDetails.main_picture.large} 
                                alt={animeDetails.title} 
                                width={375} 
                                height={560}
                                priority={false} 
                                objectFit="fill"
                            />
                        )}
                    </div>
                </div>
                <div className={`${animeDetails ? 'flex flex-row md:flex-col h-full p-4' : 'hidden'}`}>      
                    <div>
                        <div className="adaptive-text-md top-0">Stats</div>
                        <AnimeScoreBar category={"Avg Rating"} score={animeDetails && animeDetails.mean || 0} isScoreBasedOnTotal={false}/>
                        <AnimeScoreBar category={"Popularity"} score={animeDetails && animeDetails.popularity || 0} isScoreBasedOnTotal={true}/>
                        <AnimeScoreBar category={"Rank"} score={animeDetails && animeDetails.rank || 0} isScoreBasedOnTotal={true}/>
                    </div>
                    <div>
                        <div className="adaptive-text-md  top-0">Genres</div>
                        <div className="flex flex-row flex-wrap max-w-48 justify-center gap-2">
                            {animeDetails && animeDetails.genres.map((genre, index) => (
                                <div key={index} className="bg-gray-200 rounded-md p-2">{genre.name}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 max-w-4xl text-center">
                <div className="adaptive-text-lg font-semibold">{animeDetails && animeDetails.alternative_titles.en}</div>
                <AnimeSynopsis synopsis={animeDetails && animeDetails.synopsis} />
                <div className="adaptive-text-md text-center">What did Jane rate this anime?</div>
                <Slider value={sliderValue} setValue={setSliderValue}/>
                <div className="flex flex-row justify-center gap-4">
                    <button onClick={checkGuess}className="adaptive-text-md bg-blue-500 text-white rounded-md p-2">Lock In</button>
                </div>
            </div>
        </div>
    )
}