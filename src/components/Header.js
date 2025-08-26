import { Link, useNavigate } from "react-router-dom";

export default function Header({userInfo}) {

    const nav = useNavigate();
   
    const logout = () => {
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("role");
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
                    <Link to={userInfo.role == "admin" ? "adminPage" : "myPage"}>{
                        userInfo.role == "admin" ? "관리자페이지" : "마이페이지"}
                    </Link>    
                   
                </>
                    : <Link to="/Login">Login</Link>
            }

        </div>

    )
}

