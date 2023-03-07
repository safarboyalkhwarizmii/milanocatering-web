"use strict"
const server = "http://142.93.50.175:8081";
const token = localStorage.getItem('token');
let language = localStorage.getItem('language');

document.addEventListener("DOMContentLoaded", () => {
    if (language === null) {
        localStorage.setItem("language", "RU")
        language = localStorage.getItem('language');
        console.log(language);
    }

    if (token == null) {
        if (!(window.location.pathname === "/admin/login/")) {
            window.location.replace("/admin/login/");
        }

    } else {
        if (window.location.pathname === "/admin/login/") {
            var obj = JSON.parse(localStorage.getItem("login"))
            login(obj.username, obj.password);    
            window.location.replace("/admin/");
        } else {
            var obj = JSON.parse(localStorage.getItem("login"))
            login(obj.username, obj.password);  
        }
    }
})

function showCategories(page) {
    var categories;

    // Show Categories
    fetch(server + "/category/public/getList/" + "UZ" + "?page=" + page + "&size=" + 6, {
        method: "GET"
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((data) => {
            if (data != undefined && data != null) {
                // console.log(data.totalPages)
                data.totalPages
                let categoriesPage = document.querySelector(".categories-page");
                
                if (data.totalPages > 1) {
                    categoriesPage.innerHTML = "";
                    for (let i = 0; i <= data.totalPages-1; i++) {
                        categoriesPage.innerHTML+=`<span class="page">${i+1}</span>`;
                        
                        // Pagination
                        console.log(i+1)
                        let indexButton = document.querySelector(".categories-page span:nth-child(" + (i+1) + ")");
                        
                        indexButton.addEventListener("click", () => {
                            
                        });
                        
                    }

                    document.querySelectorAll(".page").forEach(page => {
                        page.addEventListener("click", () => {
                            let i = page.innerHTML-1;

                            console.log("Listening " + (i+1))
                            console.log("For " + i)
                            showCategories(i);
                        })
                    });

                    let activeButton = document.querySelector(".categories-page span:nth-child(" + (page+1) + ")");
                    activeButton.classList.add("active-page");
                }

                // console.log(data.totalElements);
                // console.log(data.content)
                categories = data.content;

                document.querySelector(".categories").innerHTML = "";   
                categories.forEach(category => {
                    addCategory(category);
                });
            }
        })
        .then(() => {
            let categories = document.querySelectorAll(".category");

                categories.forEach(category => {
                    category.addEventListener("click", () => {
                        console.log(category.attributes.id.value)
                        localStorage.setItem("open", category.attributes.id.value);
                        window.location.replace("/admin/category/open/");
                    })
                });
        })
}

function addCategory(category) {
    document.querySelector(".categories").innerHTML += 
    `<div class="category" id="${category.id}">
        <div class="category-header">
            <img src="${server + "/attach/public/open/" + category.photoId}" class="header-image" alt="Category image"/>
        </div>
        <div class="category-body">
            <h2>${category.nameUz}</h2>
            <p>
               ${category.descriptionUz}
            </p>
        </div>
    </div>`
}

function login(username, password) {
    let userObj = {username: username, password: password};
    let jsonBody = JSON.stringify(userObj);

    fetch(server + "/auth/login", {
        method: "POST",
        headers: {
            "Accept-language": "EN",
            "Content-Type": "application/json"
        },
        body: jsonBody
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Error Password or Username")
            }
        })
        .then((data) => {
            if (data != undefined) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('login', jsonBody);
                
                if (window.location.pathname === "/admin/login/") {
                    window.location.replace("/admin/");
                }
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

function signOut() {
    localStorage.clear();
    window.location.replace("/")
}

function createCategory(photoId, titleUz, titleRu, descriptionUz, descriptionRu) {
    let alertSuccess = document.querySelector(".alert");


    let categoryObj = {
        photo: photoId, 
        nameUz: titleUz,
        nameRu: titleRu,
        descriptionUz: descriptionUz,
        descriptionRu: descriptionRu
    };
    let jsonBody = JSON.stringify(categoryObj);

    fetch (server + "/category/create", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        body: jsonBody
    })
    .then((response) => {
        if (response.ok) {
            alertSuccess.classList.remove("d-none");
            // window.location.reload()
            return response.json();
        } else {
            alert("Something went wrong..");
        }
    })
    .then((data) => {
        if (data != undefined) {
            console.log(data);
        } 
    })
}

function createInnerCategory(photoId, titleUz, titleRu, descriptionUz, descriptionRu) {
    let alertSuccess = document.querySelector(".alert");
    
    let categoryObj = {
        photo: photoId, 
        category: parseInt(localStorage.getItem('open')),
        nameUz: titleUz,
        nameRu: titleRu,
        descriptionUz: descriptionUz,
        descriptionRu: descriptionRu
    };
    console.log(categoryObj)
    let jsonBody = JSON.stringify(categoryObj);

    fetch (server + "/innerCategory/create", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        body: jsonBody
    })
    .then((response) => {
        if (response.ok) {
            alertSuccess.classList.remove("d-none");

            // window.location.reload();
            return response.json();
        } else {
            alert("Something went wrong..");
        }
    })
    .then((data) => {
        if (data != undefined) {
            console.log(data);
        } 
    })
}

function deleteCategory(categoryId) {
    // DELETE CATEGORY FETCH
}

async function imageUpload(formData) {
    return fetch (server + "/attach/upload", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + token
        },
        body: formData
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Error while uploading a photo");
            }
        })
        .then((data) => {
            return data;
        }) 
}

