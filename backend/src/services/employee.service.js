const employeeModel = require('../models/employee.model');

class ServiceError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

async function getEmployees() {
    return employeeModel.findAll();
}

async function getEmployeeById(id) {
    const employee = await employeeModel.findById(id);
    if (!employee) throw new ServiceError('Employee not found', 404);
    return employee;
}

async function addEmployee(data) {
    if (!data.name || !data.email) {
        throw new ServiceError('name and email are required', 400);
    }
    return employeeModel.create(data);
}

async function updateEmployee(id, data) {
    const allowedFields = ['name', 'email', 'phone', 'department', 'position', 'salary'];
    if (!allowedFields.some((field) => data[field] !== undefined)) {
        throw new ServiceError('Provide at least one employee field to update', 400);
    }
    if (data.name !== undefined && !data.name) {
        throw new ServiceError('name cannot be empty', 400);
    }
    if (data.email !== undefined && !data.email) {
        throw new ServiceError('email cannot be empty', 400);
    }
    const employee = await employeeModel.update(id, data);
    if (!employee) throw new ServiceError('Employee not found', 404);
    return employee;
}

async function deleteEmployee(id) {
    const deleted = await employeeModel.remove(id);
    if (!deleted) throw new ServiceError('Employee not found', 404);
}

module.exports = { getEmployees, getEmployeeById, addEmployee, updateEmployee, deleteEmployee, ServiceError };
