import { createSlice } from "@reduxjs/toolkit";
import type { ProductsTypeLocal } from "../../@types";
import { getLocal, setLocal } from "../../generic/generic";

interface InitialStateType {
  data: ProductsTypeLocal[];
}
const initialState: InitialStateType = {
  data: getLocal("shop") || [],
};

export const shopSlice = createSlice({
  initialState,
  name: "shop",
  reducers: {
    getData(state, { payload }) {
      if (state.data.find((value) => value?._id === payload._id)) {
        state.data = state.data.map((value) => {
          if (value?._id === payload._id) {
            return {
              ...value,
              count: (value.count += 1),
              userPrice: value.price * value.count,
            };
          }
          return value;
        });

        setLocal("shop", state.data);
        return;
      }
      state.data = [
        ...state.data,
        { ...payload, count: 1, userPrice: payload.price },
      ];

      setLocal("shop", state.data);
    },
    deleteData(state, { payload }) {
      state.data = state.data.filter((value) => value._id !== payload);
      setLocal("shop", state.data);
    },

    increament(state, { payload }) {
      state.data = state.data.map((value) =>
        value._id === payload
          ? {
              ...value,
              count: (value.count += 1),
              userPrice: value.price * value.count,
            }
          : value
      );
      setLocal("shop", state.data);
    },

    decreament(state, { payload }) {
      state.data = state.data.map((value) =>
        value._id === payload
          ? {
              ...value,
              count: value.count >= 2 ? (value.count -= 1) : 1,
              userPrice: value.price * value.count,
            }
          : value
      );
      setLocal("shop", state.data);
    },
  },
});

export const { getData, deleteData, increament, decreament } =
  shopSlice.actions;
export default shopSlice.reducer;
