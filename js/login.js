const api = "https://v2.api.noroff.dev/auth/login"
const mail = document.getElementById('email');
const password = document.getElementById('password');
const logInBtn = document.getElementById('login-button');

logInBtn.onclick = function authorize(){
    const mailValue = mail.value
    const pwdValue = password.value
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
                throw new Error('Response not ok');
            }
            return response.json()
        })
        .then(data => {
            window.alert(`User ${data.data.name} successfully logged in!`);
            sessionStorage.setItem('Session key', data.data.accessToken);
            window.location.href = '../index.html';
        })
        .catch(error => {
            console.error('Error', error)
        });
}
