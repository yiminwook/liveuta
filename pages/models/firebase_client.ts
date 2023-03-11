import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const firebaseConfig = {
  apiKey: publicRuntimeConfig.client_apiKey,
  authDomain: publicRuntimeConfig.client_authDomain,
  projectId: publicRuntimeConfig.client_projectId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const firebaseClient = { app, analytics };

export default firebaseClient;
