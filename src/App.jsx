import CreatePage from "./pages/CreatePage";
// import MyFlashcard from "./pages/MyFlashcard";
import Group from "./components/Group"
import FlashCardPage from "./pages/FlashCardPage";
// import { useState } from "react"; 
import {NavLink, BrowserRouter , Routes, Route } from 'react-router-dom'
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux'

function App() {

  const [selectedGroupId, setSelectedGroupId] = useState(null)
  const [activeGroupName, setActiveGroupName]= useState(null)
  const [activeGroupDesc, setActiveGroupDesc]= useState(null)

  const groupsStored = useSelector((state)=> state.groups)
  const cardsStored = useSelector((state)=> state.cards)


  
  useEffect(()=>{
    if(groupsStored.length !== 0){  
    localStorage.setItem("groups", JSON.stringify(groupsStored))}
  }, [groupsStored,cardsStored])
  
  useEffect(()=>{
    if(cardsStored.length !==0){
      localStorage.setItem("cards" , JSON.stringify(cardsStored))
    }
  }, [cardsStored])

  return (
    <BrowserRouter>
    <div className="bg-gray-200 w-full h-screen flex justify-center overflow-auto">
      <div className="w-[80%] min-h-[750px] h-auto m-auto overflow-auto bg-gray-200">
        <div className="">
          <h1 className="m-4 text-2xl font-monospace font-bold" >Flashcard Generator</h1>
        </div>
        <div className="flex gap-4 pl-4 border-b-[3px] border-gray-400">
           <NavLink to="/" className={({isActive})=>`text-red-600 border-red-500 font-bold ${isActive ?  "border-red-500  border-b-[3px]" : " " }  rounded-sm`}>
              Create New
            </NavLink>
            {/* NavLink to MyFlashCards */}
            <NavLink to="/Groups" className={({isActive})=>`text-red-600 border-red-500 font-bold ${isActive ?  "border-red-500  border-b-[3px]" : " " }  rounded-sm`}>
              My FlashCards
            </NavLink>  
        </div>
        <div>
        <Routes>
        <Route
              path="/"
              element={ <CreatePage/>}
            />

            {/* Route for MainGroup */}
            <Route
              path="/Groups"
              element={<Group setSelectedGroupId= {setSelectedGroupId} setActiveGroupName = {setActiveGroupName} setActiveGroupDesc = {setActiveGroupDesc}/>}
            />
            
           
             <Route
              path="/Groups/:selectedGroupName"
              element={<FlashCardPage selectedGroupId = {selectedGroupId} activeGroupName = {activeGroupName} activeGroupDesc = {activeGroupDesc}/>}
            />
        </Routes>
        {/* {showCreatePage ? <CreatePage/> : <MyFlashcard/> } */}
        </div>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App
