function validarLogin() {
    //obtener email y contraseña
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    //errores
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    let hasError = false;
    //limpiar los mensajes de error ant
    emailError.innerText = '';
    passwordError.innerText = '';
    //validar correo y ver si esta vacio
    if (!email) {
        emailError.innerText = 'El correo es obligatorio';
        hasError = true;
    } else{
        const emailPattern = /@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
        if (!emailPattern.test(email)) {
            emailError.innerText = 'El correo no es válido';
            hasError = true;
        }
    }
    // vañidar la contraseña y si está vacio
    if (!password) {
        passwordError.innerText = 'La contraseña es obligatoria';
        hasError = true;
    } else if (password.length < 4|| password.length > 10) {
        passwordError.innerText = 'La contraseña debe tener entre 4 y 10 caracteres';
        hasError = true;
    }
    //enviar el form si no hay error
    if (hasError) {
        return false;
    } else {
        alert('Inicio de sesión exitoso');
        return true;
    }
}
