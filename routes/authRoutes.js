express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const rules = require('../utils/rules');

router.post(
    '/signup',
    [rules.name, rules.email, rules.password],
   authController.signUp
)



router.post(
    '/signin',
    [rules.email, rules.password],
    authController.signIn
)

module.exports = router;