function rdm (max){
    return Math.floor(Math.random()*(max +1));
};
function random ( min, max, floor){
    if (floor) return Math.floor((Math.random()*(max - min + 1)) + min);
    return (Math.random()*(max - min)) + min;
};
function rdmAround (x, floor){
    if (floor) return Math.floor( Math.random()* x * 2 - x )
    return Math.random()* x * 2 - x;
}
function write (input){
    console.log('%c' +  JSON.stringify(input), 'color: #8BF');
    return void 0;
};
function error (input){
    console.log('%c' + JSON.stringify(input), 'color: #F54;');
    return void 0;
};
function $ (id){
    return document.getElementById(id);
};
function randomColor (){
    return `hsl( ${rdm(360)}, ${random( 20, 70, true)}%, 50%)`;
};

let container = $('container');
let canvas = $('canvas');
let c = canvas.getContext('2d');
let width = container.clientWidth;
let height = container.clientHeight;
let fps = 200;
let res = 50;
let xShift = 0;
let yShift = 0;
let size = 50;
let selected = 'H'

canvas.width = width;
canvas.height = height;

c.fillStyle = '#CCC';
c.strokeStyle = '#CCC';

let mouse = {
    x: width/2,
    y: height/2,
    z: false
};
canvas.addEventListener( 'mousemove', ( event)=>{
    mouse.x = event.x;
    mouse.y = event.y;
});
canvas.addEventListener( 'mousedown', ()=>{
    mouse.z = true;
});
canvas.addEventListener( 'mouseup', ()=>{
    mouse.z = false;
});

let atoms = {
    C: {
        name: 'Carbon',
        formula: 'C',
        bonds: 4,
        style: '#444',
    },
    O: {
        name: 'Oxygen',
        formula: 'O',
        bonds: 2,
        style: '#f34',
    },
    H: {
        name: 'Hydrogen',
        formula: 'H',
        bonds: 1,
        style: '#46f',
    },
    Cl: {
        name: 'Chlore',
        formula: 'Cl',
        bonds: 1,
        style: '#8b8',
    },
    F: {
        name: 'Fluorine',
        formula: 'F',
        bonds: 1,
        style: '#8b8',
    },
    Br: {
        name: 'Bromine',
        formula: 'Br',
        bonds: 1,
        style: '#8b8',
    },
    I: {
        name: 'Iodine',
        formula: 'I',
        bonds: 1,
        style: '#8b8',
    },
    null: {
        name: 'null',
        formula: 'null',
        bonds: 0,
        style: '#161617',
    }
};
class Atom {
    constructor(formula){
        if ( atoms[formula] != undefined ){
            this.name = atoms[formula].name;
            this.bonds = atoms[formula].bonds;
            this.style = atoms[formula].style;
            this.formula = atoms[formula].formula;
        };
    };
};
let tool = 'atom'
$('components').innerHTML += `
    <div id="tools">
        <div id="toolsSelector">TOOLS</div>
        <div class="tool" id="horizontalTool">_</div>
        <div class="tool" id="verticalTool">|</div>
        <div class="tool" id="atomTool">C</div>
    </div
`
for ( let i in atoms ){
    $('components').innerHTML += `
    <div class="componentSelector" id="${atoms[i].name}">
        <div class="componentName" >${atoms[i].name}</div>
            <div>
                <div class="componentFormula">${atoms[i].formula}</div>
                -
                <div class="bonds">${atoms[i].bonds}</div>
            </div>
    </div>`
};

class Object {
    
//for a quad    x, y,  'quad',  width, height (square or rectangle)
//for a circle  x, y, 'circle', radius, angle( in radians )

    constructor(x, y, type, a, b, srokeStyle, fillStyle) {
        
        this.x = x;
        this.y = y;

        this.vx = 0;
        this.vy = 0;

        this.type = type;

        switch (this.type) {
            case 'quad':{
                this.w = a;
                this.h = b;
                break
            }
            case 'circle':{
                this.r = a;
                this.a = b;
                break
            }
            case 'fillCircle':{
                this.r = a;
                this.a = b;
                break
            }
        }

        this.srokeStyle = srokeStyle;
        this.fillStyle = fillStyle;

        this.render = ()=>{

            c.strokeStyle = this.srokeStyle;
            c.fillStyle = this.fillStyle;

            switch (this.type) {
                case 'quad': {
                    c.fillRect(this.x, this.y, this.w, this.h);
                    break;
                }
                case 'circle': {
                    c.beginPath();
                    c.arc(this.x, this.y, this.r, 0, this.a, false);
                    c.stroke();
                    break;
                }
                case 'fillCircle': {
                    c.beginPath();
                    c.arc(this.x, this.y, this.r, 0, this.a, false);
                    c.fill();
                    c.stroke();
                    break;
                }

            }
        }

        this.update = ()=>{
            this.x += this.vx
            this.y += this.vy
        }
    }
};


let cursorCircle = new Object( width/2, height/2, 'circle', 8, 8, 'white', 'white');
let hue = 0;

