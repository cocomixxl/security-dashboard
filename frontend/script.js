// Simulate login functionality
const loginForm = document.getElementById('login-form');
const dashboard = document.getElementById('dashboard');
const loginSection = document.getElementById('login');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulate authentication
    if (username === 'admin' && password === 'password') {
        loginSection.classList.add('hidden');
        dashboard.style.display = 'block';
        loadDashboard();
    } else {
        alert('Invalid username or password');
    }
});

// Load dashboard data
function loadDashboard() {
    // Simulate data fetching
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

    // Render charts
    const loginAttemptsChart = new Chart(document.getElementById('login-attempts-chart'), {
        type: 'pie',
        data: loginAttemptsData,
    });

    const flaggedIPsChart = new Chart(document.getElementById('flagged-ips-chart'), {
        type: 'bar',
        data: flaggedIPsData,
    });

    // Simulate alerts
    const alertsList = document.getElementById('alerts-list');
    const alerts = [
        'Failed login attempt from 192.168.1.1',
        'New flagged IP: 192.168.1.2',
        'Suspicious activity detected from 192.168.1.3',
    ];

    alerts.forEach(alert => {
        const li = document.createElement('li');
        li.textContent = alert;
        alertsList.appendChild(li);
    });
}