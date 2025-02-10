import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import EmployeeModal from './EmployeeModal';

const HexTeam = ({ buttons, team1, team2 }) => {
    const [isDirTeam, setIsDirTeam] = useState(true)
    const [isDetail, setIsDetail] = useState(false);

    const [currentId, setCurrentId] = useState('');

    useEffect(() => {
        if (isDetail) {
            document.body.classList.add("overflow-y-hidden")
        } else {
            document.body.classList.remove("overflow-y-hidden")
        }
    }, [isDetail])

    return (
        <div className='max-w-[1200px] mx-auto h-auto'>
            <div className='w-full flex items-center gap-6 justify-center '>
                {buttons?.map((item) =>
                    <>
                        {item?.UID === "1" && <p className={`${isDirTeam && "text-green"} text-center hover:text-green text-2xl text-gray-400 group cursor-pointer`} onClick={() => setIsDirTeam(true)}>{item?.title}<span className={`${isDirTeam && '!text-dark-green'} block text-3xl font-bold group-hover:text-dark-green text-gray-400`}>{item?.description}</span></p>}
                        {item?.UID === "2" && <p className={`${!isDirTeam && "text-green"} text-center hover:text-green text-2xl text-gray-400 group cursor-pointer`} onClick={() => setIsDirTeam(false)}>{item?.title}<span className={`${!isDirTeam && '!text-dark-green'} block text-3xl font-bold group-hover:text-dark-green text-gray-400`}>{item?.description}</span></p>}
                    </>)}
            </div>
            {isDirTeam && <div className='grid grid-cols-1 lg:grid-cols-6 lg:grid-rows-5 my-20 gap-y-6 lg:gap-0 lg:-mb-[300px]'>
                {team1?.map((item, index) =>
                    <div className={` relative w-[200px] place-self-center ${index === 0
                        ? "lg:col-span-6 "
                        : index === 1 ? "lg:col-span-3 lg:-mt-[30%] lg:-mr-[20%] xl:-mr-[30%] rtl:lg:-ml-[30%] rtl:xl:-ml-[60%]" : index === 2
                            ? "lg:col-span-3 lg:-mt-[30%] lg:-ml-[20%] xl:-ml-[30%] rtl:lg:-mr-[30%] rtl:xl:-mr-[60%]"
                            : index === 3 ? "lg:col-span-2 lg:-mt-[100%] lg:mr-[40%] rtl:lg:ml-[100%] xl:-mt-[80%] xl:mr-[10%] rtl:xl:ml-[10%]" : index === 4 ? "lg:col-span-2  lg:-mt-[100%] xl:-mt-[80%]" : index === 5 ? "lg:col-span-2 lg:-mt-[100%] lg:ml-[40%] rtl:lg:mr-[100%] xl:-mt-[80%] xl:ml-[10%] rtl:xl:mr-[10%]"
                                : index === 6 ? " lg:col-span-3 lg:-mt-[100%] lg:-mr-[20%] rtl:lg:-ml-[30%] xl:-mt-[80%] xl:-mr-[30%] rtl:xl:-ml-[60%]" : index === 7
                                    ? "lg:col-span-3 lg:-ml-[20%] rtl:lg:-mr-[30%] lg:-mt-[100%] xl:-ml-[30%] rtl:xl:-mr-[60%] xl:-mt-[80%]"
                                    : "lg:col-span-6 lg:-mt-[67%] xl:-mt-[53%]"
                        }`}>
                        <img
                            src={`https://dev-api.hpdc.sa${item?.image?.url}`}

                            alt={item?.title || "Director Image"}
                            className="filter grayscale w-full hover:filter-none transition duration-300 ease-in-out"
                        />
                        {/* {index} */}
                        <div className='text-center absolute bottom-1 left-[50%] -translate-x-[50%] text-white '>
                            <p className='font-semibold text-sm'>{item?.title}</p>
                            <p className='text-xs'>{item?.role}</p>
                        </div>
                    </div>)}
            </div>}

            {!isDirTeam && <div className='grid grid-cols-1 space-x-6 md:grid-rows-3 md:grid-cols-3 place-items-center gap-y-6 my-20 max-w-[700px] mx-auto'>
                {team2?.map((item, index) =>
                    <div key={index} className={` ${index === 0 && "md:col-span-3"} relative w-[200px]`} onClick={() => {
                        setCurrentId(item?.UID)
                        setIsDetail(true)
                    }} >
                        <img
                            src={`https://dev-api.hpdc.sa${item?.Img?.url}`}

                            alt={item?.title || "Director Image"}
                            className="filter grayscale w-full hover:filter-none transition duration-300 ease-in-out"
                        />
                        <div className='text-center absolute bottom-1 left-[50%] -translate-x-[50%] text-white '>
                            <p className='font-semibold text-sm'>{item?.title}</p>
                            <p className='text-xs'>{item?.role}</p>
                        </div>
                    </div>)}
            </div>}
            <EmployeeModal isVisible={isDetail} close={() => setIsDetail(!isDetail)} id={currentId} data={team2} />
        </div>
    )
}

export default HexTeam
