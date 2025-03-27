import { useEffect, useState } from 'react';

type MyCartContainerProps = {
    isContinueClicked: boolean;
}

function AddressCart({isContinueClicked}:MyCartContainerProps) {
    const [isAccordionOpen, setIsAccordionOpen] = useState(isContinueClicked);

    useEffect(() => {
        setIsAccordionOpen(isContinueClicked);
    }, [isContinueClicked]);

    const toggleAccordion = () => {
        setIsAccordionOpen(!isAccordionOpen);
    };

    return (
        <div className="!mb-[50px] flex flex-col items-center px-4">
            <div className="w-[68%] mt-[60px] max-[1020px]:w-[90%] max-md:w-[90%]">
                <div className='border border-[#acabab] w-full max-w-[775px] flex flex-col'>
                    <div
                        className='!py-[15px] w-full flex justify-between md:flex-row items-center max-[550px]:!mt-[0px] max-[550px]:gap-[15px] max-[550px]:!px-[10px] cursor-pointer'
                        onClick={toggleAccordion}
                    >
                        <div className='flex items-center'>
                            <p className='text-[18px] !ml-[15px]'>Customer Details</p>
                        </div>
                        <div className="md:min-w-[155px] max-md:mt-2 max-[550px]:w-[175px] max-[550px]:!mb-[10px] !mr-[30px] max-[550px]:!mr-[0px] flex items-center gap-2">
                            <button
                                onClick={(e) => e.stopPropagation()}
                                className='!px-[25px] !py-[7px] border border-[#A03037] rounded-[3px] text-[#A03037] text-[14px] cursor-pointer'
                            >
                                Add New Address
                            </button>
                        </div>
                    </div>
                    {isAccordionOpen && (
                        <div className='!pl-[15px] min-h-[250px] max-[550px]:!ml-[0px] md:min-h-[250px] w-full max-w-[775px] flex flex-col p-4 max-[550px]:h-auto'>
                            <div className='w-[100%] flex flex-col !mb-3 p-3 h-auto gap-y-5'>
                                <div className='w-full md:w-[80%] flex flex-col gap-y-5'>
                                    <div className='flex flex-col md:flex-row gap-y-5 md:gap-x-5 w-[100%]'>
                                        <div className='flex flex-col justify-left !pr-[10px]'>
                                            <p className='text-[12px]'>
                                                Full Name
                                            </p>
                                            <input
                                                type="text"
                                                className="!py-[10px] !px-[15px] w-full md:w-[290px] !h-[50px] border border-[#DCDCDC] rounded-[3px]"
                                                value={""}
                                            />
                                        </div>

                                        <div className='flex flex-col justify-left !pr-[10px]'>
                                            <p className='text-[12px]'>
                                                Mobile Number
                                            </p>
                                            <input
                                                type="text"
                                                className="!py-[10px] !px-[15px] w-full md:w-[290px] !h-[50px] border border-[#DCDCDC] rounded-[3px]"
                                                value={""}
                                            />
                                        </div>
                                    </div>

                                    <div className='flex flex-col gap-y-5'>
                                        <div className='flex gap-x-10 items-center'>
                                            <div className='flex gap-x-2 items-center'>
                                                <img
                                                    src="" alt=""
                                                    className='w-[15px] h-[15px]' />
                                                <p className='font-semibold'>1.WORK</p>
                                            </div>
                                            <div>
                                                <p className='text-[#A03037] font-semibold cursor-pointer'>Edit</p>
                                            </div>
                                        </div>
                                        <div className='!pr-[10px]'>
                                            <p>Address</p>
                                            <textarea
                                                value={"BridgeLabz Solutions LLP, No. 42, 14th Main, 15th Cross, Sector 4, Opp to BDA complex, near Kumarakom restaurant, HSR Layout, Bangalore"}
                                                className='border border-[#DCDCDC] w-[100%] h-[85px] text-[12px] !p-[10px] text-[#878787] align-left resize-none rounded-[3px] bg-[#F5F5F5]'
                                            />
                                        </div>
                                        <div className='flex flex-col md:flex-row gap-y-5 md:gap-x-5 !pr-[10px]'>
                                            <div className='flex flex-col justify-left'>
                                                <p className='text-[12px]'>
                                                    City/Town
                                                </p>
                                                <input
                                                    type="text"
                                                    className="!py-[10px] !px-[15px] w-full md:w-[290px] !h-[50px] border border-[#DCDCDC] rounded-[3px] bg-[#F5F5F5]"
                                                    value={"Bengaluru"}
                                                />
                                            </div>
                                            <div className='flex flex-col justify-left'>
                                                <p className='text-[12px]'>
                                                    State
                                                </p>
                                                <input
                                                    type="text"
                                                    className="!py-[10px] !px-[15px] w-full md:w-[290px] !h-[50px] border border-[#DCDCDC] rounded-[3px] bg-[#F5F5F5]"
                                                    value={"Karnataka"}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-end w-[98%] !mb-[20px]'>
                                    <button className='bg-[#3371B5] text-white text-[15px] !px-[30px] !py-[7px] rounded-[3px] cursor-pointer'>
                                        CONTINUE
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AddressCart;