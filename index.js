// Import necessary modules
import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import env from "dotenv";

// Load environment variables
env.config();

// Create Express app
const app = express();

// Define empty arrays to store questions and correct answers
let questions = [];
let Corr_Ans = [];

try {
    // Read questions from the JSON file
    let data = fs.readFileSync('question.json', 'utf-8');
    questions = JSON.parse(data);

    // Extract correct answers from questions
    Corr_Ans = questions.map(question => question.answer);
    

} catch (err) {
    console.error('Error reading questions file:', err);
}

// Configure middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views');

// Define routes

// Route to render the quiz form
app.get('/', (req, res) => {
    res.render('index', { questions });
});

// Route to handle form submission and calculate score
app.post('/submit', (req, res) => {
    let User_Ans = [];
    const submittedAnswers = req.body;

    // Iterate over submitted answers and convert them to integers
    Object.keys(submittedAnswers).forEach((questionIndex) => {
        const selectedOptionIndex = parseInt(submittedAnswers[questionIndex]);
        User_Ans.push(selectedOptionIndex);
    });

    // Calculate score
    let score = 0;
    for (let i = 0; i < User_Ans.length; i++) {
        if (i < Corr_Ans.length && User_Ans[i] === Corr_Ans[i]) {
            score++;
        }
    }

    // Render result page with score and answers
    res.render('result.ejs', { score, questions, selectedAnswers: User_Ans });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
