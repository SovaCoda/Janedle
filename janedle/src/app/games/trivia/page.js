import DiscordChannel from "@/app/components/discordchannel";

export default function Trivia(){
    return(
        <div className="flex flex-col min-h-screen p-4 w-screen justify-center items-center gap-8">
            <div className="flex h-96 max-w-6xl ">
                <div className="bg-discord-server-bar min-w-24">Server bar 
                </div>
                <div className="bg-discord-channel-bar min-w-48 ">
                    <div className="shadow-md h-12">
                        <div className="flex flex-row items-center justify-between h-full px-4 gap-2 cursor-pointer hover:bg-discord-channel-bar-bright">
                            <div className="text-md text-white">SoL</div>
                            <div className="text-md font-mono text-gray-300">v</div>
                        </div>
                    </div>
                    <div className="overflow-scroll">
                    <div className="h-14 gap-4 parent-div pseudo-border ">
                        <div className="flex flex-col items-center h-full p-4 gap-2">
                            <div className="flex flex-row items-center justify-between w-full">
                                <div className="flex text-[10px] text-white font-bold">GOAL: LVL 1</div>
                                <div className="text-[10px] text-gray-300">1/2 Boosts {">"}</div>
                            </div>
                            <div className="h-1 w-full bg-gradient-to-r from-blue-600 to-purple-500 rounded-full">
                                <div>&nbsp;</div>
                            </div>
                        </div>
                    </div>
                    <div className="h-auto py-2 pseudo-border">
                        <div className="flex flex-row items-center h-full mx-2 px-2 py-1 gap-1 hover:bg-discord-channel-bar-bright rounded-md cursor-pointer">
                            <img src="/svgs/calendar.svg"/>
                            <div className="text-sm text-gray-300">Events</div>
                        </div>
                    </div>
                    <div className="h-56 py-2">
                        <div className="flex flex-col items-center px-2 py-1 gap-1">
                            <DiscordChannel isText={true} name="general-3"/>
                            <DiscordChannel isText={true} name="bot-spam"/>
                            <DiscordChannel isText={true} name="dnd-runeterra"/>
                            <DiscordChannel isText={true} name="zard-shrine"/>
                            <DiscordChannel isText={true} name="rules"/>
                            <DiscordChannel isText={true} name="politics"/>
                            <DiscordChannel isVoice={true} name="Wendy's Wednesday"/>
                            <DiscordChannel isVoice={true} name="Scholotzsky's Sunday"/>
                            <DiscordChannel isVoice={true} name="Off Work"/>
                            <DiscordChannel isVoice={true} name="Evemas"/>
                            <DiscordChannel isVoice={true} name="Phreaky Friday 😜😈😩"/>
                            <DiscordChannel isVoice={true} name="In Runeterra"/>
                            <DiscordChannel isVoice={true} name="♾🌈💘"/>
                            <DiscordChannel isVoice={true} name="Deciet 2 ranked vc"/>
                            <DiscordChannel isVoice={true} name="On the clock"/>
                            <DiscordChannel isVoice={true} name="Hot Tub (AFK)"/>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="bg-discord-chat max-w-6xl">
                    <div className="flex flex-row items-center shadow-md h-12 pl-4 gap-2">
                        <div className="text-3xl font-serif text-gray-500">#</div>
                        <div className="text-md font-mono text-white">general-3</div>
                        <div className="text-lg mx-2 text-gray-700">|</div>
                        <div className="text-sm text-gray-400">wayawayawayawayayaya</div>
                    </div>
                    Long ago there were a lot gaming gamers, and they were all very gamer. One day, a gamer gamer gamer gam
                </div>
            </div>
        </div>
    );
}