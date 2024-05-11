#include "SparkFunHTU21D.h"
#include <SoftwareSerial.h>

const int ain1Pin = 3;
const int ain2Pin = 4;
const int pwmAPin = 5;

const int bin1Pin = 8;
const int bin2Pin = 7;
const int pwmBPin = 6;

const int potPin = A5;
int pwnVal = 255;

SoftwareSerial XBee(2, 3); // Arduino RX, TX (XBee Dout, Din)


void setup() {
  pinMode(ain1Pin, OUTPUT);
  pinMode(ain2Pin, OUTPUT);
  pinMode(pwmAPin, OUTPUT);
  pinMode(bin1Pin, OUTPUT);
  pinMode(bin2Pin, OUTPUT);
  pinMode(pwmBPin, OUTPUT);
  XBee.begin(9600);
  Serial.begin(9600);

}

void loop() {
  // Read humidity and temperature from HTU21D sensor
  /*float humidity = myHumidity.readHumidity();
  delay(100);
  float temperature_C = myHumidity.readTemperature();
  delay(100);
  Serial.println(humidity);
  Serial.println(temperature_C);*/

  // Your existing code for controlling the robot
  right();
  delay(1000);
  forward();
  delay(1000);
}

// Your existing functions for controlling the robot

void forward() {
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
