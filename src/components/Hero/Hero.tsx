import CategoryImg from '@/assets/svg/categori-hero.svg'
import { useCurrentLocale } from '@/hooks/useCurrentLocale'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import React from 'react'
import Container from '../Container/Container'

const Hero: React.FC = () => {

  const currentLang = useCurrentLocale()

  const { data, error } = useQuery({
    queryKey: ['banner'],
    queryFn: () => axios.get('http://83.222.8.77/api/banner'),
    select: (response) => response.data
  })

  if (error) return <div>Xatolik yuz berdi</div>

  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-lg mb-[50px] max-mobile-l:mb-[40px]">
        <div style={{ backgroundImage: `url(${data?.img})` }} className="hero-col-one relative py-[50px] px-[25px] md:col-span-2 md:h-[405px] h-[405px] rounded-[10px] max-mobile-l:h-[300px] max-mobile-l:py-[35px] max-tablet-m:rounded-md">
          <div className='absolute right-[0px] bottom-[0px] w-[180px] h-[180px] bg-white rounded-full max-tablet-m:hidden '>
            <div className='absolute top-[15px] right-[15px] w-[150px] h-[150px] bg-blue-500 rounded-full max-tablet-m:hidden'>
              <Image src={CategoryImg} alt='img' />
            </div>
          </div>
          <h1 className='hero-title font-semibold text-[56px] text-white mb-[40px] max-tablet-m:leading-[45px] max-tablet-m:text-[40px] max-tablet-m:mb-[20px] max-mobile-l:text-[28px] max-mobile-l:leading-[35px] max-mobile-l:mb-[15px] highlight rounded-sm '>{data?.[`title_${currentLang}`]}</h1>
          <div className='mt-[20px]'>
            <p className='inline-block bg-white mb-[20px] text-[22px] text-[#2B2B2B] rounded-[5px] p-[5px] max-tablet-m:mb-[10px] max-tablet-m:text-[14px] max-mobile-l:text-[12px] max-mobile-l:p-[2px]'>{data?.[`text_1_${currentLang}`]}</p>
            <br />
            <p className='inline-block bg-white text-[22px] text-[#2B2B2B] rounded-[5px] p-[5px] max-tablet-m:text-[14px] max-mobile-l:text-[12px] max-mobile-l:p-[2px]'>{data?.[`text_2_${currentLang}`]}</p>
          </div>

        </div>
        <div className="md:col-span-1 grid grid-rows-2 gap-4 max-tablet-m:hidden">
          <div style={{ backgroundImage: `url(${data?.home_1_img})` }} className="hero-col-two relative h-[190px] rounded-[10px] max-mobile-l:h-[100px]">
            <span className='absolute top-[10px] left-[10px] bg-blue-500 font-semibold text-[16px] text-white p-[5px] rounded-[5px] max-mobile-l:text-[12px]'>{data?.[`home_1_title_${currentLang}`]}</span>
          </div>
          <div style={{ backgroundImage: `url(${data?.home_2_img})` }} className="hero-col-three relative  h-[190px] rounded-[10px] max-mobile-l:h-[100px] max-tablet-m:hidden">
            <span className='absolute top-[10px] left-[10px] bg-blue-500 font-semibold text-[16px] text-white p-[5px] rounded-[5px] max-mobile-l:text-[12px]'>{data?.[`home_2_title_${currentLang}`]}</span>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Hero