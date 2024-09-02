'use client'
import { Link } from '@/config/navigation'
import { ChildrenType } from '@/types/children'
import { usePathname } from 'next/navigation'
import Container from '../Container/Container'
import { MainSection } from '../MainSection/MainSection'
interface CardWrapperProps extends ChildrenType {
    title?: string
    style?: React.CSSProperties
    class?: string
}

const CardWrapper = (props: CardWrapperProps) => {

    const path = usePathname()

    return (
        <div style={props.style} className={`${props.class} bg-[#F2F8FF] py-[25px]`}>
            <Container>
                <MainSection>
                    <div className='flex items-center justify-between  mb-[20px]'>
                        <h2 className='text-[34px] text-[#2b2b2b] max-tablet-m:text-[24px] max-mobile-l:text-[18px]'>{props.title}</h2>
                        <Link href="/all_house" className={`${path.includes('all_house') ? 'hidden' : 'text-blue_10 text-[24px] px-[10px] py-[5px] rounded-sm hover max-tablet-m:text-[18px] max-mobile-l:text-[14px]'}`} >Barchasi..</Link>
                    </div>
                    {props.children}
                </MainSection>
            </Container>
        </div>
    )
}

export default CardWrapper
