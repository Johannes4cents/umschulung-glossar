import React from "react";
import create from "zustand";
import { clickThroughIndex, dateToTimestamp } from "../misc/helperFuncs";

const miscStore = create((set) => ({
  loggedIn: false,
  info: null,
  setInfo: (info) => {
    localStorage.setItem("info", JSON.stringify(info));
    set((state) => {
      return { info: info, loggedIn: info != null };
    });
  },
  modalOpen: false,
  closeModal: () => {
    set(() => {
      return { modalOpen: false };
    });
  },
  termPayload: null,
  setTermPayload: (payload) => {
    set(() => {
      return { termPayload: payload };
    });
  },
  openModal: () => {
    set(() => {
      return { modalOpen: true };
    });
  },
  dragCursor: null,
  setDragCursor: (cursor) => {
    set((state) => {
      return { dragCursor: cursor };
    });
  },
  clickedImages: { index: 0, images: [] },
  setClickedImages: (images, index) => {
    set((state) => {
      return { clickedImages: { index, images } };
    });
  },
  clearClickedImages: () => {
    set((state) => {
      return { clickedImages: { index: 0, images: [] } };
    });
  },

  changeClickedImageIndex: (number) => {
    set((state) => {
      let newIndex = clickThroughIndex(
        state.clickedImages.images,
        state.clickedImages.images[state.clickedImages.index],
        number
      );
      return {
        clickedImages: {
          ...state.clickedImages,
          index: newIndex,
        },
      };
    });
  },
}));

export default miscStore;
