import axios from "axios";

export type ticketDataType = {
    Direct: boolean
    MinPrice: number
    OutboundLeg: {
        CarrierIds: number[]
        DepartureDate: string
    }
    DepartureDate: string
    DestinationId: number
    OriginId: number
    QuoteDateTime: string
    QuoteId: number
}

export type companiesType = {
    CarrierId: number
    Name: string
}

export type ResponseDataType = {
    Quotes: ticketDataType[]
    Carriers: companiesType[]
}

const options = {
    baseURL: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/RUB/en-US/SFO-sky/JFK-sky/',
    headers: {
        'x-rapidapi-key': '53fd3c8de5msh39c7fe15dc5ccb9p1bab52jsnf4d08888ac69',
        'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com'
    }
};

const instance = axios.create(options);

export const skynnerAPI = {
   async getTicketData (date: string) {

       return instance.get<ResponseDataType>(`/${date}`).then(res => res.data)
   }
}