import React, {ChangeEvent, useEffect, useState} from "react";
import style from './flight-info.module.scss'
import logout from '../../_images/logout.png'
import {useDispatch, useSelector} from "react-redux";
import {
    addFavorite,
    removeAllFavorite,
    removeFavorite,
    setAuthStatus,
    setTicketDataWatcherAction
} from "../../redux-store/reducer";
import {deleteState} from "../../_local-storage/local-storage";
import direction from '../../_images/direction.png'
import {Carousel} from "../carousel/carousel";
import plane from '../../_images/plane.png'
import like from '../../_images/like.png'
import liked from '../../_images/liked.png'
import {AppRootStateType} from "../../redux-store/store";
import arrow from '../../_images/arrow.png'
import {companiesType, ticketDataType} from "../../redux-store/api-skyscanner/api";
import moment from 'moment'

export const FlightInfo = () => {

    const dispatch = useDispatch()

    const [date, setDate] = useState('2021-04')

    const {quotes, carriers, favorites} = useSelector<AppRootStateType, any>(state => state.reducer)

    const logOutButtonHandler = () => {
        dispatch(setAuthStatus(false))  //logout
        deleteState()                        //clear localstorage
        dispatch(removeAllFavorite())        // remove data from favorites
    }

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setDate(e.currentTarget.value)
        dispatch(setTicketDataWatcherAction(e.currentTarget.value))
    }

    let tickets = quotes.map((e: ticketDataType) => {
            let company = carriers.filter((el: companiesType) => e.OutboundLeg.CarrierIds[0] === el.CarrierId)[0].Name      //get company name
            let isLikedElement: ticketDataType = favorites.filter((elem: ticketDataType) => elem.QuoteId === e.QuoteId)[0]  //get liked element
            let isLiked = isLikedElement && isLikedElement.QuoteId === e.QuoteId                                            //isLiked boolean value

            return (
                <Ticket company={company}
                        date={e.OutboundLeg.DepartureDate}
                        price={e.MinPrice}
                        id={e.QuoteId}
                        like={isLiked ? isLiked : false}
                        key={e.QuoteId}
                        ticket={e}
                />
            )
        }
    )

    useEffect(() => {
        dispatch(setTicketDataWatcherAction(date)) //get tickets data
    }, [dispatch, date])

    return (
        <div className={style.container}>

            <div className={style.logOutContainer}
                 onClick={logOutButtonHandler}
            >
                <div>Выйти</div>
                <img src={logout} alt="no image found"/>
            </div>

            <div className={style.content}>

                <div className={style.info}>
                    <div className={style.text}>Вылеты</div>
                    <img src={direction} alt="no image found"/>
                    <div className={style.text}>SVO - JFK</div>
                    <input onChange={onChangeInputHandler} type="month" min="2021-03" value={date}/>
                </div>

                <Carousel/>

                <div className={style.favorites}>Добавлено в Избранное: <span
                    style={{color: '#1157A7'}}>{favorites.length}</span> рейсов
                </div>
                <div className={style.flightPrices}>
                    {tickets}
                </div>
            </div>
        </div>
    )
}


type TicketPropsType = {
    ticket: ticketDataType
    date: string
    company: string
    price: number
    id: number
    like: boolean
}
export const Ticket = (props: TicketPropsType) => {

    const dispatch = useDispatch()

    const addLikeHandler = () => {
        dispatch(addFavorite(props.ticket))
    }

    const unLikeHandler = () => {
        dispatch(removeFavorite(props.ticket))
    }

    return (
        <div className={style.ticketContainer}>
            <div className={style.imageContainer}><img src={plane} alt="no image found"/></div>
            <div className={style.ticketInfo}>
                <div className={style.direction}>
                    <div>Moscow (SVO)</div>
                    <img src={arrow} alt="no image found"/>
                    <div>New York City (JFK)</div>
                </div>
                <div className={style.date}>{moment(props.date).format('MMMM Do YYYY, h:mm a')}</div>
                <div className={style.company}>{props.company}</div>
            </div>
            <div className={style.likePrice}>

                {
                    props.like
                        ? <img className={style.like} src={liked} alt="no image found" onClick={unLikeHandler}/>
                        : <img className={style.like} src={like} alt="no image found" onClick={addLikeHandler}/>
                }
                <div className={style.price}>
                    <div className={style.priceTitle}>Price:</div>
                    {`${props.price} ₽`}</div>
            </div>
        </div>
    )
}