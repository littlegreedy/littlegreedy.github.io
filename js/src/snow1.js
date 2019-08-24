/*��ʽ��*/
/* ������ѩ */
function snowFall(snow) {
    /* ���������� */
    snow = snow || {};
    this.maxFlake = snow.maxFlake || 200;   /* ���Ƭ�� */
    this.flakeSize = snow.flakeSize || 10;  /* ѩ����״ */
    this.fallSpeed = snow.fallSpeed || 1;   /* ׹���ٶ� */
}
/* ����д�� */
requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function(callback) { setTimeout(callback, 1000 / 60); };

cancelAnimationFrame = window.cancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.msCancelAnimationFrame ||
	window.oCancelAnimationFrame;
/* ��ʼ��ѩ */
snowFall.prototype.start = function(){
    /* �������� */
    snowCanvas.apply(this);
    /* ����ѩ����״ */
    createFlakes.apply(this);
    /* ��ѩ */
    drawSnow.apply(this)
}
/* �������� */
function snowCanvas() {
    /* ����Dom��� */
    var snowcanvas = document.createElement("canvas");
    snowcanvas.id = "snowfall";
    snowcanvas.width = window.innerWidth;
    snowcanvas.height = document.body.clientHeight;
    snowcanvas.setAttribute("style", "position:absolute; top: 0; left: 0; z-index: 1; pointer-events: none;");
    document.getElementsByTagName("body")[0].appendChild(snowcanvas);
    this.canvas = snowcanvas;
    this.ctx = snowcanvas.getContext("2d");
    /* ���ڴ�С�ı�Ĵ��� */
    window.onresize = function() {
        snowcanvas.width = window.innerWidth;
        /* snowcanvas.height = window.innerHeight */
    }
}
/* ѩ�˶����� */
function flakeMove(canvasWidth, canvasHeight, flakeSize, fallSpeed) {
    this.x = Math.floor(Math.random() * canvasWidth);   /* x���� */
    this.y = Math.floor(Math.random() * canvasHeight);  /* y���� */
    this.size = Math.random() * flakeSize + 2;          /* ��״ */
    this.maxSize = flakeSize;                           /* �����״ */
    this.speed = Math.random() * 1 + fallSpeed;         /* ׹���ٶ� */
    this.fallSpeed = fallSpeed;                         /* ׹���ٶ� */
    this.velY = this.speed;                             /* Y�����ٶ� */
    this.velX = 0;                                      /* X�����ٶ� */
    this.stepSize = Math.random() / 30;                 /* ���� */
    this.step = 0                                       /* ���� */
}
flakeMove.prototype.update = function() {
    var x = this.x,
        y = this.y;
    /* ���Ұڶ�(����) */
    this.velX *= 0.98;
    if (this.velY <= this.speed) {
        this.velY = this.speed
    }
    this.velX += Math.cos(this.step += .05) * this.stepSize;

    this.y += this.velY;
    this.x += this.velX;
    /* �ɳ��߽�Ĵ��� */
    if (this.x >= canvas.width || this.x <= 0 || this.y >= canvas.height || this.y <= 0) {
        this.reset(canvas.width, canvas.height)
    }
};
/* �ɳ��߽�-������˼���׹�� */
flakeMove.prototype.reset = function(width, height) {
    this.x = Math.floor(Math.random() * width);
    this.y = 0;
    this.size = Math.random() * this.maxSize + 2;
    this.speed = Math.random() * 1 + this.fallSpeed;
    this.velY = this.speed;
    this.velX = 0;
};
// ��Ⱦѩ��-�����״���˴����޸�ѩ����ɫ��������
flakeMove.prototype.render = function(ctx) {
    var snowFlake = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
    snowFlake.addColorStop(0, "rgba(255, 255, 255, 0.9)");  /* �˴���ѩ����ɫ��Ĭ���ǰ�ɫ */
    snowFlake.addColorStop(.5, "rgba(255, 255, 255, 0.5)"); /* ��Ҫ��Ϊ������ɫ�������в� */
    snowFlake.addColorStop(1, "rgba(255, 255, 255, 0)");    /* ��16���Ƶ�RGB ��ɫ���롣 */
    ctx.save();
    ctx.fillStyle = snowFlake;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
};
/* ����ѩ��-������״ */
function createFlakes() {
    var maxFlake = this.maxFlake,
        flakes = this.flakes = [],
        canvas = this.canvas;
    for (var i = 0; i < maxFlake; i++) {
        flakes.push(new flakeMove(canvas.width, canvas.height, this.flakeSize, this.fallSpeed))
    }
}
/* ��ѩ */
function drawSnow() {
    var maxFlake = this.maxFlake,
        flakes = this.flakes;
    ctx = this.ctx, canvas = this.canvas, that = this;
    /* ���ѩ�� */
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var e = 0; e < maxFlake; e++) {
        flakes[e].update();
        flakes[e].render(ctx);
    }
    /*  һ֡һ֡�Ļ� */
    this.loop = requestAnimationFrame(function() {
        drawSnow.apply(that);
    });
}
/* ���ü����Ʒ��� */
var snow = new snowFall({maxFlake:60});
snow.start();

