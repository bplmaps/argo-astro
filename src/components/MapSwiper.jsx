import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react'
import MapSwiperSlide from '@components/MapSwiperSlide.jsx'
import '../../node_modules/swiper/swiper.min.css'
import '../../node_modules/swiper/modules/navigation.min.css'

export default (props) => {
  if (props.mapPages) {
    return (
      <>
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
        
        <style>{`
          .related-maps-swiper {	
            list-style-type: none;	
            margin: 0 0 30px 0; 
            padding: 0; 
            display: flex; 
            justify-content: space-between; 
          } 
          .related-maps-swiper > .swiper-wrapper > div { 
            width: calc(25% - 19px); 
          } 
          .related-maps-swiper .related-map { 
            width: 100%; 
            height: 125px; 
            border-radius: 15px;
            box-shadow: 0 2px 4px rgba(152, 152, 152, .5);
            background-size: cover; 
            background-position: center; 
            background-repeat: no-repeat;
            cursor: pointer;
          }
          .related-maps-swiper .related-map-description { 
            cursor: pointer;
          }
          .related-map {
            width: 100%;
            height: 180px;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            border-radius: 5px 5px 0 0;
            border-bottom: 0.5px solid #4E798D;
          }
        `}</style>
      </>
    );
  }
};
