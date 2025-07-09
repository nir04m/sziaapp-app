import express from 'express';

const app = express();

app.get('/api/auth/signup', (req, res) => {
  res.send('Hello, SziaApp Backend! Signup!');
});

app.get('/api/auth/login', (req, res) => {
  res.send('Hello, SziaApp Backend! Login!');
});

app.get('/api/auth/logout', (req, res) => {
  res.send('Hello, SziaApp Backend! Logout!');
});



app.listen(5050, () => {
  console.log('Server is running on http://localhost:5050');
});