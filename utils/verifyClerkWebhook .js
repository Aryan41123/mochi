import crypto from 'crypto';

export const verifyClerkWebhook = (req, res, next) => {
  const signature = req.headers['clerk-signature'];
  const secret = process.env.CLERK_WEBHOOK_SECRET;
  const rawBody = req.rawBody;

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(rawBody)
    .digest('hex');

  if (signature !== expectedSignature) {
    return res.status(401).send('Invalid webhook signature');
  }

  next();
};