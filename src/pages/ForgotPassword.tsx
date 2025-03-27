import educationImage from '../assets/education.svg'
import { Input } from "antd";

function ForgotPassword() {
    return (
        <div className='h-[100vh] w-[100%]'>
            <div className='h-[60px] w-[100%] bg-[#A03037] flex justify-center fixed z-100'>
                <div className='h-[100%] w-[70%] max-w-7xl flex justify-between max-sm:w-[100%] max-lg:w-[90%]'>
                    <div className='h-[100%] w-[200px] flex items-center justify-center gap-5 max-sm:gap-2'>
                        <img src={educationImage} alt='Image Not Found' className='max-sm:h-[15px]' />
                        <p className='text-white text-[25px] max-sm:text-[18px]'>BookStore</p>
                    </div>
                </div>
            </div>
            <div className='flex justify-center items-center h-[100%]'>
                <div>
                    <h1 className='text-center text-[30px] font-bold !mb-[25px] max-[475px]:text-[25px] max-[475px]:!mb-[15px]'>Forgot Your Password?</h1>
                    <div className='border rounded-t-[3px] border-[#E4E4E4] h-[275px] w-[425px] flex flex-col items-center justify-center max-[475px]:w-[350px] max-[350px]:w-[300px]'>
                        <div className='w-[80%] flex flex-col gap-[15px]'>
                            <p className='text-[#878787]'>Enter your email address and we'll send you a link to reset your password</p>
                            <div>
                                <label className="text-[15px]">Email Id: </label>
                                <Input
                                    className={`w-[80%] h-[45px] rounded-[0px]`}
                                    placeholder="Enter Email"
                                />
                            </div>
                            <button className='bg-[#A03037] rounded-[3px] h-[45px] text-white'>Reset Password</button>
                        </div>
                    </div>
                    <div className='bg-[#F9F9F8] rounded-b-[3px] border border-[#E4E4E4] h-[100px] w-[425px] flex flex-col items-center justify-center max-[475px]:w-[350px] max-[350px]:w-[300px]'>
                        CREATE ACCOUNT
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
