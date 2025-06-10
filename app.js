// Import necessary modules
// This is a simple blog application using Express.js and EJS for templating.
//web framework
import express from 'express';
// Parses Post request bodies
import bodyParser from 'body-parser';
// Help handle file paths
import path from 'path';
// Converts file URLs to paths
import { fileURLToPath } from 'url';
// Get the directory name of the current module
import { dirname } from 'path';
//fix the __dirname issue in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//initialize the express application
const app = express();
// In-memory storage for blog posts
let posts = [];
let idCounter = 1;
//set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// Routes
// Home route to display all posts
app.get('/', (req, res) => {
  res.render('home', { posts });
});
// Routes form to create a new post, edit an existing post, and delete a post
app.get('/new', (req, res) => {
  res.render('new');
});
// Handle new post submission
app.post('/new', (req, res) => {
  const { title, content } = req.body;
  posts.push({ id: idCounter++, title, content });
  res.redirect('/');
});
// Form to edit an existing post
app.get('/edit/:id', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  res.render('edit', { post });
});
// Handle post edit submission
app.post('/edit/:id', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  post.title = req.body.title;
  post.content = req.body.content;
  res.redirect('/');
});
// Handle post deletion
app.post('/delete/:id', (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  res.redirect('/');
});
// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
