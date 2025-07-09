import express from 'express';

const router = express.Router();

router.get('/signup', (req, res) => {
  res.send('Hello, SziaApp Backend! Signup!');
});
router.get('/login', (req, res) => {
  res.send('Hello, SziaApp Backend! Login!');
}); 
router.get('/logout', (req, res) => {
    res.send('Hello, SziaApp Backend! Logout!');
});

export default router;