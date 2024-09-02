'use client'

import BannerTwo from '@/components/Banner/BannerTwo'
import Container from '@/components/Container/Container'
import FilterOptions from '@/components/FilterOptions/FilterOptions'
import MaterialButton from '@/ui/MaterialButton'
import { Fancybox } from '@fancyapps/ui'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'

export default function AllPlans() {

    const { data } = useQuery({
        queryKey: ['plans'],
        queryFn: () => axios.get('http://83.222.8.77/api/plans'),
        select: (response) => response.data
    })

    const handleImageClick = (imageUrl: string) => {
        Fancybox.show([{ src: imageUrl, type: "image" }])
    }

    return (
        <>
            <BannerTwo />
            <div className='max-tablet-m:px-[20px]'>
                <FilterOptions />
            </div>
            <div className="py-[80px] rounded-lg max-tablet-m:rounded-none max-tablet-m:overflow-x-auto">
                <Container>
                    <h2 className="text-2xl font-bold mb-4 text-black">Plans</h2>
                    <div className="grid grid-cols-4 gap-4">
                        {data?.results?.map((option: any) => (
                            <div key={option.code} className="max-tablet-m:w-[350px] bg-white p-4 rounded-lg shadow-md">
                                <Image
                                    src={option.file}
                                    alt={`${option.number_of_rooms}-room apartment layout`}
                                    width={300}
                                    height={200}
                                    className="w-full h-[300px] mb-2"
                                />
                                <div className="text-sm">
                                    <p>{option.number_of_rooms}-XONA {option.area}м²</p>
                                    <p>{option.floor}-ETAJ</p>
                                    <p className="font-semibold">{option.adress}</p>
                                    <p className="text-gray-600">ot {option.price.toLocaleString()} sum</p>
                                </div>
                                <MaterialButton onClick={() => handleImageClick(option?.file)}
                                    className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">
                                    Ko'rish
                                </MaterialButton>
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        </>
    )
}