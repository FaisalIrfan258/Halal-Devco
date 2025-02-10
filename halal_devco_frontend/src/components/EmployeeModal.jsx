import { X } from 'lucide-react';
import React from 'react'

const EmployeeModal = ({ isVisible, close, data, id }) => {
    if (!isVisible) return null;
    let bioData = (data?.find((item) => item?.UID === id));
    // console.log(bioData?.desc);


    return (
        <div className='fixed inset-0 backdrop-blur-sm bg-dark-green bg-opacity-80 p-10 md:p-20 text-white overflow-y-auto z-30'>
            <X className='w-10 h-10 font-semibold' onClick={() => close()} />

            <div className='flex flex-col items-center space-y-6 my-6 md:my-10 xl:px-28 md:flex-row md:items-end max-w-[1500px] mx-auto'>
                <img
                    src={`https://dev-api.hpdc.sa${bioData?.Img?.url}`}

                    alt={bioData?.title || "Director Image"}
                    className=""
                />
                <div className='space-y-2 text-center ltr:md:text-left rtl:md:text-right'>
                    <h1 className='text-3xl font-bold'>{bioData?.title}</h1>
                    <p className='text-lg'>{bioData?.role}</p>
                </div>
            </div>
            <div className='xl:px-28 text-lg max-w-[1500px] mx-auto'>
                {bioData?.desc?.map((detail, index) =>
                    <>
                        <p key={index}>{detail?.strategy}</p>
                        <br />
                    </>
                )}
            </div>
        </div>
    )
}

export default EmployeeModal
