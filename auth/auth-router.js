const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secrets = require('./secrets');

const Users = require('../users/users-model');

// for endpoints beginning with /api/auth

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);

  user.password = hash;

  Users.add(user)
    .then(addedUser =>{
      res.status(201).json({message: 'New user was added successfully'});
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: err.message});
    });
});

router.post('/login', (req, res) => {
  const {username, password} = req.body;

  Users.findBy({username})
  .first()
  .then(foundUser => {
    if(foundUser && bcrypt.compareSync(password, foundUser.password)){
        const token = generateToken(foundUser);
        res.status(200).json({message: 'Welcome!', token: token})

    } else {
      res.status(401).json({ message: 'Invalid Credentials' });
      }
  })
  .catch(error => {
    res.status(500).json(error);
  });
});

function generateToken(user){
  const payload = {
    userId: user.id,
    username: user.username
  };

  const secret = secrets.jwtSecret;

  const options = {
    expiresIn: '1h'
  };
  return jwt.sign(payload,secret,options);
};

module.exports = router;
