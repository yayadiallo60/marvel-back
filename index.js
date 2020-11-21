const express = require("express");
const formidable = require("express-formidable");
const axios = require("axios");
const md5 = require("md5");
const uid2 = require("uid2");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(formidable());
app.use(cors());

const apikey = process.env.API_KEY;
const publicKey = process.env.PUBLIC_KEY;

app.get("/characters", async (req, res) => {
  const ts = uid2(16);
  const hash = md5(ts + apikey + publicKey);
  const limit = 100;

  try {
    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/characters?limit=${limit}&ts=${ts}&apikey=${publicKey}&hash=${hash}`
    );
    // console.log(response.data);
    res.status(200).json(response.data.data);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/character", async (req, res) => {
  const ts = uid2(16);
  const hash = md5(ts + apikey + publicKey);

  try {
    const { id } = req.query;
    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`
    );
    // console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/character-comics", async (req, res) => {
  const apikey = "52fac4ef9115e63e24900ecb77eebcfb4155a90e";
  const publicKey = "b7feeeb4d6f34647f462d25ae2f7785e";
  const ts = uid2(16);
  const hash = md5(ts + apikey + publicKey);

  try {
    const { id } = req.query;
    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/characters/${id}/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`
    );
    // console.log(response.data);
    res.status(200).json(response.data.data);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/comics", async (req, res) => {
  const ts = uid2(16);
  const hash = md5(ts + apikey + publicKey);
  const limit = 100;

  try {
    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/comics?limit=${limit}&ts=${ts}&apikey=${publicKey}&hash=${hash}`
    );
    console.log(response.data);
    res.status(200).json(response.data.data);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("*", (req, res) => {
  res.status(404).json("Page not found");
});

app.listen(process.env.PORT, () => {
  console.log("serveur started on port " + process.env.PORT);
});
