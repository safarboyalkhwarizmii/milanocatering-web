const server = "http://142.93.50.175:8081";
var categoryId = localStorage.getItem("open");
let language = localStorage.getItem("language");

fetch(server + "/innerCategory/public/getByCategoryId/" + categoryId + "/" + language, {
    method: "GET",
    headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
    }
})
.then(response => {
    if (response.ok) {
        return response.json()
    }
})
.then((data) => {
    if (data != false){
        data.forEach(element => {
            console.log(element);
            if (language == "RU") {
                document.querySelector(".categories").innerHTML += 
                `
                    <div class="category">
                        <div class="category-header">
                            <img src="${server + "/attach/public/open/" + element.photo}" class="header-image" alt="Category image"/>
                        </div>
                        <div class="category-body">
                            <h2>${element.nameRu}</h2>
                            <p>${element.descriptionRu}</p>
                        </div>
                    </div>
                `
            } else {
                document.querySelector(".categories").innerHTML += 
                `
                    <div class="category">
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
    }
    
})

// write data to body 