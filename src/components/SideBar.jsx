"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

import React, { useEffect, useState } from "react";

const menuArr = [
    { name: "Home", routes: "/" },
    { name: "Orders", routes: "/orders" },
    { name: "Products", routes: "/products" },
    { name: "Delivery", routes: "/delivery" },
    { name: "Marketing", routes: "/marketing" },
    { name: "Analytics", routes: "/analytics" },
    { name: "Payments", routes: "/payments" },
    { name: "Tools", routes: "/tools" },
    { name: "Discounts", routes: "/discounts" },
    { name: "Audience", routes: "/audience" },
    { name: "Appearance", routes: "/appearance" },
    { name: "Plugins", routes: "/plugins" },
];
const SideBar = () => {
    const pathName = usePathname()
    console.log(pathName)
    const [page, setPage] = useState(pathName)
    useEffect(() => {
        setPage(pathName)
    }, [pathName])
    return (
        <div className="h-screen bg-blue-950 text-white">
            <div className="flex gap-4 p-2 items-center" >
                <div className="w-[28px]"> <img src="https://png.pngtree.com/element_our/png/20180918/simple-square-logo-design-png_100146.jpg" alt="logo" /></div>
                <div className="text-sm">
                    <div>Nishyan</div>
                    <div><Link href="#">
                        Visit_Store
                    </Link></div>
                </div>
            </div>

            <div>

                {menuArr.map((ele) => {
                    return (
                        <div className={`${page === ele.routes ? "bg-blue-500" : ""}`} >
                            <div className="px-2 py-2" >
                                <Link href={ele.routes} onClick={() => { setPage(ele.routes) }}>{ele.name}</Link>
                            </div>
                        </div>


                    )

                })}
            </div>

        </div >
    );
};

export default SideBar;
