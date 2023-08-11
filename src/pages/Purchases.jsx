import { useState, useEffect } from "react"
import axios from "axios"
import { setIsLoading } from "../store/slices/isLoading"
import { useDispatch } from "react-redux"
import getConfig from "../utils/getConfig"

useState

const Purchases = () => {

  const distatch = useDispatch()
  const [purchases, setPurchases] = useState()

  useEffect(() => {
    distatch(setIsLoading(true))

    axios
      .get('https://e-commerce-api-v2.academlo.tech/api/v1/purchases', getConfig())
      .then(res => setPurchases(res.data))
      .catch(err => console.error(err))
      .finally(() => distatch(setIsLoading(false)))
  },[])

  return (
    <div>
      <h1>Compras realizadas</h1>
      <ul>
        {
          purchases?.map(item => (
            <li key={item.id}>
              <p>{item.product.title}</p>
              <p>Cantidad : {item.quantity}</p>
              <img src={item.product.images[1].url} alt="" style={{width: 150, height: 200, objectFit: 'contain' }}/>
            </li>
          ))
        }
      </ul>
      <br />
    </div>
  )
}

export default Purchases
