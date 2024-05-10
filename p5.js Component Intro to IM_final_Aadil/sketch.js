
let Val2;
let left_s = 0;//default
let right = 0;
let Val1= 8;//default - 8
let speedMode = 'h';
let menu = 1;
let Val1_prev=0;

let time_of_last_pat = 0;
let time_of_last_hit=0;

let special_menu_display =0 ;
let special_menu_start=0;

let full_flag = false;


function preload(){
  font1 = loadFont("fonts/Hartford.ttf");
  font2 = loadFont("fonts/Artfully Regular.ttf");
  font3 = loadFont("fonts/Sportfield Varsity Stacked.ttf");
  font4 = loadFont("fonts/Noteworthy Bold.ttf");
  font5 = loadFont("fonts/NoteToSelf-Regular.ttf")
  Octopus_start = loadImage("Images/octopus1.png");
  Oct_happy_speed = loadImage("Images/Oct_Happy_Speed.jpeg");
  Oct_sad_dark = loadImage("Images/Oct_Sad_dark.jpeg");
  Oct_hit_light = loadImage("Images/Oct_hitLight.jpeg");
  Oct_hit_normal= loadImage("Images/Oct_hit_Normal.jpeg");
  Oct_hit_dark= loadImage("Images/Oct_hit_dark.jpeg");
  Oct_light_vibe= loadImage("Images/Oct_light_vibe.jpeg");
  Oct_love_dark = loadImage("Images/Oct_love_dark.jpeg");
  Oct_love_normal = loadImage("Images/Oct_love_normal.jpeg");
  Oct_peace_normal= loadImage("Images/Oct_peace_normal.jpeg");
  Oct_love_light = loadImage("Images/Oct_love_light.jpeg");
  Oct_hi = loadImage("Images/Octopus_hello.png");
  Oct_intro = loadSound("Sounds/Octopus_Trimmed.mp3");
  sad_music = loadSound("Sounds/Sad_piano.mp3");
  light_vibe=loadSound("Sounds/vibe_music.mp3");
  peace_music=loadSound("Sounds/Peace_trimmed.mp3");
  loved_music=loadSound("Sounds/loved_music.mp3");
  
  
}

function loaded() {
  Oct_intro.setLoop(false);
  Oct_intro.playmode('restart');
  
  sad_music.setLoop(false);
  sad_music.playmode('restart');

  light_vibe.setLoop(false);
  light_vibe.playmode('restart');
  
  peace_music.setLoop(false);
  peace_music.playmode('restart');
  
  
  loved_music.setLoop(false);
  loved_music.playmode('restart');
  
  
}
function setup() {
  createCanvas(400, 400);
  /*testString = "s";
  testStringC = split(testString,",")[0];*/
  
}

function draw() {
  Oct_intro.setVolume(1);
  peace_music.setVolume(1);
  loved_music.setVolume(1);
  light_vibe.setVolume(1);
  background('#0C0214');
  width_mapped = width;
  height_mapped = height;
  if (!serialActive) {
    display_instructions()
    //text(testStringC,20,60);
  } else {
  display_condition(menu);
  //text("Connected", 20, 30);
  //text(left_s,20,40);
  //text(Val1,20,70);
        
  
        
    //}
}
}


function keyPressed() {
  if (key == " ") {
    // important to have in order to start the serial connection!!
    setUpSerial();
    
  }
  if(key == 'f'){
    fullscreen(true);
    full_flag = true;
    resizeCanvas(windowWidth,windowHeight);
    
  }
  if(key == 'e'){
    fullscreen(false);
    full_flag= false;
    resizeCanvas(400,400);
  }
  if(keyCode === 16 ){ //Press Shift{
    if(menu === 2 || menu ===3 || menu===4 || menu===10){
      stopAllSounds();
      sad_music.play();
    }
    else if(menu === 5 || menu===6 || menu===7){
      stopAllSounds();
      loved_music.play();
    }
    else if(menu ===8){
      stopAllSounds();
      light_vibe.play();
    }
    else if(menu ===9){
      stopAllSounds();
      peace_music.play();
    }
  }
  if(keyCode === 18){
    if(menu === 5 || menu === 6 || menu === 7 || menu === 8 || menu === 9){
      stopAllSounds();
      Oct_intro.play();
    }
  }
  
   if (keyCode === UP_ARROW && speedMode == 's') {
    console.log('w');
    left_s=1;
  } else if (keyCode === LEFT_ARROW && speedMode == 's') {
    console.log('a');
    left_s=2;
  } else if (keyCode === DOWN_ARROW && speedMode == 's') {
    console.log('s');
    left_s=3;
  } else if (keyCode === RIGHT_ARROW && speedMode == 's') {
    console.log('d');
    left_s =4;
  }
   else if (keyCode === UP_ARROW && speedMode == 'h') {
    console.log('W');
    left_s=5;
  } else if (keyCode === LEFT_ARROW && speedMode == 'h') {
    console.log('A');
    left_s=6;
  } else if (keyCode === DOWN_ARROW && speedMode == 'h') {
    console.log('S');
    left_s=7;
  } else if (keyCode === RIGHT_ARROW && speedMode == 'h') {
    console.log('D');
    left_s =8;
  }
  else if (key == 't'){
    left_s=9;
  }

}

