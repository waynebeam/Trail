
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

const anchor = {
    x: 50,
    y:50
}

document.addEventListener('pointermove',e=> {
    update(e);
});

let points =[]
for(i=0; i<20; i++){
    let point = {
        x: Math.random()*50,
        y: Math.random()*50
    }
    points.push(point);
}

const headSize = 20;
const segmentSize =15;


function update(e){
    anchor.x = e.clientX;
    anchor.y = e.clientY;
    
    radius = 15;

    points.forEach((point, i)=>{
        let prevPoint;
        i==0 ? prevPoint = anchor : prevPoint = points[i-1];

        let rawVec = {};
        rawVec.x = point.x - prevPoint.x;
        rawVec.y = point.y - prevPoint.y;
        let dist = Math.sqrt((rawVec.x*rawVec.x) + (rawVec.y*rawVec.y));
        rawVec.x /= dist;
        rawVec.y /= dist;

        point.x = rawVec.x*radius +prevPoint.x;
        point.y = rawVec.y*radius +prevPoint.y; 

    })
    
    draw();
}

function draw(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.strokeRect(0,0,canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(anchor.x,anchor.y,headSize,0,6.28);
    ctx.stroke();
    points.forEach(point=>{
        ctx.beginPath();
        ctx.arc(point.x, point.y, segmentSize, 0, 6.28);
        ctx.stroke();
    })
    ctx.stroke();
}

draw();