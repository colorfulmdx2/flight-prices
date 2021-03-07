import {companiesType, ResponseDataType, ticketDataType} from "./api-skyscanner/api";


export type ActionsType =
    | ReturnType<typeof setAuthStatus>
    | ReturnType<typeof setTicketData>
    | ReturnType<typeof setAuthWatcherAction>
    | ReturnType<typeof setTicketDataWatcherAction>
    | ReturnType<typeof addFavorite>
    | ReturnType<typeof removeFavorite>
    | ReturnType<typeof removeAllFavorite>

type initialStatetype = {
    images: string[]
    auth: boolean
    quotes: ticketDataType[]
    carriers: companiesType[]
    favorites: ticketDataType[]
}
const initialState: initialStatetype = {
    images: [
        'https://images.unsplash.com/photo-1534430480872-3498386e7856?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&w=1000&q=80',
        'https://www.azutura.com/media/catalog/product/cache/47/image/650x/040ec09b1e35df139433887a97daa66f/W/S/WS-50116_WP.jpg',
        'https://wallpapercave.com/wp/QXj1yIN.jpg',
        'https://i.pinimg.com/originals/01/93/42/01934279959c6a1f2df4f27a781934db.jpg',
        'http://images.unsplash.com/photo-1470219556762-1771e7f9427d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxMjA3fDB8MXxzZWFyY2h8MXx8bmV3JTIweW9yayUyMGNpdHl8fDB8fHw&ixlib=rb-1.2.1&q=80&w=1080',
        'https://www.technocrazed.com/wp-content/uploads/2015/12/New-York-Wallpaper-Background-9.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrzuPZWOrQdJNeSSRdG8kMR8a2HDid0ECFLg&usqp=CAU'
    ],
    auth: false,
    quotes: [],
    carriers: [],
    favorites: []

}

export const reducer = (state: initialStatetype = initialState, action: ActionsType): initialStatetype => {

    switch (action.type) {
        case "SET_AUTH_STATUS": {
            return {...state, auth: action.payload.auth}
        }
        case "SET_TICKET_DATA": {
            return {...state,
                quotes: action.payload.data.Quotes,
                carriers: action.payload.data.Carriers}
        }
        case "ADD_TO_FAVORITE": {
            return {...state, favorites: [action.payload.element, ...state.favorites]}
        }
        case "REMOVE_FROM_FAVORITE": {
            return {...state, favorites: [...state.favorites.filter(e => action.payload.element.QuoteId !== e.QuoteId)]}
        }
        case "REMOVE_ALL_FAVORITE": {
            return {...state, favorites: []}
        }
        default:
            return state
    }
}

export const addFavorite = (element: ticketDataType) => ({type: 'ADD_TO_FAVORITE', payload: {element}} as const)
export const removeFavorite = (element: ticketDataType) => ({type: 'REMOVE_FROM_FAVORITE', payload: {element}} as const)
export const removeAllFavorite = () => ({type: 'REMOVE_ALL_FAVORITE'} as const)

export const setAuthStatus = (auth: boolean) => ({type: 'SET_AUTH_STATUS', payload: {auth}} as const)
export const setAuthWatcherAction = () => ({type: 'SET_AUTH_STATUS_WATCHER'} as const)

export const setTicketData = (data: ResponseDataType) => ({type: 'SET_TICKET_DATA', payload: {data}} as const)
export const setTicketDataWatcherAction = (date: string) => ({type: 'SET_TICKET_DATA_WATCHER', date} as const)





