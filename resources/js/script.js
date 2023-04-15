const portImg = document.querySelectorAll('.portfolioDiv'); //Selects the side portfolio images
const exitBox = document.getElementById('clickToExitBox'); //Selects the div that covers everything when in portfolio.
const portWindow = document.getElementById('portfolio'); //The portfolio text background
const pItemArt = document.querySelectorAll('.pItemClass'); //The different portfolio text items
const pageMenu = document.getElementById('siteMenu'); //Main site menu
const thumbnailContainer = document.querySelector('.thumbnailContainer');
const thumbnails = document.querySelectorAll('.thumbnails');

let windowWidth = (window.innerWidth || document.documentElement.clientWidth);
let portWindowOpen = false; //Used to stop the user from starting several actions at the same time.
let portWindowFinish = true; //As above
let portfolioBody;
// Variable declaration
let sameIndex;
let portItem;

const thumbnailHover = () => {
    thumbnails.forEach((thumbnail) => {
        thumbnail.addEventListener('mouseover', showFullImage);
        thumbnail.addEventListener('mouseout', hideFullImage);
    });
}

const isElementInViewport = el => {
    const rect = el.getBoundingClientRect();
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    windowWidth = (window.innerWidth || document.documentElement.clientWidth);

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= windowHeight &&
        rect.right <= windowWidth
    );
}

const showFullImage = (event) => {
    const target = event.target;
    if (target.tagName !== 'IMG') {
        return;
    }
    const fullImage = document.createElement('img');
    fullImage.src = target.src;
    fullImage.classList.add('full-image'); // Add this line to add the full-image class
    fullImage.id = 'fullHoverImage';
    applyStyles(fullImage, {
        opacity: '0',
        width: 16 + 'rem',
        height: 16 + 'rem',
        transition: 'opacity 0.5s, width 0.25s, height 0.25s'
    });
    let tempMath = windowWidth * 0.35;
    setTimeout(() => {
        applyStyles(fullImage, {
            opacity: '1',
            width: tempMath + 'px',
            height: 'auto'
        });
    }, 10);

    setTimeout(() => {
        //  const element = document.querySelector('.toolSelect');
        if (!isElementInViewport(fullImage)) {
            scrollToSection(fullImage.id, 'center');
        }

    }, 500);

    target.parentElement.appendChild(fullImage);
};

const hideFullImage = (event) => {
    const target = event.target;
    if (target.tagName !== 'IMG') {
        return;
    }

    const fullImage = target.parentElement.querySelector('.full-image');
    if (fullImage) {
        target.parentElement.removeChild(fullImage);
    }
};

//Look for and find the right portfoliotext to the image clicked
const searchForIndex = term => [...portImg].indexOf(term);

function applyStyles(element, styles) {
    for (const [property, value] of Object.entries(styles)) {
        element.style[property] = value;
    }
}

//Portfolio image hover. Width increases and grayscale goes down to zero
const portImgHover = event => {
    const img = event
        .currentTarget
        .querySelector('img');
    img.style.filter = 'grayscale(0%)';
    event.currentTarget.style.width = '8dvw';
};

//Portfolio image mouse out. Width and grayscale goes back to starting position
const portImgOut = event => {
    const img = event
        .currentTarget
        .querySelector('img');
    img.style.filter = 'grayscale(100%)';
    event.currentTarget.style.width = '5.75dvw';
};

