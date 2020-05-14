import {
  UPDATE_BOOKS_PROPS,
  DELETE_BOOKS_PROPS,
  MERGE_BOOKS_PROPS,
  UPDATE_CATEGORIES_PROPS,
} from "./types";
import axios from "axios";

import { API_HOST, handleError, showMessage } from "../utils";

export const updateBooksProps = (payload) => (dispatch) => {
  dispatch({
    type: UPDATE_BOOKS_PROPS,
    payload,
  });
};

export const deleteBooksProps = (payload) => (dispatch) => {
  dispatch({
    type: DELETE_BOOKS_PROPS,
    payload,
  });
};

export const mergeBooksProps = (payload) => (dispatch) => {
  dispatch({
    type: MERGE_BOOKS_PROPS,
    payload,
  });
};

export const getAllBooks = () => (dispatch) => {
  axios
    .get(`${API_HOST}/books`)
    .then((data) => {
      const books = data.data.data;

      const categories = books.reduce((acc, book) => {
        const category = book.category;
        if (!acc.hasOwnProperty(category._id))
          acc[category._id] = { name: category.name, books: [book] };
        else acc[category._id]["books"].push(book);
        return acc;
      }, {});
      dispatch(updateBooksProps([{ prop: "books", value: books }]));
      dispatch({
        type: UPDATE_CATEGORIES_PROPS,
        payload: [{ prop: "categoriesList", value: categories }],
      });
    })
    .catch((err) => {
      handleError(err);
    });
};

export const getBook = (_id) => (dispatch) => {
  axios
    .get(`${API_HOST}/books/${_id}`)
    .then((data) => {
      const book = data.data.data;
      dispatch(updateBooksProps([{ prop: "currentBook", value: book }]));
    })
    .catch((err) => {
      handleError(err);
    });
};

const constructFormDataFromBookObject = (user) => {
  const formData = new FormData();

  const { name, author, category, image } = user;
  formData.append("name", name);
  formData.append("author", author._id);
  formData.append("category", category._id);
  formData.append("image", image);
  return formData;
};

export const addNewBook = (book) => (dispatch) => {
  const formData = constructFormDataFromBookObject(book);
  axios
    .post(`${API_HOST}/books`, formData)
    .then((data) => {
      const book = data.data.data;
      dispatch(mergeBooksProps([{ prop: "books", value: book }]));
      dispatch(updateBooksProps([{ prop: "isBookModal", value: false }]));
      showMessage("Success!", data.data.message, "success");
    })
    .catch((err) => {
      handleError(err);
    });
};

export const updateBook = (book, index) => (dispatch) => {
  axios
    .patch(`${API_HOST}/books/${book._id}`, book)
    .then((data) => {
      const book = data.data.data;
      dispatch(updateBooksProps([{ prop: "books." + index, value: book }]));
      dispatch(updateBooksProps([{ prop: "isBookModal", value: false }]));
      showMessage("Success!", data.data.message, "success");
    })
    .catch((err) => {
      handleError(err);
    });
};

export const deleteBook = (_id, index) => (dispatch) => {
  axios
    .delete(`${API_HOST}/books/${_id}`)
    .then((data) => {
      dispatch(deleteBooksProps([{ prop: "books." + index }]));
      showMessage("Success!", data.data.message, "success");
    })
    .catch((err) => {
      handleError(err);
    });
};