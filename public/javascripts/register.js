const regBtn = document.getElementById('regBtn');

regBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const raw_form = document.forms.regForm;
    apiClient.register(raw_form.email.value, raw_form.password.value, (result, error) => {
        if (!error) {
            localStorage.setItem('token', result.token);
            alert(`${JSON.stringify(result)}`);
            window.location.replace('/');
        } else {
            alert(`${JSON.stringify(error)}`);
        }
    });
});