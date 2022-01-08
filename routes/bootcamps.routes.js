const { getBootcamps, createBootcamp, getBootcamp, updateBootcamp, deleteBootcamp, uploadBootcampPhoto } = require('../controllers/bootcamps.controller');

// include other resource routers
const courseRouter = require('./courses.routes');

const router = require('express').Router();

// re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);


router.route('/').get(getBootcamps).post(createBootcamp);
router.route('/:id').get(getBootcamp).put(updateBootcamp).delete(deleteBootcamp);

router.route('/:id/photo').put(uploadBootcampPhoto);

module.exports = router;