## Paypal Smart Checkout Implementation

This is my attempt at Paypal's Integration Engineer interview which requires me to build a checkout using Paypal's Smart Checkout
Button with a backend of my choice. I decided on using Node for the backend and used React as the choice of my frontend framework.

This was a pretty fun excercise as it tests several concepts such as:

 - Handling promises, async/await
 - Deploying monolith repo with multiple apps using proxies
 - React component lifecycle: 
1) Pass props to component
2) Mash props with initialState to set current state
3) OnEvent handlers to trigger functions to re-render UI through setState()
4) Passing variables from child to parent component through function passed through props from       		 parent to child
 - And of course, learning to integrate the PayPal API. The most basic is to create an order, approve, then capture payment.  

![ezgif-6-f2a68fb8f75e.gif](https://s7.gifyu.com/images/ezgif-6-f2a68fb8f75e.gif)

**Demo:** https://arcane-wave-76275.herokuapp.com/
