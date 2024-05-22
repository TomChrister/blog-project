const api = "https://v2.api.noroff.dev/auth/login";
const mail = document.getElementById('email');
const password = document.getElementById('password');
const logInBtn = document.getElementById('login-button');
const errorMessage = document.getElementById('error-message');

logInBtn.onclick = function authorize() {
    const mailValue = mail.value;
    const pwdValue = password.value;
    const postData = {
        email: mailValue,
        password: pwdValue
    };

    fetch(api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Incorrect email or password'); // Update error message
            }
            return response.json();
        })
        .then(data => {
            window.alert(`User ${data.data.name} successfully logged in!`);
            sessionStorage.setItem('Session key', data.data.accessToken);
            window.location.href = '../index.html';
        })
        .catch(error => {
            console.error('Error', error);
            errorMessage.textContent = 'Incorrect email or password'; // Display error message
            errorMessage.style.display = 'block'; // Make the error message visible
        });
}

