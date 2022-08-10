var expess = require('express');
var router = expess.Router();

const {loginView } = require('../controllers/loginController');
const {menuView } = require('../controllers/menuController');
const {appointmentView } = require('../controllers/appointmentController');
const {infoView } = require('../controllers/userInfo');

router.get('/menu', menuView);
router.get('/', loginView);
router.get('/appointment/:appointmentId', appointmentView);
router.get('/userInfo', infoView);

module.exports = router;
