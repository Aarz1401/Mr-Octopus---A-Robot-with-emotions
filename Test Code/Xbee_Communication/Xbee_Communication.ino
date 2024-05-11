#include <SoftwareSerial.h>

const int ain1Pin = 3;
const int ain2Pin = 4;
const int pwmAPin = 5;

const int bin1Pin = 8;
const int bin2Pin = 7;
const int pwmBPin = 6;

int pwnVal = 255;
unsigned long previousMillis = 0;
const long interval = 200; // Interval in milliseconds
char command='n';

SoftwareSerial XBee(2, 3); // RX, TX

void setup() {
  XBee.begin(9600);
  Serial.begin(9600);
  pinMode(ain1Pin, OUTPUT);
  pinMode(ain2Pin, OUTPUT);
  pinMode(pwmAPin, OUTPUT);
  pinMode(bin1Pin, OUTPUT);
  pinMode(bin2Pin, OUTPUT);
  pinMode(pwmBPin, OUTPUT);
}

void loop() {
  unsigned long currentMillis = millis();
  unsigned long currentMillis2=millis();
  
  // Read data from Serial Monitor and pass it to XBee
  if (Serial.available()) {
    XBee.write(Serial.read());
  }

  // Check if 200 ms have passed since last XBee read
  if (currentMillis - previousMillis >= interval) {
    // Update previousMillis
    previousMillis = currentMillis;

    // Read data from XBee
    if (XBee.available()) {
      command = XBee.read();
    }
  }
  executeCommand(command);
}

// Function to execute movement commands based on serial input
void executeCommand(char command) {
  switch (command) {
    case 'w':
      forward();
      break;
    case 's':
      backward();
      Serial.println("Backward");
      break;
    case 'a':
      left();
      Serial.println("Left");
      break;
    case 'd':
      right();
      Serial.println("Right");
      break;
    default:
      stopMoving();
      break;
  }
}

// Your existing functions for controlling the robot
void forward() {
  Serial.println("Forward");
  analogWrite(pwmAPin, pwnVal);
  digitalWrite(ain1Pin, HIGH);
  digitalWrite(ain2Pin, LOW);
  analogWrite(pwmBPin, pwnVal);
  digitalWrite(bin1Pin, LOW);
  digitalWrite(bin2Pin, HIGH);
}

void backward() {
  analogWrite(pwmAPin, pwnVal);
  digitalWrite(ain1Pin, LOW);
  digitalWrite(ain2Pin, HIGH);
  analogWrite(pwmBPin, pwnVal);
  digitalWrite(bin1Pin, HIGH);
  digitalWrite(bin2Pin, LOW);
}

void left() {
  analogWrite(pwmAPin, 0);
  analogWrite(pwmBPin, pwnVal);
  digitalWrite(bin1Pin, LOW);
  digitalWrite(bin2Pin, HIGH);
}

void right() {
  analogWrite(pwmAPin, pwnVal);
  digitalWrite(ain1Pin, HIGH);
  digitalWrite(ain2Pin, LOW);
  analogWrite(pwmBPin, 0);
}

void stopMoving() {
  analogWrite(pwmAPin, 0);
  analogWrite(pwmBPin, 0);
}
