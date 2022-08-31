import React from "react";
import create from "zustand";
import { clickThroughIndex, dateToTimestamp } from "../misc/helperFuncs";

const miscStore = create((set) => ({
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
}));

export default miscStore;
