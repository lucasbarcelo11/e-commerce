import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setProduct } from './product';
import { setIsLoading } from './isLoading';


export const productCardSlice = createSlice({
    name: 'productCard',
    initialState: [],
    reducers: {
        setProductCard: (state, action) => {
            return action.payload
        }
    }
})
//Read
export const getProductsThunk = () => dispatch => {
    dispatch(setIsLoading(true))
    axios
        .get('https://e-commerce-jjbn.onrender.com/carts', getConfig())
        .then(res => dispatch(setProductCard(res.data)) )
        .catch(err => console.error(err))
        .finally(() => dispatch(setIsLoading(false)))
}

//Create
export const addProductThunk = data => dispatch => {
    dispatch(setIsLoading(true))
    axios
        .post('https://e-commerce-jjbn.onrender.com/carts', data, getConfig())
        .then( () => dispatch(getProductsThunk() ) )
        .catch(err => console.error(err))
        .finally(() => dispatch(setIsLoading(false)))
}

export const updateProductsThunk = (id, prdQuantity ) => dispatch => {
    dispatch(setIsLoading(true))

    const body = {
        quantity: prdQuantity
    }

    axios
        .put(`https://e-commerce-jjbn.onrender.com/carts/${id}`, body, getConfig() )
        .then(() => dispatch(getProductsThunk()))
        .catch(err => console.error(err))
        .finally(() => dispatch(setIsLoading(false)))
}

//delete

export const deleteProductsThunk = (id) => dispatch => {
    dispatch(setIsLoading(true))
    axios
        .delete(`https://e-commerce-jjbn.onrender.com/carts/${id}`)
        .then(() => dispatch(addProductThunk()) )
        .catch(err => console.error(err))
        .finally(() => dispatch(setIsLoading(false)))
}

export const purchasesCartThunk = () => dispatch => {
    dispatch(setIsLoading(true))
    axios
        .post('https://e-commerce-jjbn.onrender.com/purchases', {}, getConfig())
        .then(() => dispatch(getProductsThunk()))
        .catch(err => console.error(err))
        .finally(() => dispatch(setIsLoading(false)))
}

export const { setProductCard } = productCardSlice.actions;

export default productCardSlice.reducer;
