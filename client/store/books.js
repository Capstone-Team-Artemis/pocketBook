import axios from axioss

//ACTION TYPES
const ADDED_BOOK = "ADD_BOOK"
const DELETED_BOOK  = "DELETED_BOOK"

//ACTION CREATORS
const addedBook = (book) => ({
  type: ADDED_BOOK,
  book,
})
const deletedBook = (bookId) => ({
  type: DELETED_BOOK,
  bookId,
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
export const deleteBook = (bookId, userId) => {
  return async (dispatch) => {
    try {
      const {data: bookId} = await axios.delete(`http://localhost:3000/api/${userId}/${bookId}`)
      dispatch(deletedBook(bookId))
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
    case DELETED_BOOK:
      return state.filter((book) => book.Id !== action.bookId)
    default:
      return state;
  }
}
