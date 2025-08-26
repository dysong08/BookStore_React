import { Link, useNavigate } from "react-router-dom";

export default function Header({userInfo}) {

    const nav = useNavigate();
   
    const logout = () => {
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("userType");
        nav("/");
    }

    return (
        <div>
            {
                userInfo.userId ?  
                <>
                    <strong>{userInfo.userId}</strong>님 <button onClick={logout}>Logout</button> <br/>
                    <Link to="MyTodo">Todo</Link>
                    <span> | </span>
                    <Link to={userInfo.userType == "user" ? "myPage" : "adminPage"}>{userInfo.userType == "user" ? "MY" : "관리자페이지"}</Link>    
                   
                </>
                    : <Link to="/Login">Login</Link>
            }

        </div>

    )
}

