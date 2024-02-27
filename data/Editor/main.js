const selector = document.getElementById("selector");
const colorPicker = document.getElementById("colorPicker");
const colorCopy = document.getElementById("colorCopy");
const clearButton = document.getElementById("clr");
const exportButton = document.getElementById("export")
const speed = 1;
const movementSpeed = 5;

var cubePositions = [];
var cubes = [];
function makecube(posX,posY,posZ,size,color = "#FFF"){
    var cube = document.createElement("div");
    cube.className = "cube";
    cube.style.transform = `translateX(${posX}px) translateY(${posY}px) translateZ(${posZ}px)`;
    var styling = `translateZ(${size/2}px); height: ${size}px; width: ${size}px; background-color: ${color};`;
    cube.innerHTML = `<div class="cube__face cube__face--front" style="transform: rotateY(0deg) ${styling}"></div>
    <div class="cube__face cube__face--back" style="transform: rotateY(180deg) ${styling}"></div>
    <div class="cube__face cube__face--right" style="transform: rotateY(90deg) ${styling}"></div>
    <div class="cube__face cube__face--left" style="transform: rotateY(-90deg) ${styling}"></div>
    <div class="cube__face cube__face--top" style="transform: rotateX( 90deg) ${styling}"></div>
    <div class="cube__face cube__face--bottom" style="transform: rotateX(-90deg) ${styling}"></div>`;
    scene.appendChild(cube);
    cubes.push(cube);
    cubePositions.push([posX,posY,posZ]);
}


var selectorX = 0; var selectorY = -1; var selectorZ = 0;
var camX = 0; var camY = -45;
var camPosX = 0; var camPosY = 0;
var keys = [0,0,false];

window.addEventListener('keydown', (e) => {
    // Selector control
    switch (e.key){
        case "a":
            selectorX -= 100;
            selector.style.transform = `translateX(${selectorX}px) translateZ(${selectorZ}px) translateY(${selectorY}px)`;
            break;
        case "d":
            selectorX += 100;
            selector.style.transform = `translateX(${selectorX}px) translateZ(${selectorZ}px) translateY(${selectorY}px)`;
            break;
        case "w":
            selectorZ -= 100;
            selector.style.transform = `translateX(${selectorX}px) translateZ(${selectorZ}px) translateY(${selectorY}px)`;
            break;
        case "s":
            selectorZ += 100;
            selector.style.transform = `translateX(${selectorX}px) translateZ(${selectorZ}px) translateY(${selectorY}px)`;
            break;
        case "e":
            selectorY -= 100;
            selector.style.transform = `translateX(${selectorX}px) translateZ(${selectorZ}px) translateY(${selectorY}px)`;
            break;
        case "q":
            selectorY += 100;
            selector.style.transform = `translateX(${selectorX}px) translateZ(${selectorZ}px) translateY(${selectorY}px)`;
            break;
        case "r": // place / delete blocks
            for (var i = 0; i < cubes.length; i++){
                if (cubePositions[i][0] == selectorX && cubePositions[i][1] == selectorY+1 && cubePositions[i][2] == selectorZ){
                    cubePositions.splice(i,1);
                    cubes[i].remove();
                    cubes.splice(i,1);
                    console.log("Removing")
                    return;
                }
            }
            console.log("Making")
            makecube(selectorX,selectorY+1,selectorZ,100,colorPicker.value);
            break;
    // Camera control
        case "ArrowRight":
            keys[0] = -speed;
            break;
        case "ArrowLeft":
            keys[0] = speed;
            break;
        case "ArrowUp":
            keys[1] = -speed;
            break;
        case "ArrowDown":
            keys[1] = speed;
            break;
        case "Control":
            keys[2] = true;
            break;
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.key){
        case "ArrowRight":
            keys[0] = 0;
            break;
        case "ArrowLeft":
            keys[0] = 0;
            break;
        case "ArrowUp":
            keys[1] = 0;
            break;
        case "ArrowDown":
            keys[1] = 0;
            break;
        case "Control":
            keys[2] = false;
            break;
    }
})

for(var x = 0; x < 10; x++){
    for(var z = 0; z < 10; z++){
        makecube(x*100,100,-z*100,100,"rgb(50,150,50)");
    }
}
// Camera movement
function move(){
    setTimeout(()=>{
        if (!keys[2]){ // not holding Ctrl
            camX += keys[0];
            camY += keys[1];
            scene.style.transform = `perspective(100vw) rotateX(${camY}deg) rotateY(${camX}deg)`;
        } else { // holding Ctrl
            selector.style.transform = `translateX(${selectorX+keys[0]}px) translateY(${selectorY}px) translateZ(${selectorZ+keys[1]}px)`;
            for (var i = 0; i < cubes.length; i++){
                cubes[i].style.transform = `translateX(${cubePositions[i][0]+keys[0]*movementSpeed}px) translateY(${cubePositions[i][1]}px) translateZ(${cubePositions[i][2]+keys[1]*movementSpeed}px)`;
                
                cubePositions[i][0] += keys[0]*movementSpeed;
                cubePositions[i][2] -= keys[1]*movementSpeed;
            }
            selectorX += keys[0]*movementSpeed;
            selectorZ -= keys[1]*movementSpeed;
        }
        move();
    },5);
}

// thanks stackoverflow
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r-0) + componentToHex(g-0) + componentToHex(b-0);
}
  

colorCopy.addEventListener("click", () => {
    for (var i = 0; i < cubes.length; i++){
        if (cubePositions[i][0] == selectorX && cubePositions[i][1] == selectorY+1 && cubePositions[i][2] == selectorZ){
            var clr = cubes[i].getElementsByClassName("cube__face")[0].style.backgroundColor;
            colorPicker.value = rgbToHex(...clr.substring(4,clr.length-1).split(","));
            return;
        }
    }
})

clearButton.addEventListener("click", () => {
    cubePositions.splice(0,cubePositions.length);
    for (var i = 0; i < cubes.length; i++){
        cubes[i].remove();
    }
    cubes.splice(0,cubes.length);
})

exportButton.addEventListener("click", () => {
    var out = '<roblox xmlns:xmime="http://www.w3.org/2005/05/xmlmime" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://www.roblox.com/roblox.xsd" version="4"><Item class="Workspace">'
    for(var i = 0; i < cubes.length; i++){
        var colors = cubes[i].getElementsByClassName("cube__face")[0].style.backgroundColor.substring(4,cubes[i].getElementsByClassName("cube__face")[0].style.backgroundColor.length-1).split(",");
        out += `<Item class="Part"><Properties><token name="TopSurface">0</token><Color3 name="Color"><R>${colors[0]/255}</R><G>${colors[1]/255}</G><B>${colors[2]/255}</B></Color3><bool name="Anchored">true</bool><CoordinateFrame name="CFrame"><X>${cubePositions[i][0]/25}</X><Y>${-(cubePositions[i][1]/25)}</Y><Z>${cubePositions[i][2]/25}</Z><R00>1</R00><R01>0</R01><R02>0</R02><R10>0</R10><R11>1</R11><R12>0</R12><R20>0</R20><R21>0</R21><R22>1</R22></CoordinateFrame><Vector3 name="size"><X>4</X><Y>4</Y><Z>4</Z></Vector3></Properties></Item>`
    }
    out += '</Item></roblox>'
    fetch('../export', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: out
}).then(res => res.blob())
.then(blob => {
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = "export.rbxlx";
    document.body.appendChild(a);
    a.click();    
    a.remove();
})
})

move();