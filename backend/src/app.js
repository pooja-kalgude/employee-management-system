const express = require('express');
const cors = require('cors');
require('dotenv').config();

const employeesRouter = require('./routes/employees');

const app = express();

// CORS configuration
const corsOptions = {
    origin: [
        'http://localhost:3000',
        'https://employee-management-frontend-lemon-three.vercel.app'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

// IMPORTANT: CORS must be registered before your routes
app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/employees', employeesRouter);

app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Backend is running!'
    });
});

// Local development only
if (require.main === module) {
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;