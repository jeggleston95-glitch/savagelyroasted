const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();
app.use(express.json());
app.use(express.static('public'));

const cors = require('cors');
app.use(cors());

app.post('/create-checkout', async (req, res) => {
  const { target } = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: { name: 'Savage AI Roast 🔥' },
        unit_amount: 100,
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: 'https://savagelyroasted.com?success=1',
    cancel_url: 'https://savagelyroasted.com',
    metadata: { target } // Save name for roast
  });
  res.json({ id: session.id });
});

app.listen(process.env.PORT || 3000, () => console.log('Roast server LIVE'));