// This function will be called by the web-serial library
// with each new *line* of data. The serial library reads
// the data until the newline and then gives it to us through
// this callback function
function readSerial(data) {
  ////////////////////////////////////
  //READ FROM ARDUINO HERE
  ////////////////////////////////////
  
  //arduino will send photosensor
  if (data != null) {
    // make sure there is actually a message
    // split the message
    let fromArduino = split(trim(data), ",");
    // if the right length, then proceed
    if (fromArduino.length == 2) {
      // only store values here
      // do everything with those values in the main draw loop
      
      // We take the string we get from Arduino and explicitly
      // convert it to a number by using int()
      // e.g. "103" becomes 103
      Val1 = int(fromArduino[0]);
      //alpha = int(fromArduino[1]);
    }
    //////////////////////////////////
    //SEND TO ARDUINO HERE (handshake)
    //////////////////////////////////
    let sendToArduino = left_s + "," + right + "\n";
    writeSerial(sendToArduino);
  }
  
    
}

function displayStartingScreen(){
  if(full_flag == false){
  //Display starting screen
    push();
    let numBoxes = 80;
    let boxHeight = height / numBoxes;
  
  for (let i = 0; i < numBoxes; i++) {
    let yOffset = i * boxHeight;
    
    // Calculate the color based on the depth
    let shade = map(yOffset, 0, height, 255, 100);
    fill(shade-70, shade-15, shade);
    stroke(255);
    strokeWeight(0);
    
    // Draw the box
    rect(-20, yOffset, 440, boxHeight, 10);
  }
    pop();
    push();
    textSize(height/4 - height/40);
    textFont(font3);
    text("Interactive \n Mr Octopus" ,width/2  -160,height/2 -100);
    textFont(font4);
    textSize(height/20);
    text("- By Aadil Chasmawala",width/2 -160 , height /2 +80);
    fill(255,120);
    textSize(15);
    text("Click on Octopus image to start :",width/2 -140 , height /2 +120);
    image(Octopus_start,width/2+70,height/2+70,100,100);
    pop();
  }
  else{
    //Display starting screen
    push();
    let numBoxes = 200;
    let boxHeight = height / numBoxes;
  
  for (let i = 0; i < numBoxes; i++) {
    let yOffset = i * boxHeight;
    
    // Calculate the color based on the depth
    let shade = map(yOffset, 0, height, 255, 100);
    fill(shade-70, shade-15, shade);
    stroke(255);
    strokeWeight(0);
    
    // Draw the box
    rect(-20, yOffset, 2000, boxHeight, 10);
  }
    pop();
    push();
    textSize(height/4 - height/40);
    textFont(font3);
    text("Interactive \n Mr Octopus" ,width/2  -500,height/2 -200 );
    textFont(font4);
    textSize(height/20);
    text("- By Aadil Chasmawala",width/2 -160 , height /2 +200);
    fill(255,120);
    textSize(25);
    text("Click on Octopus Image to start :",width/2 -140 , height /2 +290);
    image(Octopus_start,width/2+70,height/2+300,100,100);
    pop();
  }
}

