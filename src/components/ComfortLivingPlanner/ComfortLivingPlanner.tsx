import HomePlanImg2 from '@/assets/img/home-plan-img-2.png'
import { Link } from '@/config/navigation'
import MaterialButton from '@/ui/MaterialButton'
import { Fancybox } from '@fancyapps/ui'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import React from 'react'
import Container from '../Container/Container'

interface PlanOption {
  id: number
  rooms: number
  area: number
  floor: number
  price: number
  imageUrl: any
}

const ComfortLivingPlanner: React.FC = () => {

  const { data: plansData } = useQuery({
    queryKey: ['plans'],
    queryFn: () => axios.get('http://83.222.8.77/api/plans/'),
    select: (response) => response.data
  })

  const handleImageClick = (imageUrl: string) => {
    Fancybox.show([{ src: imageUrl, type: "image" }])
  }

  return (
    <div className="bg-blue_10 plan-bg py-[80px] rounded-lg max-tablet-m:rounded-none max-tablet-m:overflow-x-auto">
      <Container class='max-tablet-m:px-[20px]'>
        <h2 className="text-2xl font-bold mb-4 text-white">Komfort yashash uchun qulay planirovkalar</h2>
        <div className="grid grid-cols-4 gap-4 max-tablet:grid-cols-3 max-tablet-m:grid-cols-2 max-mobile-550:grid-cols-1">
          {plansData?.results?.slice(0, 3)?.map((option: any) => (
            <div key={option.code} className="max-tablet-m:w-full bg-white p-4 rounded-lg shadow-md">
              <Image
                src={option.file}
                alt={`${option.number_of_rooms}-room apartment layout`}
                width={300}
                height={200}
                className="w-full h-[300px] mb-2 object-cover"
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
          <Link href={'/plans'} className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-center items-center">
            <h3 className="text-[30px] text-blue_10 font-semibold mb-[25px] text-center max-mobile-l:text-[25px] max-mobile-m:mb-[15px]">Barcha variantlarni ko'rish</h3>
            <Image
              src={HomePlanImg2}
              alt="All options"
              width={350}
              height={150}
              className="w-[250px] h-[150px] object-cover mb-2 max-tablet-m:w-full max-mobile-m:leading-3"
            />
          </Link>
        </div>
      </Container>
    </div>
  )
}

export default ComfortLivingPlanner