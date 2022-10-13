import { useRouter } from 'next/router'
import React from 'react'
import SingleProduct from '../../components/products/SingleProduct'
import data from '../../utils/data'


const Product = () => {
    const router = useRouter()
    const {product} = router.query
    const item = data.products.filter(e => e.slug === product)
    
  return (
    <div>
       {router.isReady && <SingleProduct item={item[0]} product = {product}/>} 
    </div>
  )
}

export default Product