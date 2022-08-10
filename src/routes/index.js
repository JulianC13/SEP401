var expess = require('express');
var router = expess.Router();

const {loginView } = require('../controllers/loginController');
const {menuView } = require('../controllers/menuController');
const {appointmentView } = require('../controllers/appointmentController');

router.get('/menu', menuView);
router.get('/', loginView);
router.get('/appointment/:appointmentId', appointmentView);

module.exports = router;
