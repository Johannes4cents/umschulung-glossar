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
}));

export default miscStore;
