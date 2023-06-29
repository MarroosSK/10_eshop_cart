import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductType } from "../types/types";

interface ProductState {
  data: ProductType[];
  isLoading: boolean;
  error: string | null;
  size: string | null;
  filteredData: ProductType[];
}

const initialState: ProductState = {
  data: [],
  isLoading: false,
  error: null,
  size: null,
  filteredData: [],
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get<ProductType[]>(
      "https://one0-eshop-api.onrender.com/products"
    );
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filterBySize: (state, action: PayloadAction<string>) => {
      state.filteredData = state.data.filter((product) => {
        const sizes = product.availableSizes.map((size) => size.sizeSize);
        return sizes.includes(action.payload);
      });
      state.size = action.payload;
    },
    clearFilter: (state) => {
      state.filteredData = [];
      state.size = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.filteredData = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.isLoading = false;
        state.error = "Failed to load data.";
      });
  },
});

export const { filterBySize, clearFilter } = productSlice.actions;

export default productSlice.reducer;