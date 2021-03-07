import React from "react";
import {CarouselProvider, Slide, Slider} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../redux-store/store";
import style from './carousel.module.scss'

export const Carousel = () => {

    const images = useSelector<AppRootStateType, string[]>(state => state.reducer.images)

    const sliderElements = images && images.map((element: string, index: number) =>
        <Slide key={index}
               index={index}>
            <img className={style.image}
                 src={element}
                 alt="no image found"
            />
        </Slide>
    )

    return (
        <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={100}
            totalSlides={images.length}
            isPlaying={true}
            interval={2000}
            touchEnabled={true}
            visibleSlides={3}>


            <div className={style.container}>
                <Slider>
                    {sliderElements}
                </Slider>
            </div>


        </CarouselProvider>
    )
}