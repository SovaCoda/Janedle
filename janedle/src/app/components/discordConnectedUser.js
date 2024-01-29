
export default function discordConnectedUser({name})
{
    const nameLookup = {
        "Jane": "dragrim",
        "Dylan": "kranken",
        "Aswin": "bananaDraco",
        "Conner": "bananaox",
        "Hamze": "ham",
        "Kacy": "kc",
        "Reese": "rrocks003",
        "Ian": "Betrayer of Customs Ian",
        "AJ": "King Antmer The Sower of Chaos",
        "Thomas": "Kazu",
        "Alex": "Dragan",
        "Dragon": "Dragon",
        "ConnerMeadows": "Gator",
        "Caleb": "Caleb",
        "Fabio": "Fallen",
        "Nathan": "Oiled up John Aidan",
        "James": "Jimothy",
        "Joey": "AgeofDefeat",
        "Quinn": "ParagonofHonor",
        "Vedanth": "vadup",
    }
    return(
        <div>
            <div className="flex flex-row items-end justify-start h-full px-4 py-1 gap-2 cursor-pointer hover:bg-discord-channel-bar-bright">
                <img src={`/profpics/${name}.webp`} className="rounded-full w-5 "></img>
                <div className="text-xs text-gray-300">{nameLookup[name]}</div>
            </div>
        </div>
    )
}