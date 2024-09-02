import MaterialButton from '@/ui/MaterialButton'
import { useMutation } from '@tanstack/react-query'
import { notification, Tooltip } from 'antd'
import axios from 'axios'
import { useEffect, useState } from "react"
import { CiCircleInfo } from "react-icons/ci"


interface CardListModalFormProps {
  code: string
  isOpen: boolean
  onClose: () => void
}

const formatPhoneNumber = (value: string) => {
  const numbers = value.replace(/\D/g, '')
  if (numbers.length <= 2) return numbers
  if (numbers.length <= 5) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
  if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 5)} ${numbers.slice(5)}`
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 5)} ${numbers.slice(5, 7)} ${numbers.slice(7, 9)}`
}

export const CardListModalForm: React.FC<CardListModalFormProps> = ({ isOpen, onClose, code }) => {
  const [shouldRender, setShouldRender] = useState<boolean>(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [description, setDescription] = useState('')
  const [nameError, setNameError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const mutation = useMutation({
    mutationFn: (data: { name: string; phone: string, message: string, flat_code: string }) =>
      axios.post('http://83.222.8.77/api/send-application/', data),
    onSuccess: () => {
      notification.success({
        message: 'Muvaffaqiyatli',
        description: 'Ma\'lumotlar muvaffaqiyatli yuborildi!',
      })
      setName('')
      setPhone('')
      setDescription('')
      setIsSubmitted(false)
    },
    onError: () => {
      notification.error({
        message: 'Xatolik',
        description: 'Ma\'lumotlarni yuborishda xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring.',
      })
    },
  })

  const validateName = (value: string) => {
    if (value.trim() === '') {
      setNameError('Ism kiritish majburiy')
      return false
    } else {
      setNameError('')
      return true
    }
  }

  const validatePhone = (value: string) => {
    const phoneRegex = /^\(\d{2}\)\s\d{3}\s\d{2}\s\d{2}$/
    if (!phoneRegex.test(value)) {
      setPhoneError("Noto'g'ri telefon raqami formati")
      return false
    } else {
      setPhoneError('')
      return true
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setPhone(formatted)
    if (isSubmitted) {
      validatePhone(formatted)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)

    const isNameValid = validateName(name)
    const isPhoneValid = validatePhone(phone)

    if (isNameValid && isPhoneValid) {
      mutation.mutate({ name, phone, message: description, flat_code: code })
    }
  }

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
    } else {
      const timer = setTimeout(() => setShouldRender(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!shouldRender) return null

  console.log(code)

  let infoText = `
📝 Quyidagi formani to'ldiring va biz siz bilan tez orada bog'lanamiz:

- 👤 Ismingizni kiriting
- 📞 Telefon raqamingizni yozing

Shoshiling! Yangi hayotingiz shu yerdan boshlanadi! 🎉🏠
  `

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 z-[10000] ${isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-lg p-6 w-[600px] transform transition-all duration-300 z-[111111] max-tablet-m:w-[400px] max-mobile-l:w-[320px] ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        onClick={(e: React.MouseEvent<HTMLDivElement>): void => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="flex items-center gap-[10px] text-xl font-bold max-mobile-l:text-[16px]">Orzuyingizdagi uyga bir qadam! 🔑 <Tooltip placement="right" title={infoText}>
            <CiCircleInfo className='text-[22px] max-tablet-m:hidden' />
          </Tooltip></h2>
          <button
            onClick={onClose}
            className="text-gray-500 transition-colors duration-300 rounded-[10px] p-1 hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 max-mobile-l:w-6 max-mobile-l:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="mt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-[16px] font-medium text-gray-700 max-mobile-l:text-[14px]">
                Ism
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  if (isSubmitted) validateName(e.target.value)
                }}
                className={`mt-1 block w-full px-5 py-4 max-tablet-m:px-3 max-tablet-m:py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${nameError ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Ismingizni kiriting"
              />
              {nameError && <p className="mt-2 text-sm text-red-600">{nameError}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="block text-[16px] font-medium text-gray-700 max-mobile-l:text-[14px]">
                Raqam
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={handlePhoneChange}
                className={`mt-1 block w-full px-5 py-4 max-tablet-m:px-3 max-tablet-m:py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${phoneError ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="(90) 123 45 67"
              />
              {phoneError && <p className="mt-2 text-sm text-red-600">{phoneError}</p>}
            </div>
            <div>
              <label htmlFor="description" className="block text-[16px] font-medium text-gray-700 max-mobile-l:text-[14px]">
                Qo'shimcha ma'lumotlar (ixtiyoriy)
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full px-5 py-4 max-tablet-m:px-3 max-tablet-m:py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                placeholder="Qo'shimcha ma'lumotlarni kiriting"
                rows={3}
              />
            </div>
            <MaterialButton
              // type="submit"
              disabled={mutation.isPending}
              className='py-[10px] max-mobile-l:py-[10px]'
            >
              {mutation.isPending ? 'YUBORILMOQDA...' : 'YUBORISH'}
            </MaterialButton>
          </form>
        </div>
      </div>
    </div>
  )
}