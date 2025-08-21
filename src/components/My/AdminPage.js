import { Link } from "react-router-dom";

export default function AdminPage() {

    

    return (
        <div className="my-container">
            <div style={{border: "1px solid "}}>
                도서
                <div>
                    <span><Link to="/adminPage/bookAdd">등록</Link></span>
                    <span ><Link to="/adminPage/bookUpdate">수정</Link></span>
                    <span ><Link to="/adminPage/bookDelete">삭제</Link></span>
                </div>
            </div>
        </div>
    )
}