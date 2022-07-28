# E-Commerce app for a watch shop
You can visit it on: https://ecommerce-app-am2k.vercel.app/

## Technologies used

-React <br/>
-Typescript <br/>
-Commerce js <br/>
-Stripe <br/>

## Description

This is an e-commerce app for a watch shop. Users can add one more watch to the cart, and then order them.  <br/>
Thanks to the commerce js, the cart won't empty on a reload. Since the credit card isn't connected to the commerce js, the user won't get mail about a successful transaction. <br/>
Test data for payment: <br/>
Card number: 4242 4242 4242 4242 <br/>
MM/YY: 04 / 24 <br/>
CVC: 242 <br/>
ZIP 42424 <br/>

## Starting application locally

If you want to test the app on your machine you need to fork it, install all dependencies with `npm install`, after then you need to add environment variables for commerce js API key and Stripe API key, and after then you can start the app with `npm start`
