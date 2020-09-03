
function clockStart() {
  var canvas = document.createElement('canvas');
  canvas.style.backgroundColor = '#FFF';
  canvas.width = 128;
  canvas.height = 128;
  var ctx = canvas.getContext('2d');
  var $canvasWidth = ctx.canvas.width;//获取画布的宽
  var $canvasHeight = ctx.canvas.height;
  var r = $canvasWidth / 2; // 半径
  var rem = $canvasWidth / 200;
  function dropBackg() {
    ctx.fillStyle = '#FFF';
    ctx.fillRect(0, 0, $canvasWidth, $canvasHeight);
    ctx.save();//保存当前状态
    //重置中心点
    ctx.translate(r, r);
    //开始或重置路径
    ctx.beginPath();
    ctx.lineWidth = 10 * rem;
    ctx.arc(0, 0, r - ctx.lineWidth / 2, 0, 2 * Math.PI, false);
    ctx.stroke();
    var num = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
    ctx.font = 18 * rem + "px Arial";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle'
    num.forEach(function (number, i) {
      //rad 弧度
      var rad = 2 * Math.PI / 12 * i;
      var x = Math.cos(rad) * (r - 30 * rem);
      var y = Math.sin(rad) * (r - 30 * rem);
      ctx.fillText(number, x, y);
    })
    for (var i = 0; i < 60; i++) {
      var rad = 2 * Math.PI / 60 * i;
      var x = Math.cos(rad) * (r - 15 * rem);
      var y = Math.sin(rad) * (r - 15 * rem);
      ctx.beginPath();
      if (i % 5 == 0) {
        ctx.fillStyle = '#000';
      } else {
        ctx.fillStyle = '#ccc';
      }
      ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI);
      ctx.fill();
    }


  }
  function dropHour(hour, minute) {
    ctx.save();//保存原始画布状态
    ctx.beginPath();
    //时针弧度
    var rad = 2 * Math.PI / 12 * hour;
    //分针弧度
    var mrad = 2 * Math.PI / 12 / 60 * minute;
    ctx.rotate(rad + mrad);
    ctx.lineWidth = 6 * rem;;
    ctx.lineCap = "round";
    ctx.moveTo(0, 10 * rem);
    ctx.lineTo(0, -r / 2);
    ctx.stroke();
    ctx.restore();
  }
  function dropMinute(minute, second) {
    ctx.save();
    ctx.beginPath();
    //分针弧度
    var rad = 2 * Math.PI / 60 * minute;
    //秒针针弧度
    var srad = 2 * Math.PI / 60 / 60 * second;
    ctx.rotate(rad + srad);
    ctx.lineWidth = 4 * rem;
    ctx.lineCap = "round";
    ctx.moveTo(0, 10 * rem);
    ctx.lineTo(0, -r + 30 * rem);
    ctx.stroke();
    ctx.restore();
  }
  function dropSecond(second) {
    ctx.save();
    ctx.beginPath();
    var rad = 2 * Math.PI / 60 * second;
    ctx.fillStyle = '#c14543'
    ctx.rotate(rad);
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.moveTo(-2 * rem, 20 * rem);
    ctx.lineTo(2 * rem, 20 * rem);
    ctx.lineTo(1, -r + 18 * rem);
    ctx.lineTo(-1, -r + 18 * rem);
    ctx.fill();
    ctx.restore();
  }
  function dropDat() {
    ctx.beginPath();
    ctx.fillStyle = '#fff';
    ctx.arc(0, 0, 3 * rem, 0, 2 * Math.PI, false);
    ctx.fill();
  }
  function clockDraw() {
    ctx.clearRect(0, 0, $canvasWidth, $canvasHeight);//在给定的矩形内清除指定的像素
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    dropBackg();//时钟大背景
    dropHour(hour, minute);//时针
    dropMinute(minute, second);//分针
    dropSecond(second);//秒针
    dropDat();//圆心
    ctx.restore();//返回之前保存过的路径状态和属性
  }
  if (ctx) {
    clockDraw();
    setInterval(clockDraw, 10000 / 60);
  }
  return canvas;
}