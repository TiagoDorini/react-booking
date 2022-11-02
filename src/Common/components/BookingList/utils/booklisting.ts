const MAX_DESCCRIPTION_WORDS = 15
const MAX_WORDS = 3
const MAX_RATING = 5
const MIN_RATING = 3

export const generateHotelName = () => {
  const text = 'Lorem ipsum dolor sit amet consectetur adipiscing elit'
  const numberOfWords = Math.ceil(Math.random() * MAX_WORDS)
  return (
    text.split(' ', numberOfWords).join(' ') +
    ' ' +
    `${numberOfWords % 2 === 0 ? 'Hotel' : 'Resort'}`
  )
}

export const generateHotelRating = () => {
  const rating = Math.random() * (MAX_RATING - MIN_RATING) + MIN_RATING
  return rating
}

export const generateHotelDescription = () => {
  const text =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet ligula non arcu convallis faucibus quis a eros. Maecenas nisl magna, tempor eu aliquam sed, tempor nec nisi. Curabitur ullamcorper mauris at scelerisque elementum. Donec vestibulum vitae est id porta. Donec vestibulum velit in diam bibendum pharetra.'
  const numberOfWords = Math.ceil(Math.random() * MAX_DESCCRIPTION_WORDS)
  return text.split(' ', numberOfWords).join(' ') + ' '
}
