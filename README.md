# ClipSync

A MERN stack app for synchronizing clipboards across devices

## Table of contents

- [ClipSync](#clipsync)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [Requirements](#requirements)
      - [Frontend:](#frontend)
      - [Backend:](#backend)
    - [Screenshot](#screenshot)
    - [Links](#links)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [Development planning](#development-planning)
  - [Author](#author)
  - [Acknowledgments](#acknowledgments)

## Overview

### Requirements

#### Frontend:

The frontend is divided into three part: Home, Sign-in/Sign-up and the acutal clipsync app interface

- The home page:
  - A header should contain a navigation menu for exploring the site.
  - A hero section for displaying slogan/image and a call-to-action button that directs user to sign up service.
  - A features section is required to showcaing mutiple features that are offered by the ClipSync app.
  - A contact form is required for users to submit messages.
  - A footer is required at the bottom section.
- On sign-in/sign-up pages:
  - Sign-in page should contain a form with email and password fields. Also a link that redirects user to sign-up if they don't have an account must be present.
  - Sign-up page should should contain a form with first-name, last-name, email and password fields. Also a link that redirects user to sign-in if they already have an account must be present.
- ClipSync app interface: After sign-in, user will be redirected to the web app page.
  - A appbar on top needs to contain a ClipSync logo and nav menu with the addtion of user profile menu,optional notifications and message icons.
  - A tab panel is need to switch between showing all clipboard items vs a filter list of pinned items
  - A Text component for displaying a plaintext clipboard item with an origin icon and a group of actions buttons (copy, pin and delete)
  - A Lik component for displaying a link url clipboard item with an origin icon, link destination thumbnail icon and a group of actions buttons (copy, pin and delete)
  - A Image component for displaying a image clipboard item with an origin icon, an image thumbnail icon and a group of actions buttons (copy,download, pin and delete)
  - A File component for displaying a generic file clipboard item with an origin icon, a file format icon and a group of actions buttons (copy,download, pin and delete)
  - A fab(floating-action-button) is needed at the bottom-right corner of the app for quick action such as uploading image and file.

#### Backend:

The backend is divided into three part: mongoDB database config, data modeling and controller/middleware/utils etc.

- Database config:
  - Hanlding database connection and error reporting
- Data modeling:
  - User model for user data and validation
  - Clipping model for representing clipboard items from users
- Controller/middleware
  - An user controller to handle user CRUD opertionas (user sign-in, sign-up, update profile and delete account)
  - A message controller to handle web socket communication between clients and server and broadcasting messages to connected clients
  - An error middleware for handling error and customized error messages
  - A auth middlleware for protecting private route

### Screenshot

![screenshot1](./screenshots/screenshot-1.png)

![screenshot2](./screenshots/screenshot-2.png)

![screenshot3](./screenshots/screenshot-3.png)

### Links

- Live Site:

## My process

### Built with

- [Material UI](https://mui.com/) - Component library
- [React Router](https://reactrouter.com/) - Routing library
- [React](https://reactjs.org/) - JS library
- [Create React App](https://create-react-app.dev/) - CRA for React build setup
- [Node](https://nodejs.org) - NodeJS
- [Express](https://expressjs.com/) - Express node framework
- [MongoDB](https://www.mongodb.com) - MongoDB
- [Mongoose]() - MongoDB object modeling, validation and business logic
- [JSON web token](https://www.npmjs.com/package/jsonwebtoken) - JSON web token for user auth

### Development planning

- Add typechecking with TypeScript
- Optimize performance of React components and Redux
- Add testings

## Author

- GitHub - [Haoliang Zhang](https://github.com/HaoLZz)
- LinkedIn - [Haoliang Zhang](https://www.linkedin.com/in/haoliangzhangengineer/)

## Acknowledgments
