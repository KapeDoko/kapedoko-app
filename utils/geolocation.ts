import { Geolocation } from "@capacitor/geolocation";
import { Capacitor } from "@capacitor/core";

export const CheckPermission = async () => {
  if (Capacitor.getPlatform() !== "web") {
    await Geolocation.checkPermissions().then((result) => {
      if (result.location === "granted") {
        return true;
      } else {
        return false;
      }
    });
  }
  return false;
};

export const HandlePermission = async () => {
  if (Capacitor.getPlatform() !== "web") {
    await CheckPermission().then(async (result) => {
      if (result) {
        return true;
      } else {
        await Geolocation.requestPermissions().then((result) => {
          if (result.location === "granted") {
            return true;
          } else {
            return false;
          }
        });
      }
    });
  } else {
    return false;
  }
};
