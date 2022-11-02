import { useQuery } from 'react-query'
import { getHotels } from '../../../api/Requests'
import { HotelCollectionResponse } from '../types/HotelResponse'
import {
  generateHotelDescription,
  generateHotelName,
  generateHotelRating
} from '../utils/booklisting'

export const useBookingImages = () => {
  const { data: hotels, isLoading: isLoadingHotels } = useQuery(
    'GET_PEXEL',
    () =>
      getHotels()
        .then((response: HotelCollectionResponse) => ({
          ...response,
          photos: response.photos.map((photo) => ({
            ...photo,
            rating: generateHotelRating(),
            hotelName: generateHotelName(),
            hotelDescription: generateHotelDescription(),
          })),
        }))
        .then((response) => response),
    {
      refetchOnWindowFocus: false,
    }
  )

  return { hotels, isLoadingHotels }
}
