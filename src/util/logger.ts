import Logger from "headless-manager-client";
import axios from 'axios';

const logger = new Logger({
  appId: process.env.HM_APP_ID || "",
  apiUrl: process.env.HM_API_URL || "",
  submitEnabled: process.env.NODE_ENV !== "development",
  fetchInstance: axios,
});

export default logger;
