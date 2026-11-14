const express = require('express');
const employeeController = require('../controllers/employee.controller');

const router = express.Router();

router.post('/', employeeController.addEmployee);
router.get('/', employeeController.getEmployees);
router.get('/:id', employeeController.getEmployeeById);
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
