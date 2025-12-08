import Transaction from "../models/Transaction.js";
import Stripe from "stripe";
const plan = [
    {
        _id: "basic",
        name: "Basic",
        price: 10,
        credits: 100,
        features: ['100 text generations', '50 image generations', 'Standard support', 'Access to basic models']
    },
    {
        _id: "pro",
        name: "Pro",
        price: 20,
        credits: 500,
        features: ['500 text generations', '200 image generations', 'Priority support', 'Access to pro models', 'Faster response time']
    },
    {
        _id: "premium",
        name: "Premium",
        price: 30,
        credits: 1000,
        features: ['1000 text generations', '500 image generations', '24/7 VIP support', 'Access to premium models', 'Dedicated account manager']
    }
]

export const getPlans = (req, res) => {
    try {
        res.json({ success: true, plans: plan });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch plans" });
    }
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const purchasePlan = async (req, res) => {
    try {
        const { planId } = req.body;
        const userId = req.user._id;

        // FIXED: avoid variable shadowing
        const selectedPlan = plan.find(p => p._id === planId);
        if (!selectedPlan) {
            return res.status(400).json({ success: false, message: "Invalid plan selected" });
        }

        const transaction = await Transaction.create({
            userId,
            planId: selectedPlan._id,
            amount: selectedPlan.price,
            credits: selectedPlan.credits,
            isPaid: false,
        });

        const { origin } = req.headers;

        const session = await stripe.checkout.sessions.create({
            line_items: [{
                price_data: {
                    currency: 'usd',
                    unit_amount: selectedPlan.price * 100,
                    product_data: {
                        name: selectedPlan.name
                    },
                },
                quantity: 1,
            }],
            mode: 'payment',

            // Redirect URLs
            success_url: `${origin}/loading`,
            cancel_url: `${origin}`,

            metadata: {
                transactionId: transaction._id.toString(),
                appId: 'quickgpt'
            },

            expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // 30 mins
        });

        res.json({ success: true, url: session.url });

    } catch (error) {
        console.error("purchasePlan error:", {
            message: error.message,
            type: error.type,
            code: error.code,
            statusCode: error.statusCode,
            stack: error.stack
        });
        res.status(500).json({ success: false, message: "Plan purchase failed", error: error.message });
    }
}


// export const purchasePlan = async (req, res) => {
//     try {
//         const { planId } = req.body;
//         const userId = req.user._id;
//         const plan = plan.find(plan => plan._id === planId);
//         if (!plan) {
//             return res.status(400).json({ success: false, message: "Invalid plan selected" });
//         }
//         const transaction = await Transaction.create({
//             userId,
//             planId: plan._id,
//             amount: plan.price,
//             credits: plan.credits,
//             isPaid: false,
//         });
//         const { origin } = req.headers;

//         const session = await stripe.checkout.sessions.create({
//             line_items: [{
//                 price_data: {
//                     currency: 'usd',
//                     unit_amount: plan.price * 100,
//                     product_data: {
//                         name: plan.name
//                     },
//                 },
//                 quantity: 1,
//             }],
//             mode: 'payment',
//             success_url: `${origin}/loading`,
//             cancel_url: `${origin}`,
//             metadata: {
//                 transactionId: transaction._id.toString(), appId: 'quickgpt'
//             },
//             expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
//         });
//         res.json({
//             success: true, url: session.url
//         });

//     } catch (error) {
//         res.status(500).json({ success: false, message: "Plan purchase failed" });
//     }
// }