//Portfolio image clicked
const portImgClick = event => {

    if (!portWindowOpen) { //First check to se if a portfolio window is already open

        portWindowOpen = true; //Set window is opened
        portWindowFinish = false; //The portfolio window opening action is not finished

        //exitBox covers the whole site when the portfolio is open. When clicked on the portfolio closes
        exitBox.style.display = 'block';
        exitBox.style.height = document.body.offsetHeight + 'px'; //Get the sites whole height
        exitBox.removeEventListener('click', abortPortfolio); //Temporarely remove event listener while opening action is ongoing

        portItem = event.currentTarget; //Which portfolio image was clicked

        //Remove mouse out event on the clicked image and make sure it is in its outermost position.
        portItem.removeEventListener('mouseout', portImgOut);
        let img = portItem.querySelector('img');
        img.style.filter = 'grayscale(0%)';
        portItem.style.width = '8dvw';

        sameIndex = searchForIndex(portItem); //Find in what position on the page the clicked image has
        portfolioBody = pItemArt[sameIndex];
        portWindow.style.display = 'block'; //Start the opening of portfolio background
        portfolioBody.style.display = 'block'; //Use index from earlier and open the right portfolio item

        thumbnailHover();

        let pHeight = portfolioBody.offsetHeight; //Get hight from portfolio item.

        if (pHeight < 704)
            pHeight = 48;
        else
            pHeight = (pHeight / 16) + 6; //Check and set min-height

        // Start showing the portfolio background and set the hight to earlier
        // calculations

        applyStyles(portWindow, {
            transitionTimingFunction: 'ease-in-out',
            transition: 'height 0.3s, opacity 1.5s',
            opacity: '1',
            height: pHeight + 'rem',
            width: '43rem',
            transform: 'translateX(-3rem)'
        });

        //Start showing the portfolio item

        applyStyles(portfolioBody, {
            transitionTimingFunction: 'ease-in-out',
            transition: 'opacity 1.5s, margin 0.7s',
            opacity: '1',
            marginTop: '4rem'
        });


        //exitBox transists from 0 to 1 in opacity
        exitBox.style.opacity = '1';

        //The clicked portfolio image on top
        portItem.style.zIndex = '9';

        setTimeout(() => {
            exitBox.addEventListener('click', abortPortfolio); //Put back exitBox event listener
            portWindowFinish = true; //The portfolio opening is finished. Ready for users next action
        }, 2500);

    } else if (portWindowFinish) { //If portfolio window is open and the clicked portfolio is clicked again.
        abortPortfolio(); //... first check that there isn't a portfolio opening giong on, if not go and close the portfolio
    }
};

const abortPortfolio = () => { //Close portfolio. Can be called by exitbox click and click on active portfolio image
    portWindowFinish = false; //New portfolio window action begin. Stop other user input

    //Resets all values to start position.

    exitBox.style.opacity = '0'; //Fade away exitbox

    //Fade and move away the portfolio item
    applyStyles(portfolioBody, {
        transitionTimingFunction: 'ease-in-out',
        transition: 'opacity 0.5s, margin 0.5s',
        opacity: '0',
        marginTop: '-30rem'
    });
    //Fade and shrink the portfolio background
    applyStyles(portWindow, {
        transitionTimingFunction: 'ease-in',
        height: '2rem',
        opacity: '0',
        transition: 'height 1s, opacity 0.75s'
    });

    //Reset the clicked portfolio image and turn on mouseout event again
    portItem.addEventListener('mouseout', portImgOut);
    portItem
        .querySelector('img')
        .style
        .filter = 'grayscale(100%)';
    portItem.style.width = '5.75dvw';

    setTimeout(() => { //Giv the transitions time before turning of displays
        applyStyles(portfolioBody, {
            marginTop: '-10rem',
            display: 'none'
        });
        portWindow.style.display = 'none';
        exitBox.style.display = 'none';

        portItem.style.zIndex = 'auto';

        portWindowOpen = false;
        portWindowFinish = true;
    }, 1000)

}

//Takes an id and scrolls the window to that element
const scrollToSection = (sectionId, scrollPosition = 'start') => {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: "smooth", block: scrollPosition, inline: "nearest" });
};

//Function for the main menu.
const pressButton = event => {
    let element = event.target;
    if (element.tagName === 'SPAN') {
        element = element.closest('LI');
    }

    if (element.tagName !== 'LI') { //Checkes to se if the event target is an LI of our menu UL
        return;
    }

    switch (element.id) { //Match event target with right button and then send right id to the scroll to function
        case 'portfolioBtn':
            window.scroll({ top: 0, left: 0, behavior: 'smooth' });
            break;
        case 'aboutBtn':
            scrollToSection('about');
            break;
        case 'contactBtn':
            scrollToSection('contact');
            break;
    }
};

pageMenu.addEventListener('click', pressButton); //Clicklistener on the menu ul

//Adds event listeners to all our portfolio images, mouse in, out and click
portImg.forEach(element => {
    element.addEventListener('mouseover', portImgHover);
    element.addEventListener('mouseout', portImgOut);
    element.addEventListener('click', portImgClick);
});

// Click anywhere outside the portfolio window when open you hit this div and the
// exit portfolio action begins
exitBox.addEventListener('click', abortPortfolio);
