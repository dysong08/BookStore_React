import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const nav = useNavigate();
    const [userId, setUserId] = useState('');
    const [userPwd, setUserPwd] = useState('');
    const [userType, setUserType] = useState('');

     const loginBtn = () => {
         if(userId && userPwd) {
            sessionStorage.setItem('userId', userId);
            sessionStorage.setItem('userType', userType);
            nav('/');
        }
    }


    return (
        <div>
            <div>
                {/* <input type="checkbox" />개인 */}
                <button onClick={() => setUserType("user")}>개인</button>
                <button onClick={() => setUserType("admin")}>관리자</button>
            </div>
            <input id="userId"  value={userId} onChange={(e) => setUserId(e.target.value)}/>
            <input id="userPwd" value={userPwd} onChange={(e) => setUserPwd(e.target.value)}/>
            <button onClick={loginBtn}>Login!</button>
        </div>
    )

   
}