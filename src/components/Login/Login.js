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
    const [roleId, setRoleId] = useState('');
    const [activeIndex, setActiveIndex] = useState(null);
    
    const changeLoginRole = (index, code) => {
        console.log(index, code)
        setActiveIndex(index);
        setRole(code);
        setRoleId(index+1);
    }

    const loginBtn = () => {
        const agreement = User.some(item => item.id == userId  && item.roleId == roleId);

        if(agreement && userPwd) {
            sessionStorage.setItem('userId', userId);
            sessionStorage.setItem('role', role);
            nav('/');
        } else {
            alert("아이디 또는 비밀번호를 확인해주세요.");
        };
    }

const roles = ["일반", "학생", "강사", "관리자"];
    return (

        <div className="login-container">
            <div className="login-card">
                {/* 왼쪽: role 선택 영역 */}
                <div className="role-section">
                    <h2>Role 선택</h2>
                    <ul>
                        {
                            UserRole.map((type, index) => (
                                <li className={`role-item ${activeIndex == index ? "activeRoleBox" : ""}`}
                                    onClick={() => changeLoginRole(index, type.code)} >{type.name}</li>
                            ))
                        }
                    </ul>
                </div>

                {/* 오른쪽: 로그인 입력 영역 */}
                <div className="login-section">
                    <h2>로그인</h2>
                    <input type="text" id="userId" placeholder="아이디를 입력하세요." 
                        value={userId} onChange={(e) => setUserId(e.target.value)}/>
                    <input type="password" id="userPwd" placeholder="패스워드를 입력하세요."
                        value={userPwd} onChange={(e) => setUserPwd(e.target.value)}/>
                    <button onClick={loginBtn}>Login!</button>
                </div>
            </div>
        </div>
    );
   
}