
export default function DiscordEmulator() {
    return(
        <div className="grid grid-cols-3">
            <div className=" border-2 border-red-500 col-span-1">Server bar
            </div>
            <div className="border-2 border-red-500 col-span-2">Channels
            </div>
            <div className="border-2 border-red-500 col-span-9">Chat
            </div>
        </div>
    );
}