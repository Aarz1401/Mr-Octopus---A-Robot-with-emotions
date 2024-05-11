#include <Keyboard.h>

#define PIN_CURRENT_SENSOR 9
#define THRESHOLD_CURRENT 100 // Define the threshold current value here

void setup() {
  Serial.begin(9600);
  pinMode(PIN_CURRENT_SENSOR, INPUT);
  Keyboard.begin();
}

void loop() {
  // Read the current value from pin 8
  int current = analogRead(PIN_CURRENT_SENSOR);

  // Check if the current exceeds the threshold
  if (current > THRESHOLD_CURRENT) {
    // Press the 'A' key
    Keyboard.press('a');
    delay(100); // Delay for key press
    Keyboard.release('a');
    delay(100); // Delay for key release
  }

  delay(100); // Adjust delay as needed for your application
}
