'use client'

import { Link } from '@/config/navigation'
import { useCurrentLocale } from '@/hooks/useCurrentLocale'
import LoadingSpinner from '@/ui/LoadingSpinner'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import Container from '../Container/Container'

const CategoryMenu = () => {

    const currentLang = useCurrentLocale()

    const { data, isLoading, error } = useQuery({
        queryKey: ['categories'],
        queryFn: () => axios.get('http://83.222.8.77/api/categories/')
    })

    if (isLoading) return <LoadingSpinner />
    if (error) return <div>Xatolik yuz berdi</div>

    return (
        <Container class='max-tablet:px-[0] '>
            <ul className='category-list flex justify-between items-center gap-[20px] mb-[110px] overflow-x-auto max-mobile-l:mb-[40px] px-[20px]'>
                {
                    data?.data?.slice(0, 5).map((item: any, index: number) => {
                        return (
                            <li key={index} >
                                <Link className='flex items-center justify-center relative w-[250px] h-[310px] rounded-[80px] text-white text-[28px] pointer cursor-pointer overflow-hidden max-tablet:rounded-[15px] max-tablet:min-w-[150px] max-tablet:max-h-[150px] max-mobile-l:min-w-[100px] max-mobile-l:max-h-[100px]' href={`/category/${item?.code}`}>
                                    <Image className='absolute w-full h-full max-tablet:w-[300px] max-tablet:h-[150px] object-cover' src={item.img} alt={item?.[`name_${currentLang}`]} width={300} height={300} />
                                    <span className='absolute bottom-[10%] max-tablet:text-[14px] max-mobile-l:text-[12px]'>{item?.[`name_${currentLang}`]}</span>
                                </Link>
                            </li>
                        )
                    })
                }

            </ul>
        </Container>
    )
}

export default CategoryMenu
