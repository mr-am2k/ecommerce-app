# E-Commerce app for a watch shop
You can visit it on: 

## Technologies used

-React
-Typescript
-Commerce js
-Stripe

## Description

This is an e-commerce app for a watch shop. Users can add one more watch to the cart, and then order them. 
Thanks to the commerce js, the cart won't empty on a reload. Since the credit card isn't connected to the commerce js, the user won't get mail about a successful transaction.
Test data for payment:
Card number: 4242 4242 4242 4242
MM/YY: 04 / 24
CVC: 242
ZIP 42424

## Starting application locally

If you want to test the app on your machine you need to fork it, install all dependencies with `npm install`, after then you need to add environment variables for commerce js API key and Stripe API key, and after then you can start the app with `npm start`
