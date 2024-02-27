print = console.log;
const scene = document.getElementById("scene");

class gameObject{
    object
    position
    size
    color
}

var objectList = [];
/*function drawTriangle(points) {
    let AB = [points[1][0] - points[0][0], points[1][1] - points[0][1], points[1][2] - points[0][2]];
    let AC = [points[2][0] - points[0][0], points[2][1] - points[0][1], points[2][2] - points[0][2]];

    let crossProduct = [
        AB[1] * AC[2] - AB[2] * AC[1],
        AB[2] * AC[0] - AB[0] * AC[2],
        AB[0] * AC[1] - AB[1] * AC[0]
    ];

    let angleX = Math.atan2(crossProduct[1], crossProduct[2]) * (180 / Math.PI);
    let angleZ = Math.atan2(crossProduct[0], crossProduct[2]) * (180 / Math.PI);
    let angleY = Math.atan2(crossProduct[2], crossProduct[2]) * (180 / Math.PI);

    let midX = (points[0][0] + points[1][0] + points[2][0]) / 3;
    let midY = (points[0][1] + points[1][1] + points[2][1]) / 3;
    let midZ = (points[0][2] + points[1][2] + points[2][2]) / 3;

    let distanceY = Math.sqrt((points[2][1] - midY) ** 2 + (points[2][2] - midZ) ** 2);
    let disLeft = Math.sqrt((points[2][0] - midX) ** 2 + (points[2][2] - midZ) ** 2);
    let disRight = Math.sqrt((points[1][0] - midX) ** 2 + (points[1][2] - midZ) ** 2);

    let triangle = document.createElement("div");
    triangle.className = "triangle";
    triangle.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) rotateZ(${angleZ}deg) translateX(${midX}px) translateY(${midY}px) translateZ(${midZ}px)`;
    triangle.style.borderLeft = `${disLeft}px solid transparent`;
    triangle.style.borderRight = `${disRight}px solid transparent`;
    triangle.style.borderBottom = `${distanceY}px solid white`;
    scene.appendChild(triangle);
}*/
// [point A: [x,y,z], point B: [x,y,z], point C: [x,y,z]]



function makePlane(pos,size,rotation,color = "#FFF"){
    let plane = document.createElement("div");
    plane.style.width = `${size[0]}px`;
    plane.style.height = `${size[1]}px`;
    plane.style.position = "absolute";
    plane.style.transform = `translateX(${pos[0]}px) translateY(${pos[1]}px) translateZ(${pos[2]}px) rotateX(${rotation[0]}deg) rotateY(${rotation[1]}deg) rotateZ(${rotation[2]}deg)`;
    plane.style.backgroundColor = color;
    let planeObj = new gameObject();
    planeObj.color = color;
    planeObj.position = pos;
    planeObj.size = size;
    planeObj.object = plane;
    plane.addEventListener("mouseenter", () => {
        //todo
    });
    scene.appendChild(plane);
    objectList.push(planeObj);
    return planeObj;
}

function makePart(pos,size,rot,color = "rgba(0,0,0,0.1)"){
    let cube = document.createElement("div");
    cube.className = "cube";
    /*cube.style.width = "100px";
    cube.style.height = "100px";
    cube.style.backgroundColor = "rgba(250,250,250,0.1)";*/
    cube.style.transform = `translateX(${pos[0]}px) translateY(${pos[1]}px) translateZ(${pos[2]}px) rotateX(${rot[0]}deg) rotateY(${rot[1]}deg) rotateZ(${rot[2]}deg)`;
    cube.innerHTML = `<div class="cube__face" style="transform: rotateZ(0deg) translateY(${-size[1]/2}px) translateX(${-size[0]/2}px) translateZ(${size[2]/2}px); width: ${size[0]}px; height: ${size[1]}px; background-color: ${color};"></div>
    <div class="cube__face" style="transform: rotateY(180deg) translateY(${-size[1]/2}px) translateX(${size[0]/2}px) translateZ(${size[2]/2}px); width: ${size[0]}px; height: ${size[1]}px; background-color: ${color};"></div>
    <div class="cube__face" style="transform: rotateY(90deg) translateY(${-size[1]/2}px) translateZ(${size[0]/2-size[2]/2}px);  width: ${size[2]}px; height: ${size[1]}px; background-color: ${color};"></div>
    <div class="cube__face" style="transform: rotateY(-90deg) translateY(${-size[1]/2}px) translateZ(${size[0]/2+size[2]/2}px); width: ${size[2]}px; height: ${size[1]}px; background-color: ${color};"></div>
    <div class="cube__face" style="transform: rotateX(90deg) translateX(${-size[0]/2}px) translateZ(${size[1]/2+size[2]/2}px); width: ${size[0]}px; height: ${size[2]}px; background-color: ${color};"></div>
    <div class="cube__face" style="transform: rotateX(-90deg) translateX(${-size[0]/2}px) translateZ(${size[1]/2-size[2]/2}px); width: ${size[0]}px; height: ${size[2]}px; background-color: ${color};"></div>
    `; // C & F = cancer
    let cubeObj = new gameObject();
    cubeObj.color = color;
    cubeObj.position = pos;
    cubeObj.size = size;
    cubeObj.object = cube;
    scene.appendChild(cube);
    objectList.push(cubeObj);
    return cubeObj;
}


