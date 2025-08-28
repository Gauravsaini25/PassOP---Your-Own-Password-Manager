import React from 'react'

const Navbar = () => {
    return (
        <div className=' text-white font-bold text-xl h-[7vh] w-[100%] bg-[#1d293b] flex items-center justify-between'>
            <div className="logo mx-8">
                <span className='text-green-600'>&lt;</span><span>Pass</span><span className='text-green-600'>OP/&#62;</span>
            </div>

            <div className='flex items-center gap-2 mx-8 text-[16px] h-[40px] w-[120px] bg-[#187f3f] justify-center rounded-full ring ring-white cursor-pointer'>
                <svg
                    viewBox="0 0 24 24"
                    width="32"
                    height="32"
                    xmlns="http://www.w3.org/2000/svg"
                >
                 <circle cx="12" cy="12" r="11" fill="#cdd7c5" />
                 <path
                        fill="#187f3f"
                        d="M12 1C5.923 1 1 5.923 1 12c0 4.867 3.149 8.979 7.521 10.436.55.096.756-.233.756-.522 0-.262-.013-1.128-.013-2.049-2.764.509-3.479-.674-3.699-1.292-.124-.317-.66-1.293-1.127-1.554-.385-.207-.936-.715-.014-.729.866-.014 1.485.797 1.691 1.128.99 1.663 2.571 1.196 3.204.907.096-.715.385-1.196.701-1.471-2.448-.275-5.005-1.224-5.005-5.432 0-1.196.426-2.186 1.128-2.956-.111-.275-.496-1.402.11-2.915 0 0 .921-.288 3.024 1.128a10.193 10.193 0 0 1 2.75-.371c.936 0 1.871.123 2.75.371 2.104-1.43 3.025-1.128 3.025-1.128.605 1.513.221 2.64.111 2.915.701.77 1.127 1.747 1.127 2.956 0 4.222-2.571 5.157-5.019 5.432.399.344.743 1.004.743 2.035 0 1.471-.014 2.654-.014 3.025 0 .289.206.632.756.522C19.851 20.979 23 16.854 23 12c0-6.077-4.922-11-11-11Z"
                    />
                </svg>

                <div className="txt">Github</div>


            </div>


        </div>
    )
}

export default Navbar