function display_condition(menu){
  //stopAllSounds();
  if (menu==1){
    displayStartingScreen();
    //console.log(full_flag);
    if(full_flag==false){
    if(mouseIsPressed && mouseX > width/2 + 70 && mouseX < width/2 + 170 && mouseY > height/2 +70 && mouseY < height/2 + 170 ){
    // Execute the desired action when Octopus image is clicked
      //display_instructions();
    
     switch_image();
  }
}
    else{
      if(mouseIsPressed && mouseX > width/2 +70 && mouseX < width/2 + 170 && mouseY > height/2 +300 && mouseY < height/2 + 400 ){
        switch_image();
      }
    }
    
  }
  else if(menu==2){
    if(full_flag == false){
    image(Oct_hit_light,0,0,400,400);
    push();
    textFont(font5);
    textSize(30);
    text("Octopus is in pain , and \nthe light is too bright",20,30);
    //image(Oct_hi,350,350,50,50);
    if(mouseIsPressed){
      stopAllSounds();
      sad_music.play();
    }
    
    pop();
    }
    else{
    image(Oct_hit_light,285,0,960,1280);
    push();
    textFont(font5);
    textSize(60);
    text("Octopus is in pain , and \nthe light is too bright ",420,100);
    if(mouseIsPressed){
      stopAllSounds();
      sad_music.play();
    }
    pop();
    }
    switch_image();
    
  }
  else if(menu==3){
    if(full_flag == false){
    image(Oct_hit_dark,0,0,400,400);
    push();
    textFont(font5);
    textSize(20);
    fill(255);
    text("Octopus is hurt, it cannot \ndefend itself when it is dark",20,30);
    if(mouseIsPressed){
      stopAllSounds();
      sad_music.play();
    }
    pop();
    }
    else{
    image(Oct_hit_dark,285,0,960,1280);
    push();
    textFont(font5);
    textSize(30);
    fill(255);
    text("Octopus is hurt, it cannot \ndefend itself when it is dark",420,100);
    if(mouseIsPressed){
      stopAllSounds();
      sad_music.play();
    }
    pop();
    }
    switch_image();
  }
   else if(menu==4){
    if(full_flag == false){
    image(Oct_hit_normal,0,0,400,400);
    push();
    textFont(font5);
    textSize(30);
    text("Octopus is in pain because \n you injured it",20,30);
    if(mouseIsPressed){
      stopAllSounds();
      sad_music.play();
    }
    pop();
    }
    else{
    image(Oct_hit_normal,285,0,960,1280);
    push();
    textFont(font5);
    textSize(60);
    text("Octopus is in pain because \n you injured it",420,100);
    //main_music=sad_music; 
    if(mouseIsPressed){
      stopAllSounds();
      sad_music.play();
    }
    pop();
    }
    switch_image();
  }
   else if(menu==5){
    if(full_flag == false){
    image(Oct_love_dark,0,0,400,400);
    push();
    textFont(font5);
    textSize(20);
    fill('red');
    text("Its dark but Octopus feels loved",20,30);
    image(Oct_hi,350,350,50,50);
    if(mouseIsPressed && mouseX>350 && mouseX<400 && mouseY>350 && mouseY<400 ){
      stopAllSounds();
      Oct_intro.play();
    }
    else if (mouseIsPressed && !(mouseX>350 && mouseX<400 && mouseY>350 && mouseY<400 )){
      stopAllSounds();
      loved_music.play();
    }
    pop();
    }
    else{
    image(Oct_love_dark,285,0,960,1280);
    push();
    textFont(font5);
    textSize(50);
    fill('red');
    text("Its dark but Octopus feels loved",420,100);
    image(Oct_hi,1140,850,100,100);
    if(mouseIsPressed && mouseX>1140 && mouseX<1240 && mouseY>850 && mouseY<950 ){
      stopAllSounds();
      Oct_intro.play();
    }
    else if (mouseIsPressed && !(mouseX>1140 && mouseX<1240 && mouseY>850 && mouseY<950)){
      stopAllSounds();
      loved_music.play();
    }
    pop();
    }
    switch_image();
  }
   else if(menu==6){
    if(full_flag == false){
    image(Oct_love_light,0,0,400,400);
    push();
    textFont(font5);
    textSize(30);
    text("Octopus Feels Loved and \nVibes with the extra light",20,30);
    image(Oct_hi,350,350,50,50);
      if(mouseIsPressed && mouseX>350 && mouseX<400 && mouseY>350 && mouseY<400 ){
      stopAllSounds();
      Oct_intro.play();
    }
    else if (mouseIsPressed && !(mouseX>350 && mouseX<400 && mouseY>350 && mouseY<400 )){
      stopAllSounds();
      loved_music.play();
    }
    pop();
    }
    else{
    image(Oct_love_light,285,0,960,1280);
    push();
    textFont(font5);
    textSize(60);
    text("Octopus Feels Loved and \n Vibes with the extra light",420,100);
    image(Oct_hi,1140,850,100,100);
    if(mouseIsPressed && mouseX>1140 && mouseX<1240 && mouseY>850 && mouseY<950 ){
      stopAllSounds();
      Oct_intro.play();
    }
    else if (mouseIsPressed && !(mouseX>1140 && mouseX<1240 && mouseY>850 && mouseY<950)){
      stopAllSounds();
      loved_music.play();
    }
    pop();
    }
    switch_image();
  }
   else if(menu==7){
     
    //text("Octopus feels happy and loved",20,20);
    if(full_flag == false){
    image(Oct_love_normal,0,0,400,400);
    push();
    textFont(font5);
    textSize(28);
    text("Octopus feels happy and loved",20,30);
    image(Oct_hi,350,350,50,50);
    
    if(mouseIsPressed && mouseX>350 && mouseX<400 && mouseY>350 && mouseY<400 ){
      stopAllSounds();
      Oct_intro.play();
    }
    else if (mouseIsPressed && !(mouseX>350 && mouseX<400 && mouseY>350 && mouseY<400 )){
      stopAllSounds();
      loved_music.play();
    }
    
    pop();
    }
    else{
    image(Oct_love_normal,285,0,960,1280);
    push();
    textFont(font5);
    textSize(60);
    text("Octopus feels happy and loved",420,100);
    image(Oct_hi,1140,850,100,100);
    if(mouseIsPressed && mouseX>1140 && mouseX<1240 && mouseY>850 && mouseY<950 ){
      stopAllSounds();
      Oct_intro.play();
    }
    else if (mouseIsPressed && !(mouseX>1140 && mouseX<1240 && mouseY>850 && mouseY<950)){
      stopAllSounds();
      loved_music.play();
    }
    pop();
    }
    switch_image();
  }
   else if(menu==8){
    if(full_flag == false){
    image(Oct_light_vibe,0,0,400,400);
    push();
    textFont(font5);
    textSize(28);
    text("Too much light, Octopus vibes",20,30);
    image(Oct_hi,350,350,50,50);
     if(mouseIsPressed && mouseX>350 && mouseX<400 && mouseY>350 && mouseY<400 ){
      stopAllSounds();
      Oct_intro.play();
    }
    else if (mouseIsPressed && !(mouseX>350 && mouseX<400 && mouseY>350 && mouseY<400 )){
      stopAllSounds();
      light_vibe.play();
    }
    pop();
    }
    else{
    image(Oct_light_vibe,285,0,960,1280);
    push();
    textFont(font5);
    textSize(60);
    text("Too much light, Octopus vibes",420,100);
    image(Oct_hi,1140,850,100,100);
    if(mouseIsPressed && mouseX>1140 && mouseX<1240 && mouseY>850 && mouseY<950 ){
      stopAllSounds();
      Oct_intro.play();
    }
    else if (mouseIsPressed && !(mouseX>1140 && mouseX<1240 && mouseY>850 && mouseY<950)){
      stopAllSounds();
      light_vibe.play();
    }
    pop();
    }
    switch_image();
  }
  else if(menu==9){
    
    if(full_flag == false){
    image(Oct_peace_normal,0,0,400,400);
    push();
    textFont(font5);
    textSize(30);
    text("Octopus is feeling peaceful",20,30);
    image(Oct_hi,350,350,50,50);
     if(mouseIsPressed && mouseX>350 && mouseX<400 && mouseY>350 && mouseY<400 ){
      stopAllSounds();
      Oct_intro.play();
    }
    else if (mouseIsPressed && !(mouseX>350 && mouseX<400 && mouseY>350 && mouseY<400 )){
      stopAllSounds();
      peace_music.play();
    }
    pop();
    }
    else{
    image(Oct_peace_normal,285,0,960,1280);
    push();
    textFont(font5);
    textSize(60);
    text("Octopus is feeling peaceful",420,100);
    image(Oct_hi,1140,850,100,100);
    if(mouseIsPressed && mouseX>1140 && mouseX<1240 && mouseY>850 && mouseY<950 ){
      stopAllSounds();
      Oct_intro.play();
    }
    else if (mouseIsPressed && !(mouseX>1140 && mouseX<1240 && mouseY>850 && mouseY<950)){
      stopAllSounds();
      peace_music.play();
    }
    pop();
    }
    switch_image();
  }
  else if(menu==10){
    
    if(full_flag == false){
    image(Oct_sad_dark,0,0,400,400);
    push();
    textFont(font5);
    textSize(20);
    fill(255);
    text("Octopus is feeling sad.It is not loved and \n there is no light",20,30);
    pop();
    }
    else{
    image(Oct_sad_dark,285,0,960,1280);
    push();
    textFont(font5);
    fill(255);
    textSize(50);
    text("Octopus is feeling sad.It is not loved \nand there is no light",420,100);
    pop();
    }
    switch_image();
    
  }
  else if(menu==11){
    special_menu_start =millis();
    while(millis() -  special_menu_start >= 5000){
    if(full_flag == false){
    image(Oct_happy_speed,0,0,400,400);
    push();
    textFont(font5);
    textSize(30);
    text("Octopus loves speed",20,30);
    pop();
    }
    else{
    image(Oct_happy_speed,285,0,960,1280);
    push();
    textFont(font5);
    textSize(60);
    text("Octopus loves speed",420,100);
    pop();
    }
    }
    switch_image();
  }
}

