import { useRouter } from 'next/router'
import React from 'react'

const Unauthenticated = () => {

    const router = useRouter()
    const {message} = router.query
  return (
    <div className='text-center mt-28'>
        <h2 className='font-bold capitalize text-4xl'>Unauthenticated</h2>
        <p className=' text-red-500 font-bold capitalize text-2xl mt-8'>{message}</p>
    </div>
  )
}

export default Unauthenticated