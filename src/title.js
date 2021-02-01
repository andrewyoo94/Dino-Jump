const titleSprite = new Image();
titleSprite.src = "/home/andrew/Desktop/dino_jump/img/titleSprite.png";

export default class Title {

    constructor(dimensions) {
        
    }

    drawTitleScreen(ctx, title) {
        ctx.drawImage(
            titleSprite,
            0, 0,  //sX, sY      lessen height to move line up
            498, 52,  //           lessen this height after to shorten bottem
            title.x, title.y,
            title.width, title.height
        )
    }

    animate(ctx) {

    }

}