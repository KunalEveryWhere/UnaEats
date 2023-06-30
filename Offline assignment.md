# Offline assignment

## Task

This task is to develop a solution for the below mentioned problem. You are expected to build a web (or Electron, see additional task) application.

The key focus area will be the **design** of the solution and the **structure of the code**. Weightage will be given to clear design, extensibility of code to allow easy addition of features, modularity to ensure clear separation of concerns.

You are expected to provide a zip file of the entire source tree with the Git history. You need to provide a `README.md` to describe the prerequisites that build/run your application, including the platform and programming language version.

## Environment

The application must use the following library/framework to build:

- React
- Redux and related libraries (e.g. @reduxjs/toolkit)
- Webpack
- Typescript

The following library/framework is suggested but optional, feel free to use other replacement:

- Material-UI

**Create-React-App** is may be used in this assignment.

**Unit Test** must be preform to your code.

Other libraries (e.g. UI frameworks) are free to use.

## Problem description

This task to create a food order system client with the following functions:

### Menu

- shows all food places in different categories
  - at least 3 kinds of categories and 3 kinds of food in each category
- user can add food to cart

### Cart

- shows all foods in cart
- user can change amount of food or remove it
- submit the order

### History

- must show in another page or popup window
- shows all order details
- user can clear history

You can mock other necessary parts, and there's no need to save the history and other states after the application closes.

## Additional Task

This part is the additional feature, you don’t have to accomplish the following features. But you can challenge yourself if you want and you have free time.

- Wrap the application with electron
- store the history in a backend server

## Example Mockup

![](https://i.imgur.com/1c0IU3m.png)

![](https://i.imgur.com/DafUnaf.png)
