const addEventOnElements = function (elements, eventType, callback) {
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener(eventType, callback);
    }
}

// preloading

const loadingElement = document.querySelector("[data-loading]");

window.addEventListener("load", function () {
    loadingElement.classList.add("loaded");
    this.document.body.classList.remove("active");
})

//MOBILE NAV TOGGLE

const [navTogglers, navLinks, navbar, overlay] = [
    document.querySelectorAll("[data-nav-toggler]"),
    document.querySelectorAll("[data-nav-link]"),
    document.querySelector("[data-navbar]"),
    document.querySelector("[data-overlay]")
];

const toggleNav = function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("active");
}

addEventOnElements(navTogglers, "click", toggleNav);


const closeNav = function () {
    navbar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("active");
}

addEventOnElements(navLinks, "click", closeNav);


//header

const header = document.querySelector("[data-header]");

const activeElementOnScroll = function () {
    if (window.scrollY > 50) {
        header.classList.add("active");
    } else {
        header.classList.remove("active");
    }
}

window.addEventListener("scroll", activeElementOnScroll);



// text animation effect for hero section 
const letterBoxes = document.querySelectorAll("[data-letter-effect]");

let activeLetterBoxIndex = 0;
let lastActiveLetterBoxIndex = 0;
let totalLetterBoxDelay = 0;

const setLetterEffect = function () {

    for (let i = 0; i < letterBoxes.length; i++) {

        let letterAnimationDelay = 0;
        const letters = letterBoxes[i].textContent.trim();

        letterBoxes[i].textContent = "";

        for (let j = 0; j < letters.length; j++) {

            const span = document.createElement("span");

            span.style.animationDelay = `${letterAnimationDelay}s`;

            if (i === activeLetterBoxIndex) {
                span.classList.add("in");
            } else {
                span.classList.add("out");
            }

            span.textContent = letters[j];

            if (letters[j] === " ") span.classList.add("space");

            letterBoxes[i].appendChild(span);

            letterAnimationDelay += 0.05;

            if (i === activeLetterBoxIndex) {
                totalLetterBoxDelay = Number(letterAnimationDelay.toFixed(2));
            }
        }

        // active class kontrolü (HARF DÖNGÜSÜ DIŞINDA)
        if (i === lastActiveLetterBoxIndex) {
            letterBoxes[i].classList.add("active");
        } else {
            letterBoxes[i].classList.remove("active");
        }
    }

    setTimeout(function () {
        lastActiveLetterBoxIndex = activeLetterBoxIndex;

        activeLetterBoxIndex =
            activeLetterBoxIndex >= letterBoxes.length - 1 ? 0 : activeLetterBoxIndex + 1;

        setLetterEffect();

    }, (totalLetterBoxDelay * 1000) + 3000);
};

window.addEventListener("load", setLetterEffect);



// back to top btn

const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
    const bodyHeight = document.body.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollEndPos = bodyHeight - windowHeight;

    const totalScrollPercent = (window.scrollY / scrollEndPos) * 100;

    backTopBtn.textContent = `${totalScrollPercent.toFixed(0)}%`;

    //visible back to top btn when scrolled 5% of the page
    if (totalScrollPercent > 5) {
        backTopBtn.classList.add("show");
    } else {
        backTopBtn.classList.remove("show");

    }
});



// scroll reveal
const revealElements = document.querySelectorAll("[data-reveal]");

const scrollReveal = function () {
    for (let i = 0; i < revealElements.length; i++) {
        const elementIsInScreen =
            revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.15;

        if (elementIsInScreen) {
            revealElements[i].classList.add("revealed");
        } else {
            revealElements[i].classList.remove("revealed");
        }
    }
};

window.addEventListener("scroll", scrollReveal);
scrollReveal();


// custom cursor

const cursor = document.querySelector("[data-cursor]");
const anchorElements = document.querySelectorAll("a");
const buttons = document.querySelectorAll("button");

// change cursorElement position based on cursor move
document.body.addEventListener("mousemove", function (event) {
    setTimeout(function () {
        cursor.style.top = `${event.clientY}px`;
        cursor.style.left = `${event.clientX}px`;
    }, 100);
});

// add cursor hoverd class
const hoverActive = function () { cursor.classList.add("hovered"); }

// remove cursor hovered class
const hoverDeactive = function () { cursor.classList.remove("hovered"); }

// add hover effect on cursor, when hover on any button or hyperlink
addEventOnElements(anchorElements, "mouseover", hoverActive);
addEventOnElements(anchorElements, "mouseout", hoverDeactive);
addEventOnElements(buttons, "mouseover", hoverActive);
addEventOnElements(buttons, "mouseout", hoverDeactive);

// add disabled class on cursorElement, when mouse out of body
document.body.addEventListener("mouseout", function () {
    cursor.classList.add("disabled");
});

// remove diabled class on cursorElement, when mouse in the body
document.body.addEventListener("mouseover", function () {
    cursor.classList.remove("disabled");
})