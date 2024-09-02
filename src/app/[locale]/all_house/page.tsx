'use client'

import BannerTwo from '@/components/Banner/BannerTwo'
import CardList from '@/components/CardList/CardList'
import CardWrapper from '@/components/CardWrapper/CardWrapper'
import FilterOptions from '@/components/FilterOptions/FilterOptions'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function AllHouses() {

    const { data: allHousesData } = useQuery({
        queryKey: ['all-houses'],
        queryFn: () => axios.get('http://83.222.8.77/api/all-ads'),
        select: (response) => response.data
    })

    return (
        <>
            <BannerTwo />
            <div className='max-tablet-m:px-[20px]'>
                <FilterOptions />
            </div>
            <CardWrapper title='Bracha uylar'>
                <CardList houses={allHousesData?.results} />
            </CardWrapper>
        </>
    )
}