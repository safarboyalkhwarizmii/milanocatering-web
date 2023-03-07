"use strict"

document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.getElementById("login-button");
    let unlockImg = document.querySelector(".unlock-icon")

    loginButton.addEventListener("click", (event) => {
        event.preventDefault();

        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        login(username, password);
    })

    loginButton.addEventListener("mouseover", function() {
        unlockImg.src="../../images/icons/unlock-icon-light.svg";
    })
    
    loginButton.addEventListener("mouseout", function() {
        unlockImg.src="../../images/icons/unlock.svg";
    })  

})
