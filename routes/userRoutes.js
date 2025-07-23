express = require('express');
const router = express.Router();
const userController = require('../controller/userController')
const rules = require('../utils/rules')
const { authenticateJWT } = require('../middleware/auth')




router.get('/', userController.getAllUsers)
router.post(
    '/', 
    [rules.name, rules.email, rules.password],
    userController.createUser
)
router.get('/:id',  authenticateJWT, async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/:id',  authenticateJWT, async (req, res) => {
  try {
    const updates = {};
    if (req.body.name) updates.name = req.body.name;
    if (req.body.password) {
      const bcrypt = require('bcryptjs');
      updates.password = await bcrypt.hash(req.body.password, 10);
    }

    const user = await userModel.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;