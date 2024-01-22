const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3001;

const corsOptions = {
  origin: '*',
  credential: true,
  methods: 'GET, POST'
}

app.use(cors(corsOptions))
app.use(express.json({ limit: '10mb' }))
app.use(bodyParser.json({ limit: '10mb' }));

app.post('/upload', (req, res) => {
  const { imageSrc } = req.body;

  const matches = imageSrc.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
  const imageBuffer = new Buffer.from(matches[2], 'base64');

  const filename = `image_${Date.now()}.png`;
  const filePath = `uploads/${filename}`;

  fs.writeFile(filePath, imageBuffer, 'base64', (err) => {
    if (err) {
      console.error('Error saving the image:', err);
      res.status(500).send('Error saving the image');
    } else {
      console.log('Image saved:', filename);
      res.send('Image saved');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
