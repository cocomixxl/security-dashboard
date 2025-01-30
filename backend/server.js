const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

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