function switch_image(){
   if (Val1 == 1) {
      // Trigger squeeze sketch (hit on light mode)
          menu=2;
        }
    else if (Val1 == 2) {
          // Trigger squeeze sketch on darkness mode
          menu=3;
        }
    else if (Val1 == 3) {
          // Trigger squeeze
          menu=4;
    }
    else if (Val1 == 4) {
          // Trigger love but dark background
          menu=5;
    }
    else if (Val1 == 5) {
          // Trigger love but light background
          menu=6;
    }
    else if (Val1 == 6) {
          // Trigger peace sketch with love\
          //stopAllSounds();
          //peace_music.play();
          menu=7;
    }
    else if (Val1 == 7) {
          // Trigger light background
          menu=8;
    }
    else if (Val1 == 8) {
          // Neutral (peace sketch on normal background which will change to bored sketch after some time)
          
          
          menu=9;
    }
    else if (Val1 == 9) {
          // No love in dark background (Sad)
          menu=10;
    }

}

function display_instructions(){
  if(full_flag==false){
  push();
  textSize(20);
  textFont(font4);
  fill(255);
  stroke(2);
  text("Instructions\n:READ THE BELOW INSTRUCTIONS\n CAREFULLY",20,40)
  textSize(12);
  textFont(font5);
  text("(1) Press spacebar to activate the serial port ",20,130);
  text("(2) Use Arrrow keys to move Mr Octopus",20,160);
  text("(3) Press the option button on keyboard to hear introduction ",20,190);
  text("(4) Interact with the octopus physically to see changes ",20,220)
  text("(5) To stop , press the down arrow followed by\n the right or left arrow keys",20,250);
  text("(6) Press 'f' to enter fullscreen",20,310);
  text("(7) Press Shift to hear the sound effect",20,340);
  
  text("(8)Now, press spacebar and set up serial connection to\nusb modem to continue",20,370);
  pop();
  }
  else{
      push();
  textSize(40);
  textFont(font4);
  fill(255);
  stroke(2);
  text("Instructions\n:READ THE BELOW INSTRUCTIONS\n CAREFULLY",200,40)
  textSize(30);
  textFont(font5);
  text("(1) Press spacebar to activate the serial port ",200,230);
  text("(2) Use Arrrow keys to move Mr Octopus",200,280);
  text("(3) Press the option button on keyboard to hear introduction ",200,330);
  text("(4) Interact with the octopus physically to see changes ",200,380)
  text("(5) To stop , press the down arrow followed by\n the right or left arrow keys",200,430);
  text("(6) Press 'f' to enter fullscreen",200,510);
  text("(7) Press Shift to hear the sound effect",200,560);
  text("(8)Now, press spacebar and set up serial connection to\nusb modem to continue",200,610);
  pop();
  }
  
}

function stopAllSounds(){
  Oct_intro.stop();
  sad_music.stop();
  light_vibe.stop();
  peace_music.stop();
  loved_music.stop();
}
