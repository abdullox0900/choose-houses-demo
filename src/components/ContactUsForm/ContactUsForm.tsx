'use client'
import ContactImgOne from '@/assets/img/contact-img-1.png'
import { useMutation } from '@tanstack/react-query'
import { Button, Form, Input, notification } from 'antd'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import { FaPhone, FaUser } from 'react-icons/fa'
import Container from '../Container/Container'

const ContactUsForm = () => {
    const [form] = Form.useForm()
    const [phoneNumber, setPhoneNumber] = useState('+998')

    const formatPhoneNumber = (value: string) => {
        const numbers = value.replace(/\D/g, '').slice(0, 12)

        if (numbers.length <= 3) return '+998'
        if (numbers.length <= 5) return `+998 (${numbers.slice(3, 5)})`
        if (numbers.length <= 8) return `+998 (${numbers.slice(3, 5)}) ${numbers.slice(5, 8)}`
        return `+998 (${numbers.slice(3, 5)}) ${numbers.slice(5, 8)} ${numbers.slice(8, 10)}${numbers.slice(10, 12)}`
    }

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhoneNumber(e.target.value)
        setPhoneNumber(formatted)
        form.setFieldsValue({ phone: formatted })
    }

    const submitForm = async (values: any) => {
        const formattedData = {
            full_name: values.name,
            tel_number: values.phone.replace(/\D/g, '') // Remove all non-digit characters
        }
        const response = await axios.post('http://83.222.8.77/api/send-message/', formattedData)
        return response.data
    }

    const mutation = useMutation({
        mutationFn: submitForm,
        onSuccess: (data) => {
            console.log('Form submitted successfully:', data)
            notification.success({
                message: 'Muvaffaqiyatli',
                description: 'Forma muvaffaqiyatli yuborildi!',
            })
            form.resetFields()
        },
        onError: (error) => {
            console.error('Error submitting form:', error)
            notification.error({
                message: 'Xatolik',
                description: 'Forma yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.',
            })
        }
    })

    const onFinish = (values: any) => {
        mutation.mutate(values)
    }

    return (
        <Container class='max-tablet-m:px-[20px]'>
            <div className='flex relative overflow-hidden w-full h-[310px] my-[110px] rounded-[20px] bg-blue_10 py-[20px] px-[40px] max-tablet-m:h-[450px] max-mobile-l:h-[550px] max-mobile-l:px-[15px]'>
                <div className='w-[70%] text-center z-10 max-tablet:flex max-tablet:justify-between max-tablet:w-full max-tablet-m:flex-col max-tablet-m:items-center max-tablet-m:gap-[10px] max-mobile-l:justify-start'>
                    <div>
                        <h3 className='text-[34px] text-white mb-[10px] max-tablet:text-[26px]'>Yangi uyingiz sizni kutmoqda</h3>
                        <p className='text-[22px] text-white mb-[10px] max-tablet:text-[14px] max-mobile-l:w-full'>{`Bepul konsultatsiya o'lish uchun formani to'ldiring, yoki bizning sotuv bo'limimiz bilan bog'laning menejerlarimiz Uy tanlashda yordam beradi`}</p>
                    </div>
                    <Form
                        form={form}
                        name="uzbek_phone_form"
                        onFinish={onFinish}
                        layout="vertical"
                        className='flex items-end gap-[30px] max-tablet:flex-col max-tablet:gap-[15px] max-tablet:w-full'
                    >
                        <Form.Item
                            name="name"
                            label={<span style={{ color: 'white' }}>Ism</span>}
                            rules={[{ required: true, message: 'Iltimos, ismingizni kiriting!' }]}
                            className='max-tablet:mb-0'
                        >
                            <Input
                                style={{ width: '250px', height: '45px' }}
                                prefix={<FaUser style={{ color: '#4a90e2' }} />}
                                placeholder="Ismingizni kiriting"
                            />
                        </Form.Item>

                        <Form.Item
                            name="phone"
                            label={<span style={{ color: 'white' }}>Raqam</span>}
                            className='max-tablet:mb-0'
                            rules={[
                                { required: true, message: 'Iltimos, telefon raqamingizni kiriting!' },
                                { pattern: /^\+998 \(\d{2}\) \d{3} \d{2}\d{2}$/, message: "Noto'g'ri format." }
                            ]}
                        >
                            <Input
                                prefix={<FaPhone style={{ color: '#4a90e2' }} />}
                                value={phoneNumber}
                                style={{ width: '250px', height: '45px' }}
                                onChange={handlePhoneChange}
                                placeholder="+998 (__) ___ ____"
                            />
                        </Form.Item>

                        <Form.Item className='max-tablet:mb-0'>
                            <Button
                                className='hover'
                                type="primary"
                                htmlType="submit"
                                style={{ width: '250px', height: '45px', backgroundColor: 'white', color: '#4a90e2' }}
                                loading={mutation.isPending}
                            >
                                YUBORISH
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <Image className='absolute right-0 top-0 h-[315px] max-tablet-m:h-[450px] max-mobile-l:h-[480px] max-mobile-l:hidden object-cover' src={ContactImgOne} alt='' />
            </div>
        </Container>
    )
}

export default ContactUsForm