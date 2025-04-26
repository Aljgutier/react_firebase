**--UNDER DEVELOPMENT--**

# React Firebase and FastAPI

This repo demonstrates how to build a React applicaton with Firebase based user management (OAuth, login and signup) with a FastAPI backend.

A fundamental requirement of commercial applicatons is user signup, login, and OAuth. The React UI compoenent framework is by far the most popular open-source Javascript based framework. Together, React with firebase (authentication) and fastAPI, constitute a modern technology stack for application categories such as full-stack analytics applications.

In this repo we will create a starter React App wih user account creation and user login. This starter app can serve as the starting point for a realistic React application utilizing Firebase authentication. For the backend we will make use of the starter fastAPI app developed and deployed [here](https://github.com/Aljgutier/fastapi_docker/tree/main)

# Create the React App with Vite

Pre-requisites

- Node.js installed on your machine (on Mac install with "brew"). This will install `npm`, it comes bundled with Node.js
- Code editor, VSCode is recommended

Next, create your react app from template, with `vite`. In a command window, create the application

```sh
$ npm create vite@latest react_firebase –template react

```

`Vite` is the new approach for creating your React app, starting with React 19. `Vite` is faster and more streamlined development experience for modern web projects, including those using React. It's as an alternative to `Create React App`, providing quicker build times and improved performance. `Vite` leverages native ES modules, eliminating the need for bundling during development and enabling near-instant server start and hot module replacement (HMR). For production builds, it uses Rollup, pre-configured for optimized static assets. Vite also offers built-in support for TypeScript, JSX, and CSS, reducing the need for extra configuration.

- [React Official Documentation](https://react.dev/learn/creating-a-react-app)
- [Vite Official Documentation](https://vite.dev/guide/)
- [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)

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

# What is Firebase

Before going further, you may be asking, what is Firbase? Firebase is a comprehensive app development platform by Google in GCP (Google CLoud Platorm) that provides a suite of tools and services to help developers build, improve, and grow web and mobile applications.

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

It offers a plethora of high quality tools to support your applications.

In our example app (this repo) we will make use of the authentication support. Later, as needed, you can add additional Firebase tools to your application.

# Setup Firebase Authentication

We will follow the general instructions from this artible ![]() . We will also add additional details and ensure the application works properly with our backend API.

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

## Firebase Config

Continuing with the Firebase setup, create `firebase-config.tsx` in your src directory with the following contents. This file is almost exactly what you see in the Firebase settings page; however, in our case, the environment secrets are read from the .env file. You do not want these secrets in your app code or they can be visible in the web console, an obvious security problem.

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

The `import.meta.env.VITE_KEY` pattern is the method for importing build time metadata (e.g.,environment variatles). The "`Vite_`" prefix is required to expose variables to the frontend.

In the src directory, create the `vite-env.d.ts` file with the following contents.

In addition to initializing the environment variables for the application, the above code also

- imports getAuth which supports login with Email and Password, signout, and onAuthStateChanged.
- then the Auth service is initialized and exported so it is available anywhere in the application

```JS
/// <reference types="vite/client" />
```

Vite provides types in the `vite/client` package, but TypeScript needs a hint to use them. The line /// <reference types="vite/client" /> tells TypeScript there are special types for import.meta.env, please use them."

Restart your application and go the the apps url

http://localhost:5173/

You should again see the Vite+React logos.

# React Application Sign-in and Signup

Sign in form

Sign up orm
