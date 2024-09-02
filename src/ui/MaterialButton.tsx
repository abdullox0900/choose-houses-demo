import React, { useEffect, useRef } from 'react'

interface MaterialButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
}

const MaterialButton: React.FC<MaterialButtonProps> = ({ children, onClick, disabled, className }) => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    const rippleEffect = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect()
      const ripple = document.createElement('span')
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2
      ripple.style.width = ripple.style.height = `${size}px`
      ripple.style.left = `${x}px`
      ripple.style.top = `${y}px`
      ripple.classList.add('ripple')
      button.appendChild(ripple)

      ripple.addEventListener('animationend', () => {
        ripple.remove()
      })
    }

    button.addEventListener('click', rippleEffect)

    return () => {
      button.removeEventListener('click', rippleEffect)
    }
  }, [])

  return (
    <button
      ref={buttonRef}
      className={`${className} primary-button cursor-pointer`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default MaterialButton