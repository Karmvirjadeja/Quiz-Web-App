import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import env from "dotenv";
env.config();
const app = express();
let questions = []; // Define an empty array to store questions
let Corr_Ans=[];

try {
  // Read questions from the JSON file
  let data = fs.readFileSync('question.json', 'utf-8');
  questions = JSON.parse(data);
  Corr_Ans= questions.map(question => question.answer);
  console.log(Corr_Ans);

} catch (err) {
  console.error('Error reading questions file:', err);
}

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('index', { questions });
});


app.post('/submit', (req, res) => {
 
    let User_Ans=[];
const submittedAnswers=req.body;

Object.keys(submittedAnswers).forEach((questionIndex)=>{
  const selectedOptionIndex =parseInt(submittedAnswers[questionIndex]);
  User_Ans.push(selectedOptionIndex);
});

let score = 0;
for (let i = 0; i < User_Ans.length; i++) {
  if (User_Ans[i] === Corr_Ans[i]) {
    score++;
  }
}

res.render('result.ejs',{score});

});




// Here is the Answer route
app.get('/answers', (req, res) => {
  // Assume you have an array of questions and correct answers
  const questions = [
      { text: "What is Node.js?", answer: "A back-end JavaScript runtime" },
      { text: "How does Node.js handle blocking I/O operations?", answer: "By using synchronous functions" },
      // Add more questions here
  ];

  // Render the 'answers.ejs' template with the questions and correct answers
  res.render('answers', { questions });
});







app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
