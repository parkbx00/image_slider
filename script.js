//1. Get all the DOM elements
const dropboxContainer = document.querySelector(".container-dropbox");
const dropbox = document.querySelector(".dropbox");
const play = document.querySelector(".fa-play");
const pause = document.querySelector(".fa-pause");
const reset = document.querySelector(".fa-trash-alt");
const btnBrowse = document.querySelector(".dropbox__btn-browse");
const inputFile = document.querySelector(".dropbox__file-loader");
const dropboxText = document.querySelector(".dropbox p");
const sliderContainer = document.querySelector(".container-slider");

// let file;
let images = [];
const validExtension = ["image/png", "image/jpeg", "image/jpg"];

//2. Add event listener for dragOver
dropbox.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropbox.classList.add("active");
    dropboxText.textContent = "Release to upload the image.";
});

//3. Add event listener for dragLeave
dropbox.addEventListener("dragleave", () => {
    dropbox.classList.remove("active");
    dropboxText.textContent = "Drag & Drop Images to Upload.";
});

// 4. Add event listener for drop
dropbox.addEventListener("drop", (e) => {
    e.preventDefault();

    images = Array.from(e.dataTransfer.files);
    console.log(images);

    isAllExtensionValid(images);

    images = e.dataTransfer.files;
    console.log(images);

    dropbox.classList.remove("active");
    dropboxText.textContent = "Drag & Drop New Images to Upload.";

    loadImages();
});

// Open up file input when Browse File button is clicked.
btnBrowse.addEventListener("click", (e) => {
    inputFile.click();
});

inputFile.addEventListener("change", (e) => {
    images = Array.from(inputFile.files);
    isAllExtensionValid(images);

    // inputFile.files.forEach((file) => {
    //     file.push(file);
    // })
    // let fileReader = new FileReader();
    // fileReader.onload = () => {
    //     file.push(fileReader.result);
    // };

    // console.log(file);

    // file = e.target.files[0];
    // dropbox.classList.add("active");
    // loadImages();
});

// Start slide show when play icon is clicked.
play.addEventListener("click", () => {
    // Hide container-dropbox
    dropboxContainer.style.display = "none";
    sliderContainer.style.display = "block";

    // Load images
    // loadImages();

    // Slide images
});

// Pause slide show when pause icon is clicked.
pause.addEventListener("click", () => {
    // Pause slide show
});

// Resetting when trashcan icocn is clicked.
reset.addEventListener("click", () => {
    location.reload();
    // Also should reset local storage
});

// Function to verify image extensions.
function isAllExtensionValid(images) {
    let isAllExtValid = images.every((img) => {
        return validExtension.includes(img.type);
    });

    if (!isAllExtValid) {
        alert("Please upload images with .png, .jpeg, or .jpg extension.");
        dropbox.classList.remove("active");
        images = [];
        console.log(images);
        return;
    }
}

// Function to loadimages.
function loadImages() {
    let fileReader = new FileReader();
    fileReader.onload = () => {
        let fileURL = fileReader.result;
        console.log(fileURL);
        let imgTag = `<img src="${fileURL}" alt="" />`;
        let divTag = `<div>${imgTag}</div>`;

        sliderContainer.innerHTML = divTag;
        // dropboxContainer.innerHTML = imgTag;
    };
    // fileReader.readAsDataURL(images[0]); // Has to add index
    for (let i = 0; i < images.length; i++) {
        fileReader.readAsDataURL(images[i]);
    }

    // let fileType = file.type;
    // dropbox.classList.remove("active");
    // const validExtension = ["image/png", "image/jpeg", "image/jpg"];
    // if (validExtension.includes(fileType)) {
    //     console.log("Upload success!");
    //     let fileReader = new FileReader();
    //     fileReader.onload = () => {
    //         let fileURL = fileReader.result;
    //         let imgTag = `<img src="${fileURL}" alt="" />`;
    //         dropboxContainer.innerHTML = imgTag;
    //     };
    //     fileReader.readAsDataURL(file);
    // } else {
    //     alert("Please upload images with .png, .jpeg, or .jpg extension.");
    //     dropbox.classList.remove("active");
    // }
}
