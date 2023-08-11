import { configureStore } from '@reduxjs/toolkit'
import isLoading from './slices/isLoading'
import product from './slices/product'
import productCard from './slices/productCard'


export default configureStore({
    reducer: {
        isLoading,
        product,
        productCard
    }
})
