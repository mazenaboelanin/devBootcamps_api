const { getCourses, getCourse, addCourse, updateCourse, deleteCourse } = require('../controllers/courses.controller');

const router = require('express').Router({mergeParams: true});

router.route('/').get(getCourses).post(addCourse);
router.route('/:id').get(getCourse).put(updateCourse).delete(deleteCourse);


module.exports = router;