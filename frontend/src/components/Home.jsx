import React, { useEffect, useState, useRef } from 'react'
import Header from './Header'
import './Home.css';
import { json, useNavigate } from 'react-router-dom';
import axios from 'axios'


export default function Home({edit, setEdit}) {

  const [search, setSearch] = useState('');
  const [sort, setSort] = useState(false);
  const [arr, setArr] = useState([])
  const [tmpData, setTmpData] = useState()
  const isFirstRun = useRef(true);  

  const navigate = useNavigate()

  const handleDelete=(key)=>{
    //console.log('key', key._id)
    //console.log('=>', localStorage.getItem(key), key, t)
    axios.delete(`http://localhost:8000/delete/${key._id}`)
    .then(()=>{
      window.location.reload();
      console.log('data deleted succesfully.. from homw.js')})
    .catch((err)=>{console.log('deletion failed.. from homw.js', err)})

  }

  const handleEdit=(key)=>{
    console.log('edit buttion clicked succesfull..')
    console.log('key --home.jsx', key)
    navigate('/input', { state: { key : (key._id) }})

  }

  // const handleSearch=(e)=>{
  //   const v = e.target.value
  //   setSearch(v)
  //   // if (v !== null || v!=''){
  //   //     const res = v.filter((itm) => {
  //   //     if((itm.work).includes(v.toLowerCase())){
  //   //       return itm
  //   //     }
  //   //   })


  //     //console.log('res', res)
      
  //   }
  // }


  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      axios.get('http://localhost:8000/details')
       .then((res) => {
          console.log('home.js - succesfull..', res.data);
          setTmpData(res.data);
        })
       .catch((err) => {
          console.log('home.js - error found..', err);
        });
    }
  }, []);


  return (
    <div>
      <Header />
      <div className="body">
      <table>

        <thead>
          <tr>
          <th>Work</th>
          <th>Rate</th>
          <th>Hours</th>
          <th>Date</th>
          <th>Season</th>
          <th>Total Amount</th>
          <th><button>SORT</button></th>
          </tr>
        </thead>
        <tbody>{(tmpData && Array.isArray(tmpData) ? tmpData : []).filter((key) => {
  if (search === '') {
    return key;
  } else {
    if ((key.work).includes(search)) {
      return key;
    } else {
      return null;
    }
  }
}).map((key) => {
  return (
    <tr key={key.id}>  {/* Assuming key has a unique identifier */}
      <td>{key.work}</td>
      <td>{key.rate}</td>
      <td>{key.hours}</td>
      <td>{key.date}</td>
      <td>{key.season}</td>
      <td>{key.rate * key.hours}</td>
      <td><button type='button' onClick={() => handleEdit(key)}>EDIT</button></td>
      <td><button type='button' onClick={() => handleDelete(key)}>DELETE</button></td>
    </tr>
  );
})}

      </tbody>

      </table>
      </div>
    </div>
  )
}
