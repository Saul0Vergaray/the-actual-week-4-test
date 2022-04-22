const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

const {getMeme, deleteMeme, createMeme, updateMeme} = require('./controller');

app.get('/api/meme', getMeme);
app.delete('/api/meme/:id', deleteMeme);
app.post('/api/meme', createMeme);
app.put('/api/meme/:id', updateMeme);


app.get("/api/compliment", (req, res) => {
  const compliments = ["You smell different when you are awake",
					 "You are now aware that youre blinking",
					 "Stay away from windows.",
           "Birds are not real.",
           "Light the blunt.",
           "Lizard people are real."

  ];

  // choose random compliment
  let randomIndex = Math.floor(Math.random() * compliments.length);
  let randomCompliment = compliments[randomIndex];

  res.status(200).send(randomCompliment);
  
});

app.listen(4000, () => console.log("Server running on 4000"));
