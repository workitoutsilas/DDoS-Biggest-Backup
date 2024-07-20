/** Variables */
const header = document.querySelector(".nav-container"),
  navStyle = document.querySelector(".navbar"),
  media = window.matchMedia("(max-width:900px)"),
  brand = document.querySelector(".main-brand"),
  input = document.getElementById("input-file"),
  textUpload = document.getElementById("filename"),
  UploadContainer = document.getElementById("upload-container"),
  discardButton = document.getElementById("discard-file-butn"),
  submitBtn = document.getElementById("subButn"),
  resultBtn = document.getElementById("start-processing");

/** Navbar closing on outside click - Jquery */
$(document).ready(function () {
  $(document).click(function () {
    $(".navbar-collapse").collapse("hide");
  });
  $(".navbar").on("click", "a", function () {
    $(".navbar a.active").removeClass("active");
    $(this).addClass("active");
  });
});

/** Function based on Scroll Event */
function handScroll(e) {
  if (window.scrollY > 50) {
    header.classList.add("bc");
    navStyle.style.setProperty("--bs-navbar-color", " whitesmoke");
    navStyle.style.setProperty("--bs-navbar-brand-color", " whitesmoke");
    navStyle.style.setProperty("--bs-navbar-active-color", " whitesmoke");
  } else {
    header.classList.remove("bc");
    header.style.transition = "all 0.7s ease";
    navStyle.style.setProperty("--bs-navbar-color", " #013e40");
    navStyle.style.setProperty("--bs-navbar-brand-color", " #013e40");
    navStyle.style.setProperty("--bs-navbar-active-color", " #013e40");
  }
}

/** Function based on MediaQuery */
function render(mq) {
  if (mq.matches) {
    window.removeEventListener("scroll", handScroll);
    brand.textContent = "ML-based DDoS Detection";
    header.classList.add("bc");
    navStyle.style.setProperty("--bs-navbar-color", " whitesmoke");
    navStyle.style.setProperty("--bs-navbar-brand-color", " whitesmoke");
    navStyle.style.setProperty("--bs-navbar-active-color", " whitesmoke");
  } else {
    window.addEventListener("scroll", handScroll);
    brand.textContent = "ML-based DDoS Attack Detection";
    header.classList.remove("bc");
    header.style.transition = "all 0.7s ease";
    navStyle.style.setProperty("--bs-navbar-color", " #013e40");
    navStyle.style.setProperty("--bs-navbar-brand-color", " #013e40");
    navStyle.style.setProperty("--bs-navbar-active-color", " #013e40");
  }
}
media.addEventListener("change", render);
render(media);

/** File Upload Functions */
input.addEventListener("change", (e) => {
  const uploadedFile = e.target.files[0];
  if (uploadedFile) {
    UploadContainer.style.visibility = "visible";
    textUpload.textContent = uploadedFile.name;
    submitBtn.disabled = false;
    submitBtn.classList.add("hover");
  } else {
    // UploadContainer.style.visibility = "hidden";
    textUpload.textContent = "";
    submitBtn.disabled = true;
    submitBtn.classList.remove("hover");
  }
});

/** Discard Button */
discardButton.addEventListener("click", () => {
  // Reset the file input value to empty
  input.value = "";
  textUpload.textContent = "";
  submitBtn.disabled = true;
  submitBtn.classList.remove("hover");
  resultBtn.disabled = true;
  UploadContainer.style.visibility = "hidden";

  // Reload the page
  // location.reload();
});

// Function to trigger the modal
function showModal() {
  var myModal = new bootstrap.Modal(document.getElementById("myModal"));

  // Delay the modal display by 0.5 seconds.
  setTimeout(function () {
    myModal.show();
  }, 500);
}

/** Input file Max file size */
function validateFileSize(input) {
  const file = input.files[0];
  const maxSize = 2 * 1024 * 1024; // 2 MB
  console.log(file.size);

  if (file.size > maxSize) {
    input.value = ""; // Clear the file input

    showModal(); // Trigger the modal
  }
}

/* Main File*/
/** File to submit from form to Server */
// function submitData(event) {
//   event.preventDefault();

//   const formData = new FormData(event.target);

//   fetch("http://127.0.0.1:5000/predict", {
//     method: "POST",
//     body: formData,
//   })
//     .then((response) => response.json())
//     .then((result) => console.log(result))
//     .catch((err) => console.log(err.message));
// }

/** File to submit from form to Server -- Main*/
function submitData(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  fetch("http://127.0.0.1:5000/predict", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      response.json();
      if (response.ok) {
        animateProcessing();
        // Handle the successful response
        console.log("Success:");
      } else {
        // Handle the unsuccessful response
        console.log("No success:");
      }
    })
    .catch((err) => console.error("Fetch error:", err.message));
}

// function submitData(event) {
//   event.preventDefault();

//   const formData = new FormData(event.target);

//   fetch("http://127.0.0.1:5000/predict", {
//     method: "POST",
//     body: formData,
//   })
//     .then((response) => {
//       if (response.ok) {
//         return response.json();
//       } else {
//         throw new Error("Network response was not ok");
//       }
//     })
//     .then((data) => {
//       animateProcessing();
//       // Handle the successful response
//       console.log("Success:", data);
//     })
//     .catch((err) => console.error("Fetch error:", err.message));
// }

function animateProcessing() {
  const processingElement = document.querySelector(".processing");
  const processingValue = document.querySelector(".pro-text");
  const valueElement = processingElement.querySelector(".fill");
  let degree = 0;
  let percentage = 0;

  const interval = setInterval(() => {
    degree += 1;
    percentage += 1;
    processingElement.style.background = `conic-gradient(#013e40 ${degree}deg, #ededed 0deg)`;
    percentage = Math.round((degree / 360) * 100);
    valueElement.textContent = `${percentage}%`;

    if (percentage == 100) {
      resultBtn.disabled = false;
      resultBtn.classList.add("hover");
      processingValue.textContent = "Processed";
    }
    if (degree >= 360) {
      clearInterval(interval);
    }
  }, 20);
}

function Results() {
  window.open("http://127.0.0.1:5000/pred", "_blank");
}
