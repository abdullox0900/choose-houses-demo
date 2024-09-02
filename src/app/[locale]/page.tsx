'use client'

import { Banner } from '@/components/Banner/Banner'
import CardList from '@/components/CardList/CardList'
import CardWrapper from '@/components/CardWrapper/CardWrapper'
import CategoryMenu from '@/components/CategoryMenu/CategoryMenu'
import ComfortLivingPlanner from '@/components/ComfortLivingPlanner/ComfortLivingPlanner'
import ContactUsForm from '@/components/ContactUsForm/ContactUsForm'
import FAQComponent from '@/components/FAQComponent/FAQComponent'
import FilterOptions from '@/components/FilterOptions/FilterOptions'
import Hero from '@/components/Hero/Hero'
import { MainSection } from '@/components/MainSection/MainSection'
import LoadingSpinner from '@/ui/LoadingSpinner'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function Home() {

  const { data: topData, isLoading: topLoading, error: topError } = useQuery({
    queryKey: ['top'],
    queryFn: () => axios.get('http://83.222.8.77/api/top/')
  })

  const { data: dataBuilding, isLoading, error } = useQuery({
    queryKey: ['top'],
    queryFn: () => axios.get('http://83.222.8.77/api/building')
  })

  if (topLoading) return <LoadingSpinner />
  if (topError) return <div>Xatolik yuz berdi</div>

  console.log(dataBuilding)


  return (
    <>
      <MainSection>
        <Hero />
        <FilterOptions />
      </MainSection>
      <CategoryMenu />
      <CardWrapper title='Top uylar' >
        <CardList houses={topData?.data} />
      </CardWrapper>
      <ContactUsForm />
      <ComfortLivingPlanner />
      <CardWrapper title='Eng yaxshi narxdagi takliflar'>
        <CardList houses={dataBuilding?.data} />
      </CardWrapper>
      <Banner />
      {/* <LocationInfrastructure /> */}
      <FAQComponent />
    </>
  )
}
