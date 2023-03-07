let contentWrapper = document.querySelector(".publish-content");

// Get not published category


fetch (server + "/innerCategory/getNotPublishedInnerCategoryList", {
    method: "GET",
    headers: {
        "Authorization": "Bearer " + token
    }
})
    .then((response) => {
        if (response.ok) {
            return response.json()
        }
    })
    .then((data) => {
        if (data != undefined && data != null) {
            data.forEach(category => {
                console.log(category)
                contentWrapper.innerHTML += `
                    <div class="category" id="${category.id}">
                        <p class="category-title">${category.name_Uz}</p>

                        <p class="category-description">${category.description_Uz}</p>

                        <button class="primary-button publish-btn">
                            <span class="btn-text">PUBLISH</span>
                        </button>
                    </div>
                `;
            });
        }
    })
    .then(() => {
        // Resizing 
        let categoryTitles = document.querySelectorAll(".category-title");
        let categoryDescriptions = document.querySelectorAll(".category-description");

        console.log(window.innerWidth);
        categoryDescriptions.forEach(categoryDescription => {
            let line = 151;
            let oldText = categoryDescription.textContent;
            let oldLength = categoryDescription.textContent.length;

            if (oldLength > line) {
                categoryDescription.textContent = categoryDescription.textContent.substr(0, line) + "..";
                oldLength = categoryDescription.textContent.length;
                oldText = categoryDescription.textContent;
            } else {
                categoryDescription.textContent = categoryDescription.textContent.substr(0, oldLength - (oldLength / 3)) + "..";
                oldLength = categoryDescription.textContent.length;
            }


            if (window.innerWidth < 750) {
                categoryDescription.textContent = oldText.substr(0, oldLength - (oldLength / 1.2)) + "..";
            } else if (window.innerWidth < 950) {
                console.log(oldLength-90);
                categoryDescription.textContent = oldText.substr(0, oldLength - (oldLength / 1.5)) + "..";
            } else if (window.innerWidth < 1130) {
                categoryDescription.textContent = oldText.substr(0, oldLength - (oldLength / 3)) + "..";
            } else if (window.innerWidth < 1324) {
                categoryDescription.textContent = oldText.substr(0, oldLength - (oldLength / 4.5)) + "..";
            } else {
                categoryDescription.textContent = oldText;
            }

            addEventListener("resize", (event) => {
                console.log(window.innerWidth);
                categoryDescriptions.forEach(categoryDescription => {
                    if (window.innerWidth < 750) {
                        categoryDescription.textContent = oldText.substr(0, oldLength - (oldLength / 1.2)) + "..";
                    } else if (window.innerWidth < 1030) {
                        console.log(oldLength-90);
                        categoryDescription.textContent = oldText.substr(0, oldLength - (oldLength / 1.5)) + "..";
                    } else if (window.innerWidth < 1130) {
                        categoryDescription.textContent = oldText.substr(0, oldLength - (oldLength / 3)) + "..";
                    } else if (window.innerWidth < 1324) {
                        categoryDescription.textContent = oldText.substr(0, oldLength - (oldLength / 4.5)) + "..";
                    } else {
                        categoryDescription.textContent = oldText;
                    }
                })
            })
        })

        let publishButtons = document.querySelectorAll(".publish-btn");
        publishButtons.forEach((button) => {
            button.addEventListener("click", () => {
                fetch(server + "/innerCategory/changeStatus/" + button.parentNode.id, {
                    method: "PUT",
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                })
                .then((response) => {
                    if (response.ok) {
                        button.parentElement.remove();
                    }
                })
            })
        });
    })