const express = require("express");
const axios = require("axios");

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authApiUrl = "https://interview.outstem.io/auth";
const mfaApiUrl = "https://interview.outstem.io/auth/mfa";

app.post("/auth", async (req, res) => {
  try {
    // const response = await axios.post(authApiUrl, req.body);
    const response = await axios({
      method: "POST",
      data: req.body,
      validateStatus: (status) => {
        return status >= 200 && status < 500;
      },
      url: authApiUrl,
    });
    console.log({ response });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.post("/auth/mfa", async (req, res) => {
  try {
    const response = await axios({
      method: "POST",
      url: mfaApiUrl,
      data: req.body,
      validateStatus: (status) => {
        return status >= 200 && status < 500;
      },
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
