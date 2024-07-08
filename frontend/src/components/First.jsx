import React, { useState } from 'react'
import {Form} from 'react-bootstrap';
import './First.css';

export default function First() {

    
    const [verify_email, setverify_email] = useState('')
    const [verify_password, setverify_password] = useState('')
    const [confirm_verify_password, setconfirm_verify_password] = useState('')

    const [email_alert, setemail_alert] = useState('')
    const [password_alert, setpassword_alert] = useState('')
    const [confirm_password_alert, setconfirm_password_alert] = useState('')

    const [txtt, settxtt] = useState("Don't have an account?")
    const [curr_page, setcurr_page] = useState('LogIn')
    const [toggle, settoggle] = useState('SignUp')

    const [email_alert_color, setemail_alert_color] =useState('red')
    const [password_alert_color, setpassword_alert_color] = useState('red')
    const [confirm_password_alert_color, setconfirm_password_alert_color] = useState('red')

    //To check whether email is valid and password is valid if both are valid then make valid as true then that enables the submit button 
    //initial the disabled button should be true so that the button will be disabled
    const [email_valid, setemail_valid] = useState(true)   
    const [password_valid, setpassword_valid] = useState(true)
    const [confirm_password_valid, confirm_setpassword_valid] = useState(true)
    

    //end

    const email_change=(e)=>{
        const x = e.target.value
        
        
        if(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(x)){
            setemail_alert("Valid Email")
            setemail_valid(false)
            setemail_alert_color('green')
        }else{
            
            setemail_alert("Invalid Email")
            setemail_valid(true)
            setemail_alert_color('red')

        }
        setverify_email(x)
        
    }

    const password_change=(e)=>{
        const  y = e.target.value
        let upper = 0;
        let lower = 0;
        let num = 0;
        let special = 0;
        if(y.length<8){
            setpassword_alert('Invalid length');
            setpassword_valid(true)
        }
        else{
            for (let i = 0; i < y.length; i++) {
                if (!isNaN(y[i])) {
                    console.log(y[i],'number')
                    num = 1;
                }
                else if (y[i].charCodeAt(0)>=65 && y[i].charCodeAt(0)<=90){  //uppercase alphabets ascii
                    console.log(y[i],'upper')
                    upper = 1;
                }
                else if (y[i].charCodeAt(0)>=97 && y[i].charCodeAt(0)<=122){
                    console.log(y[i],'lower')

                    lower = 1;
                }
                else {
                    console.log(y[i],'special')

                    special = 1;
                }
            }
            console.log(num, lower, upper, special)
            if (upper === 1 && lower === 1 && num === 1 && special === 1) {
                setpassword_alert('Valid')
                setpassword_valid(false)
                
            }
            else{
                setpassword_alert('InValid')
                setpassword_valid(true)
            }
        } 

        setverify_password(y)
    }

    const confirm_password_change=(e)=>{
        
        let z = e.target.value
        if(verify_password===z){
            setconfirm_password_alert_color('green')
            setconfirm_password_alert("Password match succesfull")
        }
        else{
            setconfirm_password_alert_color('red')
            setconfirm_password_alert("Password doen't match")
        }

        setconfirm_verify_password(z)

    }

    const change_page=()=>{
        setverify_email('')
        setverify_password('')
        setemail_alert_color('red')
        setpassword_alert_color('red')
        setemail_alert('')
        setpassword_alert('')
        setconfirm_password_alert('')
        setconfirm_password_alert_color('red')

        if(curr_page==='LogIn'){
            setcurr_page('SignUp')
            settxtt("Already a member?")
            settoggle('LogIn')
            setpassword_valid(true)
        }
        else{
            setcurr_page('LogIn')
            settxtt("Don't have an account?")
            settoggle('SignUp')
            setpassword_valid(true)

        }
    }

 

    return (
        <div className='form-first'>
            <form className='form'>
                <h1>{curr_page}</h1>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label"><b>Email address</b></label>
                    <input type="email" value={verify_email} onChange={email_change} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                   
                    <p style={{color:email_alert_color}}>
                        {email_alert}</p>

                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label"><b>Password</b></label>
                    <input type="password" value={verify_password} onChange={password_change} className="form-control" id="exampleInputPassword1"/>
                    <p style={{color:password_alert_color}} 
                    >{password_alert}</p>
                </div>
                {(curr_page==='SignUp')?(
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label"><b>Confirm Password</b></label>
                        <input type="password" value={confirm_verify_password} onChange={confirm_password_change} className="form-control" id="exampleInputPassword1"/>
                        <p style={{color:confirm_password_alert_color}} >{confirm_password_alert}</p>
                    </div>
                ):(null)}
                <p>{txtt} <a className='sign-up' onClick={change_page}>{toggle}</a></p>
                
                <button type="submit" className="btn btn-primary" id="submit-btn" disabled={(
                    ((curr_page==='LogIn') ? (email_valid || password_valid) : ((email_valid || password_valid) && (password_valid && confirm_password_alert!=='Password match succesfull'))
                ))}>Submit</button>
                {console.log((email_valid || password_valid), (password_valid && confirm_password_alert==='Password match succesfull'), password_valid, confirm_password_alert==='Password match succesfull')}
            </form>
        </div>
    )
}

//(email_valid || password_valid)