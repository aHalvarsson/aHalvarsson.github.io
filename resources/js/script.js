
const portImg = document.getElementsByClassName('portfolioDiv');
const exitBox = document.getElementById('clickToExitBox');
const portWindow = document.getElementById('portfolioItems');
let portWindowOpen = false;
let portWindowFinish = true;
let portItem;
let xPosition;

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
            portWindow.style.left = 0 + 'px';
            portWindow.style.width = '100%';
            portWindow.style.transition = 'left 2s, width 2s';
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

    setTimeout(() => {
        portWindow.style.display = 'none';
        portWindow.style.opacity = '1';
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