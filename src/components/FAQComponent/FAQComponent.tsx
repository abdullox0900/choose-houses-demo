import { useCurrentLocale } from '@/hooks/useCurrentLocale'
import LoadingSpinner from '@/ui/LoadingSpinner'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'
import Container from '../Container/Container'

interface FAQItem {
    question: string
    answer: string
}

const FAQComponent: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0)
    const currentLang = useCurrentLocale()

    const toggleAnswer = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    const { data, isLoading, error } = useQuery({
        queryKey: ['faq'],
        queryFn: () => axios.get('http://83.222.8.77/api/faq')
    })

    if (isLoading) return <LoadingSpinner />
    if (error) return <div>Xatolik yuz berdi</div>

    return (
        <div className="my-[110px] max-tablet:px-[20px]">
            <Container >
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Ko'p beriladigan savollar</h2>
                <div >
                    {data?.data.map((item: any, index: number) => (
                        <div key={index} className={`${openIndex === index ? '' : 'shadow-md'} text-white rounded-sm transition-all ease-in-out delay-150`}>
                            <button
                                className={`${openIndex === index ? 'bg-blue_10' : ''} w-full text-left px-6 py-4 flex justify-between items-center rounded-sm focus:outline-none mb-[10px]`}
                                onClick={() => toggleAnswer(index)}
                            >
                                <span className={`${openIndex === index ? 'text-white' : 'text-gray-700'} font-semibold `}>{item?.[`answer_${currentLang}`]}</span>
                                {openIndex === index ? (
                                    <FaMinus className="p-[5px] text-[25px] bg-white rounded-[5px] text-blue-500" />
                                ) : (
                                    <FaPlus className="p-[5px] text-[25px] bg-blue_10 rounded-[5px] text-white" />
                                )}
                            </button>
                            {openIndex === index && (
                                <div className={`${openIndex === index ? 'bg-blue_10' : ''}  px-6 py-4 my-[10px] text-white rounded-sm`}>
                                    {item?.[`answer_${currentLang}`] || "Bu savolga hali javob berilmagan."}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default FAQComponent