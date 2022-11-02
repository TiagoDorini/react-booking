import axios from 'axios'
import { HotelCollectionResponse } from '../components/BookingList/types/HotelResponse'

const PEXEL_API_KEY = '563492ad6f91700001000001065336cb7e0c43fb9e39a48acd208649'
const PEXEL_URL = 'https://api.pexels.com/'

const pexelGetRequest = <T>(url: string) =>
  axios
    .get<T>(url, {
      headers: {
        Authorization: PEXEL_API_KEY,
      },
    })
    .then((response) => response.data)

export const getHotels = () => {
  return pexelGetRequest<HotelCollectionResponse>(
    `${PEXEL_URL}/v1/search?query=hotel&per_page=24`
  )
}
