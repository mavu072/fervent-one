# Fervent Web

Fervent Web is a client application that consumes the REST services supported by the Fervent API.

## Setup environment

This application requires that you set up a Firebase project.

On the [Firebase console](https://console.firebase.google.com/u/1/):
- Create a Web App configuration.

Take note of your app configurations. You will need this later on.

- Enable Sign-in providers.

Enable Email/Password and Google Sign-In.

- Enable Firestore Database.

Change your database rules to allow `read, write` operations.


## Installation

1. Install dependencies.

```zsh
npm install
```

2. Create environment variables.

Create an `.env file` and add the environment variables.

```env
# Firebase configurations
VITE_API_KEY=xxxxxxxxxxxxxxxxxxxxxx
VITE_AUTH_DOMAIN=xxxxxxxxxxxxxxxxxx
VITE_PROJECT_ID=xxxxxxxxxxxxxxxxxxx
VITE_STORAGE_BUCKET=xxxxxxxxxxxxxxx
VITE_MSG_SENDER_ID=xxxxxxxxxxxxxxxx
VITE_APP_ID=xxxxxxxxxxxxxxxxxxxxxxx
VITE_MEASUREMENT_ID=xxxxxxxxxxxxxxx

VITE_ASSISTANT_API_URL=http://localhost:8000 # Where are you running the backend?

# Client app details
VITE_APP_NAME=AI Labour Companion
VITE_APP_NAME_SHORT=AI Companion
VITE_ORG_NAME=MENITY INC.
VITE_ORG_SUPPORT_EMAIL=xxxxx@gmail.com # Replace with valid email
VITE_GIT_REPO=https://github.com/mavu072/fervent-one
```

3. Run application.

```zsh
npm run dev
```

See [package.json](./package.json) for a full list of available scripts.

4. Test your application

Once your application is running. Visit `http:localhost:5173/`.

---