import express from 'express';
import {getAllUsers, getAllContacts, deleteUserById, updateUserById, getUserById, deleteContactById, getAllService, createService} from '../controllers/adminController.js';
import authMiddleware from '../../middlewares/authMiddleware.js';
import adminMiddleware from '../../middlewares/adminMiddleware.js';


const router = express.Router();

router.route('/users').get( authMiddleware ,adminMiddleware,getAllUsers);
router.route('/users/:id').get(authMiddleware,adminMiddleware,getUserById);
router.route('/users/edit/:id').patch(authMiddleware,adminMiddleware,updateUserById)
router.route('/contacts').get( authMiddleware,adminMiddleware ,getAllContacts)
router.route('/users/delete/:id').delete(authMiddleware,adminMiddleware,deleteUserById)
router.route('/contacts/delete/:id').delete(authMiddleware,adminMiddleware ,deleteContactById)
router.route('/service').get(getAllService)
router.route('/createService').post( authMiddleware,adminMiddleware ,createService)


export default router