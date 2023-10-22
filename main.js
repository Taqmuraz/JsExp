const inputMap = { };
const inputVector = action =>
{
    var x = 0, y = 0;
    if(inputMap['w']) y++;
    if(inputMap['d']) x++;
    if(inputMap['s']) y--;
    if(inputMap['a']) x--;
    action(x, y);
};
const time = () => Date.now() * 0.001;
const start = time();
const localTime = () => time() - start;
const deltaTime =
{
    last:0,
    update()
    {
        var t = localTime();
        var d = t - this.last;
        this.last = t;
        return d;
    }
};
const inputPositionXY = { x:0, y:0 }, inputPosition = action =>
{
    var xy = inputPositionXY;
    inputVector((x, y) =>
    {
        var d = deltaTime.update();
        xy.x += x * d;
        xy.y += y * d;
    });
    action(xy.x, xy.y);
};
const vector = source =>
{
    var x = 0, y = 0;
    source((sx, sy) =>
    {
        x = sx;
        y = sy;
    });
    return action => action(x, y);
};
const main = () =>
{
    window.addEventListener('keydown', e => inputMap[e.key] = true);
    window.addEventListener('keyup', e => inputMap[e.key] = false);
    var canvas = document.getElementById('canvas');
    image = new Image(256, 256);
    image.onload = () => draw(canvas);
    image.src = "player.png";
};
const draw = canvas =>
{
    var g = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if(g)
    {
        var pos = vector(inputPosition);
        g.reset();
        pos((x, y) => g.drawImage(image, x * 300, -y * 300, 100, 100));
    }
    window.setTimeout(() => draw(canvas), 20);
};