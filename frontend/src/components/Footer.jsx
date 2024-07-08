import React, { useEffect, useState } from 'react'
import './Footer.css';

export default function Footer() {

    const date =  new Date();
    let d  = String(date.getFullYear())+' '+String(date.getMonth()+1)+ ' '+String(date.getDate())
    let t = String(date.getHours())+' '+String(date.getMinutes()+1)+ ' '+String(date.getSeconds())
    const [day, setday] = useState(d)
    const [time, settime] =useState(t)

    
    useEffect(() => {
        const update_time = setInterval(() => {
            const date = new Date();
            const t = String(date.getHours()) + ':' + String(date.getMinutes() + 1) + ':' + String(date.getSeconds());
            settime(t);
        }, 1000);
        return () => clearInterval(update_time);
    }, []);



  return (
    
    <div>
        <footer>
        
            <p>{day}</p>
            <p>{time}</p>    
                
            
        </footer>
    </div>
  )
}
