import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HisabCard from "./hisabcard";
import { useNavigate } from "react-router";
import { change, setHisab, setHisabId } from "../store/authSlice";
import { RetriveHisabUnder } from "./hisabs";
// Function to retrieve hisab data
const retriveHisab = async (setHisabData) => {
  try {
    const response = await fetch("http://localhost:8000/api/v1/hisabname/retrivehisabuser", {
      method: "GET",
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json(); // Assuming the API returns JSON
    setHisabData(result.data.hisabList); // Store the result in state
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

function Retrive() {
    const dispatch=useDispatch()
  const [hisabData, setHisabData] = useState([]);
  const isLoggedIn = useSelector((state) => state.auth.status);
  const chang=useSelector((state)=>state.auth.change)
  const cha=useSelector((state)=>state.auth.hisab)
  useEffect(() => {
    if (isLoggedIn) {
      retriveHisab(setHisabData);
    }
  }, [isLoggedIn,chang]);


  const navigate=useNavigate()
  const delet=async(_id)=>{
    console.log(_id)
    const url=`http://localhost:8000/api/v1/hisabname/delete?_id=${_id}`
    console.log(url)

   try {
     const response=await fetch(url,{
      method:"DELETE",
      credentials:"include"
     })
     if(!response.ok){
      throw new Error(response.status)
     }

     const result=await response.json()
     dispatch(change())
     console.log(result)
   } catch (error) {
    console.log(error)
   }
  }
  const handleCardClick = async (id) => {
    console.log('Card clicked with id:', id);
    dispatch(setHisabId(id));

    const hisab = await RetriveHisabUnder(id);
    if (hisab) {
        console.log("hisab", hisab);
        dispatch(setHisab(hisab));
        navigate("/main/hisabs");
    } else {
        console.error("Failed to retrieve hisab data");
        
    }

    
};
  return (
    <div className="bg-zinc-800 flex w-full   pt-10 justify-center text-white">
      <div className="bg-zinc-800 grid grid-rows-* w-3/4 box-border h-full grid-cols-3 justify-center gap-x-10 gap-y-40 text-white">
        {hisabData.map((hisab) => (
          <span key={hisab._id} className="box-border w-80 h-10">
            <HisabCard id={hisab._id} hisabName={hisab.hisabName} phnNo={hisab.phnNo} fullname={hisab.fullname} delet={delet} onClick={handleCardClick}  />
          </span>
        ))}
      </div>
    </div>
  );
}

export { Retrive, retriveHisab }; // Export both Retrive component and retriveHisab function
