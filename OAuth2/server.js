const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies
app.use(cors({ origin: 'http://localhost:3000/', credentials: true })); // Allow requests from frontend

// Use session middleware to store user info in session
app.use(session({ secret: 'yourSecretKey', resave: false, saveUninitialized: true }));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  }, (accessToken, refreshToken, profile, done) => {
    // Attach the access token to the profile object
    profile.accessToken = accessToken;
    return done(null, profile);
  }));
  
  // Serialize and deserialize user to support session
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  
  // Google OAuth2 Login Endpoint (REST API)
  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
  
  // Google OAuth2 Callback URL
  app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    // Send user data and access token as JSON after successful login
   // Send user data and access token as JSON
   const url = `http://localhost:3001?access_token=${req.user.accessToken}`
   res.redirect(url)
  });
  
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });