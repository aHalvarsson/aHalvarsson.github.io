
const portImg = document.getElementsByClassName('portfolioDiv');
const exitBox = document.getElementById('clickToExitBox');
const portWindow = document.getElementById('portfolioItems');
const pItemArt = document.getElementsByClassName('pItemClass');
let portWindowOpen = false;
let portWindowFinish = true;
let sameIndex;
let portItem;
let xPosition;

const searchForIndex = term => {
    for(let i = 0; i < portImg.length; i ++) {
        if(portImg[i] === term) return i;
    }

    return -1;
}

const portImgHover = event => {
    let img = event.currentTarget.querySelector('img');
    img.style.filter = 'grayscale(0%)';
    event.currentTarget.style.width = '8rem';
}

const portImgOut = event => {
    let img = event.currentTarget.querySelector('img');
    img.style.filter = 'grayscale(100%)';
    event.currentTarget.style.width = '6.25rem';
}

const portImgClick = event => {

    if(!portWindowOpen) {
        portWindowOpen = true;
        portWindowFinish = false;
        exitBox.style.display = 'block';
        exitBox.removeEventListener('click', abortPortfolio);
        portItem = event.currentTarget;
        portItem.removeEventListener('mouseout', portImgOut);
        let img = portItem.querySelector('img');
        img.style.filter = 'grayscale(0%)';
        portItem.style.width = '8rem';

        const rect = portItem.getBoundingClientRect();
        xPosition = rect.left + window.pageXOffset;
        
        portWindow.style.left = xPosition + 40 + 'px';
        portItem.style.zIndex = '15';
        portWindow.style.display = 'block';
        

        

        setTimeout(() => {
            
            portWindow.style.opacity = '0.9';
            portWindow.style.left = 0 + 'px';
            portWindow.style.width = '100%';
            portWindow.style.transition = 'left 2s, width 2s, opacity 1s';
            sameIndex = searchForIndex(portItem);
            pItemArt[sameIndex].style.display = 'block';
            pItemArt[sameIndex].style.opacity = '1';
            pItemArt[sameIndex].style.transition = 'opacity 1s';
            
            
        }, 0);
        setTimeout(() => {
            exitBox.addEventListener('click', abortPortfolio);
            portWindowFinish = true;
        }, 2500);
    } else if (portWindowFinish) abortPortfolio();
}

const abortPortfolio = event => {
    portWindowFinish = false;
    exitBox.style.display = 'none';
    portItem.style.zIndex = 'auto';
    portItem.addEventListener('mouseout', portImgOut);
    portItem.querySelector('img').style.filter = 'grayscale(100%)';
    portItem.style.width = '6.25rem';
    
    portWindow.style.left = xPosition + 40 + 'px';
    portWindow.style.width = '2rem';
    portWindow.style.opacity = '0';
    portWindow.style.transition = 'left 1s, width 1s, opacity 1s';
    pItemArt[sameIndex].style.opacity = '0';
    pItemArt[sameIndex].style.transition = 'opacity 1s';

    setTimeout(() => {
        portWindow.style.display = 'none';
        pItemArt[sameIndex].style.display = 'none';
        portWindowOpen = false;
        portWindowFinish = true;
    }, 1000)

}

for(let i = 0; i < portImg.length; i++) {
    portImg[i].addEventListener('mouseover', portImgHover);
    portImg[i].addEventListener('mouseout', portImgOut);
    portImg[i].addEventListener('click', portImgClick);
}

exitBox.addEventListener('click', abortPortfolio);