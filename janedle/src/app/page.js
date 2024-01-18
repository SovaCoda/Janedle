'use client'
import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import getDataByUuid from '@/firestore/getData';

export default function Home() {
  const [hasBeenDisabled, setHasBeenDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState('loading...');
  const [answered, setAnswered] = useState({'anime' : true, 'discord' : true, 'trivia' : true});
  const router = useRouter();
  const { user } = useAuthContext();
  const dateFormatString = 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ';

  if (user == null) {
    router.push('/landing');
  }

  //Disable play buttons for questions taht user has alraedy answered
  //False for not answered, true for answered
  function disablePlayed() {
    setAnswered(prevAnswered => ({
      ...prevAnswered,
      discord: !moment(prevAnswered.discord).isSame(moment.now(), "day"),
      anime: !moment(prevAnswered.anime).isSame(moment.now(), "day"),
      trivia: !moment(prevAnswered.trivia).isSame(moment.now(), "day")
    }));
  }

  //Get the questions that the user has already answered
  useEffect(() => {
    const getAnswered = async () => {
      const data = await getDataByUuid('users', user.uid);
      setAnswered(data.result);
      setHasBeenDisabled(false);
    }
    getAnswered();
  }, []);

  //After data is retrieved disable based on that
  useEffect(() => {
    if(answered && !hasBeenDisabled) {
      disablePlayed();
      setHasBeenDisabled(true);
    }
  }, [answered, hasBeenDisabled]);

  //Get the current time and the time left until the next reset
  useEffect(() => {
    const countdown = setInterval(() => {
      const now = moment().tz('America/Chicago');
      const tomorrow = now.clone().add(1, 'day').startOf('day');

      const msLeft = tomorrow.diff(now);
      var hours = Math.floor(msLeft / 1000 / 60 / 60);
      var minutes = Math.floor((msLeft / 1000 / 60) % 60);
      var seconds = Math.floor((msLeft / 1000) % 60);

      if (hours < 10) hours = `0${hours}`;
      if (minutes < 10) minutes = `0${minutes}`;
      if (seconds < 10) seconds = `0${seconds}`;

      setTimeLeft(`${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  //if the user has ansered the question, do nothing
  function handleAnime() {
    if (answered['anime']) {return;}
    router.push('games/anime');
  }

  function handleTrivia() {
    if (answered['trivia']) {return;}
    router.push('games/trivia');
  }

  function handleDiscord() {
    if (answered['discord']) {return;}
    router.push('games/discord');
  }

  return(
    <div className='flex flex-col justify-center items-center p-4 gap-4 h-screen w-screen'>
      <div className='flex flex-col justify-center items-center font-serif'>
          <div className='adaptive-text-lg '>Janedle</div>
          <div className='text-xs text-white -mt-1'>How well do you know John Aidan?</div>
          <div className='adaptive-text-lg text-white'>{timeLeft}</div>
      </div>
      <div className='flex flex-col justify-center items-center font-serif w-full max-w-xl h-full gap-4'>
        <div onClick={handleDiscord} className={` ${ answered['discord'] ? "opacity-50" : ""} flex justify-center items-center w-full h-1/6 text-center rounded-lg bg-cyan-600 adaptive-text-md p-4 relative hover:translate-x-8 transition-all cursor-pointer`}>
          <div className='absolute left-0 top-0 adaptive-text-lg -rotate-12 translate-x-4 -translate-y-0'>
            Coming Soon!
          </div>
          <div className='justify-center items-center text-center'>
              Would Jane join Discord?
            </div>
            <div className='absolute right-4 adaptive-text-lg'>
              {'>'}
            </div>
          </div>
        <div onClick={handleAnime} className={` ${ answered['anime'] ? "opacity-50" : ""} flex justify-center items-center w-full h-1/6 text-center rounded-lg bg-cyan-600 adaptive-text-md p-4 relative hover:translate-x-8 transition-all cursor-pointer`}>
          <div className='justify-center items-center text-center'>
              What did Jane rate this anime?
            </div>
            <div className='absolute right-4 adaptive-text-lg'>
              {'>'}
            </div>
          </div>
        <div onClick={handleTrivia} className={` ${ answered['trivia'] ? "opacity-50" : ""} flex justify-center items-center w-full h-1/6 text-center rounded-lg bg-cyan-600 adaptive-text-md p-4 relative hover:translate-x-8 transition-all cursor-not-allowed`}>
          <div className='absolute left-0 top-0 adaptive-text-lg -rotate-12 translate-x-4 -translate-y-0'>
            Coming Soon!
          </div>
          <div className='justify-center items-center text-center'>
            Jane General Trivia!
          </div>
          <div className='absolute right-4 adaptive-text-lg'>
            {'>'}
          </div>
        </div>
      </div>
    </div>
  );
}
