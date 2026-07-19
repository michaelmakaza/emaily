const passport = require('passport');

module.exports = (app) => {
    // 1. Kick off the OAuth flow with required permissions
    app.get(
      '/auth/google',
      passport.authenticate('google', {
        scope: ['profile', 'email']
      })
    );

    // 2. Google hits this route with user code - Authenticate, then redirect them somewhere!
    app.get(
      '/auth/google/callback',
      passport.authenticate('google'),
      (req, res) => {
        res.redirect('/surveys'); // Or whatever dashboard URI your client uses
      }
    );

    // 3. Log out and immediately communicate to the client that they are unauthenticated
    app.get('/api/logout', (req, res) => { 
      req.logout();
      res.send(req.user); // Should send back an empty response since they logged out
    });

    // 4. Send back the clear Passport user instance profile data
    app.get('/api/current_user', (req, res) => {
      res.send(req.user);
    });
};