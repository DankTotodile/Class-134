objects = [];
stat = "";
img = "";
r = 0;
g = 0;
b = 0;
function preload()
{

}
function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
    img = createCapture(VIDEO);
    img.hide();
}
function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting";
     
}
function modelLoaded()
{
    console.log('Model has been loaded succesfully');
    stat = "true";
}
function gotResults(error, results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        objects = results;

    }
}
function draw()
{   
    image(img, 0, 0, 380, 380);
    if(stat != "")
    {
    objectDetector.detect(img, gotResults);
    for(var i=0; i<objects.length; i++)
    {
    document.getElementById("status").innerHTML = "Status: "+objects.length+" objects detected";
    r = random(255);
    g = random(255);
    b = random(255);
    fill(r, g, b);
    stroke(r, g, b);
    noFill();
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    per = floor(objects[i].confidence*100);
    obj = objects[i].label+" "+per+"%";
    text(obj, objects[i].x, objects[i].y);
    }
    }
}