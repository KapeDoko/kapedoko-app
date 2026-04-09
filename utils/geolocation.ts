import { Geolocation } from "@capacitor/geolocation";
import { Capacitor } from "@capacitor/core";

const hasGrantedLocation = (locationStatus: string) => {
  return locationStatus === "granted";
};

export const CheckPermission = async () => {
  if (Capacitor.getPlatform() === "web") {
    return true;
  }

  try {
    const result = await Geolocation.checkPermissions();
    return hasGrantedLocation(result.location);
  } catch (error) {
    console.error("Failed to check geolocation permission:", error);
    return false;
  }
};

export const HandlePermission = async () => {
  if (Capacitor.getPlatform() === "web") {
    return true;
  }

  try {
    const alreadyGranted = await CheckPermission();
    if (alreadyGranted) {
      return true;
    }

    const result = await Geolocation.requestPermissions();
    return hasGrantedLocation(result.location);
  } catch (error) {
    console.error("Failed to request geolocation permission:", error);
    return false;
  }
};
