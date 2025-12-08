import Stripe from 'stripe';
import Transaction from '../models/Transaction.js';
import User from '../models/user.js';

export const stripeWebhook = async (req, res) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const sig = req.headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    try {
        switch (event.type) {
            case 'payment_intent.succeeded': {
                const paymentIntent = event.data.object;
                const sessionList = await stripe.checkout.sessions.list({
                    payment_intent: paymentIntent.id,
                });
                const session = sessionList.data[0];
                const transactionId = session.metadata.transactionId;
                const appId = session.metadata.appId;
                if (appId === 'quickgpt') {
                    const transaction = await Transaction.findOne({ _id: transactionId, isPaid: false });
                    await User.updateOne({ _id: transaction.userId }, { $inc: { credits: transaction.credits } });
                    transaction.isPaid = true;
                    await transaction.save();

                }
                else {
                    return res.json({ received: true, message: "Invalid appId in metadata" });
                }
                break;
            }

            default:
                console.log(`Unhandled event type ${event.type}`);
                break;
        }
        res.json({ received: true });

    } catch (error) {
        console.error("stripeWebhook error:", error);
        res.status(500).json({ success: false, message: "Webhook handling failed", error: error.message });
    }
};
export default stripeWebhook;