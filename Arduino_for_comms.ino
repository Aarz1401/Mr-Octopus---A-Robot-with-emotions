#include <SoftwareSerial.h>
// Code for the interface arduino to send data from p5 to the robot and receive data from robot and transmit it to p5
// Define the pins for the XBee module
#define RX_PIN 2  // Arduino RX pin connected to XBee TX pin
#define TX_PIN 3  // Arduino TX pin connected to XBee RX pin


// Create a SoftwareSerial object for communication with the XBee module
SoftwareSerial XBee(RX_PIN, TX_PIN);
int interval = 200; // 200 ms
unsigned long previousMillis = 0;
unsigned long currentMillis = 0;
char left;
char read;
char right;
int sensor = 10;

String receivedFromXBee = ""; // String to store data received from XBee
char c= 'n';


void setup() {
  // Start serial communication with the computer
  Serial.begin(9600);

  // Start serial communication with the XBee module
  XBee.begin(9600);
  // start the handshake
  while (Serial.available() <= 0) {
    digitalWrite(LED_BUILTIN, HIGH); // on/blink while waiting for serial data
    Serial.println("0,0"); // send a starting message
    delay(300);            // wait 1/3 second
    digitalWrite(LED_BUILTIN, LOW);
    delay(50);
  }
}

void loop(){
    // wait for data from p5 before doing something
  while (Serial.available()) {
    //digitalWrite(LED_BUILTIN, HIGH); // led on while receiving data
    int left = Serial.parseInt();
    int right = Serial.parseInt();
    if (Serial.read() == '\n') {
      //digitalWrite(leftLedPin, left);
      //digitalWrite(rightLedPin, right);
      //Send stuff over XBee 
      if(left == 1){
        XBee.write('w');
      }
      else if(left == 2){
        XBee.write('a');
      }
      else if(left == 3){
        XBee.write('s');
      }
      else if(left == 4){
        XBee.write('d');
      }
      else if(left == 5){
        XBee.write('w');
      }
      if(left == 6){
        XBee.write('a');
      }
      if(left == 7){
        XBee.write('s');
      }
      if(left == 8){
        XBee.write('d');
      }
      //sends XBee received character data as integer
      char character_read = XBee.read();
      if(character_read == 'h'){
        sensor =1; 
      }
      else if (character_read == 'j'){
        sensor =2;
      }
      else if (character_read == 'y'){
        sensor =3;
      }
      else if (character_read == 'z'){
        sensor =4;
      }
      else if (character_read == 'l'){
        sensor =5;
      }
      else if (character_read == 'p'){
        sensor =6;
      }
      else if (character_read== 'x'){
        sensor =7;
      }
      else if (character_read == 'n'){
        sensor =8;
      }
      else if (character_read == 'm'){
        sensor =9;
      }
      delay(5);
      int sensor2 = 0;
      delay(5);
      Serial.print(sensor);
      Serial.print(',');
      Serial.println(sensor2);
    }
  }
  //digitalWrite(LED_BUILTIN, LOW);
}
  

    
  
