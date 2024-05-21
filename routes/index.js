var express = require('express');
var router = express.Router();


const homePage = async (req, res) => {
  try {
    res.render('home')
  } catch (err) {
    console.error(err.message)
  }
}

const LoginPage = async (req, res) => {
  try {
    if (req.session.authenticated) {
      res.redirect('/')
    } else {
      res.render('loginPage')
    }
  } catch (err) {
    console.error(err.message)
  }
}


const Authentication = async (req, res) => {
  if (req.session.authenticated) {
    res.render('/')
  } else {
    const { username, password } = req.body;
    const user = 'user'
    const pass = '123';
    if (username && password) {
      if (req.session.authenticated) {
        res.json({ session: req.session, session: req.session, message: 'Login successful' })
      } else {
        if (username === user && password === pass) {
          req.session.authenticated = true,
            req.session.user = {
              username
            }
          res.status(200).json({ session: req.session, message: 'Login successful' });
        } else {
          res.status(401).json({ message: 'wrong user name or password' })
        }
      }
    }
  }
}

const middle = async (req, res, next) => {
  try {
    if (req.session.authenticated) {
      next()
    } else {
      res.redirect('/login')
    }
  } catch (err) {
    console.log(err.message)
  }
}

router.get('/', middle, homePage);
router.get('/login', LoginPage);
router.post('/authentication', Authentication)
router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/')
})

module.exports = router;

