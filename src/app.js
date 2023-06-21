const express = require('express');
const session = require('express-session');
const consign = require('consign');
const path = require('path');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
	secret: 'secret-key-nv-int-321',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 24 hours
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));

consign()
  .include('src/routes')
  .then('src/models')
  .then('src/controllers')
  .into(app);

// INÍCIO - LOGIN COM GOOGLE

app.use(passport.initialize());
app.use(passport.session());

// Configure Passport.js with Google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: '880358466926-tq2i56r40h8jar4r8g6s4c6tchjd4v1e.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      // Here, you can save the user profile to the database or perform any other necessary operations.
      // In this example, we'll just pass the profile to the callback.
      return done(null, profile);
    }
  )
);

// Serialize user into the session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from the session
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Routes

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/homeGoogle',
    failureRedirect: '/',
  })
);

// renderiza página de login com google
app.get('/homeGoogle', (req, res) => {
  app.src.controllers.professorControllers.loginGoogle(
    app, req, res
  );
});

app.listen(3000, () => {
console.log(`Servidor rodando em http://127.0.0.1:3000/`);
});