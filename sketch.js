var astranautimg, cometimg, ufoimg, bgimg;
var astranaut, comet, ufo, bg
var gamestate = "play";
var astranautRescued;
var invisibleline1, invisibleline2, cometgroup, astranautgroup, gameover, go;

function preload() {
    astranautimg = loadImage("astranaut.png");
    cometimg = loadImage("comet.png");
    ufoimg = loadImage("ufo.png");
    bgimg = loadImage("space.jpg");
    go = loadImage("gameOver.png");
    
}

function setup() {
    createCanvas(800, 600);
    bg = createSprite(200, 200);
    bg.addImage("bg", bgimg);
    bg.scale = 0.5;
    bg.velocityY = 6;

    invisibleline1 = createSprite(800, 300, 10, 600)
    invisibleline1.visible = false;

    invisibleline2 = createSprite(0, 300, 10, 600)
    invisibleline2.visible = false;

    ufo = createSprite(400, 550, 10, 50);
    ufo.addImage("ufo", ufoimg);
    ufo.scale = 0.07

    astranautRescued = 0

    cometgroup = createGroup()
    astranautgroup = createGroup()

    ufo.setCollider("circle", 0, 0, 600);

}

function draw() {
    background(0);
    if (bg.y > 500) {
        bg.y = 200;
    }
    drawSprites();
    if (gamestate === "play") {

        if (keyDown("left_arrow")) {
            ufo.x = ufo.x - 10;
        }
        if (keyDown("right_arrow")) {
            ufo.x = ufo.x + 10;
        }
        ufo.collide(invisibleline1);
        ufo.collide(invisibleline2);

        if (cometgroup.isTouching(ufo)) {
            ufo.destroy();
            gamestate = "end";
        }

        stroke("white");
        fill("white");
        textSize(15);
        text("astranautRescued:" + astranautRescued, 600, 100)

        if (astranautgroup.isTouching(ufo)) {
            astranautRescued = astranautRescued + 1;
            astranautgroup.destroyEach();
        }

        spawnComet()
        spawnAstranaut()


    }
    if (gamestate === "end") {

        gameover = createSprite(400, 300);
        gameover.addImage("gameover", go);

        bg.velocityY = 0;
        cometgroup.velocityY = 0;
        cometgroup.setLifetime = 0;
        astranautgroup.velocityY = 0;
        astranautgroup.setLifetime = 0;
        astranautgroup.destroyEach();
        cometgroup.destroyEach()
    }
        


}

function spawnComet() {
    if (frameCount % 60 === 0) {
        comet = createSprite(Math.round(random(100, 700)), -10, 50, 50)
        comet.addImage("comet", cometimg);
        comet.scale = 0.1
        comet.velocityY = 6;
        cometgroup.add(comet)
        comet.setLifetime = 100;
    }
}


function spawnAstranaut() {
    if (frameCount % 100 === 0) {
        astranaut = createSprite(Math.round(random(100, 700)), -10, 50, 50);
        astranaut.addImage("astranaut", astranautimg)
        astranaut.velocityY = 6;
        astranautgroup.add(astranaut);
        astranaut.setLifetime = 100;
        astranaut.scale = 0.1
    }
}

