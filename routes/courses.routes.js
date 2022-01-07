const { getCourses, getCourse, addCourse } = require('../controllers/courses.controller');

const router = require('express').Router({mergeParams: true});

router.route('/').get(getCourses).post(addCourse);
router.route('/:id').get(getCourse);


module.exports = router;