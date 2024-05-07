import { images } from "./constants";
import { toast } from "react-toastify";

export const setLocalStorageItem = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getLocalStorageItem = (key: string) => {
  const item = localStorage.getItem(key);
  return item;
};

export const removeLocalStorageItem = (key: string) => {
  localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
  localStorage.clear();
};

export const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};

export const errorToastWrapper = (toastErrorMessage: string) => {
  toast.error(toastErrorMessage, {
    position: "top-right",
    autoClose: 1500,
    icon: false,
  });
};
