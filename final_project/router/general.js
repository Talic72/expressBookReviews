const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require("axios");

public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  // Check if user already exists
  if (!isValid(username)) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Add new user
  users.push({ username, password });

  return res.status(200).json({ message: "User successfully registered" });
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
 return res.status(200).send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const book = books[isbn];
  return res.status(200).json(book);
 });
 public_users.get('/async/books', async function (req, res) {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books" });
  }
});
public_users.get('/async/isbn/:isbn', async function (req, res) {
  try {
    const isbn = req.params.isbn;
    const response = await axios.get(`${BASE_URL}/isbn/${isbn}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching book by ISBN" });
  }
});
public_users.get('/async/author/:author', async function (req, res) {
  try {
    const author = req.params.author;
    const response = await axios.get(`${BASE_URL}/author/${author}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books by author" });
  }
});
public_users.get('/async/title/:title', async function (req, res) {
  try {
    const title = req.params.title;
    const response = await axios.get(`${BASE_URL}/title/${title}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books by title" });
  }
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  let result = {};

  for (let key in books) {
    if (books[key].author === author) {
      result[key] = books[key];
    }
  }

  return res.status(200).json(result);
});

// Get all books based on title
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

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const reviews = books[isbn].reviews;

  return res.status(200).json(reviews);
});

module.exports.general = public_users;
