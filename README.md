# ClipSync

An app for synchronizing what you copy and paste (text,links,images,files) across different devices, built with MERN stack and socket.io

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

The frontend is divided into three parts: Home, Sign-in/Sign-up and the acutal clipsync app interface

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
  - A sticky tool bar which contains the upload image, file, clear all buttons and the main sync clip action button
  - A Text component for displaying a plaintext clipboard item with an origin icon and a group of actions buttons (copy, pin and delete)
  - A Lik component for displaying a link url clipboard item with an origin icon, link destination thumbnail icon and a group of actions buttons (copy, pin and delete)
  - A Image component for displaying a image clipboard item with an origin icon, an image thumbnail icon, image metadata and a group of actions buttons (copy,download, pin and delete)
  - A File component for displaying a generic file clipboard item with an origin icon, a file format icon, file metadata and a group of actions buttons (copy,download, pin and delete)

#### Backend:

The backend is divided into four parts: mongoDB database config, data modeling, controller/middleware/utils and main server.

- Database config:
  - Hanlding database connection and error reporting
- Data modeling:
  - User model for user data and validation
  - Clipping model for representing clipboard items from users
- Controller/middleware
  - An user controller to handle user CRUD opertionas (user sign-in, sign-up, update profile and delete account)
  - A clipping controller to handle web socket communication between clients and server and broadcasting messages to connected clients
  - An error middleware for handling error and customized error messages
  - A auth middlleware for protecting private route
- Server
  - A express server for http requests and serving static assets
  - A socket.io server built on top of express to handle web socket communication between clients and server and broadcast messages to connected clients

### Screenshot

![screenshot(1)](https://user-images.githubusercontent.com/38929940/187114560-7e818bd1-9f2a-4fe0-bec8-fc38e6971aee.png)

![screenshot(2)](https://user-images.githubusercontent.com/38929940/187115170-60728390-c4db-4f91-bbfb-a3800f7b9362.png)

![screenshot(3)](https://user-images.githubusercontent.com/38929940/187115247-7f6d7d4e-abd0-4404-8775-acbe47207435.png)

![screenshot(4)](https://user-images.githubusercontent.com/38929940/187115254-3300d149-9a62-4c15-95bc-3fdd2a24f4cd.png)

### Links

- Deployed on [Heroku](https://www.heroku.com/)
- Live Site: [ClipSync](https://clipsyncapp.herokuapp.com/)

## My process

### Built with

- [Material UI](https://mui.com/) - Component library
- [React Router](https://reactrouter.com/) - Routing library
- [React](https://reactjs.org/) - JS library
- [Create React App](https://create-react-app.dev/) - CRA for React build setup
- [Node](https://nodejs.org) - NodeJS
- [Express](https://expressjs.com/) - Express node framework
- [Socket.IO](https://socket.io/) - Bidirectional and low-latency communication
- [MongoDB](https://www.mongodb.com) - Document-oriented database
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling, validation and business logic
- [JSON web token](https://www.npmjs.com/package/jsonwebtoken) - User authentication

### Development planning

- Add clippings sharing with other users
- Add types with TypeScript
- Optimize performance of React components
- Add testings

## Author

- GitHub - [Haoliang Zhang](https://github.com/HaoLZz)
- LinkedIn - [Haoliang Zhang](https://www.linkedin.com/in/haoliangzhangengineer/)

## Acknowledgments
