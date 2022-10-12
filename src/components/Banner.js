import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function Banner() {
  return (
    <div className='relative'>
        <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
        <Carousel
            autoPlay
            infiniteLoop
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
            interval={5000}
        >

            <div>
                <img loading='lazy' src="https://links.papareact.com/gi1" alt="banner1" />
            </div>
            <div>
                <img src="https://links.papareact.com/6ff" alt="banner2" />
            </div>
            <div>
                <img src="https://links.papareact.com/7ma" alt="banner3" />
            </div>

        </Carousel>
    </div>
  )
}

export default Banner