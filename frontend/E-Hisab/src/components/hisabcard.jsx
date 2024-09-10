import { useEffect, useState } from 'react';
import deleteIcon from '../assets/delete.png';
import editIcon from '../assets/edit.png';
import shareIcon from "../assets/share.png"
import { useDispatch, useSelector } from 'react-redux';
import { setIsEditing } from '../store/authSlice';


function HisabCard({ id, hisabName, phnNo, fullname, onClick, delet }) {
  // State for all input fields
  const [inputHisabName, setInputHisabName] = useState(hisabName);
  const [inputPhnNo, setInputPhnNo] = useState(phnNo);
  const [inputFullname, setInputFullname] = useState(fullname);
  const [display, setDisplay] = useState(false);
  const [username,setUsername]=useState('')
  const [displayShareBox,setDisplayShareBox]= useState(false);
  const [displayShareList,setDisplayShareList]= useState(false);
  const [isShared,setIsShared]=useState([])
  // Get isEditing state from Redux store
  const isEditing = useSelector(state => state.auth.isEditing);
  const dispatch = useDispatch();
  const [shareBoxPosition, setShareBoxPosition] = useState({ top: 0, left: 0 });
  const [shareListPosition, setShareListPosition] = useState({ top: 0, left: 0 });
  const updateHisab = async (id) => {
    const formData = new FormData();
    formData.append('hisabName', inputHisabName);
    formData.append('phnNo', inputPhnNo);
    formData.append('fullname', inputFullname);
    formData.append('_id', id);

    try {
      const response = await fetch('http://localhost:8000/api/v1/hisabname/updatehisab', {
        method: 'PATCH',
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log('Error updating hisab:', error);
    }
  };

  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      dispatch(setIsEditing())
      updateHisab(id);
    }


   
   
  };


  const shareHisab=async(id,username)=>{
    const formdata=new FormData()
    formdata.append("hisabNameid",id)
    formdata.append("username",username)
    setUsername("")

    try {
        const response=await fetch("http://localhost:8000/api/v1/users/sharehisab",{
            method:"POST",
            credentials:"include",
            body:formdata
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
    
          const result = await response.json();
          console.log(result);
          
    } catch (error) {
        console.log('Error updating hisab:', error);
    }
}




const toggleShareBox = (event) => {
  const { top, left, height } = event.currentTarget.getBoundingClientRect();
  setShareBoxPosition({ top: top + height, left }); // Position shareBox below the button
  setDisplayShareBox(prevState => !prevState); // Toggle displayShareBox state
};

const sharedTo=async()=>{
  console.log("SRGDTGTG",id)
  const url=`http://localhost:8000/api/v1/users/sharedto?_id=${id}`
  try {
      const response=await fetch(url,{
          method:"GET",
          credentials:"include"
      })
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const result = await response.json();
        console.log(result.data.isShared);
        return result.data.isShared
      
  } catch (error) {
      console.log(error)
  }
}

   function shareBox(){
    return(
        <div style={{ position: 'absolute', top: shareBoxPosition.top, left: shareBoxPosition.left }} onClick={e=>e.stopPropagation()} onMouseLeave={toggleShareBox} className="bg-zinc-700  px-5 rounded-xl shadow p-2 ">
            <div className='flex p-2 border-1 rounded-xl'>
                <input type="text" value={username} onChange={e=>setUsername(e.target.value)} className='bg-zinc-700' placeholder='enter username'/>
            </div>
            <div>
                <button onClick={toggleShareBox} className='pl-2 text-white hover:text-green-400'>cancel</button><button  className='pl-2 text-white hover:text-green-400' onClick={()=>shareHisab(id,username)}>Share</button>
            </div>
        </div>
    )
   }

   const[deleted,setDeleted]=useState(0)
   useEffect(() => {
    const fetchData = async () => {
      const sharedUsers = await sharedTo();
      setIsShared(sharedUsers);
    };
  
    fetchData();
  }, [displayShareList,deleted]);


   function toggleShareList(e){
    console.log(id)
    const { top, left, height } = e.currentTarget.getBoundingClientRect();
    setShareListPosition({ top: top + height, left }); // Position shareBox below the button
    setDisplayShareList((prevdisplay) => !prevdisplay )
   }

   const [objectid,setObjectid]=useState("")
   async function removeShare(){
    console.log("ggihu",objectid)
    const url=`http://localhost:8000/api/v1/hisabname/deletesharehisab?_id=${id}&objectid=${objectid}`
    console.log(url)
      try {
        const response=await fetch(url,{
          method:'DELETE'
        })
        if(!response.ok){
          throw new Error(response.status)
        }
        const result=await response.json()
        console.log(result)
        setDeleted(prevstate=>prevstate+1)

      } catch (error) {
        console.log(error)
      }
   }
   useEffect(() => {
    if (objectid) {
      removeShare();
    }
  }, [objectid]);

   function shareList() {
    sharedTo()
    return (
      <div style={{ position: 'absolute', top: shareListPosition.top, left: shareListPosition.left }} onClick={e=>e.stopPropagation()} onMouseLeave={()=>setDisplayShareList(false)} className="bg-zinc-700  px-5 rounded-xl shadow p-2 text-white text-sm ">
        Shared-to
        <ul>
          {isShared.map((shared) => (
            
            <span key={shared._id}  className='m-2 hover:text-green-400 flex flex-row gap-2 items-center justify-center'>
              <li >{shared.username}</li>
              <button className='ml-3' onClick={()=>{setObjectid(shared._id);setDeleted(prevcount=>prevcount+1)}}><img src={deleteIcon} alt="" className='h-4 w-4'/></button>
            </span>
             
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div
      className="bg-zinc-700 shadow-2xl shadow-zinc-900 rounded-2xl p-5 flex flex-col justify-center  hover:border-2 hover:text-green-400"
      onMouseEnter={() => {setDisplay(true)}}
      onMouseLeave={() => {setDisplay(prevState=>!prevState),setDisplayShareList(false),setDisplayShareBox(false)}}
      onClick={(e) => {
        if(isEditing){return e.stopPropagation()} 
        if(displayShareList){return setDisplayShareList(prev)}
        else{
            return onClick(id)
        }

      }}
    >
      <div className={`bg-zinc-700 rounded-2xl flex justify-center border-box `}>
        <div className="flex flex-col text-left m-2 gap-2 text-sm">
          <span className="text-white">Hisab Name :</span>
          <span className="text-white">Phn No :</span>
          <span className="text-white">Fullname :</span>
        </div>

        <div
          className="flex flex-col m-2 bg-zinc-700 gap-2 text-sm"
          
        >
          <input
            type="text"
            readOnly={!isEditing}
            className={`${isEditing ? 'border-2' : 'border-none'} bg-zinc-700 focus:outline-none rounded-xl `}
            value={inputHisabName}
            onClick={(e) =>{if(isEditing){return e.stopPropagation()}}}
            onChange={(e) => setInputHisabName(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, id)}
          />
          <input
            type="text"
            readOnly={!isEditing}
            className={`${isEditing ? 'border-2' : 'border-none'} bg-zinc-700 focus:outline-none rounded-xl `}
            value={inputPhnNo}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => setInputPhnNo(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, id)}
          />
          <input
            type="text"
            readOnly={!isEditing}
            className={`${isEditing ? 'border-2' : 'border-none'} bg-zinc-700 focus:outline-none rounded-xl `}
            value={inputFullname}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => setInputFullname(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, id)}
          />
        </div>
      </div>
      {
        display &&
        <div className="self-end" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => delet(id)}
            className="text-white text-right self-end hover:text-green-400 hover:scale-105"
          >
            <img className="h-4 w-4" src={deleteIcon} alt="" />
          </button>
          <button
            onClick={() => dispatch(setIsEditing())}
            className="text-white ml-2 text-right self-end hover:text-green-400 hover:scale-105"
          >
            <img className="h-4 w-4" src={editIcon} alt="" />
          </button>
          <button
           onClick={toggleShareBox}
            className="text-white ml-2 text-right self-end hover:text-green-400 hover:scale-105"
          >
            <img className="h-4 w-4" id='share' src={shareIcon} alt="" />
          </button>

          <button
            onClick={toggleShareList}
            className="text-white ml-2 text-right self-end hover:text-green-400 hover:scale-105"
          >
            ▾
          </button>
        </div>
      }
     
      {displayShareBox && shareBox()}
      {displayShareList && shareList()}
    </div>
  );
}

export default HisabCard;
