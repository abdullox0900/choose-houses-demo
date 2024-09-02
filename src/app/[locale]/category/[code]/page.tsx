'use client'

import BannerTwo from '@/components/Banner/BannerTwo'
import CardList from '@/components/CardList/CardList'
import CardWrapper from '@/components/CardWrapper/CardWrapper'
import FilterOptions from '@/components/FilterOptions/FilterOptions'
import LoadingSpinner from '@/ui/LoadingSpinner'
// pages/category/[id].tsx
import axios from 'axios'
import { useEffect, useState } from 'react'

interface Product {
    code: number
    name: string
    price: number
}

export default function CategoryPage({ params }: { params: { code: string } }) {
    const code = params.code
    const [housesData, setHousesData] = useState<Product[]>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios.get(`http://83.222.8.77/api/?category=${code}`)
            .then(response => {
                setHousesData(response.data.results)
                setLoading(false)
            })
            .catch(error => {
                console.error('Mahsulotlarni olishda xatolik:', error)
                setLoading(false)
            })
    }, [])

    console.log(housesData)


    if (loading) {
        return <LoadingSpinner />
    }

    return (
        <div>
            <BannerTwo />
            <div className='max-tablet-m:px-[20px]'>
                <FilterOptions />
            </div>
            <CardWrapper title='Uylar kategoriya boyicha'>
                <CardList houses={housesData} />
            </CardWrapper>
        </div>
    )
}