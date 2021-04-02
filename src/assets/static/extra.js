const errors = document.querySelectorAll(".home-error");
errors.forEach((error) => {
    const button = error.querySelector("button");
    button.addEventListener("click", (e) => {
        error.style.display= "none";
    })
})