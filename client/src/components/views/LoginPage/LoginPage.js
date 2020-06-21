import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import {loginUser} from '../../../_actions/user_action'

export default function LoginPage(props) {

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const dispatch = useDispatch();


    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    };

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value);
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();

        let body = {
            email : Email,
            password : Password
        }
        console.log(Email, Password);
        dispatch(loginUser(body)).then(response => {
            if(response.payload.loginSuccess) {
                props.history.push('/');
            }
            else{
                alert('Error');
            }
        });
        
    };

    return (
        <div style={{
            display:'flex', justifyContent:'center', 
            alignItems:'center',width:'100%', height:'100vh'
            }}>
                <form style={{display:'flex', flexDirection:
            'column'}}>

                    <label>Email</label>
                    <input type="email" value={Email} onChange={onEmailHandler} />
                    <label>Password</label>
                    <input type="password" value={Password} onChange={onPasswordHandler} />
                    <br />
                    <button onClick={onSubmitHandler}>
                        Login
                    </button>
                    
                </form>
        </div>
    )
}
