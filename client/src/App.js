import { Link, Route, Routes, useNavigate } from "react-router-dom";
import FormwithYup from "./component/FormwithYup";
import FormwithZod from "./component/FormwithZod";
import { useEffect, useState } from "react";
import Axios from 'axios'
function App() {
  const [currentTab, setCurrentTab] = useState("first");
  const [data,setData] = useState([])
  const navigate =useNavigate()
  const client = Axios.create({
    baseURL : "http://localhost:8080"
  })

  useEffect(()=>{
    const fetchdata= async()=>{
      try {
         const datas = await client.get("/users")
         setData(datas.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchdata()
  },[])


  const handleSelect = (eventKey) => {
    setCurrentTab(eventKey);
  }; 
  return (
    <div className="App">
      <div className="container mt-2">
        <div className="float-start col-12">
          <ul className="nav nav-tabs mb-2">
            <li className="nav-item">
                <Link to="/"  onClick={() => handleSelect("first")}  style={ currentTab === "first" ? { background:'white', color:'rgb(49, 101, 213)'} : {color : 'white'} }  
              className="nav-link">Zod Form</Link>
              </li> 
              <li className="nav-item">
                <Link to="/yup" onClick={() => handleSelect("second")}  style={ currentTab === "second" ? { background:'white', color:'rgb(49, 101, 213)'} : {color : 'white'} }
                className="nav-link">Yup Form</Link>
              </li>
            </ul>
          </div>
      </div>
    <Routes>
      <Route index element={<FormwithZod  client={client} setData={setData} navigate={navigate}/>}/>
      <Route path="/yup" element={<FormwithYup client={client} setData={setData} navigate={navigate}/>}/>
    </Routes>
    </div>
  );
}

export default App;
