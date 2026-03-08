// get the input filds with id
const Username  = document.getElementById('Username');
const Password = document.getElementById('Password');


// add eventListener to signup button
document.getElementById('sign-in-btn').addEventListener('click', () => {

    const UsernameValue = Username.value.toLowerCase();
    const PasswordValue = Password.value.toLowerCase();

    if(UsernameValue === "admin" && PasswordValue === "admin123"){
        window.location.href = 'home.html';
    }
    else{
        alert("Incorrect username or password. Please try again.");
        Username.value = "";
        Password.value = "";
    }
    
}) 