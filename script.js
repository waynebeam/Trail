let canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");

const anchor = {
  x: 50,
  y: 50,
};

document.addEventListener("pointermove", (e) => {
  update(e);
});

const headSize = 20;
const segmentSize = 15;
let radius = 10;
numNodes = 75;

let points = [];
for (i = 0; i < numNodes; i++) {
  let point = {
    x: 50,
    y: 50,
  };
  points.push(point);
}

function update(e) {
  anchor.x = e.clientX;
  anchor.y = e.clientY;
  let firstAngle = Math.atan2(anchor.y - points[0].y, anchor.x - points[0].x);
  anchor.leftX = anchor.x + headSize * Math.cos(firstAngle + 1.57);
  anchor.leftY = anchor.y + headSize * Math.sin(firstAngle + 1.57);
  anchor.rightX = anchor.x + headSize * Math.cos(firstAngle - 1.57);
  anchor.rightY = anchor.y + headSize * Math.sin(firstAngle - 1.57);

  points.forEach((point, i) => {
    let prevPoint;
    i == 0 ? (prevPoint = anchor) : (prevPoint = points[i - 1]);

    let rawVec = {};
    rawVec.x = point.x - prevPoint.x;
    rawVec.y = point.y - prevPoint.y;
    let dist = Math.sqrt(rawVec.x * rawVec.x + rawVec.y * rawVec.y);
    rawVec.x /= dist;
    rawVec.y /= dist;

    point.x = rawVec.x * radius + prevPoint.x;
    point.y = rawVec.y * radius + prevPoint.y;

    let angle = Math.atan2(rawVec.y, rawVec.x);

    point.leftX = point.x + segmentSize * Math.cos(angle - 1.57);
    point.leftY = point.y + segmentSize * Math.sin(angle - 1.57);

    point.rightX = point.x + segmentSize * Math.cos(angle + 1.57);
    point.rightY = point.y + segmentSize * Math.sin(angle + 1.57);
  });

  draw();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(anchor.x, anchor.y, headSize, 0, 6.28);
  ctx.stroke();
  drawCircleSegments();
  drawOutLine();
}

function drawCircleSegments() {
  points.forEach((point) => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, segmentSize, 0, 6.28);
    ctx.stroke();
  });
}

function drawOutLine() {
  ctx.beginPath();
  ctx.moveTo(anchor.leftX, anchor.leftY);
  points.forEach((point) => {
    ctx.lineTo(point.leftX, point.leftY);
  });
  let lastPoint = points[points.length - 1];

  ctx.arcTo(
    lastPoint.leftX,
    lastPoint.leftY,
    lastPoint.x,
    lastPoint.y,
    segmentSize
  );

  for (i = points.length - 1; i >= 0; i--) {
    let point = points[i];
    ctx.lineTo(point.rightX, point.rightY);
  }

  ctx.lineTo(anchor.rightX, anchor.rightY);

  //   ctx.moveTo(anchor.rightX, anchor.rightY);
  //   points.forEach((point) => {
  //     ctx.lineTo(point.rightX, point.rightY);
  //   });

  ctx.stroke();
}

draw();
