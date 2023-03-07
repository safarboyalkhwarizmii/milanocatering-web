var innerCategoryId = localStorage.getItem("open");

fetch(server + "/innerCategory/public/QuantityOfNotPublished", {
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
            <img src="../../../images/icons/cloud.svg" />`;
        } else {
            document.getElementById("publish").innerHTML+=`
            <img src="../../../images/icons/cloud.svg" />`;
        }
    });

fetch(server + "/innerCategory/public/getByCategoryId/" + innerCategoryId + "/" + "UZ", {
    method: "GET",
})
.then (response => response.json())
.then (data => {
    console.log(data);

    data.forEach(element => {
        if (element != null) {
            document.querySelector(".categories").innerHTML += 
            `
                <div class="category" id="${element.id}">
                    <div class="category-header">
                        <img src="${server + "/attach/public/open/" + element.photo}" class="header-image" alt="Category image"/>
                    </div>
                    <div class="category-body">
                        <h2>${element.nameUz}</h2>
                        <p>${element.descriptionUz}</p>
                    </div>
                </div>
            `
        }
    });

    document.querySelectorAll(".category").forEach(element => {
        element.addEventListener("click", () => {
            localStorage.setItem("inner", element.getAttribute('id'))
            window.location.replace("open/");
        });
    });
})