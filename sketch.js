
let TextArray = [];
let textfield;
let title;   
let p;  // paragraph variable 
let t;  //title variable
let textposX
let textPosY
let shouldImageMove, shouldWritingMove;
let button
let input;



let submit;
let pictures = [];
let draggingImage = false; 
let draggingWriting = false;



function setup() {
  
  createCanvas(windowWidth, windowHeight);
  textfield = select("#textfield");
  title = select("#title")
  submit = select("#submit");
  submit.mousePressed(newText);

  input = createFileInput(loadFile);
  input.position(windowWidth/1.5,50);


}

function loadFile(file)
{
  
  loadImage(file.data, fileLoaded);
  
  

  

}

function fileLoaded(data)
{
  let img = data;
  if (pictures.length === 0)
    {
      pictures[0] = new Picture(img, random(150, windowWidth - 150), random(150, windowHeight - 150))
    }
    else
    {
      let b = new Picture(img, random(150, windowWidth - 150), random(150, windowHeight - 150))
      pictures.push(b);
    }

}



function newText()
{
  p = textfield.value();
  t = title.value();
  console.log(textfield.elt.clientWidth);

  let h  = textfield.elt.clientHeight;
  let w = textfield.elt.clientWidth;

  let txt = {title: t, paragraph: p};
  if(TextArray.length === 0)
  {

    TextArray[0] = new Writing(txt, random(0, windowWidth - w), random(0, windowHeight - h), w, h);
  }
  else
  {
    let a = new Writing(txt, random(0, windowWidth - w), random(0, windowHeight -h), w, h);
    TextArray.push(a);
  }
  

}





function draw() {
  background(255);
  Drawline();
  for (i = 0; i < pictures.length; i ++)
  {
      
    pictures[i].show();
    
      
  }

  if(TextArray.length !== 0)
  {
    for(i = 0; i < TextArray.length; i++)
    {
      TextArray[i].show();
    }

  }


}







function Drawline()
{
  for (let i = 0; i < pictures.length; i++) {
    
    for (let j = i + 1; j < pictures.length; j++) { // Start from i+1 to avoid duplicates
      strokeWeight(0.5);
      stroke(126)
      line(pictures[i].x + pictures[i].w / 2, pictures[i].y + pictures[i].h / 2,
           pictures[j].x + pictures[j].w / 2, pictures[j].y + pictures[j].h / 2);
    }
  }

  for (let i = 0; i < TextArray.length; i++) {
    
    for (let j = 0; j < pictures.length; j++) { 
      strokeWeight(0.5);
      stroke(126)

      line(TextArray[i].posX + TextArray[i].w/2, TextArray[i].posY + TextArray[i].h/2,
           pictures[j].x + pictures[j].w / 2, pictures[j].y + pictures[j].h / 2);
    }
  }
}


function mouseReleased()
{
  shouldImageMove = true;
  shouldWritingMove = true;
}


function mouseDragged()
{

  if(shouldImageMove)
  {
    for (i = 0; i < pictures.length; i++)
    {
      pictures[i].dragged();
      if(draggingImage)
      {
        
        break;
        
 
        
      }
        
    }
    
    
  }
  draggingImage = false;

  if(shouldWritingMove)
  {
    for(i = 0; i < TextArray.length; i++)
    {
      TextArray[i].dragged();
      if(draggingWriting)
      {
        
        break;
        
          
      }
    }
    
    
  }
  draggingWriting = false;
  
}






class Picture {
  constructor(pic, x, y) {
    this.w = 200; 
    this.h = 200;
    this.x = x;
    this.y = y;
    this.pic = pic;
  }

  dragged()
  {
    let d = dist(mouseX, mouseY, this.x, this.y);
    if(d < this.w && !draggingWriting)
    {

      this.x = mouseX;
      this.y = mouseY;
      draggingImage = true;
      shouldWritingMove = false;
      
      
    }
   
  }
  show()
  {
    image(this.pic,this.x, this.y, this.w, this.h);
  }

}


class Writing
{
  constructor(txt, posX, posY, w, h)
  {
    this.txt = txt;
    this.posX = posX;
    this.posY = posY;
    this.w = w;
    this.h = h;

  }
  dragged()
  {
    let d = dist(mouseX, mouseY, this.posX, this.posY);
    if(d < 100 && !draggingImage)
    {

      this.posX = mouseX;
      this.posY = mouseY;
      draggingWriting = true;
      shouldImageMove = false;
    
      
      
    }
   
  }
  show()
  {
    fill(0);
    textSize(16);

    console.log(this.posX);
    console.log(this.posY);
    console.log(mouseX);
    console.log(mouseY);
    text(`${this.txt.title}: ${this.txt.paragraph}`, this.posX, this.posY,this.w, this.h);


  }
    
}









