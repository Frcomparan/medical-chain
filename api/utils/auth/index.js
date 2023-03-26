const passport = require('passport');

const LocalStrategy = require('./strategies/local.strategy');
const JtwStrategy = require('./strategies/jwt.strategy');

passport.use(LocalStrategy);
passport.use(JtwStrategy);
