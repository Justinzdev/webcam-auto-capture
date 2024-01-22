const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const port = 3001;

const axios = require("axios");
const FormData = require("form-data");

const corsOptions = {
  origin: "*",
  credential: true,
  methods: "GET, POST",
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.json({ limit: "10mb" }));

app.post("/upload", async (req, res) => {
  const { imageSrc } = req.body;
  const matches = imageSrc.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
  // const imageBuffer = Buffer.from(matches[2], "base64");
  // const filename = `image_${Date.now()}.png`;
  // const filePath = `uploads/${filename}`;

  try {
    const response = await axios.post(
      "http://localhost:5000/meter_reading",
      {
        imageSrc: matches.input,
      }
    );

    console.log(response.data)

    res.send("Image saved and sent to Flask API");
  } catch (error) {
    console.error("Error sending the image to Flask API:", error);
    res.status(500).send("Error sending the image to Flask API");
  }

  // fs.writeFile(filePath, imageBuffer, "base64", async (err) => {
  //   if (err) {
  //     console.error("Error saving the image:", err);
  //     res.status(500).send("Error saving the image");
  //   } else {
  //     console.log("Image saved:", filename);
      
  //   }
  // });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
