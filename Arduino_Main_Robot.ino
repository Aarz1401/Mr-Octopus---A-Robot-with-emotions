#include <SoftwareSerial.h>
//Code for the Arduino on the main robot 
const int ain1Pin = 4;
const int ain2Pin = 7;
const int pwmAPin = 6;

const int bin1Pin = 9;
const int bin2Pin =10;
const int pwmBPin = 11;

const int photoresistorPin = A0; // Analog input pin for the first photoresistor
const int piezosensorPin = A1; // Analog input pin for the second photoresistor

int Piezo;
int Photo;

char commandWrite;


//const int pinForMp3 = 12;


int pwnVal = 255; //Analog value for the motors
unsigned long previousMillis = 0;
unsigned long previousAudioTime =0;
const long interval = 200; // Interval in milliseconds //This was
char command='n';

SoftwareSerial XBee(2, 3); // RX, TX

void setup() {
  XBee.begin(9600);
  //Serial.begin(9600);
  pinMode(ain1Pin, OUTPUT);
  pinMode(ain2Pin, OUTPUT);
  pinMode(pwmAPin, OUTPUT);
  pinMode(bin1Pin, OUTPUT);
  pinMode(bin2Pin, OUTPUT);
  pinMode(pwmBPin, OUTPUT);
  //pinMode(pinForMp3, OUTPUT);

}


void loop() {
  unsigned long currentMillis = millis();
  unsigned long currentMillis2=millis();
  unsigned long timeSinceAudio = millis();
  
  // Read data from sensors and pass it to XBee as a string 
    //int Sound = analogRead(sound);
    int Piezo = analogRead(piezosensorPin);
    int Photo = analogRead(photoresistorPin);
    
    //int Ultrasonic= analogRead(ultrasonic);
    //int temperature = analogRead(temperature);
    //Convert each int to a correspoding character depending on range 
    //Test the sensors
    /*char SoundC; 
    */
    char PiezoC = 'd';//default
    char PhotoC ='d'; //default
     //if-else for piezo
    if(Piezo>=50){
      PiezoC = 'h'; //hit
    }
    else if(Piezo>20 && Piezo <50){
      PiezoC = 'm'; //Pat
    }
    else{
      PiezoC = 'l'; //No input 
    }
    //if else for photo
    if(Photo > 900){
      PhotoC = 'h';
    }
    else if (Photo <900 && Photo >550){
      PhotoC = 'm'; //medium light
    }
    else{
      PhotoC = 'l';
    }
    // Combine if-elses
if(PiezoC == 'h' && PhotoC == 'h') {
  // Both Piezo and Photo conditions are high
  commandWrite = 'h';// trigger squeeze sketch (hit on light mode)
}
else if(PiezoC == 'h' && PhotoC == 'l') {
  // Piezo condition is high but Photo condition is low
  commandWrite = 'j'; //trigger squeeze sketch on darkness mode 
}
else if(PiezoC == 'h' && PhotoC == 'm') {
  // Piezo condition is medium but Photo condition is high
  commandWrite = 'y'; //trigger squeeze
}
else if(PiezoC == 'm' && PhotoC == 'l') {
  commandWrite = 'z'; //trigger love but dark background
}
else if(PiezoC == 'm' && PhotoC == 'h') {
  commandWrite = 'l'; //trigger love but light background
}
else if(PiezoC =='m' && PhotoC =='m'){
  //both are normal
  commandWrite = 'p'; //trigger peace sketch with love
}
else if(PiezoC == 'l' && PhotoC == 'h'){
    //no hit on high light
    commandWrite = 'x'; //trigger ;light backghround
}
else if(PiezoC == 'l' && PhotoC == 'm'){
  commandWrite = 'n'; //Neutral (peace sketch on normal background which will change to bored sketch after sometime)
}
else if(PiezoC == 'l' && PhotoC == 'l'){
  commandWrite = 'm'; //noLove in dark background (Sad)
}
// Check if 200 ms have passed since last XBee read
if (currentMillis - previousMillis >= interval) {
    // Update previousMillis
    XBee.write(commandWrite);
    previousMillis = currentMillis;
}

//XBee.write(commandWrite);
  // Check if 200 ms have passed since last XBee read
/*if (currentMillis - previousMillis >= interval) {
    // Update previousMillis
    previousMillis = currentMillis;*/

    //Read data from XBee
    if (XBee.available()) {
      command = XBee.read();
      //command2 = XBee.read();
    }
//}
executeCommand(command);
  /*if(command2 == 'b'){
    digitalWrite(pinForMp3,HIGH);
  }
  else if(command2 == 'e'){
    digitalWrite(pinForMp3,LOW);
  }*/
  //backward();  
} 



// Function to execute movement commands based on serial input
void executeCommand(char command) {
  switch (command) {
    case 'W':
      pwnVal = 255;
      forward();
      break;
    case 'A':
      pwnVal = 255;
      left();
      //Serial.println("Backward");
      break;
    case 'D':
      pwnVal = 255;
      right();
      //Serial.println("Right");
      break;
    case 'S':
      pwnVal = 255;
      backward();
      //Serial.println("backwards");
      break;
     case 'w':
      pwnVal = 150;
      forward();
      break;
    case 'a':
      pwnVal = 150;
      left();
      //Serial.println("Backward");
      break;
    case 'd':
      pwnVal = 150;
      right();
      //Serial.println("Right");
      break;
    case 's':
      pwnVal = 150;
      backward();
      //Serial.println("backwards");
      break;  
    default:
      stopMoving();
      break;
  }
}

// Your existing functions for controlling the robot
void forward() {
  //stopMoving();
  analogWrite(pwmAPin, pwnVal);
  digitalWrite(ain1Pin, HIGH);
  digitalWrite(ain2Pin, LOW);
  analogWrite(pwmBPin, pwnVal);
  digitalWrite(bin1Pin, LOW);
  digitalWrite(bin2Pin, HIGH);
}

void backward() {
 
  //stopMoving();
  analogWrite(pwmAPin, pwnVal);
  analogWrite(pwmBPin, pwnVal);
  digitalWrite(ain1Pin, LOW);
  digitalWrite(ain2Pin, HIGH);
  digitalWrite(bin1Pin, HIGH);
  digitalWrite(bin2Pin, LOW);
 
  
}

void left() {
  //forward();
  //delay(20);
  analogWrite(pwmAPin, 0);
  analogWrite(pwmBPin, pwnVal);
  digitalWrite(bin1Pin, LOW);
  digitalWrite(bin2Pin, HIGH);
}

void right() {
  //forward();
  //delay(20);
  analogWrite(pwmAPin, pwnVal);
  analogWrite(pwmBPin, 0);
  digitalWrite(ain1Pin, HIGH);
  digitalWrite(ain2Pin, LOW);
  
}

void stopMoving() {
  analogWrite(pwmAPin, 0);
  analogWrite(pwmBPin, 0);
}
