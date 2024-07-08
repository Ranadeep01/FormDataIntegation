import React, { useState, useEffect } from 'react'
import Header from './Header'
import './Input.css'

import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export default function Input() {

  //console.log('edit is : ', edit)

  const options = ['Select', 'one', 'two', 'three', 'four']
  const rates  = {
    'Select':0,
    'one':100,
    'two':200,
    'three':300,
    'four':400
  }
  
  const d = new Date()
  //const [today, setToday] = useState(d.getDate() + '-' + d.getMonth()+1 + '-' + d.getFullYear())
  const [today, setToday] = useState(d.toISOString().slice(0, 10))
  const [submitt, setSubmitt] =useState(true)

  const [alertWork, setAlertWork] = useState(false)

  const [flag, setFlag] = useState(false)
  const [work, setWork] = useState('')
  const [hours, setHours] = useState(0)
  const [date, setDate] = useState('')
  const [rate, setRate] = useState(0)
  const [season, setSeason] = useState('')
  const [cost, setCost] = useState(0)
  const [item, setitem] = useState('')

  const [data, setData] = useState({
    work:work,
    hours:hours,
    date:date,
    rate:rate,
    season:season,
    total: cost
  })
  const uniqueId = uuidv4();
  const location = useLocation()
  const k = location.state?.key
  console.log('k', k)


//write code for setEdit 

  const navigate = useNavigate()


  const [warningHours, setWarningHours] = useState('')

  const [flagWork, setFlagWork] = useState(false)  
  

  
  const costChange=(e)=>{
    const v = e.target.value
    
    if(v!=='select') setFlagWork(true)
    else setFlagWork(false)
    
  setData({ hours:hours, date:date, work:v, rate:(rates[v]), season:season, total: cost})
  setWork(v)
  setRate(rates[v])
  setitem(v)
  setCost(((rates[v]))*(parseFloat(hours))) 
  if(work!=='Select' || hours!==0 || season!=='Select' || date!==''){
    setSubmitt(false)
  }
  else{

  }
  
}  

const handleHours = (e) => {
  const hrs = (e.target.value);

  setData({ hours:hrs, date:date, work:work, rate:(rates[work]), season:season, total: hrs*rates[work]})
  setHours(hrs)
  setCost(hrs*rates[item])
}

  const handleDate=(e)=>{
    const v = e.target.value
    setData({ hours:hours, date:v, work:work, rate:rate, season:season, total: cost})

    setDate(String(v))
    if(work!=='Select' || hours!==0 || season!=='Select' || date!==''){
      setSubmitt(false)
    }

  }  
  
  const handleSeason=(e)=>{
    const v = e.target.value

    setData({ hours:hours, date:date, work:work, rate:rate, season:v, total: cost})

    setSeason(v)
    if(work!=='Select' || hours!==0 || season!=='Select' || date!==''){
      setSubmitt(false)
    }

  }  

  const handleSubmit=(e)=>{
    e.preventDefault()  

    const values = {work:work, rate:rate, hours:hours, date:date, season:season, total:rate*hours};
    if(edit){
      console.log('edit', k)
      axios.post(`http://localhost:8000/updated/${k}`, values)
      .then((res)=>{
        setEdit(false)
        console.log('data edit successful..', values)
      })
      .catch((err)=>{console.log('error in edit : ', err)})
    }
    else{
      axios.post('http://localhost:8000/add', values)
      .then((res)=>{console.log('Data send successfully from input.js', res)})
      .catch((err)=>{console.log('Data send unsuccessfully from input.js', err.response)})
    }
    

    setWork('')    
    setitem(0)
    setHours('')
    setDate('')
    setSeason('')
    setCost(0)
    //console.log('-----',data)
    //console.log('values', values)



    setData({hours:0, date:'', work:'', rate:0, season:'', total: 0})
    navigate('/')
  
  }
  const [edit, setEdit] = useState(false)

  useEffect(()=>{
    axios.get(`http://localhost:8000/edit/${k}`)
    .then((res)=>{
      console.log('from input.js  in edit useeffect', res.data)
      const tmp = res.data
      setEdit(true)
      //console.log(data)

      setData({ hours:(res.data)?.hours, date:(res.data)?.date, work:(res.data)?.work, rate:(res.data)?.rate, season:(res.data)?.season, total: (res.data)?.total})

      setWork((res.data).work)
      setitem((res.data).work)
      setDate((res.data).date)
      setHours(parseFloat((res.data).hours))
      setRate(Number((res.data).rate))
      setSeason((res.data).season)
      setCost((parseFloat((res.data).hours)*Number((res.data).rate)))
      //setEdit(false)
      setFlag(true)


      //console.log("edited data", res);
    })
    .catch((err)=>{
      console.log('error found editing from input.js: ', err)})
  }, [])

  return (
    <div>
      <Header />
      <form className="add-column" onSubmit={handleSubmit} method='POST'>

        <h1>Form</h1> {/* TODO: make this a header component */}

        {/* WORK TYPE INPUT FIELD */}
        <label>Select work type : </label>
        <select className='inputField' id='inputField' onChange={costChange} name='work' value={(work)}>
          {options.map((ele, idx)=>{
            return (<option key={idx}>{ele}</option>)
          })}
        </select><br></br>

        {/*RATE INPUT FIELD*/}
        <label>Rate  <i className='italic'>(fixed)</i> : </label>
        <input className='inputField' value={ (((rates[item])? rate:0)) } readOnly /><br></br>
        
        {/* HOURS INPUT FIELD*/}
        <label>Select no.of Hours : </label>
        <input className='inputField hoursInput' name='hours' value={hours} onChange={handleHours} type='number' step={0.01} min={0}/><br></br>
        <p>{warningHours}</p>

        {/* DATE LABEL */}
        <label>Date : </label><br></br>
        <input className='inputField' type='date' name='date' value={date} max={today} onChange={handleDate}/><br></br>

        {/* SEASON BUTTON */}
        <label>Season : </label><br></br>
        <select className='inputField' aname='season' onChange={handleSeason} value={season}>
          <option>Select</option>
          <option>Karif</option>
          <option>Rabi</option>
        </select>
        
        <label className='costDisplay'>Total Amount<br></br> {cost}</label>
        <br></br>
          
        <button type='submit' className='btn-submit' disabled={(((work==='' || work==='Select') || (date==='') || (season==='' || season==='Select'))?true:false) }>Submit</button>

  </form>
    </div>
  )
}
