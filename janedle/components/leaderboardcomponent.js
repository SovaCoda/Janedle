import { useState, useEffect } from 'react'
import { getAllData } from '@/firestore/getData'

export default function LeaderboardComponent () {
    const [users, setUsers] = useState([{'name': 'loading', 'score': 'loading'}])
    const [loading, setLoading] = useState(true)
    var data =[]

    useEffect(() => {
        setLoading(true)
        console.log('fetching users')
        const fetchUsers = async () => {
            data = await (await getAllData('users')).result
            setUsers(data)
            setLoading(false)
            console.log(data)
        }
        fetchUsers()
    }, [])

    return (
        <table className="table-auto max-w-4xl adaptive-text-md">
            <thead>
                <tr>
                    <th className="px-4 py-2">Rank</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Score</th>
                </tr>
            </thead>
            <tbody>
                {users.sort((a, b) => b.score - a.score).map((item, index) => (
                    <tr className={index % 2 === 0 ? "bg-gray-600" : "bg-gray-700"} key={item.email}>
                        <td className="border px-4 py-2">{index + 1}</td>
                        <td className="border px-4 py-2">{item.name}</td>
                        <td className="border px-4 py-2">{item.score}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}