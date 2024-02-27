function $(id){
    return document.getElementById(id);
}

const right = $("rightarrow");
const left = $("leftarrow");
const display = $("display");
const imgdisplay = $("imgdisplay");
const imageList = document.getElementsByClassName("showcase");
const arrows = document.getElementsByClassName("arrow");
const asteria = $("asteria");

var prop = false
if (imageList[0].clientWidth >= window.screen.availWidth) {
    prop = true;
    $("side1").appendChild($("second"));
    $("side1").style.paddingBottom = "5vh";
    $("txt").style.fontSize = "1vh";
    $("side2title").style.fontSize = "1.5vh";
    $("title").style.fontSize = "3vh";
    $("discord").style.fontSize = "1.5vh";
    $("arrows").style.transform = "translateX(4vw)";
}else{
    asteria.style.transform = `translateX(calc(${window.screen.availWidth-asteria.clientWidth}px))`;
    asteria.style.visibility = "visible";
    $("side1").className = "sides";
    $("second").id = "side2";
    $("side2").className = "sides";
}

console.log(imgdisplay.clientHeight,imageList[0].clientHeight);

for (var i = 0; i < imageList.length; i++){
    if (prop) {
        imageList[i].style.width = "70vw";
        imageList[i].style.transform = `translateY(${(imgdisplay.clientHeight-imageList[i].clientHeight)/2}px) translateX(calc(${50+100*i}vw - ${imageList[i].clientWidth/2}px))`;
    } else {
        imageList[i].style.height = "42vh";
        imageList[i].style.transform = `translateY(${(imgdisplay.clientHeight-imageList[i].clientHeight)/2}px) translateX(calc(${5+100*i}vw))`;
    }
}
//imageList[i].style.height = "46vh"
var current = 0;
right.addEventListener("mousedown", e=>{
    current += 100;
    console.log(current);
    if (current == imageList.length*100) {
        current = 0;
        move(0,current,imageList.length*100-100,-2);
        return;
    }
    move(0,current,current-100,2);
})

left.addEventListener("mousedown", e=>{
    current -= 100;
    console.log(current);
    if (current == -100) {
        current = 200;
        move(0,current,0,2);
        return;
    }

    move(0,current,current+100,-2);
})

function move(i,to,current,speed){
    setTimeout(() => {
        if (i+current == to){return;}
        i+=speed;
        display.style.transform = `translateX(${-(current+i)}vw)`;
        move(i,to,current,speed);
    }, 1);
}