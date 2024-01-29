import { namedQuery } from "firebase/firestore";
import DiscordConnectedUser from "./discordConnectedUser";
export default function DiscordChannel({isText, isVoice, name, users}) {
    return(
        <div className="flex flex-col justify-start w-full">
            <div className="flex flex-row justify-start items-center hover:bg-discord-channel-bar-bright p-1 gap-1 w-full cursor-pointer">
                <div>{isText && <img src="/svgs/textchannel.svg" className="h-5 w-5"/>}</div>
                <div>{isVoice && <img src="/svgs/voicecall.svg" className="h-5 w-5"/>}</div>
                <div className="text-sm text-gray-300">{name}</div>
                
            </div>
            
            {users.channel == name && users.users.map((user) => { return <div className="pl-4 text-xs text-gray-300"><DiscordConnectedUser name={user} /></div>})}
        </div>
    );
}