makePart([0,60,0],[5120,20,5120],[180,180,180],"rgba(40.00000141561031,127,71,1); background-image: url('https://htd.lol/Engine/studs.png'); background-repeat: repeat;background-size: 32px");
makePart([0,-20,0],[10,10,10],[180,180,180],'rgba(163.00000548362732,162,165,1)');
makePart([-56.25,40,-56.25],[2.5,25,122.5],[180,180,180],'rgba(86,66,54,1)');
makePart([-178.75,40,-56.25],[2.5,25,122.5],[180,180,180],'rgba(86,66,54,1)');
makePart([-117.5,40,3.75],[2.5,25,120],[180,90,180],'rgba(86,66,54,1)');
makePart([-117.5,40,-116.25],[2.5,25,120],[180,90,180],'rgba(86,66,54,1)');
//makePart([0,150,0],[5120,200,5120],[180,180,180],'rgba(99,95,98,1)');



/*for (let i = 0; i < 10; i++){
    for (let u = 0; u < 10; u++){
        makePlane([i*100,0,u*100],[100,100],[90,0,0],`rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`);
    }
}*/

// "baseplate"
//makePlane([0,-198,-250],[500,500],[90,0,0],"rgb(150,50,50)");

// Player?
function makeCube(pos,size,color = "#FFF"){
    let cube = document.createElement("div");
    cube.className = "cube";
    cube.style.transform = `translateX(${pos[0]}px) translateY(${pos[1]}px) translateZ(${pos[2]}px)`;
    let styling = `translateZ(${size/2}px); height: ${size}px; width: ${size}px; background-color: ${color};`;
    cube.innerHTML = `<div class="cube__face" style="transform: rotateY(0deg) ${styling}"></div>
    <div class="cube__face" style="transform: rotateY(180deg) ${styling}"></div>
    <div class="cube__face" style="transform: rotateY(90deg) ${styling}"></div>
    <div class="cube__face" style="transform: rotateY(-90deg) ${styling}"></div>
    <div class="cube__face" style="transform: rotateX(90deg) ${styling}">Top</div>
    <div class="cube__face" style="transform: rotateX(-90deg) ${styling}"></div>`;
    let cubeObj = new gameObject();
    cubeObj.color = color;
    cubeObj.position = pos;
    cubeObj.size = size;
    cubeObj.object = cube;
    cube.addEventListener("mouseenter", () => {
        //todo
    });
    scene.appendChild(cube);
    objectList.push(cubeObj);
    return cubeObj;
}
var plr = makeCube([0,0,0],50,"rgb(100,100,200)")
var speed = 5;
var keys = [0,0,0];
var cooldowns = [false,false,false,false]
var grounded = true;
window.addEventListener('keydown', (e) => {
    switch (e.key){
        case "d":
            if (cooldowns[0]) {return;}
            cooldowns[0] = true
            keys[1] += speed;
            break;
        case "a":
            if (cooldowns[1]) {return;}
            cooldowns[1] = true
            keys[1] -= speed;
            break;
        case "w":
            if (cooldowns[2]) {return;}
            cooldowns[2] = true
            keys[0] += speed;
            break;
        case "s":
            if (cooldowns[3]) {return;}
            cooldowns[3] = true
            keys[0] -= speed;
            break;
        case "ArrowDown":
            keys[2] = -0.01;
            break;
        case "ArrowUp":
            keys[2] = 0.01;
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.key){
        case "d":
            if (!cooldowns[0]) {return;}
            cooldowns[0] = false
            keys[1] -= speed;
            break;
        case "a":
            if (!cooldowns[1]) {return;}
            cooldowns[1] = false
            keys[1] += speed;
            break;
        case "w":
            if (!cooldowns[2]) {return;}
            cooldowns[2] = false
            keys[0] -= speed;
            break;
        case "s":
            if (!cooldowns[3]) {return;}
            cooldowns[3] = false
            keys[0] += speed;
            break;
        case "ArrowDown":
            keys[2] = 0;
            break;
        case "ArrowUp":
            keys[2] = 0;
    }
});

