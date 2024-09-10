import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HisabCard from "./hisabcard";
import { Outlet } from "react-router";
import { RetriveHisabUnder } from "./hisabs";
import { change, setHisab, setIsEditing } from "../store/authSlice";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
function MainPage() {
  const isEditing = useSelector(state=>state.auth.isEditing);
    const changeState=useSelector((state)=>state.auth.change)
    const dispatch=useDispatch()
    const id=useSelector((state)=>state.auth.hisabId)
  
  const [hisabName,setHisabName]=useState("")
  const [phnNo,setPhnNo]=useState("")
  const [fullName,setfullName]=useState("")
 const navigate=useNavigate()
  const hisab=useSelector(state=>state.auth.hisab)
  console.log("ghcfgfjhnhjh",hisab)

    function hisabValue(){
      let prevalue=0
      hisab.map((hisab)=>prevalue=prevalue+hisab.totalValue)
      return prevalue
    }
    console.log(hisabValue())

  const [article,setarticle]=useState("")
  const [amount,setAmount]=useState("")
  const [quantity,setQuantity]=useState("")
  const [totalValue,setTotalValue]=useState("")
  const addHisab= async(e)=>{
    e.preventDefault();
      const formdata=new FormData()
      formdata.append("hisabName",hisabName)
      formdata.append("phnNo",phnNo)
      formdata.append("fullname",fullName)
      
      
      try {
          const response=await fetch("http://localhost:8000/api/v1/hisabname/createhisabuser", {
              method: "POST",
              credentials: 'include',
              body:formdata
            })
      
            if(!response.ok){
              throw new Error(`HTTP error! status: ${response.status}`);
            }
      
            const data=await response.json()

            if(!data){
                throw new Error('something wrong')
            }
            console.log(data)

            dispatch(change())
            
            setHisabName("");
            setPhnNo("");
             setfullName("");
      } catch (error) {
          console.log(error)
      }
    }

    console.log("id",id)
const addUnderHisab=async(e)=>{
  e.preventDefault()
  const formdata=new FormData()
  formdata.append("article",article)
  formdata.append("quantity",quantity)
  formdata.append("amount",amount)
  formdata.append("_id",id)
  formdata.append("totalValue",totalValue)
  try {
   const response= await fetch("/api/v1/hisab/createhisab",{
      method:"POST",
      credentials:"include",
      body:formdata
    })
     if(!response.ok){
      throw new Error(response.status)
     }
     setAmount("")
     setQuantity("")
     setarticle("")
     setTotalValue("")
     
     const result=await response.json()
     console.log(result)
     const hisab=await RetriveHisabUnder(id)
     dispatch(setHisab(hisab))
  } catch (error) {
    console.log(error)
  }
}


    const logout=async()=>{
      try {
        const response=await fetch("http://localhost:8000/api/v1/users/logout",{
          method:"GET",
          credentials:"include"
        })
        if(!response.ok){
          throw new Error(response.status)
        }
        const result=await response.json()
        console.log(result)
        navigate("/")
      } catch (error) {
        console.log("error")
      }
    }

    const getUser=async ()=>{
      try {
        const response=await fetch("http://localhost:8000/api/v1/users/getuser",{
          credentials:"include"
        })
        if(!response.ok){
          throw new Error(response.status)
        }
        const result=await response.json()
        console.log(result.data.user)
        
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
    const isLoggedIn = useSelector((state) => state.auth.status);

    const location=useLocation()
    
    useEffect(()=>setTotalValue(amount*quantity),[
      amount,quantity
    ])
    
   
    

  return (  
    <>
        <div className="bg-zinc-800 h-screen  flex flex-col m-0 p-0" onClick={()=>{if(isEditing){return dispatch(setIsEditing())}}} >
        <header className="fixed top-0 w-screen ">
    <div className=" bg-zinc-800">
      <div className="bg-zinc-900 w-full h-16 box-border border-b-4 border-green-400">
        <nav>
          <div className="p-4 box-border pl-20 flex justify-between">
            <span>
            <span className='text-gray-400 text-2xl w-24 mb-6'>E<span className='text-green-400'>-</span>H<span className='text-green-400'>is</span>ab</span>
            </span>
            
            <button className="mr-5 hover:text-green-400 text-white bg-green-400 rounded-xl hover:bg-white hover:border-2 w-20 hover:scale-105" onClick={logout}>
              Logout
            </button>
          </div>
          
        </nav>
      </div>

        <div className="h-30 bg-gradient-to-t from-zinc-800 to-zinc-900 p-6 text-lg text-green-400  box-border" >
        {
          location.pathname=="/main/retrive"?(<form onSubmit={addHisab} >
                  
          <label htmlFor="hisabName" className="pl-10 pr-5">Hisab Name  :</label>
          <input type="text" value={hisabName} onChange={(e)=>setHisabName(e.target.value)} className="rounded-lg   bg-zinc-800 border-2 border-white pl-5  focus:border-green-400 outline-none" />
          <label htmlFor="phnNo"className="pl-10 pr-5">Phone no  :</label>
          <input type="text" value={phnNo} onChange={(e)=>setPhnNo(e.target.value)} className="rounded-lg  bg-zinc-800 border-2 border-white pl-5  focus:border-green-400 outline-none" />
          <label htmlFor="fullname"className="pl-10 pr-5">FullName  :</label>
          <input type="text" value={fullName} onChange={(e)=>setfullName(e.target.value)} className="rounded-lg   bg-zinc-800 border-2 border-white pl-5  focus:border-green-400 outline-none" />

          <button type="submit" className="mx-10 py-1 text-white px-4 border-2 rounded-2xl bg-green-400 hover:bg-white hover:text-green-400 text-base hover:scale-110">Add Hisab</button>
  </form>):<form onSubmit={addUnderHisab}>



          <label htmlFor="article" className="pl-10 pr-5">Article  :</label>
          <input type="text" value={article} onChange={(e)=>setarticle(e.target.value)} className="rounded-lg   bg-zinc-800 border-2 border-white pl-5  focus:border-green-400 outline-none" />
          <label htmlFor="amount"className="pl-10 pr-5">Amount  :</label>
          <input type="text" value={amount} onChange={(e)=>setAmount(e.target.value)} className="rounded-lg  bg-zinc-800 border-2 border-white pl-5  focus:border-green-400 outline-none" />
          <label htmlFor="quantity"className="pl-10 pr-5">Quantity  :</label>
          <input type="text" value={quantity} onChange={(e)=>setQuantity(e.target.value)} className="rounded-lg   bg-zinc-800 border-2 border-white pl-5  focus:border-green-400 outline-none" />
            

          <label htmlFor="quantity"className="pl-10 pr-5">TOTAL  :</label>
          <input readOnly type="text" value={totalValue}  className="rounded-lg   bg-zinc-800 border-2 border-white pl-5  focus:border-green-400 outline-none" />
          <button type="submit" className="absolute right-24 top-36 text-white px-4 border-2 rounded-2xl bg-green-400 hover:bg-white hover:text-green-400 text-base hover:scale-110">Add Hisab</button>
  </form>
        }
        </div >

      

      
      </div>

      
    </header >
       <main className="mt-36 bg-zinc-800 ">
        <Outlet/>
       </main>

      <footer className="">

      {
        location.pathname=="/main/hisabs"?(
          <div className="w-screen bg-gradient-to-t from-zinc-900 to-zinc-800  fixed bottom-0 h-14 flex justify-end items-center ">
            <div className="  fixed bottom-0 h-14 flex justify-end items-center mr-20 gap-10">
                <label htmlFor="hisabValue" className="text-xl text-white">Hisab Value</label>
                <input type="text" id="hisabValue" className="bg-gradient-to-t from-zinc-900 to-zinc-800 px-4  border-2 text-white" readOnly value={hisab?hisabValue():0} />
            </div>
          </div>
        ):null
      }
      </footer>
        </div>
    </>
  );
}

export default MainPage;
