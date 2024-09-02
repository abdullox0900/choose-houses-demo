'use client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'


interface SearchResult {
    id: string
    title: string
    price: number
    area: number
    rooms: number
    address: string
    // Boshqa kerakli maydonlarni qo'shing
}

const SearchResultsPage = ({ params }: { params: { query: string } }) => {

    const searchParams = useSearchParams()

    // Barcha parametrlarni olish
    const { condition, district, max_price, max_size, min_price, min_size, room_number } = Object.fromEntries(searchParams.entries())
    const all = Object.fromEntries(searchParams.entries())

    console.log('All params:', district)
    console.log(all)

    const { data: searchResults, isLoading, error } = useQuery({
        queryKey: ['searchResults'],
        queryFn: async () => {
            const response = await axios.get(`http://83.222.8.77/api/flats/?max_size=${max_size}&min_size=${min_size}&district=${district}&room_number=${room_number}&condition=${condition}&max_price=${max_price}&min_price=${min_price}`)
            return response.data.results
        },
    })

    console.log(searchResults)

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Qidiruv natijalari</h1>
            {searchResults && searchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    Hello
                </div>
            ) : (
                <p>Qidiruv natijalari topilmadi.</p>
            )}
        </div>
    )
}

export default SearchResultsPage