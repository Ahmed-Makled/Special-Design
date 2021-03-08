/* Set Main Variable */

// select element setting-box
let settingBox = document.querySelector(".setting-box"),
  // Select element Toggel-setting icon
  iconSetting = document.querySelector(".toggle-setting i"),
  // Select Color List
  colorLi = document.querySelectorAll(".color-list li"),
  // color option in local storage
  mainColors = localStorage.getItem("color-option"),
  // Select random bg element span
  randomBgSpan = document.querySelectorAll(".random-bg span"),
  // select randombg yes
  bgYes = document.querySelector(".random-bg .yes"),
  // select randombg no
  bgNo = document.querySelector(".random-bg .no"),
  // randomBg option
  bgOption,
  // variable to control the interval
  bgControlInterva,
  //randombg option in local storage
  bgLocalItem = localStorage.getItem("bg-option"),
  //Select All Bullets
  allBullets = document.querySelectorAll(".nav-bullets .bullet"),
  //Select All links a
  allLinks = document.querySelectorAll(".links a"),
  //Select  links ul
  Links = document.querySelector(".links"),
  // sellect logo Span
  logoSpan = document.querySelector(".logo"),
  // select toggle menu button
  toggleMenuBtn = document.querySelector(".toggle-menu"),
  // select container bullets
  bulletsConteiner = document.querySelector(".nav-bullets"),
  //Select show bullets element span
  showBulletSpan = document.querySelectorAll(".show-bullets span"),
  //show bullet option in local storage
  sbLocalItem = localStorage.getItem("sb-option"),
  // select show bullet yes
  sbYes = document.querySelector(".show-bullets .yes"),
  // select show bullet no
  sbNo = document.querySelector(".show-bullets .no"),
  // Select reset button
  ResetButton = document.querySelector(".reset-option"),
  // Select Landing Page
  landingPAge = document.querySelector(".landing-page"),
  // select Skills
  ourSkills = document.querySelector(".skills"),
  // Select All progress Span
  allSkillProgress = document.querySelectorAll(
    ".skill-box .skill-progress span"
  ),
  // Select All gallary img
  ourGallary = document.querySelectorAll(".gallary img");

// function Toggel Setting
iconSetting.onclick = function () {
  // Toggle Class Spin
  this.classList.toggle("fa-spin");
  // Toggle Class Open
  settingBox.classList.toggle("open");

  if (settingBox.classList.contains("open")) {
    logoSpan.style.margin = "0 0 0 10%";
  } else {
    logoSpan.style.margin = "0";
  }
};

// loop on all list color item
colorLi.forEach((li) => {
  // click on every list item
  li.addEventListener("click", (e) => {
    // Set color on Root
    document.documentElement.style.setProperty(
      "--main--color",
      e.target.dataset.color
    );
    // set color on local storage
    localStorage.setItem("color-option", e.target.dataset.color);

    // call function handellActive
    handellActive(e);
  });
});

// check value color on local storage option
if (mainColors !== null) {
  document.documentElement.style.setProperty("--main--color", mainColors);
  // Remove Active Class From ALl color list item
  colorLi.forEach((element) => {
    element.classList.remove("active");
    // add active class on element with data-color === local storage item
    if (element.dataset.color == mainColors) {
      // add active class
      element.classList.add("active");
    }
  });
}

// randomBg loop  on all SPan

randomBgSpan.forEach((span) => {
  // click on every span
  span.addEventListener("click", (e) => {
    // call function handellActive
    handellActive(e);

    //condition set local storage
    if (e.target.dataset.bg === "yes") {
      bgOption = true;
      randomaizeImgs();
      localStorage.setItem("bg-option", true);
    } else {
      bgOption = false;
      clearInterval(bgControlInterva);
      localStorage.setItem("bg-option", false);
    }
  });
});

// check randombg local storage not empty
if (bgLocalItem !== null) {
  if (bgLocalItem === "true") {
    bgOption = true;
    randomaizeImgs();
  } else {
    bgOption = false;
  }

  //randomBg Remove Active Class From ALl Span
  randomBgSpan.forEach((element) => {
    element.classList.remove("active");
  });
  if (bgLocalItem === "true") {
    bgYes.classList.add("active");
  } else {
    bgNo.classList.add("active");
  }
}

// show bullets loop on all span
showBulletSpan.forEach((span) => {
  // click on every span
  span.addEventListener("click", (e) => {
    // call function handellActive
    handellActive(e);

    //condition set local storage
    if (e.target.dataset.sb === "block") {
      bulletsConteiner.style.display = "block";
      localStorage.setItem("sb-option", "block");
    } else {
      bulletsConteiner.style.display = "none";
      localStorage.setItem("sb-option", "none");
    }
  });
});

