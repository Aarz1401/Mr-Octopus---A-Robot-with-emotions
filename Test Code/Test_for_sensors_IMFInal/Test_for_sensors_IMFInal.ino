const int photoresistorPin = A0; // Analog input pin for the first photoresistor
const int piezosensorPin = A1; // Analog input pin for the second photoresistor
int max = 0;

void setup() {
  Serial.begin(9600); // Initialize serial communication at 9600 bits per second
}

void loop() {
  int photo1Value = analogRead(photoresistorPin); // Read the value from the first photoresistor
  int piezoValue = analogRead(piezosensorPin); // Read the value from the second photoresistor

  //Serial.print("Photoresistor 1 Value: "); // Print label for first photoresistor value
  //Serial.println(photo1Value); // Print value of first photoresistor
  //according to experiment, darkness should be 
  //Serial.print("Piezosensor value "); // Print label for second photoresistor value
 
  if(piezoValue>max){
    max=piezoValue;
  }
  //Range 20 to 100 ideally
  //Serial.println(max);
  //according to experiment , above 350 should count as hit, above 20 should count as love 
  Serial.println(photo1Value); // Print value of second photoresistor

  // Wait for 1 second before reading again
}
