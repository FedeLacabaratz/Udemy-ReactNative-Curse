# BISTRO APP

## Introduction

This application allows both customers (by using the React Native App) and owner/s (by using the web React client app) to interact in a real life situation as it is presented in all restaurants. Owners creating dishes/drinks/products and managing orders and customers requesting/editing dishes/drinks until the last minute when they're able to successfuly receive confirmation on their orders ready to be picked up.

`If you want to clone this repo and put this app to test, please bare in mind that you will need to add a file inside the firebase folder of each side of this project (both web client and React Native App) called "config.js" in which you will add your Database configuration information provided by your own Cloud Firestore in your Firebase. (See Picture down below at the end of this README file)`

## The Web Client Side (made with ReactJS)

In here you will be able to create the products you are going to serve and also classify them from "Available" to "Unavailable" in case you want to take them out of the menu provisionally. This side of the project will allow the owners or managers in the kitchen to communicate with the customers on accepting their dishes and also providing them with a countdown to theis orders to be ready to be picked up. Once picked up by clicking on "order is ready" button, will send this order/s to the "Delivered Orders" menu.

## The App Side (made with React Native)

In this side, the customers will have the chance to select one or more products, edit and add as many as they want before confirming and ordering. Once the order is purchased, the customer will receive a countdown clock screen in which they will be able to track time on their orders to be ready. Once an order is announced ready, they will also have the option to start the process over again.

### The "config.js" file

Please check your Firebase site and use this option and information before executing anything. You just have to copy and paste this inside your firebase folder and name the file "config.js". Then you'll be ready to give it a try and don't forget to create your menu first so you have something to order. Check this screenshot on what you should be extracting as information to paste inside your file.

[Screenshot taken from my Firebase site](./configImagen/config.jpg)