// check show bullets local storage not empty
if (sbLocalItem !== null) {
  showBulletSpan.forEach((span) => {
    span.classList.remove("active");
  });
  //show bullets Remove Active Class From ALl Span
  if (sbLocalItem === "block") {
    bulletsConteiner.style.display = "block";
    sbYes.classList.add("active");
  } else {
    bulletsConteiner.style.display = "none";
    sbNo.classList.add("active");
  }
}

// Function Reset Option
ResetButton.onclick = function () {
  // localStorage.clear(); /* To CLear ALl Local Storage */
  localStorage.removeItem("color-option");
  localStorage.removeItem("bg-option");
  localStorage.removeItem("sb-option");
  // Reload Window
  window.location.reload();
};

// Get Array Of Images
let imgArray = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];

// function to Randomaize img
function randomaizeImgs() {
  if (bgOption === true) {
    // Get random Number
    bgControlInterva = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgArray.length);

      // change background Image URL
      landingPAge.style.backgroundImage =
        'url("image/' + imgArray[randomNumber] + '")';
    }, 3000);
  }
}

// function scroll element
window.onscroll = () => {
  // skills offset top
  let skillsOffsetTop = ourSkills.offsetTop;
  // skills outer Height
  let skillsOuterHieght = ourSkills.offsetHeight;
  // window height
  let windowH = this.innerHeight;
  // windwo ScrollTop
  let windowScrollTop = this.pageYOffset;
  if (windowScrollTop > skillsOffsetTop + skillsOuterHieght - windowH) {
    allSkillProgress.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// Creat Popup With The Image
ourGallary.forEach((img) => {
  img.addEventListener("click", (e) => {
    // creat ovarlay Element
    let overlay = document.createElement("div");
    // add class  To overlay
    overlay.className = "popup-overlay";
    // Append overlay to body
    document.body.appendChild(overlay);
    // creat the popup
    let popupBox = document.createElement("div");
    // add class to popup box
    popupBox.className = "popup-box";
    // Check Alt Img
    if (img.alt !== null) {
      // creat Heading
      let imgHeading = document.createElement("h3");
      // creat text to img Heading
      let imgText = document.createTextNode(img.alt);
      // Append The text to img Heading
      imgHeading.appendChild(imgText);
      // Append img Heading to popup Box
      popupBox.appendChild(imgHeading);
    }
    //creat the image
    let popupImg = document.createElement("img");
    // Set Image Src
    popupImg.src = img.src;
    // append image to popup box
    popupBox.appendChild(popupImg);
    // append popup box to body
    document.body.appendChild(popupBox);
    // creat Close Button
    let closeButton = document.createElement("span");

    // creat the close button text
    let closeButtonText = document.createTextNode("X");
    // Append text to close span
    closeButton.appendChild(closeButtonText);
    // add class to close button
    closeButton.className = "close-button";
    // append close button to popup box
    popupBox.appendChild(closeButton);
  });
});

//  close popuop
document.addEventListener("click", (e) => {
  if (e.target.className == "close-button") {
    // Remove the curent popup
    e.target.parentNode.remove();
    // remove overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// Set Function Scroll To View
function scrollToView(elements) {
  elements.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
// call function scrollToView
scrollToView(allLinks);
scrollToView(allBullets);

// Set function Handell Active
function handellActive(ev) {
  // Remove Active Class From ALl Childrens
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  // add active class on self
  ev.target.classList.add("active");
}

// function toggle menu
toggleMenuBtn.onclick = function (e) {
  // stop Propagation
  e.stopPropagation();
  // toggle class menu active on button
  this.classList.toggle("menu-active");
  // toggle class menu active on button
  Links.classList.toggle("open");
};

// click anywhere outside menu and toggle button
document.addEventListener("click", (e) => {
  if (e.target !== toggleMenuBtn && e.target !== Links) {
    // check menu is open
    if (Links.classList.contains("open")) {
      // toggle class menu active on button
      toggleMenuBtn.classList.toggle("menu-active");
      // toggle class menu active on button
      Links.classList.toggle("open");
    }
  }
});
// stop Propagation on menu
Links.onclick = function (e) {
  e.stopPropagation();
};

// triggre aos
AOS.init();

// var i;
// console.log("local storage");
// for (i = 0; i < localStorage.length; i++)   {
//     console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
// }
// console.log("session storage");
// for (i = 0; i < sessionStorage.length; i++) {
//     console.log(sessionStorage.key(i) + "=[" + sessionStorage.getItem(sessionStorage.key(i)) + "]");
// }
