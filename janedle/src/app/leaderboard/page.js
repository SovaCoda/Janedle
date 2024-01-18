'use client'
import { useRouter } from "next/navigation";
import LeaderboardComponent from "../../../components/leaderboardcomponent";

export default function Leaderboard()
{
    const router = useRouter();
    function handleBackButton()
    {
        router.push("/landing");
    }

    return(
        <div className="flex flex-col w-screen h-screen justify-center items-center">
            <div className="adaptive-text-lg">Leaderboard</div>
                <LeaderboardComponent />
            <div className="mt-4 justify-start items-start">
                <button onClick={handleBackButton} className="custom-button" style={{backgroundColor : "cyan"}}>Back</button>
            </div>
        </div>
    );
}