function loop(){
//     --loop--
    setTimeout(() => {
        requestAnimationFrame(loop);
    }, 1000 / fps);
    c.clearRect( 0, 0, width, height);

//   --updates--
    width = container.clientWidth;
    height = container.clientHeight;
    if ( canvas.width != width | canvas.height != height ){
        canvas.width = width;
        canvas.height = height;
    };
    //
    gloabl = {}
    for ( let i = 0 ; i < atomsArr.length ; i++ ){
        for ( let a = 0 ; a < atomsArr[i].length ; a++ ){
            c.beginPath();
            c.fillStyle = atomsArr[i][a].style;
            c.arc(i*res+xShift, a*res+yShift, res/3, 0, 8);
            c.fill();
            c.fillStyle = '#ccc';
            c.stokeStyle = '#ccc';
            if ( atomsArr[i][a].formula == 'null' ) continue
            if ( gloabl[atomsArr[i][a].formula] == null ) gloabl[atomsArr[i][a].formula] = 1
            else gloabl[atomsArr[i][a].formula]++
        };
    };
    formula.innerHTML = ''
    for ( let i in gloabl ){
        formula.innerHTML += i
        formula.innerHTML += gloabl[i] > 1 ? gloabl[i] : ''
    }
    let freeBonds = atomsArr.some( i => i.some( a => a.bonds));
    formula.style = freeBonds ? 'background-color: #c33;' : 'background-color: #395;';
    atomsArr.forEach(i => i.forEach( a => a.bonds = atoms[a.formula].bonds ));
    // lines
    for ( let i = 0 ; i < bondsArr.length ; i++ ){
        for ( let a = 0 ; a < bondsArr[i].length ; a++ ){
            if (!( a % 2 != 0 | i % 2 != 0 )|!( a % 2 != 1 | i % 2 != 1 )) continue
            switch (bondsArr[i][a]){
                case 0:{
                    //c.fillRect( i*res*0.5+xShift-1, a*res*0.5+yShift-1, 2, 2)
                    break
                }
                 case 1:{
                    c.fillRect( i*res*0.5+xShift-5, a*res*0.5+yShift-1, 10, 2);
                    break;
                 };
                 case 2:{
                    c.fillRect( i*res*0.5+xShift-5, a*res*0.5+yShift-1+2.5, 10, 2);
                    c.fillRect( i*res*0.5+xShift-5, a*res*0.5+yShift-1-2.5, 10, 2);
                    break;
                 };
                 case 3:{
                    c.fillRect( i*res*0.5+xShift-5, a*res*0.5+yShift-1+3.5, 10, 2);
                    c.fillRect( i*res*0.5+xShift-5, a*res*0.5+yShift-1-0, 10, 2);
                    c.fillRect( i*res*0.5+xShift-5, a*res*0.5+yShift-1-3.5, 10, 2);
                    break;
                 };
                 case 4:{
                    c.fillRect( i*res*0.5+xShift-1, a*res*0.5+yShift-5, 2, 10);
                    break;
                 };
                 case 5:{
                    c.fillRect( i*res*0.5+xShift+2.5, a*res*0.5+yShift-5, 2, 10);
                    c.fillRect( i*res*0.5+xShift-2.5, a*res*0.5+yShift-5, 2, 10);
                    break;
                 };
                 case 6:{
                    c.fillRect( i*res*0.5+xShift+3.5, a*res*0.5+yShift-5, 2, 10);
                    c.fillRect( i*res*0.5+xShift-0, a*res*0.5+yShift-5, 2, 10);
                    c.fillRect( i*res*0.5+xShift-3.5, a*res*0.5+yShift-5, 2, 10);
                    break;
                 };
                 default:{
                    break;
                 };
            }
        }
    }
    // custom cursor
    cursorCircle.x = mouse.x;
    cursorCircle.y = mouse.y;
    hue += 2;
    cursorCircle.fillStyle = `hsl(${hue}, 50%, 50%)`;
    cursorCircle.srokeStyle = `hsl(${hue}, 50%, 50%)`;
    //cursorCircle.render();
};

let formula = $('formula');
let atomsArr = [];
for ( let i = 0 ; i < size ; i++ ){
    atomsArr.push([]);
    for ( let a = 0 ; a < size ; a++ ){
        atomsArr[i].push(new Atom(null));
    };
};
let bondsArr = [];
for ( let i = 0 ; i < size*2-1 ; i ++){
    bondsArr.push([]);
    for ( let a = 0 ; a < size*2-1 ; a++ ){
        bondsArr[i].push(0);
    };
};
atomsArr[2][2] = new Atom('C');
atomsArr[3][2] = new Atom('O');
atomsArr[2][1] = new Atom('O');

$('horizontalTool').addEventListener( 'click', ()=>{
    tool = 'horizontal'
})
$('verticalTool').addEventListener( 'click', ()=>{
    tool = 'vertical'
})
$('atomTool').addEventListener( 'click', ()=>{
    tool = 'atom'
})

canvas.addEventListener( 'click', (event)=>{
    if ( tool == 'atom' ){
        let x = Math.floor((event.x-xShift)/res +0.5)
        let y = Math.floor((event.y-yShift)/res +0.5)
        if ( atomsArr[x] != undefined ){
            if ( atomsArr[x][y] != undefined ){
                atomsArr[x][y] = new Atom(selected)
            }
        }
    }
    if ( tool == 'vertical' ){
        let x = Math.floor((event.x-xShift)*2/res +0.5)
        let y = Math.floor((event.y-yShift)*2/res +0.5)
        if ( bondsArr[x][y] < 4 ){
            bondsArr[x][y] = 4
        } else {
            bondsArr[x][y]++
        }
        if ( bondsArr[x][y] == 7) {
            bondsArr[x][y] = 0
        }
    }
    if ( tool == 'horizontal' ){
        let x = Math.floor((event.x-xShift)*2/res +0.5)
        let y = Math.floor((event.y-yShift)*2/res +0.5)
        if ( bondsArr[x][y] > 3 | bondsArr[x][y] < 1 ){
            bondsArr[x][y] = 1
        } else {
            bondsArr[x][y]++
        }
        if ( bondsArr[x][y] == 4) {
            bondsArr[x][y] = 0
        }
    }
})
for ( let i in atoms ){
    $(atoms[i].name).addEventListener( 'click', ()=>{
        selected = i
    })
}

/*
0     .
1     -
2     --
3     ---
4     |
5     ||
6     |||
*/

loop()