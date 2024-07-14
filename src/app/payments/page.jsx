"use client"
import { PaymentArr } from '@/utils/db'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const page = () => {
    const [pageNumber, setPageNumber] = useState(1)
    const router = useRouter()
    const [data, setData] = useState()
    const [numberOfPages, setNumberOfPages] = useState(Math.ceil(PaymentArr.length / 10))
    const [search, setSearch] = useState("")
    const [sortByOrderAmount, setSortByOrderAmount] = useState("")
    const [sortByDate, setSortByDate] = useState("")



    // useEffect(() => {
    //     if (search) {
    //         let arr = PaymentArr.filter((ele) => {
    //             if (ele.orderId.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
    //                 return ele
    //             }
    //         })
    //         setData(arr.slice(0, 10))
    //     } else {
    //         let arr = PaymentArr.slice((pageNumber - 1) * 10, pageNumber * 10)
    //         setData(arr)
    //     }

    // }, [pageNumber, search])
    useEffect(() => {
        let filteredData = PaymentArr;

        if (search) {
            filteredData = filteredData.filter((ele) =>
                ele.orderId.toLocaleLowerCase().includes(search.toLocaleLowerCase())
            )
        }

        if (sortByOrderAmount) {
            filteredData.sort((a, b) => sortByOrderAmount === "asc" ? a.orderAmount - b.orderAmount : b.orderAmount - a.orderAmount)
        }

        if (sortByDate) {
            filteredData.sort((a, b) => sortByDate === "descDate" ? b.refundDate - a.refundDate : a.refundDate - b.refundDate)
        }

        const paginatedData = filteredData.slice((pageNumber - 1) * 10, pageNumber * 10)
        setData(paginatedData)
        setNumberOfPages(Math.ceil(filteredData.length / 10))
    }, [pageNumber, search, sortByOrderAmount, sortByDate])

    function convertDate(input) {
        let date = new Date(input)
        return date.toISOString().substring(0, 10)
    }


    function prevBtn() {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1)
        }
    }

    function nextBtn() {
        if (pageNumber < numberOfPages) {
            setPageNumber(pageNumber + 1)
        }
    }
    function downloadCSV() {
        const headers = ['Order ID', 'Status', 'Transaction ID', 'Refund Date', 'Order Amount'];
        const rows = data.map(item => [
            item.orderId,
            item.status,
            item.transactionId,
            convertDate(item.refundDate),
            item.orderAmount
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'transactions.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    return (
        <div>
            <div className='flex gap-2 p-2 flex-wrap'>
                <div>
                    <input type="search" placeholder='Search by order ID...' value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div>
                    <select value={sortByOrderAmount} onChange={(e) => { setSortByOrderAmount(e.target.value); setSortByDate("") }}>
                        <option value="">Sort by Order Amount</option>
                        <option value="asc">Low-To-High</option>
                        <option value="desc">Hign-To-Low</option>

                    </select>
                </div>
                <div>
                    <select value={sortByDate} onChange={(e) => { setSortByDate(e.target.value); setSortByOrderAmount("") }}>
                        <option value="">Sort by Date</option>
                        <option value="descDate">Latest-to-Oldest</option>
                        <option value="AscDate">Oldest-to-Latest</option>

                    </select>

                </div>
                <div>
                    <button onClick={downloadCSV} className={`border-3 bg-green-600  rounded-xl px-2 py-1 text-white w-[150px]`}>Download in CSV</button>
                </div>
            </div>
            <div>
                <table className='border-2 w-full'>
                    <thead>
                        <tr className='bg-blue-400'>
                            <td>Order ID</td>
                            <td>Status</td>
                            <td>Transaction ID</td>
                            <td>Refund Date</td>
                            <td>Order Amount</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((ele) => {
                                return (
                                    <tr >
                                        <td className='cursor-pointer hover:text-red-500' onClick={() => router.push(`/payments/${ele.orderId}`)}>{ele.orderId}</td>
                                        <td>{ele.status}</td>
                                        <td>{ele.transactionId}</td>
                                        <td>{convertDate(ele.refundDate)}</td>
                                        <td>{ele.orderAmount}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className='flex justify-center gap-5 mt-1'>
                <button onClick={prevBtn} className={`border-3 ${pageNumber !== 1 ? "bg-green-600" : "bg-green-300"}  rounded-xl px-2 py-1 text-white w-[100px]`}>Previous</button>
                <button onClick={nextBtn} className={`border-3 ${pageNumber !== numberOfPages ? "bg-green-600" : "bg-green-300"}  rounded-xl px-2 py-1 text-white w-[100px]`}>Next</button>
            </div>
        </div>
    )
}

export default page