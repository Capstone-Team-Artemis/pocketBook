import axios from "axios";

//ACTION TYPES
const ADDED_BOOK = "ADDED_BOOK";
const DELETED_BOOK = "DELETED_BOOK";
const GOT_BOOKS = "GOT_BOOKS";
//ACTION CREATORS
const addedBook = (book) => ({
  type: ADDED_BOOK,
  book,
});
const deletedBook = (bookId) => ({
  type: DELETED_BOOK,
  bookId,
});
const gotBooks = (books) => ({
  type: GOT_BOOKS,
  books,
});

//THUNK CREATORS
export const addBook = (body) => {
  return async (dispatch) => {
    try {
      if (!body.book.googleId) {
        body.book.googleId = body.book.id;
      }
      // const { data: book } = await axios.post(
      //   "http://localhost:3000/api/books",
      const { data: book } = await axios.post(
        "https://pocketbook-gh.herokuapp.com/api/books",
        {
          status: body.status,
          book: body.book,
        }
      );
      dispatch(addedBook({ ...book, status: body.status }));
    } catch (error) {
      console.error(error);
    }
  };
};
export const deleteBook = (bookId, userId) => {
  return async (dispatch) => {
    try {
      // await axios.delete(`http://localhost:3000/api/users/${userId}/${bookId}`);
      // dispatch(deletedBook(bookId));
      await axios.delete(
        `https://pocketbook-gh.herokuapp.com/api/${userId}/${bookId}`
      );
      dispatch(deletedBook(bookId));
    } catch (error) {
      console.error(error);
    }
  };
};
export const getBooks = (userId) => async (dispatch) => {
  try {
    // const books = await axios.get(`http://localhost:3000/api/users/${userId}`);
    const books = await axios.get(
      `https://pocketbook-gh.herokuapp.com/api/${userId}`
    );
    dispatch(gotBooks(books.data));
  } catch (error) {
    console.error(error);
  }
};

//INITIAL STATE
const books = [];

//REDUCER
const reducer = (state = books, action) => {
  switch (action.type) {
    case ADDED_BOOK:
      const dupeBookIdx = state.findIndex((b) => b.bookId === action.book.id);
      if (dupeBookIdx !== -1) {
        const stateCopy = [...state];
        stateCopy.splice(dupeBookIdx, 1, {
          status: action.book.status,
          book: action.book,
          bookId: action.book.id,
        });
        return stateCopy;
      }
      return [
        ...state,
        {
          status: action.book.status,
          book: action.book,
          bookId: action.book.id,
        },
      ];
    case DELETED_BOOK:
      return state.filter((book) => book.book.id !== action.bookId);
    case GOT_BOOKS:
      return action.books;
    default:
      return state;
  }
};

export default reducer;
