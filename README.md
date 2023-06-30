![UnaEats Image](./unaeats/src/assets/icons/icon-unaeats.png)

# 
The food-ordering application for UnaEats Restaurant.

## Description

The UnaEats Restaurant Ordering App is a web application developed using ReactJS and TypeScript. It provides a user-friendly interface for customers to browse and order various food UneEats Restaurant. The app aims to simplify the food ordering process by allowing users to explore different menus, customize their quantity, and securely place their requests. The users can also see their order history, and clear if they wish to.

## Features

- Menu with all Food Items
- Popular Items that can be ordered
- Users can choose filters to find quickly
- They can check, update and/or remove items from card
- They can securely place their order
- They can view their order history
- If need be, they can clear their entire order history.

## Notes
1. This application is primarily developed for Mobile users, and thus Mobile-First Approach was followed. Nevertheless, it supports RWD for both Web (1024px & more) and Tablet (768 - 1024px).

   Therefore, it is _recommend_ to use **_mobile-viewport_** for _optimal application experience._

2. Server Imitation
Since all of the food-items data are fetched from files in the 'data' folder, one may imitate a server by changing the '_**timeDelay**_' constant in the 'Home' route, thus increasing the loading time, and seeing 'Loading' components and React-Lazy* in effect.

   By default, _timeDelay is set to 300ms._

## Technologies Used

- React
- TypeScript
- React Router
- Redux Toolkit
- Toastify
- All Custom CSS

## Style Guide & UI
The Figma Design File for the Selected Style Guides, UI Screens & Others can be found here: [Figma Design File](https://www.figma.com/file/zE2WL9Jxy2EdB9wbm1fWNm/UnaEats?type=design&node-id=0%3A1&t=EAGJS2iYMPOi3Ior-1)

## Deployment Link
The webiste is live, & can be found at: [kew-unaeats.netlify.app](https://kew-unaeats.netlify.app/)

## Getting Started

### Prerequisites

- Node.js and npm (Node Package Manager) should be installed.

### Installation

1. Clone the repository:

   ```shell
   git clone https://gitlab.iscooldev.com/KunalEveryWhere/unaeats.git
2. Navigate to the project directory:
   
   ```shell
   cd unaeats/unaeats
3. Install the dependencies:
   
   ```shell
   npm install
### Development

1. Start the development server:

   ```shell
   npm start
2. Open your browser and visit http://localhost:3000 to view the app.

### Build

1. To create a production-ready build of the application, run the following command:

   ```shell
   npm run build
2. The build artifacts will be stored in the build/ directory.

### Testing

1. To run the tests, use the following command:

   ```shell
   npm test
Currently, tests have been added only at Component Levels, with further optimization & targeted testing into the routes level planned for later stages.

## Future Enhancement

Due to time-limiations, not all desired features could be added. Some of the features / modifications planned for the later stages are listed below:

1. Cart-Badge: To show the number of items in the cart via a batch-number on the cart-icon at the header.

2. Delete Individual History: Currently, a complete swipe of history is only allowed. But, reducer function & feature for deleteing individual histort cards have already been implemented. A button and a call to function for individual history card removal has not been added yet.

3. History Cards Layout: When viewing in screen-sizes over 768pxs, the History Cards in the History-route are not aligned perfectly. This is because each card may be of different height, and by default the grid-layout sets the height for each row to its maximum child's height. Feature similar to Pinterest image container shall be implemented later.

4. Footer Component: A Footer Component was in the process of creating, but due to time limitations and it not being critical for core functionality of the application, was omitted for the time being.

5. Toasts-Handler: In the current implementation of Toasts, via React-Toastify, setting hard limits on the queue length for the toast messages was not done. This may cause a delayed, continuous flow of toasts which is not optimal for user experience. This 'queue length limits' feature would be added later, which would only allow the latest 'n' notifications / toasts messages to be shown, wile the older ones to be disgarded.

6. Login / Logout Screen: These have not been implemented. Currently, if the users clicks on 'Logout' via the Navigation Menu, they land on the 'Page Not Found' route.

7. Persist State: In the current implementattion, all the data is stored in the redux-store. A later implemenation could be added to start them in the local-browser storage instead so the state is not lost when the website is refreshed.

8. Dailog Component for each Food-Item: With the HTML [dialog-element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) finally being adopted in widespread browsers, implementation of each food-item's individual dialog box / overlay card to describe the product would be added in the later stages of this project.
