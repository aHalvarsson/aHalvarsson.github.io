
const portImg = document.querySelectorAll('.portfolioDiv');
const exitBox = document.getElementById('clickToExitBox');
const portWindow = document.getElementById('portfolioItems');
const pItemArt = document.querySelectorAll('.pItemClass');
const mainD = document.getElementById('mainDiv');
const sButtons = document.querySelectorAll('li');

let mainDivPos;
let clickLeft = true;
let portWindowOpen = false;
let portWindowFinish = true;
let sameIndex;
let portItem;
let xPosition;
let xPosDVW;

const searchForIndex = term => [...portImg].indexOf(term);

const portImgHover = event => {
    const img = event.currentTarget.querySelector('img');
    img.style.filter = 'grayscale(0%)';
    event.currentTarget.style.width = '8dvw';
};

const portImgOut = event => {
    const img = event.currentTarget.querySelector('img');
    img.style.filter = 'grayscale(100%)';
    event.currentTarget.style.width = '5.75dvw';
};

const portImgClick = event => {
    if (!portWindowOpen) {
        portWindowOpen = true;
        portWindowFinish = false;

        exitBox.style.display = 'block';
        exitBox.style.height = document.body.offsetHeight + 'px';
        exitBox.removeEventListener('click', abortPortfolio);
        

        portItem = event.currentTarget;
        portItem.removeEventListener('mouseout', portImgOut);

        let img = portItem.querySelector('img');
        img.style.filter = 'grayscale(0%)';
        portItem.style.width = '8dvw';

        const rect = portItem.getBoundingClientRect();
        xPosition = rect.left + window.pageXOffset;

        mainDivPos = mainD.getBoundingClientRect().left + window.pageXOffset;

        let viewWidth = document.querySelector('html').clientWidth;
        xPosDVW = (xPosition/viewWidth) * 100;
        sameIndex = searchForIndex(portItem);

        if(xPosition < (viewWidth/2)) {
            pItemArt[sameIndex].style.left = xPosDVW - 18 + 'dvw';
            portWindow.style.left = xPosDVW + 3.5 + 'dvw';
            clickLeft = true;
        } else {
            pItemArt[sameIndex].style.left = xPosDVW - 18 + 'dvw';
            portWindow.style.left = 'auto';
            portWindow.style.right = (100 - xPosDVW) - 3.5 + 'dvw';
            clickLeft = false;
        }
        
        portItem.style.zIndex = '15';
        portWindow.style.display = 'block';
        pItemArt[sameIndex].style.display = 'block';
   

        setTimeout(() => {

            portWindow.style.opacity = '0.9';
            exitBox.style.opacity = '1';
            if(clickLeft) {
                portWindow.style.width = 97 - 5.75 - xPosDVW + 'dvw';
            } else {
                portWindow.style.width = 97 - (100 - xPosDVW) + 'dvw';
            }
            portWindow.style.transition = 'width 2s, opacity 1s';
            
            pItemArt[sameIndex].style.left = (mainDivPos/viewWidth) * 100 + 'dvw';
            pItemArt[sameIndex].style.opacity = '1';
            pItemArt[sameIndex].style.transition = 'opacity 4s, left 2s';
        }, 0);

        setTimeout(() => {
            exitBox.addEventListener('click', abortPortfolio);
            portWindowFinish = true;
        }, 2500);

    } else if (portWindowFinish) {
        abortPortfolio();
    }
};

const abortPortfolio = () => {
    portWindowFinish = false;
    
    exitBox.style.opacity = '0';
    
    pItemArt[sameIndex].style.opacity = '0';
    pItemArt[sameIndex].style.transition = 'opacity 1s';

    portWindow.style.width = '2dvw';
    portWindow.style.opacity = '0';
    portWindow.style.transition = 'width 1s, opacity 1s';

    portItem.addEventListener('mouseout', portImgOut);

    portItem.querySelector('img').style.filter = 'grayscale(100%)';
    portItem.style.width = '5.75dvw';
    
    setTimeout(() => {
        portWindow.style.display = 'none';
        pItemArt[sameIndex].style.display = 'none';
        portItem.style.zIndex = 'auto';
        exitBox.style.display = 'none';
        portWindowOpen = false;
        portWindowFinish = true;
    }, 1000)

}

const pressButton = event => {
    let element = event.currentTarget;

    if(element.id === 'portfolioBtn') window.scroll({top:0, left:0, behavior: 'smooth'})
    else if(element.id === 'aboutBtn') document.getElementById('about').scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    else if(element.id === 'contactBtn') document.getElementById('contact').scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
}

portImg.forEach(element => {
    element.addEventListener('mouseover', portImgHover);
    element.addEventListener('mouseout', portImgOut);
    element.addEventListener('click', portImgClick);
});

sButtons.forEach(element => {
    element.addEventListener('click', pressButton);
})

exitBox.addEventListener('click', abortPortfolio);