document.body.onclick = function(){
    document.body.requestPointerLock().catch(e => {});
};

document.body.addEventListener("mousemove", e=>{
    camRot[0] -= e.movementY/5;
    camRot[1] += e.movementX/5;
})


/*
local re = {}

function getPlane(obj)
	local sides = (obj.Size.X <= obj.Size.Z and obj.Size.X <= obj.Size.Y) and {obj.Size.Y,obj.Size.Z} or (obj.Size.Y <= obj.Size.Z and obj.Size.Y <= obj.Size.X) and {obj.Size.Z, obj.Size.X} or {obj.Size.Z,obj.Size.Y}

	
	table.insert(re,string.format("makePlane([%s,%s,%s],[%s,%s],[%s,%s,%s],'%s');",
		obj.Position.X*10,-obj.Position.Y*10,obj.Position.Z*10, -- position
		sides[1]*10, sides[2]*10, -- size 
		-obj.Rotation.X,-obj.Rotation.Y,-obj.Rotation.Z, -- rotation
		string.format("rgba(%s,%s,%s,%s)",obj.Color.R*255,obj.Color.G*255,obj.Color.B*255,1-obj.Transparency))) -- color
end

function getPart(obj)
	table.insert(re,string.format("makePart([%s,%s,%s],[%s,%s,%s],[%s,%s,%s],'%s');",
		obj.Position.X*10,-obj.Position.Y*10,obj.Position.Z*10, -- position
		obj.Size.X*10, obj.Size.Y*10, obj.Size.Z*10, -- size
		180-obj.Rotation.X, 180-obj.Rotation.Y, 180-obj.Rotation.Z, -- rotation
		string.format("rgba(%s,%s,%s,%s)",obj.Color.R*255,obj.Color.G*255,obj.Color.B*255,1-obj.Transparency))) -- color
end

--makePart([0,-150,0],[0,0,0],[100,50,50])

for i,obj in workspace.Objects:GetDescendants() do 
	if obj:IsA("BasePart") then 
		--[[if obj.Size.X < 0.3 or obj.Size.Y < 0.3 or obj.Size.Z < 0.3 then 
			getPlane(obj)
		else]]
			getPart(obj)
		--end
	end
end

for i = 1, #re,500 do 
	local a = Instance.new("StringValue",script)
	a.Name = tostring(math.round(i/500))
	a.Value = table.concat(re,'\n',i,(#re > i+500 and i+500 or #re))
end
--(table.concat(re,'\n').."\n")
--script.Parent.code.Value = table.concat(re,'\n')..'\n'*/


// Camera movement
// will make it moveable in the future
camRot = [-45,90,1.25]
function update(){
    setTimeout(()=>{
        camRot[2] += keys[2]
        plr.object.style.transform = `translateX(${plr.position[0]}px) translateY(${plr.position[1]}px) translateZ(${plr.position[2]}px) rotateY(${-camRot[1]}deg)`;
        scene.style.transform = `scale(${camRot[2]}) perspective(1000px) rotateX(${camRot[0]}deg) rotateY(${camRot[1]}deg) translateX(${-plr.position[0]-25*Math.sin((camRot[1]+90) / 180 * Math.PI)}px) translateZ(${-plr.position[2]-25*-Math.cos((camRot[1]+90) / 180 * Math.PI)}px)`;
        // keys[0] fw/bw
        // keys[1] l/r
        plr.position[0] += keys[1] * Math.cos(camRot[1] / 180 * Math.PI) - keys[0] * Math.cos((camRot[1]+90) / 180 * Math.PI);
        plr.position[2] += keys[1] * Math.sin(camRot[1] / 180 * Math.PI) - keys[0] * Math.sin((camRot[1]+90) / 180 * Math.PI);
        /*let faces = document.getElementsByClassName('cube__face')
        objectList.forEach((v,i) => {
            if (Math.abs(Math.sqrt(plr.position[0]^2+plr.position[1]^2+plr.position[2]^2) - Math.sqrt(v.position[0]^2+v.position[1]^2+v.position[2]^2))/100 > 0.25){
                for (let i = 0; i < v.object.children.length; i++){
                    v.object.children[i].style.opacity = 0
                }
            }else{
                for (let i = 0; i < v.object.children.length; i++){
                    v.object.children[i].style.opacity = 1
                }
            }
        });*/
        update();
    },5);
}

update();