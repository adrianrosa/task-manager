const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const ticketController = require('./controllers/ticket.controller');

/* Index route */
router.get('/', (req, res, next) => {
    return res.status(200).json({
        result: true, 
        message: "API Task manager - v1.0.0"
    });
});

/* Ticket routes */
router.get('/tickets', ticketController.getAll);
router.get('/tickets/:id', ticketController.getOne);
router.post('/tickets', [
    check('title').isString().isLength({min: 1}),
    check('date_created').isString().toDate(),
    //check('user').isLength({min: 1}),
    check('user').isJSON(),
    check('description').isString().isLength({min: 1}),
    check('proyect').isJSON()
], ticketController.create);
router.put('/tickets/:id', ticketController.change);
router.patch('/tickets/:id', ticketController.updateStatus);
router.delete('/tickets/:id', ticketController.delete);

module.exports = router;
