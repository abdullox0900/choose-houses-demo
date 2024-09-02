import { Button, Input, Slider } from 'antd'
import React, { useState } from 'react'
import { FaCalendarAlt, FaMoneyBillWave, FaPercent, FaRulerCombined } from 'react-icons/fa'

interface PropertyCalculatorProps {
    initialDuration: number
    maxDuration: number
    initialArea: number
    maxArea: number
    initialPercentage: number
    initialTotalPrice: string
    initialMonthlyPayment: string
    onSubmitApplication: () => void
    onContact: () => void
}

const PropertyCalculator: React.FC<PropertyCalculatorProps> = ({
    initialDuration,
    maxDuration,
    initialArea,
    maxArea,
    initialPercentage,
    initialTotalPrice,
    initialMonthlyPayment,
    onSubmitApplication,
    onContact
}) => {
    const [duration, setDuration] = useState(initialDuration)
    const [area, setArea] = useState(initialArea)
    const [initialPaymentPercentage, setInitialPaymentPercentage] = useState(initialPercentage)
    const [totalPrice, setTotalPrice] = useState(initialTotalPrice)
    const [monthlyPayment, setMonthlyPayment] = useState(initialMonthlyPayment)

    return (
        <div className='w-full p-[20px] border-[1px] border-blue_10 rounded-sm'>
            <div style={{ marginBottom: 20 }}>
                <h3 className='flex items-center gap-[10px]'><FaCalendarAlt />{`Muddatli to'lo'v bo'yicha xisoblash`}</h3>
                <div className='flex items-center justify-between gap-[20px]'>
                    <Slider
                        className='w-[65%]'
                        value={duration}
                        max={maxDuration}
                        onChange={(value) => setDuration(value)}
                    />
                    <div className='px-[17px] py-[8px] border-[1px] border-blue_10 rounded-sm' style={{ textAlign: 'right' }}>{duration} oy</div>
                </div>
            </div>

            <div style={{ marginBottom: 20 }}>
                <h3 className='flex items-center gap-[10px]'><FaRulerCombined /> {`Kvadrat metr bo'yicha xisoblash`}</h3>
                <div className='flex items-center justify-between gap-[20px]'>
                    <Slider
                        className='w-[65%]'
                        value={area}
                        max={maxArea}
                        onChange={(value) => setArea(value)}
                    />
                    <div className='px-[17px] py-[8px] border-[1px] border-blue_10 rounded-sm' style={{ textAlign: 'right' }}>{area} kvm</div>
                </div>
            </div>

            <div style={{ marginBottom: 20 }}>
                <h3 className='flex items-center gap-[10px]'><FaPercent />{`Boshlang'ich foiz`}</h3>
                <div className='flex items-center justify-between gap-[20px]'>
                    <Slider
                        className='w-[65%]'
                        value={initialPaymentPercentage}
                        onChange={(value) => setInitialPaymentPercentage(value)}
                    />
                    <div className='px-[17px] py-[8px] border-[1px] border-blue_10 rounded-sm' style={{ textAlign: 'right' }}>{initialPaymentPercentage}%</div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <div>
                    <div>Umumiy narx</div>
                    <Input
                        prefix={<FaMoneyBillWave className='text-blue_10' />}
                        value={totalPrice}
                        onChange={(e) => setTotalPrice(e.target.value)}
                        style={{ width: 180, borderColor: '#3889f2', height: '50px' }}
                    />
                </div>
                <div>
                    <div>{`Oylik to'lo'v`}</div>
                    <Input
                        prefix={<FaMoneyBillWave className='text-blue_10' />}
                        value={monthlyPayment}
                        onChange={(e) => setMonthlyPayment(e.target.value)}
                        style={{ width: 180, borderColor: '#3889f2', height: '50px' }}
                    />
                </div>
            </div>

            <Button
                type="link"
                block
                style={{ height: '50px', color: '#1890ff', marginBottom: 10, borderColor: '#3889f2' }}
                onClick={onSubmitApplication}
            >
                Ariza qoldirish
            </Button>

            <Button
                type="primary"
                block
                style={{ height: '50px', backgroundColor: '#1890ff', borderColor: '#1890ff' }}
                onClick={onContact}
            >
                {`Bog'lanish`}
            </Button>
        </div>
    )
}

export default PropertyCalculator