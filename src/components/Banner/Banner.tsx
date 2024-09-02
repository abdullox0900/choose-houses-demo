import React from 'react'
import Container from '../Container/Container'
import PremiumImg from '@/assets/svg/21.svg'
import Image from 'next/image'

export const Banner = () => {
    return (
        <Container class='max-tablet-m:px-[20px]'>
            <div className='relative w-full h-[335px] my-[110px] rounded-[20px] banner-bg p-[40px] max-tablet:p-[25px] max-tablet:h-[270px] max-mobile-l:h-auto'>
                <h3 className='w-[750px] text-[45px] text-white font-bold mb-[15px] max-tablet:text-[28px] max-tablet:w-full max-mobile-l:text-[22px]'>O’ZIMIZ UCHUN QURGANDEK <span className='text-blue_10'>MASJID YONINGIZDA</span></h3>
                <p className='w-[600px] text-[30px] text-white max-tablet:text-[18px] max-tablet:w-full max-mobile-l:text-[16px]'>
                    MUDDATLI TO’LOV KALIT QOLINGIZGA TEKKUNCHA
                </p>
                <Image className="absolute right-[20px] top-[50px] max-tablet:w-[200px] max-tablet:top-[50%] max-tablet-m:hidden" src={PremiumImg} alt="premium21" />
            </div>
        </Container>
    )
}
