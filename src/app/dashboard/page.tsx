'use client';

import ProtectedRoute from '@/components/ProtectedRoute'
import React from 'react'
import {FaUserTie } from 'react-icons/fa';
import DashboardTab from '../../components/DashboardTab';
import './dashboard.scss';

const page = () => {
    const statsObj = [
        {
            icon: <FaUserTie size={50} />,
            count: 10,
            title: "Total Products",
        },
        {
            icon: <FaUserTie size={50} />,
            count: 10,
            title: "Total Products",
        },
        {
            icon: <FaUserTie size={50} />,
            count: 10,
            title: "Total Products",
        },
        {
            icon: <FaUserTie size={50} />,
            count: 10,
            title: "Total Products",
        },
    ]

    const stats = statsObj.map(obj => {
        return (
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                        <div className=" stats-container" 
                        // style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} 
                        >
                            <div className="user-icon" 
                            // viewBox="0 0 24 24"
                            >
                                {obj.icon}
                            </div>
                            <h2 className="num-text" 
                            // style={{ color: mode === 'dark' ? 'white' : ''}}
                            >{obj.count}</h2>
                            <p className=" stat-title" 
                            // style={{ color: mode === 'dark' ? 'white' : ''}}
                            >{obj.title}</p>
                        </div>
                    </div>
        )
    })
  return (
    <ProtectedRoute>
        <section className="text-gray-600 body-font mt-10 mb-10">
            <div className="container px-5 mx-auto mb-10">
                <div className="flex flex-wrap -m-4 text-center border-2 border-red-500">
                    
                    {stats}
                    {/* <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                        <div className=" border-2 hover:shadow-purple-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300    px-4 py-3 rounded-xl" 
                        // style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }}
                        >
                            <div className="text-purple-500 w-12 h-12 mb-3 inline-block" 
                            // viewBox="0 0 24 24"
                            >
                                <FaUserTie size={50} />
                            </div>
                            <h2 className="title-font font-medium text-3xl text-black fonts1" 
                            // style={{ color: mode === 'dark' ? 'white' : ''}}
                            >10</h2>
                            <p className=" text-purple-500  font-bold"
                            //  style={{ color: mode === 'dark' ? 'white' : ''}}
                             >Total Orders</p>
                        </div>
                    </div>
                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                        <div className=" border-2 hover:shadow-purple-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300    px-4 py-3 rounded-xl" 
                        // style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }}
                         >
                            <div className="text-purple-500 w-12 h-12 mb-3 inline-block"
                            //  viewBox="0 0 24 24"
                             >
                                <FaUserTie size={50} />
                            </div>
                            <h2 className="title-font font-medium text-3xl text-black fonts1" 
                            // style={{ color: mode === 'dark' ? 'white' : ''}}
                            >20</h2>
                            <p className=" text-purple-500  font-bold" 
                            // style={{ color: mode === 'dark' ? 'white' : ''}}
                            >Total Users</p>
                        </div>
                    </div>
                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                        <div className=" border-2 hover:shadow-purple-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300    px-4 py-3 rounded-xl" 
                        // style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }}
                        >
                            <div className="text-purple-500 w-12 h-12 mb-3 inline-block" 
                            // viewBox="0 0 24 24"
                            >
                                <FaUserTie size={50} />
                            </div>
                            <h2 className="title-font font-medium text-3xl text-black fonts1"
                            //  style={{ color: mode === 'dark' ? 'white' : ''}}
                             >20</h2>
                            <p className=" text-purple-500  font-bold" 
                            // style={{ color: mode === 'dark' ? 'white' : ''}}
                            >Total Products</p>
                        </div>
                    </div> */}
                </div>
            </div>
            <DashboardTab/>
        </section>
    </ProtectedRoute>
  )
}

export default page