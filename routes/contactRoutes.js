// routes/contactRoutes.js
import express from 'express';
import { body } from 'express-validator';
import ContactController from '../controllers/contactController.js';

const router = express.Router();

/* Contacts */
router.post(
    '/',
    [
        body('email').optional().isEmail().withMessage('Invalid email'),
        body('phone').optional().isString(),
        body('first_name').optional().isString()
    ],
    ContactController.createContact
);

router.get('/', ContactController.listContacts);
router.get('/:id', ContactController.getContact);
router.put('/:id', ContactController.updateContact);
router.delete('/:id', ContactController.deleteContact);

/* Communications */
router.post(
    '/:contactId/comms',
    [
        body('type').isIn(['email','sms','call','whatsapp','other']).withMessage('Invalid type'),
        body('direction').optional().isIn(['inbound','outbound'])
    ],
    ContactController.addCommunication
);

router.get('/:contactId/comms', ContactController.listCommunications);
router.get('/:contactId/comms/:commId', ContactController.getCommunication);
router.delete('/:contactId/comms/:commId', ContactController.deleteCommunication);

export default router;