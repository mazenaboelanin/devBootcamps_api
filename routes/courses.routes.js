const { getCourses } = require('../controllers/courses.controller');

const router = require('express').Router({mergeParams: true});

router.route('/').get(getCourses);


module.exports = router;