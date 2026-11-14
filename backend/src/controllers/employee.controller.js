const employeeService = require('../services/employee.service');

function handleError(res, error) {
    if (error.statusCode) {
        return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ success: false, message: 'An employee with this email already exists' });
    }
    console.error('Employee API error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
}

async function addEmployee(req, res) {
    try {
        const employee = await employeeService.addEmployee(req.body);
        return res.status(201).json({ success: true, data: employee });
    } catch (error) {
        return handleError(res, error);
    }
}

async function getEmployees(req, res) {
    try {
        const employees = await employeeService.getEmployees();
        return res.json({ success: true, data: employees });
    } catch (error) {
        return handleError(res, error);
    }
}

async function getEmployeeById(req, res) {
    try {
        const employee = await employeeService.getEmployeeById(req.params.id);
        return res.json({ success: true, data: employee });
    } catch (error) {
        return handleError(res, error);
    }
}

async function updateEmployee(req, res) {
    try {
        const employee = await employeeService.updateEmployee(req.params.id, req.body);
        return res.json({ success: true, data: employee });
    } catch (error) {
        return handleError(res, error);
    }
}

async function deleteEmployee(req, res) {
    try {
        await employeeService.deleteEmployee(req.params.id);
        return res.json({ success: true, message: 'Employee deleted successfully' });
    } catch (error) {
        return handleError(res, error);
    }
}

module.exports = { addEmployee, getEmployees, getEmployeeById, updateEmployee, deleteEmployee };
