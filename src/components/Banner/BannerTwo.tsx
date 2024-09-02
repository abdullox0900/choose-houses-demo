import PremiumImgHouse from '@/assets/img/banner-two.png'
import PremiumImg from '@/assets/svg/21.svg'

import Image from 'next/image'
import Container from '../Container/Container'

const BannerTwo = () => {
    return (
        <Container class='max-tablet-m:px-[20px]'>
            <div className='relative w-full h-[335px] mt-[200px] mb-[50px] rounded-[20px] banner-bg-two p-[40px] max-tablet:p-[25px] max-tablet:h-[220px] max-mobile-l:h-[150px] max-tablet-m:mt-[150px]'>
                <h3 className='relative z-[5] highlight w-[750px] text-[45px] text-white font-bold mb-[15px] rounded-[15px] max-tablet:text-[28px] max-tablet:w-full max-mobile-l:text-[22px]'>“UMAAR HOUSE”</h3>
                <p className='relative z-[5] w-[600px] text-[30px] text-white mt-[20px] max-tablet:text-[18px] max-tablet:w-full max-mobile-l:text-[16px] max-mobile-l:mt-[10px]'>
                    BARCHA UYLARIGA
                </p>
                <Image className="absolute right-[0] bottom-[0] max-tablet:w-[450px] max-tablet-m:w-[350px] max-mobile-l:w-[300px] z-0" src={PremiumImgHouse} alt="premium21" />
                <Image className="absolute w-[250px] h-[150px] left-[4%] bottom-[4%] max-tablet:w-[130px] max-tablet:h-[80px] max-mobile-l:w-[100px] max-mobile-l:h-[50px]" src={PremiumImg} alt="premium21" />
            </div>
        </Container>
    )
}

export default BannerTwo
