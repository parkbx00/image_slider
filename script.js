const dropboxContainer = document.querySelector(".container-dropbox");
const dropbox = document.querySelector(".dropbox");
const play = document.querySelector(".fa-play");
const pause = document.querySelector(".fa-pause");
const reset = document.querySelector(".fa-trash-alt");
const btnBrowse = document.querySelector(".dropbox__btn-browse");
const inputFile = document.querySelector(".dropbox__file-loader");
const dropboxText = document.querySelector(".dropbox p");
const sliderContainer = document.querySelector(".container-slider");
const slidesContainer = document.querySelector(".slides");
let slides = document.querySelectorAll("slide");
const instructionContainer = document.querySelector(".container-instruction");

let images = [];
const validExtension = ["image/png", "image/jpeg", "image/jpg"];

// Add event listener for dragOver
dropbox.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropbox.classList.add("active");
    dropboxText.textContent = "Release to upload the image.";
});

// Add event listener for dragLeave
dropbox.addEventListener("dragleave", () => {
    dropbox.classList.remove("active");
    dropboxText.textContent = "Drag & Drop Images to Upload.";
});

// Add event listener for drop
dropbox.addEventListener("drop", (e) => {
    e.preventDefault();

    images = Array.from(e.dataTransfer.files);
    isAllExtensionValid(images);

    images = e.dataTransfer.files;

    dropbox.classList.remove("active");
    dropboxText.textContent = "Click play button to start or add more images.";

    for (let i = 0; i < images.length; i++) {
        loadImage(images[i]);
    }

    slides = document.querySelectorAll(".slide");
    slides[0].classList.add("visible");
});

// Open up file input when Browse File button is clicked.
btnBrowse.addEventListener("click", () => {
    inputFile.click();
});

//
inputFile.addEventListener("change", () => {
    images = Array.from(inputFile.files);
    isAllExtensionValid(images);

    images = inputFile.files;

    for (let i = 0; i < images.length; i++) {
        loadImage(images[i]);
    }

    slides = document.querySelectorAll(".slide");
    slides[0].classList.add("visible");

    dropboxText.textContent = "Click play button to start or add more images.";
});

// Start slide show when play icon is clicked.
const intervalTime = 5000;
let slideshowInterval;

play.addEventListener("click", () => {
    if (slides.length === 0) {
        alert("Please upload images first.");
        return;
    }

    // Hide container-dropbox
    dropboxContainer.style.display = "none";
    sliderContainer.style.display = "block";
    instructionContainer.style.display = "none";

    play.classList.add("active");
    pause.classList.remove("active");

    // Slide images
    slideshowInterval = setInterval(nextSlide, intervalTime);
});

// Pause slide show when pause icon is clicked.
pause.addEventListener("click", () => {
    if (slides.length === 0) {
        alert("Please upload images first.");
        return;
    }

    play.classList.remove("active");
    pause.classList.add("active");

    clearInterval(slideshowInterval);
});

// Resetting when trashcan icocn is clicked.
reset.addEventListener("click", () => {
    location.reload();
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
        return;
    }
}

// Function to loadimages.
function loadImage(image) {
    let imgContainer = document.createElement("div");
    imgContainer.classList.add("slide");

    let fileReader = new FileReader();
    fileReader.onload = () => {
        imgContainer.setAttribute("style", `background: url(${fileReader.result}) no-repeat center/cover;`);
    };
    slidesContainer.appendChild(imgContainer);

    fileReader.readAsDataURL(image);
}

// Function to initiate slide show
function nextSlide() {
    const currentSlide = document.querySelector(".visible");

    currentSlide.classList.remove("visible");

    if (currentSlide.nextElementSibling) {
        currentSlide.nextElementSibling.classList.add("visible");
    } else {
        slides[0].classList.add("visible");
    }
}
