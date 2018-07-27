const Drawings = () => {
    const currentPortfolio = 5;
    let drawings = '';

    for(let i = 0; i < currentPortfolio; i++) {
        drawings +=`<img class="rounded m-2" src="./img/drawings/pic${i}.png" alt="A picture" height="250px">`;
    }
    changeTitle("gallery of random drawings")
    return `
        <div class="showdrawings">
            ${drawings}
        </div>
    `;
}
