"use client"

import { GlobalOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Button, Dropdown } from 'antd'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface LanguageOption {
    key: string
    label: string
}

const languageOptions: LanguageOption[] = [
    { key: 'uz', label: "O'zbek" },
    { key: 'ru', label: 'Русский' },
    { key: 'kr', label: 'Ўзбекча' },
]

const LocalSwitcher: React.FC = () => {
    const pathname = usePathname()
    const router = useRouter()
    const [selectedLang, setSelectedLang] = useState<string>('uz')

    useEffect(() => {
        const currentLang = pathname.split('/')[1]
        if (languageOptions.some(option => option.key === currentLang)) {
            setSelectedLang(currentLang)
        }
    }, [pathname])

    const handleLanguageChange = (lang: string) => {
        const newPathname = '/' + lang + pathname.substring(3)
        router.push(newPathname)
    }

    const items: MenuProps['items'] = languageOptions.map((option) => ({
        key: option.key,
        label: option.label,
        onClick: () => handleLanguageChange(option.key)
    }))

    return (
        <Dropdown menu={{ items }} trigger={['click']}>
            <Button
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '4px 8px',
                    backgroundColor: '#4A90E2',
                    borderColor: '#ffffff',
                    borderRadius: '8px',
                }}
            >
                <GlobalOutlined style={{ color: 'white', fontSize: '18px', marginRight: '4px' }} />
                <span style={{ color: 'white', fontWeight: 'bold' }}>
                    {selectedLang.toUpperCase() === 'KR' ? 'ЎЗ' : selectedLang.toUpperCase()}
                </span>
            </Button>
        </Dropdown>
    )
}

export default LocalSwitcher