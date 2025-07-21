express = require('express');
const router = express.Router();
const userController = require('../controller/userController')
const rules = require('../utils/rules')
const { authenticateJWT } = require('../middleware/auth')




router.get('/', userController.getAllUsers)
router.get(
    '/:id', 
    authenticateJWT,
    rules.id,
    userController.getUserById
)


router.post(
    '/', 
    [rules.name, rules.email, rules.password],
    userController.createUser
)

router.put(
    '/:id', 
    authenticateJWT,
    userController.updateUser
)

module.exports = router;