import express  from 'express';
import serviceData  from '../controllers/serviceController.js';

const router = express.Router();


router.get("/service",serviceData )


export default router