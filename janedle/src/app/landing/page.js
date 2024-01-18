'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';

export default function Landing() {
    const { user } = useAuthContext();
    const router = useRouter();

    function handlePlayButton() {
        if (user == null) {
            router.push('/auth/signin');
        } else {
            router.push('/');
        }
        console.log("Button clicked");
    }

    function linkLeaderBoard() {
        if (user == null) {
            router.push('/auth/signin');
        } else {
            router.push('/leaderboard');
        }
    }

    return (
        <div className='flex flex-col justify-center items-center p-4 gap-4 h-screen w-screen'>
            <div className='flex flex-col justify-center items-center font-serif'>
                <div className='adaptive-text-lg '>Janedle</div>
                <div className='text-xs text-white -mt-1'>How well do you know John Aidan?</div>
            </div>

            <div className='flex flex-col justify-center items-center gap-1 max-w-4xl'>
                <div className='adaptive-text-md font-semibold'>What is Janedle?</div>
                <div className='adaptive-text-sm'>Janedle is a game that tests how well you know John Aidan. Every day, 4 new questions involving Jane each in different categories of his interests will be posed
                and it's up to you to answer them correctly!</div>
                <div className='adaptive-text-sm'>For each question you answer correctly, you'll gain points which will be tracked on a leaderboard that includes everyone in the Discord.
                At the end of the month the person with the most points will win a prize!
                </div>
            </div>

            <div className='flex flex-col justify-center items-center gap-1 max-w-4xl'>
                <div className='adaptive-text-md font-semibold'>The Categories: </div>
                <div className='adaptive-text-sm text-left w-full'> Would Jane join this Discord call?</div>
                <div className='adaptive-text-sm text-left w-full'> Jane general trivia!</div>
                <div className='adaptive-text-sm text-left w-full'> What would Jane rate this anime?</div>
                <div className='adaptive-text-sm text-left w-full'> When did Jane ____?</div>
            </div>

            <div className='flex flex-col justify-center items-center gap-1 max-w-4xl'>
                <div className='adaptive-text-md font-semibold'>How do I play?</div>
                <div className='adaptive-text-sm'>Simply click the button to play and signup if you havent already, and make sure to come back everyday!</div>
            </div>

            <div className='flex flex-row justify-around items-end w-screen h-full gap-1 p-4'>
                <button onClick={handlePlayButton} className='button custom-button adaptive-text-md text-center bg-cyan-600'>Play</button>
                <div className='w-full'></div>
                <button onClick={linkLeaderBoard} className={`button custom-button adaptive-text-md bg-cyan-600 ${user ? '' : 'opacity-20'}`}>Leaderboard</button>
            </div>
        </div>
    );
};

