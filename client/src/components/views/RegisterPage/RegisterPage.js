import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import {registerUser} from '../../../_actions/user_action'

export default function RegisterPage(props) {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Name, setName] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();


    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    };

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value);
    };

    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    };

    const onConfirmPasswordHandler = (e) => {
        setConfirmPassword(e.currentTarget.value);
    };


    const onSubmitHandler = (e) => {
        e.preventDefault();

        if(Password !== ConfirmPassword)
        {
            return alert("비밀번호 다름");
        }

        let body = {
            email : Email,
            password : Password,
            name : Name,

        }

        dispatch(registerUser(body)).then(response => {
            if(response.payload.success) {
                props.history.push('/login');
            }
            else{
                alert("회원가입 실패")
            }
        })
        
        
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
                    <label>Name</label>
                    <input type="text" value={Name} onChange={onNameHandler} />
                    <label>Password</label>
                    <input type="password" value={Password} onChange={onPasswordHandler} />
                    <label>Confirm Password</label>
                    <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
                    <br />
                    <button onClick={onSubmitHandler}>
                        Login
                    </button>
                    
                </form>
        </div>
    )
}
