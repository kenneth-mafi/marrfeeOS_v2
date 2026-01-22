const authService = require("../services/auth.service");

async function register(req, res, next) {
  try {
    const result = await authService.register(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function loginEmail(req, res, next) {
  try {
    const result = await authService.loginEmail(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function setPin(req, res, next) {
  try {
    const result = await authService.setPin(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function loginPin(req, res, next) {
  try {
    const result = await authService.loginPin(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = { register, loginEmail, setPin, loginPin };
