import mqtt from 'mqtt';
import Temperature, { saveTemperatureData, getDailyTemperatureHistory } from "./models/Temperatures";


// password để mở cửa -> home_22CLC_hfmi/door/password -> string
// mở cửa -> home_22CLC_hfmi/door/open -> bool
// mở, delay đóng -> home_22CLC_hfmi/door/open_close -> bool
// thông tin nhiệt độ -> home_22CLC_hfmi/sensor/temperature -> float
// thông tin độ ẩm -> home_22CLC_hfmi/sensor/humidity -> float
// calibrate -> home_22CLC_hfmi/sensor/calibrate_brightness -> bool
// intensity -> home_22CLC_hfmi/sensor/get_brightness -> int

class MQTTClient {
  constructor(brokerUrl, defaultTopics = []) {
    this.client = mqtt.connect(brokerUrl);
    this.defaultTopics = defaultTopics;

    this.client.on('connect', () => {
      console.log('Connected to MQTT broker');

      // Subscribe to default topics
      this.defaultTopics.forEach((topic) => {
        this.client.subscribe(topic, (err) => {
          if (err) {
            console.error(`Failed to subscribe to topic: ${topic}`, err);
          } else {
            console.log(`Subscribed to topic: ${topic}`);
          }
        });
      });
    });

    this.client.on('message', (topic, message) => {
      console.log(`Received message on topic ${topic}: ${message.toString()}`);
      // Add your logic here to handle incoming messages
      if (topic === 'home_22CLC_hfmi/door/password') {
        // Handle password message
        if (message.toString() === '1234') {
          this.publish('home_22CLC_hfmi/door/open_close', 'true');
          this.publish('home_22CLC_hfmi/door/password_status', 'true');
        }
      }
      if (topic === 'home_22CLC_hfmi/door/open') {
        // Handle open message
      }
      if (topic === 'home_22CLC_hfmi/door/open_close') {
        // Handle open_close message
      }
      if (topic === 'home_22CLC_hfmi/sensor/temperature') {
        // Handle temperature message
      }
      if (topic === 'home_22CLC_hfmi/sensor/humidity') {
        // Handle humidity message
      }
      if (topic === 'home_22CLC_hfmi/sensor/calibrate_brightness') {
        // Handle calibrate_brightness message
      }
      if (topic === 'home_22CLC_hfmi/sensor/get_brightness') {
        // Handle get_brightness message
      }
      if (topic === 'home_22CLC_hfmi/sensor/temp_humid') {
        // Handle temperature_and_humidity message
        // Format {temp};{humidity}, temperature and humidity are floats
        const [temp, humidity] = message.toString().split(';').map(parseFloat);
        // Save the temperature and humidity data to the database
        console.log(`Temperature: ${temp}°C, Humidity: ${humidity}%`);
        saveTemperatureData(temp, humidity);
      }
    });
  }

  /**
   * Subscribe to a topic
   * @param {string} topic - The topic to subscribe to
   */
  subscribe(topic) {
    this.client.subscribe(topic, (err) => {
      if (err) {
        console.error(`Failed to subscribe to topic "${topic}":`, err);
      } else {
        console.log(`Subscribed to topic "${topic}"`);
      }
    });
  }

  /**
   * Publish a message to a topic
   * @param {string} topic - The topic to publish to
   * @param {string} message - The message to publish
   */
  publish(topic, message) {
    this.client.publish(topic, message.toString(), (err) => {
      if (err) {
        console.error(`Failed to publish to topic "${topic}":`, err);
      } else {
        console.log(`Message published to topic "${topic}": ${message}`);
      }
    });
  }
}


// const brokerUrl = 'mqtt://broker.emqx.io:1883'; 
// const brokerUrl = 'mqtt://test.mosquitto.org:1883';
// const brokerUrl = 'mqtt://mqtt.eclipse.org:1883';
const brokerUrl = 'mqtt://broker.hivemq.com:1883';
// ip :115.73.5.245
// const brokerUrl = 'mqtt://115.73.5.245:1883';

const mqttClient = new MQTTClient(brokerUrl, [
    'home_22CLC_hfmi/door/password',
    'home_22CLC_hfmi/door/password_status',
    'home_22CLC_hfmi/door/open', 
    'home_22CLC_hfmi/door/open_close', 
    'home_22CLC_hfmi/sensor/temperature', 
    'home_22CLC_hfmi/sensor/humidity',
    'home_22CLC_hfmi/sensor/calibrate_brightness', 
    'home_22CLC_hfmi/sensor/get_brightness',
    'home_22CLC_hfmi/sensor/temp_humid',
]);


export default mqttClient;
