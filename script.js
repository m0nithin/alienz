const dude = document.querySelector(".dude");
const head = dude.querySelector(".head");
const legs = Array.from(dude.querySelectorAll(".leg"));
const arms = Array.from(dude.querySelectorAll(".arm"));
const legBottoms = Array.from(dude.querySelectorAll(".leg-bottom"));
const armBottoms = Array.from(dude.querySelectorAll(".arm-bottom"));

const content = document.querySelector(".content");
const arrowEl = document.querySelector(".arrow-animated");



const imageUrls = [
    './images/image.png',
    './images/image (1).png',
    './images/image (2).png',
    './images/image (3).png',
    './images/image (4).png',
    './images/image (5).png',
    './images/image (6).png',
    './images/image (7).png',
    './images/image (8).png',
    './images/image (9).png',
    './images/image (10).png',
    './images/image (11).png',
    './images/image (12).png',
    './images/image (13).png',
    './images/image (14).png',
    './images/image (15).png',
    './images/image (16).png',
    './images/image (17).png',
    './images/image (18).png',
    './images/image (19).png',
    // Add more image URLs as needed
];
const imageContainer = document.getElementById('image-container');
const imageContainer2 = document.getElementById('image-container2');
let currentIndex = 0;
// Create an array to hold preloaded images
const preloadedImages = [];

// Function to preload all images
function preloadImages() {
    for (let i = 0; i < imageUrls.length; i++) {
        const img = new Image();
        img.src = imageUrls[i];
        preloadedImages.push(img);
    }
}

// Call the preloadImages function to preload all images
preloadImages();

// Function to loop through and display images
function loopImages() {
    // Clear the previous image
    imageContainer.innerHTML = '';
    // imageContainer2.innerHTML = '';

    // Create an <img> element
    const imgElement = document.createElement('img');

    // Set the image source to the current index in the array
    imgElement.src = preloadedImages[currentIndex].src;

    // Apply the mix-blend-mode CSS property
    imgElement.style.mixBlendMode = 'multiply';

    // Append the <img> element to the container
    imageContainer.appendChild(imgElement);
    // imageContainer2.appendChild(imgElement);

    // Increment the index for the next iteration
    currentIndex = (currentIndex + 1) % preloadedImages.length;
}
function loopImages2() {
    // Clear the previous image
    // imageContainer.innerHTML = '';
    imageContainer2.innerHTML = '';

    // Create an <img> element
    const imgElement = document.createElement('img');

    // Set the image source to the current index in the array
    imgElement.src = preloadedImages[currentIndex].src;

    // Apply the mix-blend-mode CSS property
    imgElement.style.mixBlendMode = 'multiply';

    // Append the <img> element to the container
    // imageContainer.appendChild(imgElement);
    imageContainer2.appendChild(imgElement);

    // Increment the index for the next iteration
    currentIndex = (currentIndex + 1) % preloadedImages.length;
}

// Call the loopImages function initially
loopImages2();
loopImages();

// Set an interval to call loopImages every 3 seconds (3000 milliseconds)
const intervalId = setInterval(loopImages, 3000);
const intervalId2 = setInterval(loopImages2, 3000);





gsap.set(arms, {
    svgOrigin: "180 58"
});
gsap.set(head, {
    svgOrigin: "180 45",
});
gsap.set(armBottoms, {
    svgOrigin: "178 118"
});
gsap.set(legs, {
    svgOrigin: "177 145",
});
gsap.set(legBottoms, {
    svgOrigin: "171 220"
});


const halfBodyTimeline = (leg, arm) => {
    const legBottom = leg.querySelector(".leg-bottom");
    const armBottom = arm.querySelector(".arm-bottom");

    return gsap.timeline({
        repeat: -1,
        paused: true
    })
        .fromTo(leg, {
            rotation: -25
        }, {
            duration: .5,
            rotation: 15,
            ease: "sine.inOut"
        }, 0)
        .to(leg, {
            duration: .25,
            rotation: -25,
            ease: "sine.in"
        }, ">")
        .to(legBottom, {
            duration: .25,
            rotation: 15,
            ease: "sine.inOut"
        }, .25)
        .to(legBottom, {
            duration: .25,
            rotation: 80,
            ease: "sine.in"
        }, ">")
        .to(legBottom, {
            duration: .25,
            rotation: 0,
            ease: "sine.out"
        }, ">")
        .fromTo(arm, {
            rotation: -12
        }, {
            duration: .5,
            rotation: 12,
            ease: "sine.inOut",
            yoyo: true,
            repeat: 1
        }, 0)
        .fromTo(armBottom, {
            rotation: -15
        }, {
            duration: .5,
            rotation: 10,
            ease: "sine.inOut",
            yoyo: true,
            repeat: 1
        }, 0)
}

const backCycle = halfBodyTimeline(legs[0], arms[1]);
const frontCycle = halfBodyTimeline(legs[1], arms[0]);




const bodyTimeline = gsap.timeline({
    paused: true,
})
    .to(dude, {
        duration: .25,
        y: "-=20",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    }, 0)
    .fromTo(head, {
        rotation: -25
    }, {
        duration: .25,
        rotation: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    }, 0)




const numberOfCycles = Math.ceil(3 * window.innerWidth / window.innerHeight)
gsap.timeline({
    scrollTrigger: {
        trigger: ".page",
        scrub: true,
        start: "0% 0%",
        end: "100% 100%",
    },
})
    .to(arrowEl, {
        duration: .05,
        opacity: 0
    }, 0)
    .fromTo(content, {
        xPercent: 0
    }, {
        xPercent: -60,
        easy: "none"
    }, 0)

    .fromTo(bodyTimeline, {
        time: .7
    }, {
        time: .75 + numberOfCycles
    }, 0)
    .fromTo(backCycle, {
        time: .7
    }, {
        time: .75 + numberOfCycles
    }, 0)
    .fromTo(frontCycle, {
        time: .2
    }, {
        time: .25 + numberOfCycles
    }, 0)



window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
});


// ---------------------------------------------
// ONLY FOR CODEPEN PREVIEW

gsap.set(window, {
    scrollTo: 0
})
gsap.timeline({})
    .to(window, {
        duration: 1.75,
        scrollTo: .32 * window.innerHeight,
        ease: "power1.inOut"
    }, .3);