'use client'

import SiteLogo from '@/assets/svg/site-logo.svg'
import { Link } from '@/config/navigation'
import { useFavorites } from '@/context/FavoritesContext'
import { animated, useSpring } from '@react-spring/web'
import { Badge } from 'antd'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import HamburgerMenu from './common/HamburgerMenu'
import LocalSwitcher from './common/LocalSwitcher'

import { useCurrentLocale } from '@/hooks/useCurrentLocale'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { GrFavorite } from "react-icons/gr"


const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const t = useTranslations('header')
  const currentLang = useCurrentLocale()

  const menuAnimation = useSpring({
    height: isMenuOpen ? (menuRef.current?.scrollHeight || 0) : 0,
    marginTop: isMenuOpen ? 20 : 0,
    opacity: isMenuOpen ? 1 : 0,
    config: {
      tension: 400,
      friction: 26,
      clamp: true  // Bu animatsiyani to'xtatadi agar maqsadga yetsa
    }
  })

  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.style.height = isMenuOpen
        ? `${headerRef.current.offsetHeight + (menuRef.current?.scrollHeight || 0)}px`
        : 'auto'
    }
  }, [isMenuOpen])

  const { favorites } = useFavorites()

  const { data, error } = useQuery({
    queryKey: ['categories'],
    queryFn: () => axios.get('http://83.222.8.77/api/categories/'),
    select: (response) => response.data
  })

  return (
    <header ref={headerRef} className="container fixed left-1/2 -translate-x-1/2 top-5 w-full max-tablet-m:w-[90%] rounded-[10px] bg-blue-500 p-4 overflow-hidden transition-all duration-300 ease-in-out z-50">
      <div className=" mx-auto">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-white text-2xl font-bold">
            <Image className='max-tablet-m:w-[80px] max-tablet-m:h-[40px]' src={SiteLogo} alt='site-logo' unoptimized />
          </Link>
          <div className='flex items-center gap-[15px] max-mobile-m:gap-[8px]'>
            <nav className='max-tablet:hidden'>
              <ul className="flex items-center gap-[30px]">
                {data?.slice(0, 5)?.map((item: any, index: number) => (
                  <li key={index}>
                    <Link href={`/category/${item.code}`} className="text-white hover:text-blue-200">
                      {item?.[`name_${currentLang}`]}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <Link href='/favorites'>
              <Badge count={favorites.length}>
                <GrFavorite className='text-[25px] text-[#fff]' />
              </Badge>
            </Link>
            <LocalSwitcher />
            <HamburgerMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
          </div>
        </div>
        <animated.div style={menuAnimation} className="tablet:hidden">
          <nav ref={menuRef}>
            <ul className="flex flex-col space-y-2 h-[180px]">
              {['categories', 'halal_installment', 'discount', 'premium_house', 'outside_city'].map((item) => (
                <li key={item}>
                  <Link href={`/${item}`} className="text-white hover:text-blue-200">
                    {t(item)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </animated.div>
      </div>
    </header>
  )
}

export default Header