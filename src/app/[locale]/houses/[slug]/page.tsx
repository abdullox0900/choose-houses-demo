'use client'

import CardList from '@/components/CardList/CardList'
import { CardListModalForm } from '@/components/CardList/CardListModalForm'
import CardWrapper from '@/components/CardWrapper/CardWrapper'
import Container from '@/components/Container/Container'
import FancyboxImage from '@/components/FancyboxImage/FancyboxImage'
import PropertyCalculator from '@/components/PropertyCalculator/PropertyCalculator'
import YandexInnerMap from '@/components/YandexMap/common/YandexInnerMap'
import LoadingSpinner from '@/ui/LoadingSpinner'
import MaterialButton from '@/ui/MaterialButton'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { BsTelephoneFill } from 'react-icons/bs'
import { FaBuilding, FaDoorOpen, FaHome, FaMapMarkedAlt, FaMoneyBillAlt } from 'react-icons/fa'
import { MdTextsms } from 'react-icons/md'

interface installmentDetails {
    end_month: string
    init_payment: string
    percentage: string
    start_month: string
}[]

interface HouseDetail {
    address_kr: string
    address_ru: string
    address_uz: string
    company: string
    district: string
    floor_number: number
    image: string
    images_detail: string[]
    recommended_buildings: {}[]
    recommended_ads: {}[]
    building_flats: {}[]
    installment_details: installmentDetails
    is_installment: boolean
    is_new: boolean
    lat: number
    lon: number
    price: number
    min_price: number
    name_kr: string
    name_ru: string
    name_uz: string
    plans_detail: string[]
    slug: string
    type: number
    floor: number
    room: number
    description_uz: string
    phone1: string
    submit_date: string
    flat_quantity: number
}

const formatPrice = (price: number): string => {
    if (price == null) return "Narx ko'rsatilmagan"
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " so'm"
}


