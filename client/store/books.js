import axios from axioss

//ACTION TYPES
const ADDED_BOOK = "ADD_BOOK"

//ACTION CREATORS
const addedBook = (book) => ({
  type: ADDED_BOOK,
  book,
})

//THUNK CREATORS
export const addBook = () => {
  return async (dispatch) => {
    try {
      const {data: book} = await axios.post("http://localhost:3000/api/books", {
                status,
                book: {
                  title: bookPath.volumeInfo.title,
                  image: bookPath.volumeInfo.imageLinks.thumbnail,
                  authors: bookPath.volumeInfo.authors,
                  rating: bookPath.volumeInfo.averageRating,
                  description: bookPath.volumeInfo.description,
                  googleId: bookPath.id,
                },
              });
              dispatch(addedBook(book))
    } catch (error) {
      console.error(error)
    }
  }
}

//INITIAL STATE
const books = [];

//REDUCER
const reducer = (state = books, action) => {
  switch (action.type) {
    case ADDED_BOOK:
      return [...state, action.book]
    default:
      return state;
  }
}
