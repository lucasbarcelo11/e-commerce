import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {setIsLoading} from './isLoading';

export const  productSlice = createSlice({
    name: 'product',
    initialState: [],
    reducers: {
        setProduct: (state, action) => {
            return action.payload
        }
    }

})

//THUNK -> Middleware

/*
export const nameTunck = (data) => (dispatch) => {
    //logica, instrucciones, peticiones
    dipatch(actionName())
    dispatch(actionName2())
}
//Closures
*/

export const getProductThunk = () => (dispatch) => {
    //Traer la info de los productos
    dispatch(setIsLoading(true))
    axios
        .get('https://e-commerce-api-v2.academlo.tech/api/v1/products')
        .then(res => dispatch(setProduct(res.data)) )
        .catch(err => console.log(err))
        .finally(() =>  dispatch(setIsLoading(false)))
}

export const getProductCategoryThunk = id => dispatch =>{
    dispatch(setIsLoading(true))
    axios
        .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?categoryId=${id}`)
        .then(res => dispatch(setProduct(res.data)))
        .catch(err => console.log(err))
        .finally(() =>  dispatch(setIsLoading(false)))
}

export const { setProduct } = productSlice.actions;

export default productSlice.reducer;
