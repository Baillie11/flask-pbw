const canvas = document.getElementById("result");
const ctx = canvas.getContext("2d");
//const originalName=""


function loadImage(event) {
  originalName=file.files[0].name;
  console.log ("file type: "+file.files[0].type);
  if (file.files[0].type=="image/jpeg" || file.files[0].type=="image/png") {
    const image = document.getElementById("imgDisplayed");
    image.src = URL.createObjectURL(event.target.files[0]);
    
    image.onload = function() {
    originalWidth=this.width;   
    originalHeight=this.height;
    //console.log("Orginal Width=" + originalWidth);
    //console.log("Orginal Height=" + originalHeight);
            
    document.getElementById("imWidth").value=this.width;
    document.getElementById("imHeight").value=originalHeight;

    prev();
  }

  }
  else if (file.files[0].type=="application/msword") {
    alert("Word file uploaded");
}
   




//const preview = document.getElementById("preview");
//preview.addEventListener("click", prev);


function prev() {
    const image = document.getElementById("imgDisplayed");
    const imWidth = document.getElementById("imWidth").value;
    const imHeight = document.getElementById("imHeight").value;
    //console.log("prev:imWidth=" + imWidth);
    //console.log("prev:imHeight=" + imHeight);

    canvas.width = imWidth;
    canvas.height = imHeight;

    ctx.drawImage(image, 0, 0, imWidth, imHeight);

   // form = document.querySelector("form");
   // form.reset();
}


const down = document.querySelector("#down");
down.addEventListener("click", downloadImage);

function downloadImage(){
    console.log(originalName);
  if(window.navigator.msSaveBlob) {
    window.navigator.msSaveBlob(canvas.msToBlob(), originalName);
    

  } else {
    
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.href = canvas.toDataURL();

    a.download = originalName;
    a.click();

    document.body.removeChild(a);
  }
  //This line clears the form and resets the canvas for the next image
  //window.location.reload();
}

//Read slider values
const slider = document.getElementById("myRange");
const output = document.getElementById("demo");
slider.oninput = function() {
output.innerHTML = slider.value;
console.log(slider.value);
//originalWidth=document.getElementById("imWidth").value;
//originalHeight=document.getElementById("imHeight").value;

iwidth = originalWidth/100*slider.value;
iheight = originalHeight/100*slider.value;

//console.log('Width: '+parseInt(iwidth));
//console.log('Height: '+parseInt(iheight));
document.getElementById("imWidth").value=parseInt(iwidth);
document.getElementById("imHeight").value=parseInt(iheight);

prev();
};
};