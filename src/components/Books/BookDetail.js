import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import BookData from "./Books.json";
import BookDetailCenter from "./BookDetail-center";

export default function BookDetail({location, userInfo}) {

    const path = location.pathname;
    const { userId, role } = userInfo;
    const nav = useNavigate();
    const [bookInfo, SetBookInfo] = useState({});
    const { id } = useParams();

    const [selected, setSelected] = useState([]);
    const [form, setForm] = useState({
        title : '',
        author : '',
        isbn : '' ,
    });
    
    const checkedRent = () => {
        return BookData?.filter((book) => book.renter == id);
    };

    const BookRent = (id) => {
        if(!id) {
            alert(`일시적인 오류가 있습니다. \n다시 시도해주세요.`);
        } else 
        if(window.confirm(`${bookInfo?.title} 도서를 대여하시겠습니까?`)) {
            if(checkedRent()) {
                if(window.confirm(`이미 대여중인 도서가 있습니다. \n마이페이지로 이동하시겠습니까?`)) {
                    nav("/myPage");
                };
            } else {
                if(window.confirm(`${bookInfo?.title} 도서를 대여했습니다. \n마이페이지로 이동하시겠습니까?`)) {
                    nav("/myPage");
                };
            }
        };
    };

    const submitBtn = () => {
        // console.log(selected)

        if(selected.length == 0 ) {
            alert(`카테고리를 선택해주세요.`);
            return;
        }
        
        const verify = Object.keys(form).filter(
            key => form[key] == "" || form[key] == null || form[key] == undefined || 
                    (typeof form[key] == "string" && form[key].trim() == ""));

        if(verify.length > 0) {
            const itemKor = conversion(verify);
            alert(`${itemKor} 을(를) 입력해주세요.`);
            return;
        }
        // API 통신
    };

    const conversion = (arr) => {
        const kor = {title: "도서명", author: "저자", isbn: "등록번호"};
        const result = arr.map(item => kor[item] || item);
        return result;
    };

    const propsToCenter = {
        role, form, setForm, selected, setSelected, bookInfo, path
    };

    useEffect(() => {
        if(id) {
            SetBookInfo(...BookData?.filter((book) => book.id == id));
        }
    }, [id]);

    useEffect(() => {
        // console.log(bookInfo)
    }, [bookInfo]);

    return(
        <div>
            <div>
                <Link to={role == "admin" ? "/adminPage" : "/bookList"}>{role == "admin" ? "취소" : "목록" }</Link>
            </div>
            <hr />
            
            <div>
               <BookDetailCenter props={propsToCenter }/>
            </div>

            <hr />

            <div>
                <div>한줄평</div>
                <div>
                    아이디 : asdfg  
                    작성일 : 2025.08.21
                </div>
                <span  >ㅇㅇㅇㅇ 너무 흥미로웠어요~</span>
            </div>

            <hr />
            <div>
                {
                    role == "admin" ? 
                    <div>
                        <button onClick={submitBtn}>저장</button>
                    </div>
                    :
                    <div>
                        <button className={bookInfo?.rented === "Y" ? "impossible-rent" : "possible-rent"} 
                            onClick={() => BookRent(bookInfo.id)}
                            to={`/bookToRent/${id}`}>대여하기
                        </button>
                        <Link to={"/bookList"}>목록</Link>
                    </div>
                }
            </div>
        </div>
    )
}