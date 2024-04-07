import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import env from "dotenv";
env.config();
const app = express();

// Declare questions as a let variable to allow reassignment
let questions = [
  
];
try {
  let data = fs.readFileSync('question.json', 'utf-8');
  questions = JSON.parse(data);
  console.log(questions);
} catch (err) {
  console.error('Error reading questions file:', err);
}

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('index', { questions
  
  });
});

app.post('/submit', (req, res) => {
  // Process the submitted answers here
  console.log(req.body);
  res.send('Answers submitted');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
