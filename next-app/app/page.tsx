import {Inter} from 'next/font/google'
import {useSessionContext} from 'supertokens-auth-react/recipe/session';


const inter = Inter({subsets: ['latin']})
export type pageProps = {
    _id: string,
    posted_by: string,
    title: string,
    description: string
}

async function getData() {
    const res = await fetch("http://localhost:3000/message", { cache: 'no-store' })
    return res.json()
}


export default async function Home() {
    const data: pageProps[] = await getData();

    return (
        <>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Sl.no
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Description
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Posted By
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((dt, index) => {
                        return (
                            <tr key={dt._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {index}
                                </th>
                                <td className="px-6 py-4">
                                    {dt.title}
                                </td>
                                <td className="px-6 py-4">
                                    {dt.description}
                                </td>
                                <td className="px-6 py-4">
                                    {dt.posted_by}
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </>
    )
}
