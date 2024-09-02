'use client'

import Image from 'next/image'

import SiteLogo from '@/assets/svg/site-logo.svg'
import Container from '../Container/Container'

import LoadingSpinner from '@/ui/LoadingSpinner'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { FaFacebook, FaInstagram, FaTelegram, FaYoutube } from "react-icons/fa"

export const Footer = () => {

  const { data, isLoading, error } = useQuery({
    queryKey: ['info'],
    queryFn: () => axios.get('http://83.222.8.77/api/info')
  })

  if (isLoading) return <LoadingSpinner />
  if (error) return <div>Xatolik yuz berdi</div>

  return (
    <footer className='py-[40px] bg-blue_10 '>
      <Container>
        <div className='flex items-center justify-between pb-[20px] mb-[20px] border-b-[1px] border-white max-tablet-m:flex-col max-tablet-m:gap-[10px]  max-tablet-m:w-full'>
          <Image className='max-tablet:w-[200px] max-tablet:h-[40px]' src={SiteLogo} alt={'site-logo'} width={200} height={80} unoptimized />
          <div className='flex flex-col gap-[10px]'>
            <a href={`tel:${data?.data.phone_number}`} className='text-[24px] text-white font-semibold max-tablet:text-[18px] max-mobile-m:text-[14px]'>{data?.data.phone_number}</a>
          </div>
          <div className='text-white text-[24px] font-semibold max-tablet:text-[18px] max-mobile-m:text-[14px]'>Ish vaqti: {`${data?.data.work_start.slice(0, 5)}`} - {`${data?.data.work_end.slice(0, 5)}`}</div>
        </div>
        <div className='flex items-center justify-between max-tablet-m:flex-col max-tablet-m:gap-[10px]'>
          <div className='text-white text-[16px] max-tablet:text-[14px]'>
            {data?.data.address_uz}
          </div>
          <div className='flex items-center gap-[30px] max-tablet:gap-[15px] '>
            <a href={data?.data.instagram} target='_blank'>
              <FaInstagram className='text-white text-[28px] max-tablet:text-[18px]' />
            </a>
            <a href={data?.data.telegram} target='_blank'>
              <FaTelegram className='text-white text-[28px] max-tablet:text-[18px]' />
            </a>
            <a href={data?.data.facebook} target='_blank'>
              <FaFacebook className='text-white text-[28px] max-tablet:text-[18px]' />
            </a>
            <a href={data?.data.youtube} target='_blank'>
              <FaYoutube className='text-white text-[28px] max-tablet:text-[18px]' />
            </a>
          </div>
          <nav>
            <ul className='flex items-center gap-[25px] text-white max-tablet:gap-[15px]'>
              <li>
                <a href="" className='text-[18px] font-semibold max-tablet:text-[14px]'>Kategoriyalar</a>
              </li>
              <li>
                <a href="" className='text-[18px] font-semibold max-tablet:text-[14px]'>Halol nasiya</a>
              </li>
              <li>
                <a href="" className='text-[18px] font-semibold max-tablet:text-[14px]'>Chegirma</a>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  )
}
