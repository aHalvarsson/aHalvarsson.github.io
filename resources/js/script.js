
const portImg = document.querySelectorAll('.portfolioDiv');
const exitBox = document.getElementById('clickToExitBox');
const portWindow = document.getElementById('portfolio');
const pItemArt = document.querySelectorAll('.pItemClass');
const sButtons = document.querySelectorAll('li');

let portWindowOpen = false;
let portWindowFinish = true;
let sameIndex;
let portItem;


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

        sameIndex = searchForIndex(portItem);
        portWindow.style.display = 'block';
        pItemArt[sameIndex].style.display = 'block';

        let pHeight = pItemArt[sameIndex].offsetHeight;

        if(pHeight < 704) pHeight = 48;
        else pHeight = (pHeight/16) + 5.5;
        
        pItemArt[sameIndex].style.opacity = '1';
        pItemArt[sameIndex].style.marginTop = 4 + 'rem';
        pItemArt[sameIndex].style.transition = 'opacity 1.5s, margin 1s';
        
        portWindow.style.opacity = '0.9';
        portWindow.style.height = pHeight + 'rem';
        portWindow.style.transition = 'height 1s, opacity 1.5s';
    
        exitBox.style.opacity = '1';      

        portItem.style.zIndex = '15';

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
    portWindow.style.height = '0';
    portWindow.style.opacity = '0';
    portWindow.style.transition = 'height 1s, opacity 1s';
    
    pItemArt[sameIndex].style.opacity = '1';
    pItemArt[sameIndex].style.marginTop = -10 + 'rem';
    pItemArt[sameIndex].style.transition = 'opacity 1.5s, margin 1s';

    portItem.addEventListener('mouseout', portImgOut);
    portItem.querySelector('img').style.filter = 'grayscale(100%)';
    portItem.style.width = '5.75dvw';
    
    setTimeout(() => {
        pItemArt[sameIndex].style.display = 'none';
        portWindow.style.display = 'none';
        exitBox.style.display = 'none';
        
        portItem.style.zIndex = 'auto';
        
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