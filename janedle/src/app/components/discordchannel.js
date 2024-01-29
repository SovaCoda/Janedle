
export default function DiscordChannel({isText, isVoice, name}) {
    return(
        <div className="flex flex-row justify-start items-center hover:bg-discord-channel-bar-bright p-1 gap-1 w-full cursor-pointer">
            <div>{isText && <img src="/svgs/textchannel.svg" className="h-5 w-5"/>}</div>
            <div>{isVoice && <img src="/svgs/voicecall.svg" className="h-5 w-5"/>}</div>
            <div className="text-sm text-gray-300">{name}</div>
        </div>
    );
}