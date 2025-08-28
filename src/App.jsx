import { useState, useRef, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';




import './App.css'

function App() {

  const [togglepassword, settogglepassword] = useState('password')
  const [datalist, setdatalist] = useState([])

  const [url, seturl] = useState("")
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [id, setid] = useState(null)


  useEffect(() => {

    const fetchdata = async () => {
      const userdata = await fetch("http://localhost:3000/");

      const response = await userdata.json();
      console.log(response)
      setdatalist(response);
    }

    fetchdata();




  }, [])

  const inputurl = (e) => {
    seturl(e.target.value);


  }

  const inputusername = (e) => {
    setusername(e.target.value);

  }

  const inputpassword = (e) => {
    setpassword(e.target.value);
  }

  const onSubmit = async () => {
    if (url.length === 0 || password.length === 0 || username.length === 0) {
      alert("all fields are required")
      return;
    }

    
    if(id!=null){
      let user={'url': url, 'username': username, 'password': password, '_id': id}
      const res = await fetch("http://localhost:3000/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });

      
      await setid(null)
    }

    let uid = uuidv4();
    let data = { 'url': url, 'username': username, 'password': password, '_id': uid }
    setdatalist([...datalist, data])
    const res = await fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    seturl("");
    setusername("");
    setpassword("");
    toast('✅Record saved successfully!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });


  };

  const handledelete = async (user) => {
    let flag = confirm("Are you sure you want to delete this record?");
    if (flag) {
      const indx = datalist.findIndex(item => item._id === user._id);

      setdatalist(datalist => datalist.filter((_, index) => index != indx));
      const res = await fetch("http://localhost:3000/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });
      toast('✅Record deleted!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }





  }

  const handleedit = async (user) => {

    const indx = datalist.findIndex(item => item._id === user._id);

    setdatalist(datalist => datalist.filter((_, index) => index != indx));
    setid(user._id)

    seturl(user.url)
    setusername(user.username)
    setpassword(user.password)


  }

  const copytext = (txt) => {
  

    toast('✅Copied to Clipboard!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });


    navigator.clipboard.writeText(txt);

  }

  return (

    <>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Navbar />
      <main className='bg-[#f0fcf3] h-[83vh] w-full flex flex-col max-[1400px]:items-center'>
        <div className="  w-[70%] h-full mx-auto  flex flex-col  pt-10 max-[1400px]:m-0 max-[1400px]:w-full max-sm:pt-0">
          <div className="first flex flex-col items-center">
            <div className="logo text-3xl font-bold ">
              <span className='text-green-600'>&lt;</span><span>Pass</span><span className='text-green-600'>OP/&#62;</span>
            </div>
            <div className="smalltext text-gray-400">Your own Password Manager</div>
          </div>

          <div className="second w-full my-4">
            <div className='w-full flex flex-col items-center'>
              <input type="text" name="url" required={true} value={url} onChange={inputurl} className='bg-white w-[95%] rounded-full py-2 px-2  max-sm:p-0' placeholder='Enter Website Url' />

              <div className="user w-full mt-4 flex max-[800px]:flex-col justify-around mx-4 max-[800px]:mx-0 max-[800px]:items-center max-[800px]:gap-y-4">
                <input type="text" name="username" required={true} value={username} onChange={inputusername} className='bg-white w-[54%] rounded-full py-2 px-2 max-[800px]:w-[95%] max-sm:p-0' placeholder='Enter Username' />
                <div className='w-[35%] bg-white rounded-full flex items-center relative max-[800px]:w-[95%] ' >
                  <input type={togglepassword} name='password' required={true} value={password} onChange={inputpassword} className='bg-white w-[80%] rounded-full py-2 px-2 outline-0 max-[800px]:w-[100%] max-sm:p-0' placeholder='Enter password' />

                  <div onClick={() => {
                    if (togglepassword === 'password') {
                      settogglepassword('text');
                    } else {
                      settogglepassword('password')
                    }

                  }} >
                    {
                      (togglepassword === 'password') ? <svg className='w-[23px] cursor-pointer  absolute right-2 top-2 max-sm:w-[17px] max-sm:top-1' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z" fill="#0a0a0a"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 13.6394 2.42496 14.1915 3.27489 15.2957C4.97196 17.5004 7.81811 20 12 20C16.1819 20 19.028 17.5004 20.7251 15.2957C21.575 14.1915 22 13.6394 22 12C22 10.3606 21.575 9.80853 20.7251 8.70433C19.028 6.49956 16.1819 4 12 4C7.81811 4 4.97196 6.49956 3.27489 8.70433C2.42496 9.80853 2 10.3606 2 12ZM12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25Z" fill="#0a0a0a"></path> </g></svg>
                        :
                        <svg className="w-[23px] cursor-pointer absolute right-2 top-2 max-sm:w-[17px] max-sm:top-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="24" height="24" fill="white"></rect> <path fill-rule="evenodd" clip-rule="evenodd" d="M8.58579 4.71633C11.5332 3.37594 15.1293 3.91627 17.5561 6.3431L20.5579 9.34489C20.5881 9.37504 20.6179 9.40485 20.6475 9.43436C21.0546 9.84043 21.4062 10.1912 21.6188 10.5908C22.0875 11.4718 22.0875 12.5282 21.6188 13.4091C21.4062 13.8087 21.0546 14.1595 20.6475 14.5655C20.6179 14.5951 20.5881 14.6249 20.5579 14.655L20.5059 14.7071C20.1154 15.0976 19.4822 15.0976 19.0917 14.7071C18.7011 14.3165 18.7011 13.6834 19.0917 13.2929L19.1437 13.2408C19.6921 12.6924 19.8007 12.5683 19.8532 12.4697C20.0094 12.176 20.0094 11.8239 19.8532 11.5302C19.8007 11.4316 19.6921 11.3075 19.1437 10.7591L16.1419 7.75732C14.3237 5.93914 11.627 5.53041 9.41372 6.53692C8.91098 6.76554 8.31809 6.54333 8.08946 6.04059C7.86084 5.53785 8.08305 4.94496 8.58579 4.71633Z" fill="#323232"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M2.38203 4.51599C2.7211 4.08004 3.34938 4.00151 3.78533 4.34058L21.7853 18.3406C22.2213 18.6796 22.2998 19.3079 21.9607 19.7439C21.6217 20.1798 20.9934 20.2584 20.5574 19.9193L17.5965 17.6164L17.556 17.6569C14.4319 20.7811 9.36653 20.7811 6.24234 17.6569L4.07447 15.489C3.4476 14.8622 2.90746 14.3221 2.5331 13.8315C2.1319 13.3056 1.82812 12.7208 1.82812 12C1.82812 11.2792 2.1319 10.6944 2.5331 10.1686C2.90746 9.6779 3.44759 9.13783 4.07447 8.51102L4.86863 7.71687L2.55745 5.91928C2.1215 5.58021 2.04296 4.95194 2.38203 4.51599ZM12.7566 13.852L14.4455 15.1656C13.7694 15.6887 12.921 16 12 16C9.79086 16 8 14.2092 8 12C8 11.4344 8.11741 10.8962 8.32918 10.4084L10.0191 11.7228C10.0065 11.8134 10 11.906 10 12C10 13.1046 10.8954 14 12 14C12.2678 14 12.5232 13.9474 12.7566 13.852Z" fill="#323232"></path> </g></svg>
                    }

                  </div>


                </div>


              </div>

              <button onClick={onSubmit}
                className='flex items-center my-6 px-10 py-4 bg-[#50dd81] rounded-full text-[20px] font-bold border-[1px] border-black hover:bg-[#50dd92] cursor-pointer max-sm:px-3 max-sm:py-1 max-sm:text-[15px]'><lord-icon
                  src="https://cdn.lordicon.com/vjgknpfx.json"
                  trigger="hover" className="w-[43px]"
                >
                </lord-icon>Save</button>

            </div>
          </div>

          <div className="third w-full h-[54%] ">
            <h1 className='text-xl font-bold mx-3 '>Your Passwords</h1>
            <div className='hidden sm:block'>
              <table className="w-full ">
                <thead className='w-full'>
                  <tr className='bg-[#156533] text-white w-full'>
                    <th className='w-[40%]'>🔗 URL</th>
                    <th className='w-[30%]'>👤 Username</th>
                    <th className='w-[20%]'>🔒 Password</th>
                    <th className='w-[10%]'>Actions</th>
                  </tr>
                </thead>
              </table>
              <div className=' h-[75%] overflow-y-auto w-full flex flex-col'>
                {datalist.length > 0 ? datalist.map((user) => {

                  return <div key={user._id} className='w-full flex'>
                    <div className="  text-center w-[40%] flex justify-center items-center">
                      <a href={user.url} target='_blank'>{user.url}</a>
                      <div className='flex  relative group w-[70px]'>
                        <lord-icon
                          src="https://cdn.lordicon.com/jectmwqf.json"
                          trigger="hover"
                          stroke="bold"
                          colors="primary:#000000,secondary:#109173" className="mx-1 copygroup cursor-pointer" onClick={() => { copytext(user.url) }}
                        >
                        </lord-icon>
                    

                      </div>

                    </div>
                    <div className=" text-center w-[30%] flex justify-center items-center">
                      <div>{user.username}</div>
                      <div className='flex  relative group w-[70px]'>
                        <lord-icon
                          src="https://cdn.lordicon.com/jectmwqf.json"
                          trigger="hover"
                          stroke="bold"
                          colors="primary:#000000,secondary:#109173" className="mx-1 copygroup cursor-pointer" onClick={() => { copytext(user.username) }}
                        >
                        </lord-icon>
                    

                      </div>

                    </div>
                    <div className="text-center w-[20%] flex justify-center items-center">
                      <div>{"*".repeat(user.password.length)}</div>
                      <div className='flex  relative group w-[70px]'>
                        <lord-icon
                          src="https://cdn.lordicon.com/jectmwqf.json"
                          trigger="hover"
                          stroke="bold"
                          colors="primary:#000000,secondary:#109173" className="mx-1 copygroup cursor-pointer" onClick={() => { copytext(user.password) }}
                        >
                        </lord-icon>
                    

                      </div>

                    </div>
                    <div className=" text-center w-[10%]">
                      <lord-icon
                        src="https://cdn.lordicon.com/fikcyfpp.json"
                        trigger="hover" onClick={() => { handleedit(user) }} className="cursor-pointer"
                      >
                      </lord-icon>
                      <lord-icon
                        src="https://cdn.lordicon.com/jzinekkv.json"
                        trigger="hover" onClick={() => { handledelete(user) }} className="cursor-pointer">
                      </lord-icon>
                    </div>
                  </div>
                }) : <div key={uuidv4()}>No passwords to show</div>}


              </div>
            </div>

            <div className='h-[80%] w-full flex flex-wrap overflow-auto sm:hidden '>
              { datalist.length > 0?datalist.map(user => {
                return <div key={user._id} className="card mx-3  my-4 bg-gradient-to-br from-[#50dd81] to-[#3cbf6d] p-5 rounded-2xl text-black w-[500px] flex flex-col items-start shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 max-[400px]:px-0">

                  {/* Site */}
                  <div className="site flex items-center gap-2 my-2 font-semibold text-[15px] w-full relative">
                    <span><span className='bg-[#328b51] p-2 rounded-full outline-white outline-1 '>🔗 URL</span> {user.url}</span>
                    <lord-icon
                      src="https://cdn.lordicon.com/jectmwqf.json"
                      trigger="hover"
                      stroke="bold"
                      colors="primary:#000000,secondary:#109173"
                      className="mx-1 copygroup cursor-pointer hover:scale-110 transition-transform duration-200 absolute right-0"
                      onClick={() => { copytext(user.username) }}
                    >
                    </lord-icon>
                  </div>

                  {/* Username */}
                  <div className='username flex items-center gap-2 my-2 font-semibold text-[15px] w-full relative'>
                    <span><span className='bg-[#328b51] p-2 rounded-full outline-white outline-1 '>👤 Username</span> {user.username}</span>
                    <lord-icon
                      src="https://cdn.lordicon.com/jectmwqf.json"
                      trigger="hover"
                      stroke="bold"
                      colors="primary:#000000,secondary:#109173"
                      className="mx-1 copygroup cursor-pointer hover:scale-110 transition-transform duration-200 absolute right-0"
                      onClick={() => { copytext(user.username) }}
                    >
                    </lord-icon>
                  </div>

                  {/* Password */}
                  <div className='password flex items-center gap-2 my-2 font-semibold text-[15px] w-full relative'>
                    <span><span className='bg-[#328b51] p-2 rounded-full outline-white outline-1 '>🔒 Password</span> {"*".repeat(user.password.length)}</span>
                    <lord-icon
                      src="https://cdn.lordicon.com/jectmwqf.json"
                      trigger="hover"
                      stroke="bold"
                      colors="primary:#000000,secondary:#109173"
                      className="mx-1 copygroup cursor-pointer hover:scale-110 transition-transform duration-200 absolute right-0"
                      onClick={() => { copytext(user.username) }}
                    >
                    </lord-icon>
                  </div>

                  {/* Actions */}
                  <div className="actions flex items-center gap-6 my-3 font-bold ml-1 w-full relative">
                    <lord-icon
                      src="https://cdn.lordicon.com/fikcyfpp.json"
                      trigger="hover"
                      className="cursor-pointer hover:scale-110 transition-transform duration-200"
                      onClick={() => { handleedit(user) }}
                    >
                    </lord-icon>
                    <lord-icon
                      src="https://cdn.lordicon.com/jzinekkv.json"
                      trigger="hover"
                      className="cursor-pointer hover:scale-110 transition-transform duration-200"
                      onClick={() => { handledelete(user) }}
                    >
                    </lord-icon>
                  </div>

                </div>
              }): <div key={uuidv4()}>No passwords to show</div>}



            </div>
            <div>

            </div>
            {/* </div> */}





          </div>
        </div>

      </main>
      <Footer />

    </>
  )
}

export default App
