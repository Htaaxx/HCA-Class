import mqttClient from '../../../mqttClient';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get("topic");

  if (!topic) {
    return new Response("Missing topic query parameter", { status: 400 });
  }

  // Subscribe to the topic
  mqttClient.subscribe(topic);

  return new Response(`Subscribed to topic: ${topic}`, { status: 200 });
}

export async function POST(request) {
  const { topic, message } = await request.json();

  if (!topic || !message) {
    return new Response("Missing topic or message in request body", { status: 400 });
  }

  // Publish the message to the topic
  mqttClient.publish(topic, message);

  return new Response(`Message sent to topic: ${topic}`, { status: 200 });
}