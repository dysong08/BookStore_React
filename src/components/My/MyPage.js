import { useState } from "react";
import { Link } from "react-router-dom";
import BookData from "../Books/Books.json";


export default function MyPage() {

    const userId = sessionStorage.getItem("userId");
    const [booksOnLoan, setBooksOnLoan] = useState();

    useState(() => {
        setBooksOnLoan(...BookData.filter((book) => book.renter == userId));
    }, []);

    useState(() => {
        // console.log(booksOnLoan)
    }, [booksOnLoan]);

    return (
        <div className="my-container">
            <div style={{border: "1px solid "}}>
                <Link to="/bookList">도서</Link>  
                <div>
                    현재 대여중인 도서 : <img src={booksOnLoan?.image} /> {booksOnLoan?.title}
                    | 반납일 : {booksOnLoan?.returnDate}

                </div>
                <div>
                    <span><Link className={booksOnLoan ? "impossible-rent" : "possible-rent"}>대여하기</Link> | </span>
                    <span ><Link className={booksOnLoan ? "possible-rent" : "impossible-rent"}>반납하기</Link> | </span>
                    <span ><Link className={booksOnLoan ? "possible-rent" : "impossible-rent"}>대여연장신청</Link></span>
                </div>
            </div>
        </div>
    )
    
}