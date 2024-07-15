import express from 'express';
import contactForm from '../controllers/contactController.js';

const router = express.Router();



router.route("/contact").post(contactForm);

 export default router