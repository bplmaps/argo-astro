import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react'
import MapSwiperSlide from '@components/MapSwiperSlide.jsx'
import '../../node_modules/swiper/swiper.min.css'
import '../../node_modules/swiper/modules/navigation.min.css'

export default (props) => {
  return (
    <Swiper
      className="related-maps-swiper"
      modules={[Navigation, Pagination]}
      spaceBetween={30}
      slidesPerView={2}
      navigation
      breakpoints={{
        500: {slidesPerView: 2},
        768: {slidesPerView: 3},
        900: {slidesPerView: 4},
      }}
    >
      {props.mapPages.map((map) => {
        return <SwiperSlide><MapSwiperSlide map={map} /></SwiperSlide>
      })}
    </Swiper>
  );
};