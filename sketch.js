

let IArray = [];
let img1, img2, img3, img4, img5, img6;
let pictures = [];
let draggingImage = null; 

function preload() {
  img1 = loadImage('images/bayanihan emplacement.png');
  img2 = loadImage('images/butterfly fence.jpg');
  img3 = loadImage('images/igorot idol.jpg');
  img4 = loadImage('images/jeje bro.jpg');
  img5 = loadImage('images/nuez leon.jpg');
  img6 = loadImage('images/water symbols.jpg');   
  
  IArray = [img1, img2, img3, img4, img5, img6];
  
}




function setup() {

  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < IArray.length; i++)
  {
      let x = random(100, windowWidth - 100);
      let y = random(100, windowHeight - 100);
      let pic = IArray[i];
      pictures[i] = new Picture(x, y, pic);
      console.log(pictures);
      

  }

}

function draw() {
  background(255);
  Drawline();
  for (i = 0; i < pictures.length; i ++)
  {
      
    pictures[i].show();
      
  }
  
    
}



function Drawline()
{
  for (let i = 0; i < pictures.length; i++) {
    
    for (let j = i + 1; j < pictures.length; j++) { // Start from i+1 to avoid duplicates
      line(pictures[i].x + pictures[i].w / 2, pictures[i].y + pictures[i].h / 2,
           pictures[j].x + pictures[j].w / 2, pictures[j].y + pictures[j].h / 2);
    }
  }
}

function mouseDragged()
{


  for (i = 0; i < pictures.length; i ++)
    {
      pictures[i].dragged();
      if(draggingImage){
        break;
      }
          
    }
    draggingImage = false

  }




class Picture {
  constructor(x, y, pic) {
    this.w = 200; 
    this.h = 200;
    this.x = x;
    this.y = y;
    this.pic = pic;
  }

  dragged()
  {
    let d = dist(mouseX, mouseY, this.x, this.y);
    if(d < this.w)
    {

      this.x = mouseX;
      this.y = mouseY;
      draggingImage = true;
      
      
    }
   
  }
  show(){

    image(this.pic,this.x, this.y, this.w, this.h);

  }

}




