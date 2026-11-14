const db = require('../db');

async function findAll() {
    const [rows] = await db.execute('SELECT * FROM employees ORDER BY id DESC');
    return rows;
}

async function findById(id) {
    const [rows] = await db.execute('SELECT * FROM employees WHERE id = ?', [id]);
    return rows[0] || null;
}

async function create(employee) {
    const [result] = await db.execute(
        'INSERT INTO employees (name, email, phone, department, position, salary) VALUES (?, ?, ?, ?, ?, ?)',
        [employee.name, employee.email, employee.phone ?? null, employee.department ?? null,
            employee.position ?? null, employee.salary ?? null]
    );
    return findById(result.insertId);
}

async function update(id, employee) {
    const fields = ['name', 'email', 'phone', 'department', 'position', 'salary'];
    const updates = fields.filter((field) => employee[field] !== undefined);
    if (!updates.length) return null;

    const assignments = updates.map((field) => `${field} = ?`).join(', ');
    const values = updates.map((field) => employee[field]);
    const [result] = await db.execute(
        `UPDATE employees SET ${assignments} WHERE id = ?`,
        [...values, id]
    );
    // MySQL may report zero changed rows when the submitted values match the
    // existing row, so check whether the employee still exists.
    return findById(id);
}

async function remove(id) {
    const [result] = await db.execute('DELETE FROM employees WHERE id = ?', [id]);
    return result.affectedRows > 0;
}

module.exports = { findAll, findById, create, update, remove };
