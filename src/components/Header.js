import { Link, useNavigate } from "react-router-dom";

export default function Header() {
    
    const nav = useNavigate();
    const userId = sessionStorage.getItem("userId");
    const userType = sessionStorage.getItem("userType");

    const logout = () => {
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("userType");
        nav("/");
    }

    return (
        <div>
            {
                userId ?  
                <>
                    <strong>{userId}</strong>님 <button onClick={logout}>Logout</button> <br/>
                    <Link to="MyTodo">Todo</Link>
                    <span> | </span>
                    <Link to={userType == "user" ? "myPage" : "adminPage"}>{userType == "user" ? "MY" : "관리자페이지"}</Link>    
                   
                </>
                    : <Link to="/Login">Login</Link>
            }

        </div>

    )
}

