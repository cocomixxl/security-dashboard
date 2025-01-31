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
async function loadDashboard() {
    // Fetch login attempts data
    const loginAttemptsResponse = await fetch('http://localhost:3000/api/login-attempts');
    const loginAttemptsData = await loginAttemptsResponse.json();

    // Fetch flagged IPs data
    const flaggedIPsResponse = await fetch('http://localhost:3000/api/flagged-ips');
    const flaggedIPsData = await flaggedIPsResponse.json();

    // Fetch alerts
    const alertsResponse = await fetch('http://localhost:3000/api/alerts');
    const alerts = await alertsResponse.json();

    // Render charts
    const loginAttemptsChart = new Chart(document.getElementById('login-attempts-chart'), {
        type: 'pie',
        data: loginAttemptsData,
    });

    const flaggedIPsChart = new Chart(document.getElementById('flagged-ips-chart'), {
        type: 'bar',
        data: flaggedIPsData,
    });

    // Display alerts
    const alertsList = document.getElementById('alerts-list');
    alerts.forEach(alert => {
        const li = document.createElement('li');
        li.textContent = alert;
        alertsList.appendChild(li);
    });

}