# Fervent Web

Fervent Web is a client application that consumes the REST services supported by the Fervent API.


## Setup environment

This application requires that you set up the following:

1. Firebase project.

    On the [Firebase console](https://console.firebase.google.com/u/1/):

    - Create a Web App configuration.

        Take note of your app configurations. You will need this later on.

    - Enable Sign-in providers.

    - Enable Email/Password and Google Sign-In.

    - Enable Firestore Database.

        Change your database rules to allow `read, write` operations.

        ```javascript
        rules_version = '2';

        service cloud.firestore {
            match /databases/{database}/documents {
                match /{document=**} {
                    allow read, write: if request.auth != null; // Allows authenticated users to read/write.
                }
            }
        }
        ```

2. Sentry project.

    - Sign in to [Sentry.io](sentry.io) using the organization or team account.
    
    - Configure [Sentry JavaScript SDK](https://docs.sentry.io/platforms/javascript/) to diagnose issues and learn  about application code health.

    - Additionally, configure [Source Maps](https://docs.sentry.io/platforms/javascript/sourcemaps/) to enable readable stack traces in errors.

    - Go to [Sentry Issues](https://menity.sentry.io/issues/) to view current issues.


## Pre-installation

#### Required Software/Packages

- **Node** version v22.14.0 or higher is required.


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

# Sentry key
VITE_SENTRY_DSN=xxxxxxxxxxxxxxxxxxx

VITE_ASSISTANT_API_URL=http://localhost:8000 # Where are you running the backend?

# Client app details
VITE_APP_NAME=AI Labour Companion
VITE_APP_NAME_SHORT=AI Companion
VITE_APP_DESCRIPTION="AI-powered Labour Insights Platform."
VITE_ORG_NAME=Menity
VITE_ORG_SITE=/about
VITE_ORG_SUPPORT_EMAIL=xxxxx@gmail.com # Replace with valid email
VITE_GIT_REPO=https://github.com/mavu072/fervent-one

VITE_APP_META_DESCRIPTION="A free, AI-powered platform that helps South African employees understand their workplace rights. Get instant access to employment laws, legal information, and contract compliance checks to navigate workplace issues with confidence."
VITE_APP_META_KEYWORDS="AI Legal Companion, South African labor laws, employment rights, workplace legal information, contract compliance checker, unfair dismissal, unpaid wages, workplace disputes, labor law AI, employee rights South Africa"
```

3. Run application.

```zsh
npm run dev
```

See [package.json](./package.json) for a full list of available scripts.

4. Test your application

Once your application is running. Visit `http:localhost:5173/`.

---