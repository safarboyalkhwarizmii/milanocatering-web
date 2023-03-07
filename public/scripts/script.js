"use strict"
const server = "http://142.93.50.175:8081";

// http://143.198.117.25:8081/attach/public/open/30
let language = localStorage.getItem('language');
document.addEventListener("DOMContentLoaded", () => {
    const sendButton = document.getElementById("sendButton");

    if (language === null) {
        localStorage.setItem("language", "RU")
        language = localStorage.getItem('language');
    }

    sendButton.addEventListener("click", (event) => {
        event.preventDefault();
        
        let message = document.getElementById("message").value;
        let name = document.getElementById("name").value;
        let phoneNumber = document.getElementById("phoneNumber").value;

        if (!phoneNumber.startsWith("+998") || phoneNumber.length != 13) {
            if (language == "UZ") {
                document.querySelector("footer .alert-danger").innerHTML = "Raqam xato kiritildi!";
            } else {
                document.querySelector("footer .alert-danger").innerHTML = "Номер введен неправильно!"
            }
            
            document.querySelector("footer .alert-danger").classList.remove('fade');
            document.querySelector("footer .alert-danger").style.zIndex = 1;

            setTimeout(function(){
                if ($('footer .alert-danger').length > 0) {
                    document.querySelector("footer .alert-danger").classList.add('fade');
                }
              }, 1000)

            return;
        }
        
        var messageObj = {
            name: name,
            surname: "string",
            message: message,
            phone: phoneNumber
          };
        var jsonBody = JSON.stringify(messageObj);
        
        fetch(server + "/send", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: jsonBody 
        })
            .then(response => {
                if (response.ok) {
                    document.querySelector("footer .alert-warning").classList.remove('hide');
                    return response.json();
                }
            })
            .then((data) => {
                console.log(data);
            })
    })

    let isFirst = true;
    function showCategories(page) {
        var categories;
    
        // Show Categories
        fetch(server + "/category/public/getList/" + language + "?page=" + page + "&size=" + 6, {
            method: "GET"
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => {
                console.log(data)
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
    
                    document.getElementById("category-wrapper").innerHTML = "";   
                    categories.forEach(category => {
                        addCategory(category);
                    });
                }
            })
            .then(() => {
                let openerButtons = document.querySelectorAll(".open-btn");
                
                openerButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        localStorage.setItem("open", button.parentNode.parentNode.parentNode.id);
                        window.location.replace("/category/");
                    });
                });

                if(!isFirst) {
                    document.getElementById("categories-page").click();
                }

                isFirst = false;
            })


            // .then(() => {
            //     let categories = document.querySelectorAll(".category");
    
            //         categories.forEach(category => {
            //             category.addEventListener("click", () => {
            //                 console.log(category.attributes.id.value)
            //                 localStorage.setItem("open", category.attributes.id.value);
            //                 window.location.replace("/admin/category/open/");
            //             })
            //         });
            // })
    }

    showCategories(0);

    function addCategory(category) {
        if (language === "RU") {
            document.getElementById("category-wrapper").innerHTML += 
            `<div class="row m-t-100 category" id="${category.id}">
                <div class="col-md-6">
                    <img src="${server + "/attach/public/open/" + category.photoId}"
                        alt="about-catering image 2" class="sec_with_img img-responsive">
                </div>
        
                <div class="col-md-6">
                    <div class="with_image_text">
                        <h2 class="lead_title">${category.nameRu}</h2>
                        <p class="lead-text">${category.descriptionRu}</p>
                        <!--<a class="mix-btn open-btn">
                            Подробнее
                        </a>-->
                    </div>
                </div>
            </div>`
        } else {
            document.getElementById("category-wrapper").innerHTML += 
            `<div class="row m-t-100 category" id="${category.id}">
                <div class="col-md-6">
                    <img src="${server + "/attach/public/open/" + category.photoId}"
                        alt="about-catering image 2" class="sec_with_img img-responsive">
                </div>
        
                <div class="col-md-6">
                    <div class="with_image_text">
                        <h2 class="lead_title">${category.nameUz}</h2>
                        <p class="lead-text">${category.descriptionUz}</p>
                        <!--<a class="mix-btn open-btn">
                            Batafsil
                        </a>-->
                    </div>
                </div>
            </div>`
        }
    }      
})


