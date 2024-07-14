import { PaymentArr } from '@/utils/db'
import React from 'react'

const page = ({ params }) => {
    const orderId = params.orderId
    const data = PaymentArr.filter((e) => {
        if (e.orderId === orderId) {
            return e
        }
    })[0]
    return (
        <div >
            <h1 className='bold text-center text-xl'>Transaction details</h1>
            <div className='border-2 flex flex-col w-fit m-auto p-10 gap-2 mt-5 rounded-md'>
                <p>OrderId: {data.orderId}</p>
                <p>Status: {data.status}</p>
                <p>Transacation Id: {data.transactionId}</p>
                <p>Refund date: {(new Date(data.refundDate)).toISOString().substring(0, 10)}</p>
                <p>Order Amount: {data.orderAmount}</p>
            </div>

        </div>
    )
}

export default page