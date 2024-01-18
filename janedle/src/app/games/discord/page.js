'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';

export default function Discord() {
    const [feedback, setFeedback] = useState('');
    const router = useRouter();
    const { user } = useAuthContext();
  
    React.useEffect(() => {
      if (user == null) router.push('/landing');
    }, [user]);
  
    const handleButtonClick = (feedback) => {
      setFeedback(feedback);
    };
    
    return (
      <main className="flex flex-col min-h-screen p-4 w-screen justify-center items-center gap-8">
        <div className="w-fill border-2 border-white h-fill max-h-96 max-w-96 justify-center items-center text-center text-white rounded-lg">
          <div className='xl:w-96 xl:h-96 w-48 h-48'></div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="text-white text-center">
            <h1 className="adaptive-text-md">%QUESTION_CATEGORY%</h1>
            <p className="adaptive-text-sm">%QUESTION_EXPLANATION_TEXT%</p>
          </div>
        </div>
        <div className="three-button-container">
          <button
            className={`button ${feedback === 'yes' ? 'active' : ''} custom-button`}
            style={{ backgroundColor: 'green' }}
            onClick={() => handleButtonClick('yes')}
          >
            Yes
          </button>
          <button
            className={`button ${feedback === 'maybe' ? 'active' : ''} custom-button`}
            style={{ backgroundColor: 'yellow' }}
            onClick={() => handleButtonClick('maybe')}
          >
            Maybe
          </button>
          <button
            className={`button ${feedback === 'no' ? 'active' : ''} custom-button`}
            style={{ backgroundColor: 'red' }}
            onClick={() => handleButtonClick('no')}
          >
            No
          </button>
        </div>
  
      </main>
    );
}