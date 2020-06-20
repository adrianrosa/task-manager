const express = require('express');
const { check, body } = require('express-validator');
const router = express.Router();
const ticketController = require('./controllers/ticket.controller');
const projectController = require('./controllers/project.controller');
const statusController = require('./controllers/status.controller');

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
router.get('/tickets/project/:id', ticketController.getByProject);
router.get('/tickets/status/:id', ticketController.getByStatus);
router.post('/tickets', [
    check('title').isString().isLength({min: 1}),
    body('date_created').custom((value, {req}) => {
        if (value.match(/[0-9]{8,10}/)) {
            return true;
        }
        throw new Error('date_created: format incorrect, timestamp expected');
    }),
    check('description').isString().isLength({min: 1})
], ticketController.create);
router.put('/tickets/:id', ticketController.change);
router.patch('/tickets/:id', [
    check('title').isString().isLength({min: 2})
],ticketController.updateStatus);
router.delete('/tickets/:id', ticketController.delete);

/* Project routes */
router.get('/projects', projectController.getAll);
router.get('/projects/:id', projectController.getOne);
router.post('/projects', [
    check('name').isString().isLength({min: 1}),
    body('date_created').custom((value, {req}) => {
        if (value.match(/[0-9]{8,10}/)) {
            return true;
        }
        throw new Error('date_created: format incorrect, timestamp expected');
    }),
    check('description').isString().isLength({min: 1})
], projectController.create);
router.put('/projects/:id', projectController.change);
router.delete('/projects/:id', projectController.delete);

/* Status routes */
router.get('/statuses', statusController.getAll);

module.exports = router;
