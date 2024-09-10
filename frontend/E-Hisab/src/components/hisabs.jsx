import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useLocation } from "react-router"


const RetriveHisabUnder=async(_id)=>{
    
    const url = `http://localhost:8000/api/v1/hisab/retrivehisab?_id=${_id}`;
    console.log('Fetching data from:', url);
    
    try {
        const response=await fetch(url,{
            method:"GET",
            credentials:"include"
        }
   
    )

    if(!response.ok){
        throw new Error(response.status)
    }
   
    const result=await response.json()
    console.log("result",result.data.hisab)
    return result.data.hisab
    } catch (error) {
        console.log(error)
    }
}


function Hisabs(){
   const hisab=useSelector(state=>state.auth.hisab)
   
    return(
        <>
        <div className="px-20 py-10 text-2xl w-full flex justify-center flex-col box-border text-white">
                <div className=" w-2/3 p-5 flex  self-center justify-center">
                <span className="m-10">Article</span><span className="m-10">Amount</span><span className="m-10">Quantiyt</span><span className="m-10">Total Value</span>
                </div>
                    {
                        hisab?hisab.map((hisab)=>{
                            return(
                                <div key={hisab._id} className=" w-2/3 self-center p-5 hover:scale-105 hover:border-2 rounded-2xl flex  justify-center text-xl text-white border-box hover:text-green-400 " onClick={() => onClick(id)}>
                                
                                    <div className="flex justify-center w-2/3">
                                        <input readOnly className="text-white mx-10  bg-zinc-800 w-24 " value={hisab.article} /> 
                                        <input readOnly className="text-white mx-10  bg-zinc-800 w-24 " value={hisab.amount} /> 
                                        <input  readOnly className="text-white mx-10  bg-zinc-800 w-24" value={hisab.quantity}/> 
                                        <input readOnly className="text-white mx-10  bg-zinc-800  w-24" value={hisab.totalValue}/></div>
                                    
                                </div>
                            )
                        }):"no hisab"
                    }
        <span><button onClick={()=>{delet(id)}} className="text-white hover:text-green-400">delete</button></span>
        
        
    </div>
        </>
    )
}
export { Hisabs,RetriveHisabUnder}