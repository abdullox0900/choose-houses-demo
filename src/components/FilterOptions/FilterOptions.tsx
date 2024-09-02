'use client'

import { Select } from 'antd'
import Image from 'next/image'
import { useMemo, useState } from 'react'

import { Link } from '@/config/navigation'
import { useCurrentLocale } from '@/hooks/useCurrentLocale'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import MapLocationImg from '../../assets/img/map-location-icon.png'
import MapImg from '../../assets/img/map.png'
interface FilterComponentProps {
    onFilterChange: (filters: FilterState) => void
}

interface FilterState {
    binoTuri: string
    viloyat: string
    tuman: string
    xonalarSoni: string
    narxFrom: string
    narxTo: string
    maydoniFrom: string
    maydoniTo: string
}

interface Province {
    code: string
    name_uz: string
    name_kr: string
    name_ru: string
    districes: District[]
}

interface District {
    code: string
    name_uz: string
    name_kr: string
    name_ru: string
    province: string
}
const FilterOptions: React.FC = () => {

    const t = useTranslations('filterComponent')
    const router = useRouter()

    const currentLang = useCurrentLocale()

    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState(false)

    const [filters, setFilters] = useState<FilterState>({
        binoTuri: '1',
        viloyat: '',
        tuman: '',
        xonalarSoni: '1',
        narxFrom: '0',
        narxTo: '0',
        maydoniFrom: '0',
        maydoniTo: '0',
    })

    const openModal = () => setModalIsOpen(true)
    const closeModal = () => setModalIsOpen(false)

    const handleInputChange = (name: keyof FilterState, value: string) => {
        setFilters(prev => ({ ...prev, [name]: value }))
        if (name === 'viloyat') {
            setFilters(prev => ({ ...prev, tuman: '' }))
        }
    }

    const { data: provincesData, isLoading: provincesLoading, error: provincesError } = useQuery<Province[]>({
        queryKey: ['provinces'],
        queryFn: () => axios.get('http://83.222.8.77/api/provinces/').then(res => res.data),
    })

    const selectedProvince = useMemo(() => {
        return provincesData?.find(province => province.code === filters.viloyat)
    }, [provincesData, filters.viloyat])

    const districtOptions = useMemo(() => {
        return selectedProvince?.districes.map(district => ({
            value: district.code,
            label: district.name_uz,
        })) || []
    }, [selectedProvince])

    const handleSearch = async () => {
        try {
            router.push(`/${currentLang}/search-results/${`flats?max_size=${filters.maydoniTo}&min_size=${filters.maydoniFrom}&district=${filters.tuman}&room_number=${filters.xonalarSoni}&condition=${filters.binoTuri}&max_price=${filters.maydoniTo}&min_price=${filters.narxFrom}`}`)
        } catch (error) {
            console.error('Search error:', error)
        }
    }

    return (
        <section className='container max-tablet-m:px-[20px] mx-auto max-tablet:w-full w-[80%] h-[184px] py-[15px] px-[25px] mb-[75px] rounded-md shadow-[0_3px_20px_0_rgba(56,137,242,0.3)] bg-white max-tablet-m:h-[90px] max-mobile-l:mb-[40px] max-tablet:mb-[50px] max-tablet-m:flex max-mobile-m:px-[15px]'>
            <div className='max-tablet-m:hidden mb-[20px]'>
                <div className="grid grid-cols-6 gap-[20px] max-[1200px]:gap-[10px] max-tablet-m:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">{t('buildingType')}</label>
                        <Select
                            value={filters.binoTuri || undefined}
                            className='mt-1 h-[38px]'
                            style={{ width: '100%' }}
                            onChange={(value) => handleInputChange('binoTuri', value)}
                            options={[
                                { value: 'Kommercheski', label: 'Kommercheski' },
                                { value: 'Turar-joy', label: 'Turar-joy' },
                            ]}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">{t('location')}</label>
                        <Select
                            value={filters.viloyat || undefined}
                            className='mt-1 h-[38px]'
                            style={{ width: '100%' }}
                            onChange={(value) => handleInputChange('viloyat', value)}
                            options={provincesData?.map((item: Province) => ({
                                value: item.code,
                                label: item.name_uz
                            }))}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">{t('location')}</label>
                        <Select
                            value={filters.tuman || undefined}
                            className='mt-1 h-[38px]'
                            style={{ width: '100%' }}
                            onChange={(value) => handleInputChange('tuman', value)}
                            options={districtOptions}
                            disabled={!filters.viloyat}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">{t('roomCount')}</label>
                        <div className="mt-1 flex gap-[5px] border-[1px] rounded-md p-[4px] border-gray-300 max-tablet:overflow-auto">
                            {['1', '2', '3', '4+'].map((num) => (
                                <button
                                    key={num}
                                    onClick={() => handleInputChange('xonalarSoni', num)}
                                    className={`px-3 py-1 text-sm font-medium ${filters.xonalarSoni === num ? 'bg-blue_10 text-white' : 'bg-white text-gray-700'} rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue_10`}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">{t('price')}</label>
                        <div className="mt-1 flex flex-col">
                            <div className='flex items-center gap-[10px]'>
                                <input
                                    type="number"
                                    value={filters.narxFrom}
                                    onChange={(e) => handleInputChange('narxFrom', e.target.value)}
                                    placeholder="OT"
                                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <input
                                    type="number"
                                    value={filters.narxTo}
                                    onChange={(e) => handleInputChange('narxTo', e.target.value)}
                                    placeholder="DO"
                                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">{t('area')}</label>
                        <div className="flex flex-col mt-1">
                            <div className='flex items-center gap-[10px]'>
                                <input
                                    type="number"
                                    value={filters.maydoniFrom}
                                    onChange={(e) => handleInputChange('maydoniFrom', e.target.value)}
                                    placeholder="OT"
                                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <input
                                    type="number"
                                    value={filters.maydoniTo}
                                    onChange={(e) => handleInputChange('maydoniTo', e.target.value)}
                                    placeholder="DO"
                                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-between max-tablet-m:w-full'>
                <div className='flex items-center gap-[15px]'>
                    <button className='hidden max-tablet-m:flex items-center justify-center w-[35px] h-[35px] bg-[rgba(56,137,242,0.25)] hover rounded-sm' onClick={() => setIsOpen(true)}>
                        <svg width={26} height={24} viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M18 0.75C18.3315 0.75 18.6495 0.881696 18.8839 1.11612C19.1183 1.35054 19.25 1.66848 19.25 2V3.25H24.25C24.5815 3.25 24.8995 3.3817 25.1339 3.61612C25.3683 3.85054 25.5 4.16848 25.5 4.5C25.5 4.83152 25.3683 5.14946 25.1339 5.38388C24.8995 5.6183 24.5815 5.75 24.25 5.75H19.25V7C19.25 7.33152 19.1183 7.64946 18.8839 7.88388C18.6495 8.1183 18.3315 8.25 18 8.25C17.6685 8.25 17.3505 8.1183 17.1161 7.88388C16.8817 7.64946 16.75 7.33152 16.75 7V2C16.75 1.66848 16.8817 1.35054 17.1161 1.11612C17.3505 0.881696 17.6685 0.75 18 0.75ZM0.5 4.5C0.5 4.16848 0.631696 3.85054 0.866116 3.61612C1.10054 3.3817 1.41848 3.25 1.75 3.25H13C13.3315 3.25 13.6495 3.3817 13.8839 3.61612C14.1183 3.85054 14.25 4.16848 14.25 4.5C14.25 4.83152 14.1183 5.14946 13.8839 5.38388C13.6495 5.6183 13.3315 5.75 13 5.75H1.75C1.41848 5.75 1.10054 5.6183 0.866116 5.38388C0.631696 5.14946 0.5 4.83152 0.5 4.5ZM8 8.25C8.33152 8.25 8.64946 8.3817 8.88388 8.61612C9.1183 8.85054 9.25 9.16848 9.25 9.5V14.5C9.25 14.8315 9.1183 15.1495 8.88388 15.3839C8.64946 15.6183 8.33152 15.75 8 15.75C7.66848 15.75 7.35054 15.6183 7.11612 15.3839C6.8817 15.1495 6.75 14.8315 6.75 14.5V13.25H1.75C1.41848 13.25 1.10054 13.1183 0.866116 12.8839C0.631696 12.6495 0.5 12.3315 0.5 12C0.5 11.6685 0.631696 11.3505 0.866116 11.1161C1.10054 10.8817 1.41848 10.75 1.75 10.75H6.75V9.5C6.75 9.16848 6.8817 8.85054 7.11612 8.61612C7.35054 8.3817 7.66848 8.25 8 8.25ZM11.75 12C11.75 11.6685 11.8817 11.3505 12.1161 11.1161C12.3505 10.8817 12.6685 10.75 13 10.75H24.25C24.5815 10.75 24.8995 10.8817 25.1339 11.1161C25.3683 11.3505 25.5 11.6685 25.5 12C25.5 12.3315 25.3683 12.6495 25.1339 12.8839C24.8995 13.1183 24.5815 13.25 24.25 13.25H13C12.6685 13.25 12.3505 13.1183 12.1161 12.8839C11.8817 12.6495 11.75 12.3315 11.75 12ZM18 15.75C18.3315 15.75 18.6495 15.8817 18.8839 16.1161C19.1183 16.3505 19.25 16.6685 19.25 17V18.25H24.25C24.5815 18.25 24.8995 18.3817 25.1339 18.6161C25.3683 18.8505 25.5 19.1685 25.5 19.5C25.5 19.8315 25.3683 20.1495 25.1339 20.3839C24.8995 20.6183 24.5815 20.75 24.25 20.75H19.25V22C19.25 22.3315 19.1183 22.6495 18.8839 22.8839C18.6495 23.1183 18.3315 23.25 18 23.25C17.6685 23.25 17.3505 23.1183 17.1161 22.8839C16.8817 22.6495 16.75 22.3315 16.75 22V17C16.75 16.6685 16.8817 16.3505 17.1161 16.1161C17.3505 15.8817 17.6685 15.75 18 15.75ZM0.5 19.5C0.5 19.1685 0.631696 18.8505 0.866116 18.6161C1.10054 18.3817 1.41848 18.25 1.75 18.25H13C13.3315 18.25 13.6495 18.3817 13.8839 18.6161C14.1183 18.8505 14.25 19.1685 14.25 19.5C14.25 19.8315 14.1183 20.1495 13.8839 20.3839C13.6495 20.6183 13.3315 20.75 13 20.75H1.75C1.41848 20.75 1.10054 20.6183 0.866116 20.3839C0.631696 20.1495 0.5 19.8315 0.5 19.5Z" fill="#3889F2" />
                        </svg>
                    </button>
                    <button className='flex items-center justify-center w-[35px] h-[35px] bg-[rgba(235,60,60,0.25)] hover rounded-sm'>
                        <svg width={17} height={18} viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M9.00037 3.92332C7.22527 3.92332 5.62404 4.66209 4.48506 5.85107C4.04888 6.3064 3.6811 6.82726 3.39795 7.39703L3.05016 8.09686L1.65051 7.40129L1.99829 6.70146C2.35251 5.9887 2.81207 5.3381 3.3564 4.76987C4.77795 3.28592 6.78173 2.36035 9.00037 2.36035C13.3164 2.36035 16.8152 5.85917 16.8152 10.1752C16.8152 14.4912 13.3164 17.99 9.00037 17.99C4.68436 17.99 1.18555 14.4912 1.18555 10.1752H2.74851C2.74851 13.628 5.54756 16.427 9.00037 16.427C12.4532 16.427 15.2522 13.628 15.2522 10.1752C15.2522 6.72237 12.4532 3.92332 9.00037 3.92332Z" fill="#EB3C3C" />
                            <path d="M9.22971 8.12527L1.7408 7.42297L2.34277 1.00391" stroke="#EB3C3C" strokeWidth="1.56296" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>
                <div className='flex gap-[15px]'>
                    <Link href="/map" className='flex group items-center relative gap-[10px] px-[30px] py-[10px] border-[1px] border-blue_10 text-black rounded-md hover max-tablet-m:px-[20px] max-mobile-l:px-[10px] max-mobile-l:text-[12px]'>{t('searchByMap')}
                        <span>
                            <Image className='absolute top-[-5px] right-[35px] animate-bounce-slow group-hover:animate-none max-tablet-m:right-[22px] max-mobile-l:right-[15px]' src={MapLocationImg} alt="map-img" width={25} height={38} unoptimized />
                            <Image className='max-tablet-m:w-[35px] max-tablet-m:h-[25px]' src={MapImg} alt="map-img" width={45} height={35} unoptimized />
                        </span>
                    </Link>
                    <button className='px-[80px] py-[10px] bg-blue_10 text-white rounded-md hover max-tablet-m:px-[20px] max-tablet-m:hidden' onClick={handleSearch}>{t('search')}</button>
                </div>
            </div>
            <div className="hidden max-tablet-m:flex items-center justify-center min-h-screen bg-gray-100">
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                        >
                            <motion.div
                                initial={{ scale: 0.7, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.7, opacity: 0 }}
                                onClick={(e) => e.stopPropagation()}
                                className="p-6 bg-white rounded-lg shadow-xl"
                            >
                                <div className="grid grid-cols-1 gap-[10px] ">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">{t('buildingType')}</label>
                                        <Select
                                            value={filters.binoTuri || undefined}
                                            className='mt-1 h-[38px]'
                                            style={{ width: '100%' }}
                                            onChange={(value) => handleInputChange('binoTuri', value)}
                                            options={[
                                                { value: 'Kommercheski', label: 'Kommercheski' },
                                                { value: 'Turar-joy', label: 'Turar-joy' },
                                            ]}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">{t('location')}</label>
                                        <Select
                                            value={filters.viloyat || undefined}
                                            className='mt-1 h-[38px]'
                                            style={{ width: '100%' }}
                                            onChange={(value) => handleInputChange('viloyat', value)}
                                            options={provincesData?.map((item: Province) => ({
                                                value: item.code,
                                                label: item.name_uz
                                            }))}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">{t('location')}</label>
                                        <Select
                                            value={filters.tuman || undefined}
                                            className='mt-1 h-[38px]'
                                            style={{ width: '100%' }}
                                            onChange={(value) => handleInputChange('tuman', value)}
                                            options={districtOptions}
                                            disabled={!filters.viloyat}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">{t('roomCount')}</label>
                                        <div className="mt-1 flex gap-[5px] border-[1px] rounded-md p-[4px] border-gray-300 max-tablet:overflow-auto">
                                            {['1', '2', '3', '4+'].map((num) => (
                                                <button
                                                    key={num}
                                                    onClick={() => handleInputChange('xonalarSoni', num)}
                                                    className={`px-3 py-1 text-sm font-medium ${filters.xonalarSoni === num ? 'bg-blue_10 text-white' : 'bg-white text-gray-700'} rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue_10`}
                                                >
                                                    {num}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">{t('price')}</label>
                                        <div className="mt-1 flex flex-col">
                                            <div className='flex items-center gap-[10px]'>
                                                <input
                                                    type="number"
                                                    value={filters.narxFrom}
                                                    onChange={(e) => handleInputChange('narxFrom', e.target.value)}
                                                    placeholder="OT"
                                                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                />
                                                <input
                                                    type="number"
                                                    value={filters.narxTo}
                                                    onChange={(e) => handleInputChange('narxTo', e.target.value)}
                                                    placeholder="DO"
                                                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">{t('area')}</label>
                                        <div className="flex flex-col mt-1">
                                            <div className='flex items-center gap-[10px]'>
                                                <input
                                                    type="number"
                                                    value={filters.maydoniFrom}
                                                    onChange={(e) => handleInputChange('maydoniFrom', e.target.value)}
                                                    placeholder="OT"
                                                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                />
                                                <input
                                                    type="number"
                                                    value={filters.maydoniTo}
                                                    onChange={(e) => handleInputChange('maydoniTo', e.target.value)}
                                                    placeholder="DO"
                                                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className='w-full mt-[15px] px-[80px] py-[10px] bg-blue_10 text-white rounded-md hover max-tablet-m:px-[20px]' onClick={handleSearch}>{t('search')}</button>

                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                >
                                    Yopish
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    )
}

export default FilterOptions
