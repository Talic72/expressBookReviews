const express = require('express');
const axios = require("axios");
let books = require("./booksdb.js");

const public_users = express.Router();
const BASE_URL = "http://localhost:5000";

/**
 * Task 1: Get all books
 */
public_users.get('/', function (req, res) {
  return res.status(200).send(JSON.stringify(books, null, 4));
});

/**
 * Task 2: Get book by ISBN
 */
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  return res.status(200).json(books[isbn]);
});

/**
 * Task 3: Get books by author
 */
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  let result = {};

  for (let key in books) {
    if (books[key].author === author) {
      result[key] = books[key];
    }
  }

  return res.status(200).json(result);
});

/**
 * Task 4: Get books by title
 */
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  let result = {};

  for (let key in books) {
    if (books[key].title === title) {
      result[key] = books[key];
    }
  }

  return res.status(200).json(result);
});

/**
 * Task 5: Get reviews by ISBN
 */
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  return res.status(200).json(books[isbn].reviews);
});

/**
 * Task 10: Async get all books using Axios
 */
public_users.get('/async/books', async function (req, res) {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books" });
  }
});

/**
 * Task 11: Async get book by ISBN
 */
public_users.get('/async/isbn/:isbn', async function (req, res) {
  try {
    const response = await axios.get(`${BASE_URL}/isbn/${req.params.isbn}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching ISBN" });
  }
});

/**
 * Task 12: Async get books by author
 */
public_users.get('/async/author/:author', async function (req, res) {
  try {
    const response = await axios.get(`${BASE_URL}/author/${req.params.author}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching author" });
  }
});

/**
 * Task 13: Async get books by title
 */
public_users.get('/async/title/:title', async function (req, res) {
  try {
    const response = await axios.get(`${BASE_URL}/title/${req.params.title}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching title" });
  }
});

module.exports.general = public_users;
