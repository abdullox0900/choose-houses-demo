'use client'

import Container from '@/components/Container/Container'
import { Link } from '@/config/navigation'
import { useFavorites } from '@/context/FavoritesContext'
import { notification } from 'antd'
import Image from 'next/image'
import { useCallback } from 'react'
import { GoHeartFill } from 'react-icons/go'

interface House {
  slug: string
  title: string
  price: number
  address: string
  deadline: string
  area: number
  room: number
  floor: number
  image: string
  status: number
  min_price: number
}

const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " so'm"
}

export default function FavoritesPage() {

  const { favorites, removeFromFavorites, clearAllFavorites } = useFavorites()

  const toggleFavorite = useCallback((house: House) => {
    removeFromFavorites(house.slug)
    notification.info({
      message: "O'chirildi",
      description: "Uy sevimlilar ro'yxatidan o'chirildi",
    })
  }, [removeFromFavorites])

  if (favorites.length === 0) {
    return <div className="text-center py-10">Sevimli uylar yo'q</div>
  }

  return <div>
    <Container class='max-tablet-m:px-[20px]'>
      <div className='flex justify-between items-center mb-[35px]'>
        <h4 className='text-[34px]'>Saqlanganlar</h4>
        <button className='text-red-500' onClick={clearAllFavorites}>Barchasini o’chirish</button>
      </div>
      <ul className='grid grid-cols-4 flex-wrap gap-[20px] gap-y-[50px] mb-[50px] justify-between max-tablet:grid-cols-2 max-tablet-m:grid-cols-1 max-mobile-l:justify-center max-mobile-l:gap-[15px] max-mobile-l:mb-[25px]'>
        {favorites.map((house: House) => (
          <li key={house.slug} className='relative bg-white rounded-md overflow-hidden max-mobile-l:w-[100%] shadow-md'>
            <div className="relative">
              <Link href={`houses/${house.slug}`}>
                <Image className='w-full h-[212px] rounded-sm object-cover max-mobile-l:w-[100%]' src={`${house.image}`} alt='home-img' width={335} height={212} />
              </Link>
              <span className='absolute top-[10px] left-[10px] p-[5px] rounded-sm text-white text-[12px] bg-[#e2ac1d]'>SKIDKA</span>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  toggleFavorite(house)
                }}
                className={`absolute top-[5px] right-[5px] w-[34px] h-[34px] rounded-full 
                          flex items-center justify-center 
                          transition-all duration-300 ease-in-out
                          transform bg-[#3889f280]`}
              >
                <GoHeartFill className="w-[18px] h-[18px] text-[#3889f2] transition-all duration-300 ease-in-out hover:scale-110 active:scale-95" />
              </button>
            </div>
            <div className='px-[10px] py-[20px]'>
              <div className='flex items-center justify-between mb-[10px]'>
                <h4 className='text-[20px] text-[#2a2a2a] font-semibold  max-tablet-m:text-[16px]'>{house.title}</h4>
                <div className='text-[20px] text-[#2a2a2a] font-semibold max-tablet-m:text-[16px]' suppressHydrationWarning>{house.status == 1 ? formatPrice(house?.min_price ?? 0) : formatPrice(house?.price ?? 0)}</div>
              </div>
              <p className='text-[#2b2b2b] mb-[15px] max-mobile-l:text-[14px]'>{house.address}</p>
              <div className='flex items-center justify-between mb-[10px] text-[#737373] text-[16px] max-mobile-l:text-[14px]'>
                <div>Topshirilish muddati:</div>
                <div>{house.deadline}</div>
              </div>
              <div className='flex items-center justify-between mb-[10px] text-[#737373] text-[16px] max-mobile-l:text-[14px]'>
                <div>Bo'lib to'lash</div>
                <div>{house.area} oy</div>
              </div>
              <div className='flex items-center justify-between mb-[10px] text-[#737373] text-[16px] max-mobile-l:text-[14px]'>
                <div>Xonalar</div>
                <div>{house.room}</div>
              </div>
              <div className='flex items-center justify-between mb-[10px] text-[#737373] text-[16px] max-mobile-l:text-[14px]'>
                <div>Etaj</div>
                <div>{house.floor}</div>
              </div>
              <button className='w-full py-[10px] text-white bg-blue_10 rounded-sm hover max-mobile-l:text-[14px]'>Ariza qoldirish</button>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  </div>
}