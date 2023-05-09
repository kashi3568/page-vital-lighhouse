import app from '../app.js';

export async function handler(event, context) {
  const result = await app()(event, context);

  return {
    statusCode: result.statusCode,
    body: result.body,
    headers: result.headers,
  };
}