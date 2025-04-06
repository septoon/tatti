import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type ServicePackage = {
  id: number;
  name: string;
  price: number;
  cost: string;
  includes: string[];
  image: string;
};

type ExtraService = {
  id: number;
  name: string;
  price: number;
  cost: string;
  note: string;
  image: string;
};

type ServicePackages = {
  packages: ServicePackage[];
  extras: ExtraService[];
};

type ServiceState = {
  data: ServicePackages | null;
  loading: boolean;
  error: string | null;
};

const initialState: ServiceState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchServicePackages = createAsyncThunk(
  'services/fetchServicePackages',
  async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/servicePackages.json`);
    return response.data;
  }
);

const serviceSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServicePackages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServicePackages.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchServicePackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при загрузке данных';
      });
  },
});

export default serviceSlice.reducer;
