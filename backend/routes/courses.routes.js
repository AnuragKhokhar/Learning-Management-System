import { Router } from 'express';
import { getAllCourses, getLecturesByCourseId, createCourse, updateCourse, removeCourse, addLecturesToCourseById} from '../controllers/course.controller.js'
import { authorizedRoles, isLoggedIn, authorizedSubscriber } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js'

const router = Router();

router.route('/')
    .get(isLoggedIn, getAllCourses)
    .post(
        isLoggedIn,
        authorizedRoles('ADMIN'),
        upload.single("thumbnail"),
        createCourse
    );
    

router.route('/:id')
    .get(isLoggedIn, authorizedSubscriber,getLecturesByCourseId)
    .put(isLoggedIn, authorizedRoles('ADMIN'), updateCourse)
    .delete(isLoggedIn,authorizedRoles('ADMIN'), removeCourse)
    .post(
        isLoggedIn,authorizedRoles('ADMIN'),upload.single("lecture"),
        addLecturesToCourseById
    )

export default router;