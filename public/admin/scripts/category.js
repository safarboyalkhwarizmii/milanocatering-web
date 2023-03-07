document.addEventListener("DOMContentLoaded", () => {
    const sendButton = document.getElementById("send-category");
    
    // after send button click

    sendButton.addEventListener("click", (event) => {
        event.preventDefault();

        let imageInput = document.getElementById("imageInput");
        let formData = new FormData(); 
        formData.append("file", imageInput.files[0]);

        imageUpload(formData)
            .then((response) => {
                let imageId = response.id;
                console.log(imageId);

                let titleUz = document.getElementById("titleUz").value;
                let titleRu = document.getElementById("titleRu").value;
                let descriptionUz = document.getElementById("descriptionUz").value;
                let descriptionRu = document.getElementById("descriptionRu").value;
                
                createCategory(imageId, titleUz, titleRu, descriptionUz, descriptionRu);
            })
    })
    
    
    /*imageInput.addEventListener("change", () => {
        let imageInput = document.getElementById("imageInput");
        let formData = new FormData(); 
        formData.append("file", imageInput.files[0]);

        imageUpload(formData).then((response) => {
        let imageId = response.id;
        console.log(imageId);
            
            sendButton.addEventListener("click", (event) => {
                event.preventDefault();
        
                let titleUz = document.getElementById("titleUz").value;
                let titleRu = document.getElementById("titleRu").value;
                let descriptionUz = document.getElementById("descriptionUz").value;
                let descriptionRu = document.getElementById("descriptionRu").value;
                
                createCategory(imageId, titleUz, titleRu, descriptionUz, descriptionRu);

                
            })
        });
          
    })*/


    

    let primaryButton = document.querySelector("#upload-button");
    let imageInButton = document.querySelector("#upload-icon");

    primaryButton.addEventListener("mouseover", function() {
        imageInButton.src="/images/upload-icon-light.svg";
    })

    primaryButton.addEventListener("mouseout", function() {
        imageInButton.src="/images/upload-icon.svg";
    })



})
