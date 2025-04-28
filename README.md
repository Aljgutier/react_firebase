# React Firebase and FastAPI <!-- omit from toc -->

**--UNDER DEVELOPMENT--**

## Contents <!-- omit from toc -->

- [Abstract](#abstract)
- [Create the React App with Vite](#create-the-react-app-with-vite)
- [App Pages and Routes](#app-pages-and-routes)
- [What is Firebase](#what-is-firebase)
- [Setup Firebase Authentication](#setup-firebase-authentication)
  - [Firebase Config](#firebase-config)
- [Signin and Signup Pages with Firebase OAuth.](#signin-and-signup-pages-with-firebase-oauth)

# Abstract

This repo demonstrates how to build a React applicaton with Firebase based user management (OAuth, login and signup) with a FastAPI backend.

A fundamental requirement of commercial applicatons is user signup, login, with OAuth (Authorization). The React UI compoenent framework is by far the most popular open-source Javascript framework for full-stack application development. Together, React with Firebase and fastAPI, constitute a modern technology stack for application categories such as full-stack analytics applications.

In this repo we will create a starter React App wih user account creation and user login. This starter app can serve as the starting point for a realistic React application utilizing Firebase authentication. For the backend we will make use of the starter fastAPI app developed and deployed [here](https://github.com/Aljgutier/fastapi_docker/tree/main)

# Create the React App with Vite

Pre-requisites

- Node.js installed on your machine (on Mac install with "brew"). Installing Node will install `npm`, as it comes bundled with Node.js
- The code editor, VSCode is recommended

Next, create your react app from template, with `vite`. In a command window, create the application

```sh
$ npm create vite@latest react_firebase –template react

```

`Vite` is the recommended approach for creating your React app, starting with React 19. `Vite` offers the following advanatages

- faster and more streamlined development experience for modern web projects, including those using React.
- leverages native ES modules, eliminating the need for bundling during development and enabling near-instant server start and hot module replacement (HMR).
- For production builds, it uses Rollup, pre-configured for optimized static assets. Vite also offers built-in support for TypeScript, JSX, and CSS, reducing the need for extra configuration.

Next, cd to the project directory `cd react_firebase` and install Node package dependencies

```sh
$ npm install
```

Check the installed React version

```sh
$ npm list react
-----
react_firebase@0.0.0 /Users/username/workspaces/react_firebase
├─┬ react-dom@19.1.0
│ └── react@19.1.0 deduped
└── react@19.1.0
```

Start the dev server

```sh
$ npm run dev
```

In a web browser go to http://localhost:5173/

and you should see the Vite + React logos

![React+Vite](./images/vite_react.png)

The application structure will be as follows

```text
    - vite.config.js
    - index.html
    - package.json
    - src
        - App.css
        - App.tsx
        - index.dss
        - main.tsx

```

As compared to the `create-react-app` there is a `main.tsx` in the src directory instead of `index.jsx` and in public `vite.svg`. We also see `vite.config.js` in the main project directory. Later we will add Firebase OAuth to the `Signin` and `Signup` pages.

Note that the App and main suffixes are changed `tsx` (manually changed, after the app creation) since our implementation will follow typescript conventions.

# App Pages and Routes

Since the goal for this app is setting up sign-in and sign-up then we start by creating three pages: home, signin, and signup. Initially, all the page contents will consist of an `h1` tag with the name of the page.

We will keep the default app styling (i.e., minimal), which can easily be updated according to the specific app business and styling requirements.

To add multiple pages to our React app, we will need to install `react-router-dom`

```sh
$ install react-router-dom
```

Our initial app is listed in the following code blocks.

Main.tsx is the entry point for the `Vite-React` app. It imports the App, as shown below.

main.tsx

```JS
// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

The default App.tsx file has been replaced with the code as listed below. All the unnecessary `Vite-React` boiler plate is removed. It simply imports RouterProvider, and router defined in `router.tsx`.

App.tsx

```JS
import React from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./router";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
```

The routes are defined in `router.tsx` with `createBrowserRouter`, which creates a "Browser History" router. This "Browser History Router" supports HTML5 functionaly, via the History API. As per HTML5 this supports features like detecting when the user pushes Back and Forward buttons, updating the URL without adding a new entry to the history, and changing the URL without reloading the page.

Notice that pages (Home, Signin, Signup) are nested inside the shared Header layout.

router.tsx

```JSX
// router.tsx
import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "./pages/home";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Header from "./components/header";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route index element={<Home />} />
      <Route path="signin" element={<Signin />} />
      <Route path="signup" element={<Signup />} />
    </Route>
  )
);

export default router;
```

The Header layout is defined in `components/header.tsx`. The `Outlet` component acts as a placeholder for the child routes to be rendered (Home, Signin, Signup).

```JS
//component/header.tsx

import { Link, Outlet } from "react-router-dom";
import React from "react";
function Header() {
  return (
    <>
      <nav>
        <p><Link to="/">Home</Link></p>
        <p><Link to="/signin">Sign In</Link></p>
        <p><Link to="/signup">Sign Up</Link></p>
      </nav>
      <div>
        <Outlet />
      </div>
    </>
  );
}
export default Header;
```

Each of our pages are definded within the `pages` subdirectory, as follows.

Home Page

```JS
// pages/home.tsx
import React from "react";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
```

Sign-in page

```JS
// pages/signin.tsx
import React from "react";

const Signin = () => {
  return (
    <div>
      <h1> Sign In</h1>
    </div>
  );
};

export default Signin;
```

Sign-up page

```JS
// pages/signup.tsx
import React from "react";

const Signup = () => {
  return (
    <div>
      <h1> Sign Up</h1>
    </div>
  );
};

export default Signup;

```

If it isn't already running, make sure your app is running - i.e., run $ `npm run dev` in the app root directory.

Go to the apps URL - http://localhost:5173/ and you should see links to each of the pages (Home, Signin, Signup) and the current pages name printed as an `h1` header (as below).

![App Header with Page Links](./images/header_pagelinks.png)

# What is Firebase

Before going further, let's briefly review Firebase. Firebase is a comprehensive app development platform by Google hosted in GCP (Google CLoud Platorm) that provides a suite of tools and services to help developers build, improve, and grow web and mobile applications.

Below are some of the features it offers

- SDKs for iOS, Android, Web, C\_\_
- App Hosting
- Cloud Functions - Serversless backend logic triggered by Firebase eatures or HTTPS requests
- App Distribution - Distribute pre-release versions of your app to testers
- Firebase Authentication - secure sign-in with Email/Password, Google, Facebook, Apple, and more
- Clooud Firebase: NoSQL cloud real-time database
- Realtime Database: NoSQL cloud database that syncs data accross all clients in real-time
- Cloud Storage: Scalable object storage for images, videos, and other user-generated content.
- Google Analytics SUpport
- Crashlytics - real-time crash reporting tool
- Performance monitoring - measures your apps performance from the user's point of view
- Cloud Messaging (FCM) - push notifications for iOS, Android, and web
- Remote Config - support for dynamically changing your apps behavior
- A/B testing - for testing UI features
- ML toolkit - pre-built and custom machine-learning models for vision, text recognition, and translation.

It offers several high quality tools to support your applications.

In our example app (this repo) we will make use of the authentication. Later, as needed, you can add additional Firebase tools to your application.

# Setup Firebase Authentication

Step-by-step Firebase Authentication setup

- Go to the Firebase console
  - Create a firebase project or use one you previously setup
  - Skip (unclick) Google Analytics for now. You can add it later if so desired.
- Go to your projects firebase console, then click on "All Products" on the left pane.
  ![Firebase Authentication](./images/firebase_authentication.png)

  - add email/password to the authentication methods
  - choose any other auth providers: in this exampl, I also chose Google.
    ![Firebase Project Settings](./images/firebase_settings_sdk.png)

- Next, click on the project settings button on the left and scroll down to the firebase config.

  - on the SDK Config, click on `config` and copy the secrets into your projects `.env` file. Make sure to follow the below instructions for setting up the `.env` file.

- In your projects root dicrectory create the `.env` to hold project secrets

  - make sure `.env` is listed in your `.gitignore` so that the secrets do not get published to your repo
  - the `.env` file will include following entries. You will need to add the `VITE_` prefix for each key name.

    ```JS
    //.env
    VITE_APIKEY=AIzaSyC6pPXXXXXXXXXXXXXXXXX
    VITE_AUTHDOMAIN=xxxxxxxxxxx.firebaseapp.com
    VITE_PROJECTID= xxxxxxxxx
    VITE_STORAGEBUCKET=xxxxxxxxxxx.appspot.com
    VITE_MESSAGINGSENDERID=372375xxxxxx
    VITE_APPID= 1:37237xxxx8:web:2fdxxxxxxxxxx278xxxd5
    ```

- Enable password sign-in and Google sign-in

- Create a test user: Click users and create a user, for example
  - email: john@email.com
  - password: john1234
- Install firebase

  ```sh
  $ npm install firebase
  ```

  this will install Firebase to your app and add it to your `package.json`

## Firebase Config

Now we will setup Firebase in the application. Create `firebase-config.tsx` in your src directory (with contents as listed below). This file is almost exactly what you see in the Firebase settings page; however, in our case, the environment secrets are read from the .env file. You do not want these secrets in your app code or they can be visible in the web console, an obvious security problem.

The comments about where to find additional Firebase libraries can be useful for the future.

```JS
//firebase-config.tsx
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_APIKEY,
    authDomain: import.meta.env.VITE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_PROJECTID,
    storageBucket: import.meta.env.VITE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_APPID
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

```

The `import.meta.env.VITE_KEY` pattern is the method for importing build-time metadata (e.g.,environment variatbles). The "`Vite_`" prefix is required to expose variables to the frontend.

In the src directory, create the `vite-env.d.ts` file with the following contents. this will provides type definitions that `Vite` needs to correctly undersatnd your project, such as in this case `import.meta.env`.

In addition to initializing the application's environment variables, the above code also imports getAuth, which supports login with Email and Password, signout, and onAuthStateChanged. Additionally, the Auth service is initialized and exported so it is available anywhere in the application

Restart your application and go the the apps url

http://localhost:5173/

# Signin and Signup Pages with Firebase OAuth.

Reference Examples

https://medium.com/@amamit/firebase-authentication-with-react-2ac170996ae0

https://medium.com/@amamit/firebase-integration-with-react-3f5c74316e0f
