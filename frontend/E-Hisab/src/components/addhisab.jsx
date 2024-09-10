import { useState } from "react"

function AddHisab(){

    const [hisabName,setHisabName]=useState()
    const [phnNo,setPhnNo]=useState()
    const [fullName,setfullName]=useState()
    const addHisab= async(e)=>{
        
        const formdata=new FormData()
        formdata.append("hisabName",hisabName)
        formdata.append("phnNo",phnNo)
        formdata.append("fullName",fullName)
        e.preventDefault()
        try {
            const response=await fetch("http://localhost:8000/api/v1/hisabname/createhisabuser", {
                method: "post",
                credentials: 'include',
                body:formdata
              })
        
              if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`);
              }
        
              data=response.json()
              console.log(data)
        } catch (error) {
            console.log(error)
        }
      }
      return(
        <>
            
            <form onSubmit={(e)=>addHisab()}>
                
                    <label htmlFor="hisabName">Hisab Name "</label>
                    <input type="text" value={hisabName} onChange={(e)=>setHisabName(e.target.value)}/>
                    <label htmlFor="phnNo">Phone no   :</label>
                    <input type="text" value={phnNo} onChange={(e)=>setPhnNo(e.target.value)}/>
                    <label htmlFor="fullname">FullName</label>
                    <input type="text" value={fullname} onChange={(e)=>setfullName(e.target.value)}/>
                
            </form>
        </>
      )
}