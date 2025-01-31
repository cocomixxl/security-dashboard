const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Simulated data
const loginAttemptsData = {
    labels: ['Successful', 'Failed'],
    datasets: [{
        label: 'Login Attempts',
        data: [75, 25],
        backgroundColor: ['#36a2eb', '#ff6384'],
    }]
};

const flaggedIPsData = {
    labels: ['192.168.1.1', '192.168.1.2', '192.168.1.3'],
    datasets: [{
        label: 'Flagged IPs',
        data: [10, 20, 30],
        backgroundColor: '#ff6384',
    }]
};

const alerts = [
    'Failed login attempt from 192.168.1.1',
    'New flagged IP: 192.168.1.2',
    'Suspicious activity detected from 192.168.1.3',
];

// API endpoint to get login attempts data
app.get('/api/login-attempts', (req, res) => {
    res.json(loginAttemptsData);
});

// API endpoint to get flagged IPs data
app.get('/api/flagged-ips', (req, res) => {
    res.json(flaggedIPsData);
});

// API endpoint to get alerts
app.get('/api/alerts', (req, res) => {
    res.json(alerts);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

const rateLimit = require('express-rate-limit');

// Rate limiting configuration
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
});

// Apply rate limiting to all requests
app.use(limiter);

const helmet = require('helmet');

// Use Helmet to set secure HTTP headers
app.use(helmet());

const { body, validationResult } = require('express-validator');

// Login endpoint with input validation
app.post('/api/login', [
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('password').trim().notEmpty().withMessage('Password is required'),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    // Simulate authentication
    if (username === 'admin' && password === 'password') {
        res.json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});

