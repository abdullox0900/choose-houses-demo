'use client'

import { Link } from '@/config/navigation'
import { useFavorites } from '@/context/FavoritesContext'
import { notification } from 'antd'
import Image from 'next/image'
import React, { useCallback, useState } from 'react'
import { GoHeart, GoHeartFill } from 'react-icons/go'

interface House {
  slug: string
  code: string // Changed from slug to code
  title_uz: string
  title_ru: string
  title_kr: string
  name_uz: string
  name_kr: string
  name_ru: string
  price: number
  min_price: number
  address_uz: string
  address_ru: string
  address_kr: string
  submit_date: string
  area: number
  flat_quantity: number
  floor_number: number
  image: string
  status: number
}

interface CardListProps {
  houses: House[] | any
}

const formatPrice = (price: number): string => {
  if (price == null) return "Narx ko'rsatilmagan"
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " so'm"
}

const CardList: React.FC<CardListProps> = ({ houses }) => {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites()
  const [inionValue, setInionValue] = useState(6)

  const toggleFavorite = useCallback((house: House) => {
    const isFavorite = favorites.some((fav: any) => fav.code === house.code)
    if (isFavorite) {
      removeFromFavorites(house.code)
      notification.info({
        message: "O'chirildi",
        description: "Uy sevimlilar ro'yxatidan o'chirildi",
      })
    } else {
      addToFavorites(house)
      notification.success({
        message: "Qo'shildi",
        description: "Uy sevimlilar ro'yxatiga qo'shildi",
      })
    }
  }, [favorites, addToFavorites, removeFromFavorites])

  console.log(houses)

  return (
    <>
      <ul className='grid grid-cols-3 gap-[20px] gap-y-[50px] mb-[50px] max-desktop-m:grid-cols-3 max-mobile-l:gap-y-[25px] max-tablet:grid-cols-2 max-tablet-m:grid-cols-1 max-mobile-l:gap-[15px] max-mobile-l:mb-[25px]'>
        {houses?.slice(0, inionValue).map((house: House) => {
          const isFavorite = favorites.some((fav: any) => fav.code === house.code)
          return (
            <li key={house.code} className='relative bg-white rounded-md overflow-hidden max-mobile-l:w-[100%]'>
              <div className="relative">
                <Link href={`/houses/${house?.slug}${house.status}`}>
                  <Image className='w-full h-[212px] rounded-sm object-cover max-mobile-l:w-[100%]' src={`${house?.image}`} alt='home-img' width={335} height={212} />
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
                  {isFavorite ? (
                    <GoHeartFill className="w-[18px] h-[18px] text-[#fff] transition-all duration-300 ease-in-out hover:scale-110 active:scale-95" />
                  ) : (
                    <GoHeart className="w-[18px] h-[18px] text-[#fff] transition-all duration-300 ease-in-out hover:scale-110 active:scale-95" />
                  )}
                </button>
              </div>
              <div className='px-[10px] py-[20px]'>
                <div className='flex items-center justify-between mb-[10px]'>
                  <h4 className='text-[18px] text-[#2a2a2a] font-semibold  max-tablet-m:text-[16px]'>{house.status == 1 ? house?.name_uz?.length > 15 ? house?.name_uz?.slice(0, 15) + '...' : house?.name_uz : house?.title_uz?.length > 15 ? house?.title_uz?.slice(0, 15) + '...' : house?.title_uz}</h4>
                  <div className='text-[16px] text-[#2a2a2a] font-semibold max-mobile-m:text-[14px]' suppressHydrationWarning>{house.status == 1 ? formatPrice(house.min_price) : formatPrice(house.price)}</div>
                </div>
                <p className='text-[#2b2b2b] mb-[15px] max-mobile-l:text-[14px]'>{house?.address_uz}</p>
                <div className='flex items-center justify-between mb-[10px] text-[#737373] text-[16px] max-mobile-l:text-[14px]'>
                  <div>Topshirilish muddati:</div>
                  <div>{house?.submit_date}</div>
                </div>
                <div className='flex items-center justify-between mb-[10px] text-[#737373] text-[16px] max-mobile-l:text-[14px]'>
                  <div>Xonalar</div>
                  <div>{house?.flat_quantity}</div>
                </div>
                <div className='flex items-center justify-between mb-[10px] text-[#737373] text-[16px] max-mobile-l:text-[14px]'>
                  <div>Etaj</div>
                  <div>{house?.floor_number}</div>
                </div>
                <Link href={`/houses/${house?.slug}${house.status}`} className='inline-block text-center w-full py-[10px] text-white bg-blue_10 rounded-sm hover max-mobile-l:text-[14px]'>Batafsil</Link>
              </div>
            </li>
          )
        })}
      </ul>
      {houses && houses.length > 0 && inionValue < houses.length ? (
        <button className='w-full py-[20px] border-[1px] border-blue_10 text-blue_10 text-[22px] hover max-mobile-l:text-[14px]' onClick={() => setInionValue(inionValue + 3)}>Koproq ko'rish</button>
      ) : (<></>)}
    </>
  )
}

export default CardList