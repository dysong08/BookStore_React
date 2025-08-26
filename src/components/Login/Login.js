import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import User from "./User.json";
import UserRole from "./UserRole.json";

export default function Login() {

    const nav = useNavigate();
    const [userId, setUserId] = useState('');
    const [userPwd, setUserPwd] = useState('');
    const [role, setRole] = useState('');
    const [activeIndex, setActiveIndex] = useState(null);

    
    const changeLoginRole = (index, code) => {
        console.log(index, code)
        setActiveIndex(index);
        setRole(code);
    }

    const loginBtn = () => {
        const agreement = User.some(item => userId == item.id);

        if(agreement && userPwd) {
            sessionStorage.setItem('userId', userId);
            sessionStorage.setItem('role', role);
            nav('/');
        } else {
            alert("아이디 또는 비밀번호를 확인해주세요.");
        };
    }


    return (
        <div>
            <div style={{display:"flex", justifyContent: "center"}}>
                {
                    UserRole.map((type, index) => (
                        <div className={`roleBox ${activeIndex == index ? "activeRoleBox" : ""}`}
                            onClick={() => changeLoginRole(index, type.code)} >{type.name}</div>
                    ))
                }
            </div>
            <input id="userId"  value={userId} onChange={(e) => setUserId(e.target.value)}/>
            <input id="userPwd" value={userPwd} onChange={(e) => setUserPwd(e.target.value)}/>
            <button onClick={loginBtn}>Login!</button>
        </div>
    )

   
}