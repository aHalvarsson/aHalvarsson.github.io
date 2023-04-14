const portImg = document.querySelectorAll('.portfolioDiv'); //Selects the side portfolio images
const exitBox = document.getElementById('clickToExitBox'); //Selects the div that covers everything when in portfolio.
const portWindow = document.getElementById('portfolio'); //The portfolio text background
const pItemArt = document.querySelectorAll('.pItemClass'); //The different portfolio text items
const pageMenu = document.getElementById('siteMenu'); //Main site menu
const thumbnailContainer = document.querySelector('.thumbnailContainer');
const thumbnails = document.querySelectorAll('.thumbnails');


let portWindowOpen = false; //Used to stop the user from starting several actions at the same time.
let portWindowFinish = true; //As above

// Variable declaration
let sameIndex;
let portItem;

const thumbnailHover = () => {

    thumbnails.forEach((thumbnail) => {
        thumbnail.addEventListener('mouseover', showFullImage);
        thumbnail.addEventListener('mouseout', hideFullImage);
      });
}

const showFullImage = (event) => {
    const target = event.target;
    if (target.tagName !== 'IMG') {
      return;
    }
    const fullImage = document.createElement('img');
  fullImage.src = target.src;
  fullImage.classList.add('full-image'); // Add this line to add the full-image class
  fullImage.style.opacity = '0';
  fullImage.style.width = 16 + 'rem';
  fullImage.style.height = 16 + 'rem';
  fullImage.style.transition = 'opacity 0.75s, width 0.25s, height 0.25s';

    setTimeout(() => {
        fullImage.style.opacity = '1';
        fullImage.style.width = 26 + 'rem';
        fullImage.style.height = 26 + 'rem';
    },10)

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
        portWindow.style.display = 'block'; //Start the opening of portfolio background
        pItemArt[sameIndex].style.display = 'block'; //Use index from earlier and open the right portfolio item

        let pHeight = pItemArt[sameIndex].offsetHeight; //Get hight from portfolio item.

        if (pHeight < 704) 
            pHeight = 48;
        else 
            pHeight = (pHeight / 16) + 5.5; //Check and set min-height
        
        //Start showing the portfolio item
        pItemArt[sameIndex].style.opacity = '1';
        pItemArt[sameIndex].style.marginTop = 4 + 'rem';
        pItemArt[sameIndex].style.transition = 'opacity 1.5s, margin 1s';

        // Start showing the portfolio background and set the hight to earlier
        // calculations
        portWindow.style.opacity = '0.9';
        portWindow.style.height = pHeight + 'rem';
        portWindow.style.transition = 'height 1s, opacity 1.5s';

        //exitBox transists from 0 to 1 in opacity
        exitBox.style.opacity = '1';

        //The clicked portfolio image on top
        portItem.style.zIndex = '15';

        setTimeout(() => {
            exitBox.addEventListener('click', abortPortfolio); //Put back exitBox event listener
            thumbnailHover();
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

    //Fade and shrink the portfolio background
    portWindow.style.height = '0';
    portWindow.style.opacity = '0';
    portWindow.style.transition = 'height 1s, opacity 1s';

    //Fade and move away the portfolio item
    pItemArt[sameIndex].style.opacity = '0';
    pItemArt[sameIndex].style.marginTop = -10 + 'rem';
    pItemArt[sameIndex].style.transition = 'opacity 1.5s, margin 1s';

    //Reset the clicked portfolio image and turn on mouseout event again
    portItem.addEventListener('mouseout', portImgOut);
    portItem
        .querySelector('img')
        .style
        .filter = 'grayscale(100%)';
    portItem.style.width = '5.75dvw';

    setTimeout(() => { //Giv the transitions time before turning of displays
        pItemArt[sameIndex].style.display = 'none';
        portWindow.style.display = 'none';
        exitBox.style.display = 'none';

        portItem.style.zIndex = 'auto';

        portWindowOpen = false;
        portWindowFinish = true;
    }, 1000)

}

//Takes an id and scrolls the window to that element
const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
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
            window.scroll({top: 0, left: 0, behavior: 'smooth'});
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
