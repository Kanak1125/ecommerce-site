const express = require("express");
const cors = require("cors");
const {v4: uuidv4} = require('uuid');
const stripe = require('stripe')('sk_test_51OtXWbBU6kjPaFI9YNg37ZiNmTIUOZpY5JVUMH7MfQxQY1d5pQGftJ3hto6IxjJ0EENmI1UwXqOJpObDgaT0Uu9E00buQKhDpM');

const app = express();
app.use(cors());

app.use(express.json());

const PORT = 8080;

app.get('/', (req, res) => {
    res.send("Welcome to Evermore styles");
});

app.post('/checkout', async (req, res) => {
    let error;
    let status;

    try {
        const { cart, token } = req.body;
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id,
        });
        const key = uuidv4();
        const charge = await stripe.charges.create({
            "amount": cart.totalAmount * 100,
            "currency": 'usd',
            "customer": customer.id,
            "receipt_email": token.email,
            "description": 'product descriptions will be here...',
            "shipping": {
                "name": token.card.name,
                "address": {
                    "line1": token.card.address_line1,
                    "line2": token.card.address_line2,
                    "city": token.card.address_city,
                    "country": token.card.address_country,
                    "postal_code": token.card.address_zip
                }
            }
        }, {
            idempotencyKey: key
        })
        status = "success";
    } catch (err) {
        console.log(err);
        status = "error";
    }
    res.json({status});
})

app.listen(PORT, () => {
    console.log(`Your app is running on ${PORT}`);
})