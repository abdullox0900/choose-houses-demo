'use client'

import React, { useEffect, useRef } from 'react'
import Modal from 'react-modal'
import './FilterModal.css'

interface FilterModalProps {
    isOpen: boolean
    onClose: () => void
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        transition: 'all 1s easy'
    },
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose }) => {
    const subtitleRef = useRef<HTMLHeadingElement>(null)

    useEffect(() => {
        if (isOpen && subtitleRef.current) {
            subtitleRef.current.style.color = '#f00'
        }
    }, [isOpen])

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <h2 ref={subtitleRef}>Hello</h2>
            <button onClick={onClose}>close</button>
            <div>I am a modal</div>
            <form>
                <input />
                <button>tab navigation</button>
                <button>stays</button>
                <button>inside</button>
                <button>the modal</button>
            </form>
        </Modal>
    )
}

export default FilterModal