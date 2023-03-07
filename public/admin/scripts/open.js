var categoryId = localStorage.getItem("open");

let titleUz = document.getElementById("titleUz");
let titleRu = document.getElementById("titleRu");
let descriptionUz = document.getElementById("descriptionUz");
let descriptionRu = document.getElementById("descriptionRu");
let innerCategoryOpener = document.getElementById("opener");
let deleteIcon = document.querySelector(".trash-ico");

let saveButton = document.getElementById("send-category");

fetch(server + "/category/getByIdForUpdate/" + categoryId, {
    method: "GET",
    headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
    }
})
.then(response => {
    return response.json();
})
.then((data) => {
    console.log(data);

    let wrapper = document.querySelector(".wrapper");
    wrapper.style.backgroundImage = "url(" + server + "/attach/public/open/" + data.photo + ")";
    wrapper.style.backgroundRepeat = "no-repeat";
    wrapper.style.backgroundSize = "cover";
    wrapper.style.backgroundPosition = "top center"
    titleUz.value = data.nameUz;
    titleRu.value = data.nameRu;
    descriptionUz.value = data.descriptionUz;
    descriptionRu.value = data.descriptionRu;

    let inputs = document.querySelectorAll("input");
    let textareas = document.querySelectorAll("textarea");

    let changed = false;
    inputs.forEach(input => {
        input.addEventListener('keyup', () => {
            changed = true;
            saveButton.classList.add("active");
        })
    });

    textareas.forEach(textarea => {
        textarea.addEventListener('keyup', () => {
            changed = true;
            saveButton.classList.add("active");
        })

    });

    saveButton.addEventListener("click", (event) => {
        event.preventDefault();

        if (changed === true) {
            let imageInput = document.getElementById("imageInput");

            if (imageInput.files.length > 0) {
                let formData = new FormData(); 
                formData.append("file", imageInput.files[0]);

                imageUpload(formData)
                    .then((response) => {
                        let imageId = response.id;
                        console.log(imageId);

                        var obj = {
                            photo: imageId,
                            nameUz: titleUz.value,
                            nameRu: titleRu.value,
                            descriptionUz: descriptionUz.value,
                            descriptionRu: descriptionRu.value
                        }

                        console.log(obj);
                        fetch(server + "/category/update/" + categoryId, {
                            method: "PUT",
                            headers: {
                                "Authorization": "Bearer " + token,
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(obj)
                        })
                    })
            } else {
                let obj = {
                    photo: data.photo,
                    nameUz: titleUz.value,
                    nameRu: titleRu.value,
                    descriptionUz: descriptionUz.value,
                    descriptionRu: descriptionRu.value
                }
                console.log(obj);
                fetch(server + "/category/update/" + categoryId, {
                    method: "PUT",
                    headers: {
                        "Authorization": "Bearer " + token,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(obj)
                })
                .then (response => {
                    if (response.ok) {
                        window.location.reload();
                    }
                })
            }
        } else {
            if (imageInput.files.length > 0) {
                let formData = new FormData(); 
                formData.append("file", imageInput.files[0]);

                imageUpload(formData)
                    .then((response) => {
                        let imageId = response.id;
                        console.log(imageId);

                        var obj = {
                            photo: imageId,
                            nameUz: titleUz.value,
                            nameRu: titleRu.value,
                            descriptionUz: descriptionUz.value,
                            descriptionRu: descriptionRu.value
                        }

                        console.log(obj);
                        fetch(server + "/category/update/" + categoryId, {
                            method: "PUT",
                            headers: {
                                "Authorization": "Bearer " + token,
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(obj)
                        })
                        .then(response => {
                            if (response.ok)
                                window.location.reload();
                        })
                    })
            }
        }
    })

    innerCategoryOpener.addEventListener("click", () => {
        window.location.replace("/admin/inner/category/")
    })

    deleteIcon.addEventListener("click", () => {
        fetch(server + "/category/delete/" + categoryId, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        .then((response) => {
            if (response.ok) {
                window.location.replace("/admin/")
            }
        })
    })
})