export default function HouseDetailPage({ params }: { params: { slug: string } }) {

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<HouseDetail | null>(null)

    const slugStatus = params.slug.slice(-1)
    const removeLastChar = params.slug?.slice(0, -1)

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [houseCode, setHouseCode] = useState<string>('')

    const openModal = (): void => setIsModalOpen(true)
    const closeModal = (): void => setIsModalOpen(false)

    const handleSubmitApplication = () => {
        // Ariza yuborish logikasi
    }

    const handleContact = () => {
        // Bog'lanish logikasi
    }

    useEffect(() => {
        setLoading(true)
        if (slugStatus == '1') {
            axios(`http://83.222.8.77/api/building/${removeLastChar}`).then((res) => {
                setData(res.data)
            }).catch((error) => {
                console.error("Ma'lumotlarni yuklashda xatolik:", error)
            }).finally(() => {
                setLoading(false)
            })
        } else if (slugStatus == '2') {
            axios(`http://83.222.8.77/api/ads/${removeLastChar}`).then((res) => {
                setData(res.data)
            }).catch((error) => {
                console.error("Ma'lumotlarni yuklashda xatolik:", error)
            }).finally(() => {
                setLoading(false)
            })
        } else {
            setLoading(false)
        }
    }, [])

    return (
        <div>
            {
                loading ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        <Container class='max-tablet-m:px-[20px]'>
                            <div className='mt-[200px] mb-[80px]'>
                                <div className='flex items-center justify-between mb-[45px] max-tablet-m:mb-[35px] max-mobile-l:mb-[20px]'>
                                    <h2 className='text-[34px] font-semibold max-tablet-m:text-[24px] max-mobile-l:text-[20px]'>“Havas” turar joy majmuasi</h2>
                                    <div className="flex space-x-4 p-4">

                                    </div>
                                </div>
                                <div className='flex gap-[70px]'>
                                    <div className={`${slugStatus == '2' ? 'w-full' : ''} w-[70%] mb-[45px] max-desktop-m:w-full`}>
                                        <FancyboxImage
                                            key={1}
                                            status={1}
                                            newClass={'h-[500px] mb-[20px] rounded-[25px]'}
                                            src={data?.image ?? ''}
                                            thumbnail={data?.image ?? ''}
                                            alt={data?.description_uz ?? ''}
                                            width={100}
                                            height={400}
                                        />
                                        <div className='grid grid-cols-3 items-center gap-[30px] max-tablet-m:gap-[10px]'>
                                            {
                                                data?.images_detail.slice(0, 6).map((item: string, index: number) => {
                                                    return (
                                                        <FancyboxImage
                                                            key={index}
                                                            src={item}
                                                            status={1}
                                                            newClass={'h-[280px] rounded-[10px]'}
                                                            thumbnail={item}
                                                            alt={'img'}
                                                            width={100}
                                                            height={280}
                                                        />
                                                    )
                                                })

                                            }
                                        </div>
                                        <div className="flex gap-[30px] items-center w-full mt-[30px] max-mobile-l:flex-col">
                                            <div className="flex justify-between w-[50%] gap-[25px] max-mobile-l:w-full">
                                                {
                                                    slugStatus == '1' ? (
                                                        <div className='flex flex-col w-full'>
                                                            <div className='flex flex-col gap-[25px]'>
                                                                <div className="flex items-center">
                                                                    <FaBuilding className="text-blue-500 text-2xl mr-3" />
                                                                    <div>
                                                                        <div className="text-xs text-gray-500">Qavat</div>
                                                                        <div className="text-base font-bold">{data?.floor_number}</div>
                                                                    </div>
                                                                </div>
                                                                {/* <div className="flex items-center">
                                                                <FaCalendarAlt className="text-blue-500 text-2xl mr-3" />
                                                                <div>
                                                                    <div className="text-xs text-gray-500">{`Bo'lib to'lash muddati`}</div>
                                                                    <div className="text-base font-bold">{data?.submit_date}</div>
                                                                </div>
                                                            </div> */}
                                                                <div className="flex items-center">
                                                                    <FaHome className="text-blue-500 text-2xl mr-3" />
                                                                    <div>
                                                                        <div className="text-xs text-gray-500">Kvartiralar soni</div>
                                                                        <div className="text-base font-bold">{data?.flat_quantity}</div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <FaMapMarkedAlt className="text-blue-500 text-2xl mr-3" />
                                                                    <div>
                                                                        <div className="text-xs text-gray-500">Address</div>
                                                                        <div className="text-base font-bold">{data?.address_uz}</div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <FaMoneyBillAlt
                                                                        className="text-blue-500 text-2xl mr-3" />
                                                                    <div>
                                                                        <div className="text-xs text-gray-500">Narxi</div>
                                                                        <div className="text-base font-bold">{formatPrice(data?.min_price ?? 0)}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <MaterialButton className='w-full mt-[15px]' onClick={openModal}>
                                                                Ariza topshirish
                                                            </MaterialButton>
                                                        </div>
                                                    ) : (
                                                        <div className='flex flex-col'>
                                                            <div className='grid grid-cols-2 gap-[25px] max-tablet:grid-cols-1'>
                                                                <div className="flex items-center">
                                                                    <FaBuilding className="text-blue-500 text-2xl mr-3" />
                                                                    <div>
                                                                        <div className="text-xs text-gray-500">Qavat</div>
                                                                        <div className="text-base font-bold">{data?.floor}</div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <FaDoorOpen className="text-blue-500 text-2xl mr-3" />
                                                                    <div>
                                                                        <div className="text-xs text-gray-500">Xonalar</div>
                                                                        <div className="text-base font-bold">{data?.room}</div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <FaMapMarkedAlt className="text-blue-500 text-2xl mr-3" />
                                                                    <div>
                                                                        <div className="text-xs text-gray-500">Address</div>
                                                                        <div className="text-base font-bold">{data?.address_uz}</div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <MdTextsms
                                                                        className="text-blue-500 text-2xl mr-3" />
                                                                    <div>
                                                                        <div className="text-xs text-gray-500">Description</div>
                                                                        <div className="text-base font-bold">{data?.description_uz}</div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <FaMoneyBillAlt
                                                                        className="text-blue-500 text-2xl mr-3" />
                                                                    <div>
                                                                        <div className="text-xs text-gray-500">Narxi</div>
                                                                        <div className="text-base font-bold">{formatPrice(data?.price ?? 0)}</div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <BsTelephoneFill
                                                                        className="text-blue-500 text-2xl mr-3" />
                                                                    <div>
                                                                        <div className="text-xs text-gray-500">Boglanish</div>
                                                                        <div className="text-base font-bold">{data?.phone1}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            <YandexInnerMap latitude={data ? data.lon : 0} longitude={data ? data.lat : 0} />
                                        </div>
                                    </div>
                                    <div className={`${slugStatus == '2' ? 'hidden' : ''} w-[30%] max-desktop-m:hidden`}>
                                        <div className='flex flex-col gap-[20px] mb-[25px]'>
                                            {
                                                slugStatus == '1' ? (
                                                    data?.plans_detail.slice(0, 4)?.map((item: string, index: number) => {
                                                        return (
                                                            <FancyboxImage
                                                                key={index}
                                                                status={3}
                                                                src={item}
                                                                newClass={'rounded-[10px]'}
                                                                thumbnail={item}
                                                                alt={item}
                                                                width={100}
                                                                height={280}
                                                            />
                                                        )
                                                    })
                                                ) : (
                                                    ""
                                                )
                                            }
                                        </div>
                                        <div className={`${data?.is_new ? '' : 'hidden'}`}>
                                            <PropertyCalculator
                                                initialDuration={30}
                                                maxDuration={60}
                                                initialArea={86}
                                                maxArea={200}
                                                initialPercentage={50}
                                                initialTotalPrice={formatPrice(data?.min_price ?? 0)}
                                                initialMonthlyPayment="4 700 000"
                                                onSubmitApplication={handleSubmitApplication}
                                                onContact={handleContact}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <CardListModalForm isOpen={isModalOpen} onClose={closeModal} code={houseCode} />
                        </Container>
                        <CardWrapper title="Shunga o'xshash uylar">
                            <CardList houses={slugStatus == '1' ? data?.recommended_buildings : data?.recommended_ads} />
                        </CardWrapper>
                    </>
                )
            }
        </div>
    )
}

