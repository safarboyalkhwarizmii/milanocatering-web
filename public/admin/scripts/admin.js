let primaryButton = document.querySelector("#add-button");
let imageInButton = document.querySelector("#add-button-image");
let deletePopup = document.querySelector(".delete-popup");

fetch(server + "/category/public/QuantityOfNotPublished", {
    method: "GET",
    header: {
        "Authorization": "Bearer " + token
    }

})
    .then((response) => response.json())
    .then((data) => {
        if (data > 0) {
            document.getElementById("publish").innerHTML+=`
            <span class="size">${data}</span>
            <img src="../images/icons/cloud.svg" />`;
        } else {
            document.getElementById("publish").innerHTML+=`
            <img src="../images/icons/cloud.svg" />`;
        }
    });

showCategories(0);


// plus Icon in category add button
primaryButton.addEventListener("mouseover", function() {
    imageInButton.src="../images/plus-icon-light.svg";
})

primaryButton.addEventListener("mouseout", function() {
    imageInButton.src="../images/plus-icon.svg";
})  