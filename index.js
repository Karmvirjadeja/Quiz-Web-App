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

res.render('result.ejs',{score,questions});

});



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
