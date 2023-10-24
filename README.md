# tcw-demo
This app is a starting point for the development of your own Telos Cloud Wallet powered applications. The App is built using the Vite framework and React. It is written in Typescript and uses the [`oreid-js`](https://www.npmjs.com/package/oreid-js), [`oreid-webpopup`](https://www.npmjs.com/package/oreid-webpopup) and related OREID javascript packages.

## Setup
Before starting the demo app, you'll need to first create a .env file in the root of the project. We've included a sample of this file in the repository. This file should contain the following variables:

```bash
VITE_OREID_APP_ID=your-app-id
VITE_OREID_NETWORK=your-journey-id
```

You can find your app id and journey id in the Verified.True dashboard.

## Running the app
Running the app is simple. Simply run the yarn commands to install the dependencies and start the app.

```bash
yarn install
yarn run dev
```

For more information on implementing the Telos Cloud Wallet, check out our documentation at [docs.oreid.io](https://docs.oreid.io/ore-id/blockchains/telos-cloud-wallet).