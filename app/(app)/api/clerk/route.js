import { headers } from 'next/headers';
import { Webhook } from 'svix';
import { createUser } from '@/actions/user';

export async function POST(req) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      'Webhook secret is not set. Please add it to your environment variables.'
    );
  }

  // Headers
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Missing headers', { status: 400 });
  }

  // Get the raw body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // New instance of the Svix verifier
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (e) {
    console.log('Webhook verification failed:', e);
    return new Response('Error while verifying webhook', { status: 400 });
  }

  const eventType = evt.type;
  console.log(`Received event of type: ${eventType}`);

  if (eventType === 'user.created') {
    const { id, first_name, last_name, email_addresses, image_url, username } =
      evt.data;

    const email_address = email_addresses[0].email_address;
    try {
      await createUser({
        id,
        first_name,
        last_name,
        email_address,
        image_url,
        username,
      });
    } catch (e) {
      throw new Error('Error while creating user');
    }
  }

  return Response.json({ message: 'Received event' });
}

export async function GET() {
  return new Response(JSON.stringify({ message: 'Hello, World!' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
