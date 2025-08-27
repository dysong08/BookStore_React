import { useEffect, useState } from "react"
import BookData from "./Books.json";
import "./Books.css";
import BooksMenubar from "./BooksMenubar";
import SearchBar from "../Parts/SearchBar";
import { Link, useNavigate } from "react-router-dom";

export default function Books({location, userInfo}) {

    const nav = useNavigate();
    const path = location.pathname;
    // const {userId, role} = userInfo;
    const displayType = path.includes("/bookList") ? "card" : "row";
    const actionType = path.includes("/bookUpdate") ? "update" : path.includes("/bookDelete") ? "delete" : "add";
    const [bookArr, setBookArr] = useState([]);
    const [searchCate, setSearchCate] = useState('');
    const [searchText, setSearchText] = useState('');
    const [deleteArr, setDeleteArr] = useState([]);

    const updateBtn = (id) => {
        nav(`/adminPage/bookUpdate/${id}`);
    };

    const deleteBtn = (id) => {
        // eslint-disable-next-line no-restricted-globals
        if(confirm(`${id} 도서를 삭제하시겠습니까? \n삭제 후 복구불가합니다.`)) {
            //deleteArr에서 id 제거 + bookArr에서 id 제거
        } 
    };

    const checkboxBtn = (id) => {
        setDeleteArr(prev => {
            const newSet = new Set(prev);
            newSet.has(id) ? newSet.delete(id) : newSet.add(id);
            return Array.from(newSet);
        } );
    };
    
    useEffect(() => {
        setBookArr(BookData);
    },[]);

    useEffect(() => {
    },[location]);

    useEffect(() => {
        if(searchCate === 'all') {
            setBookArr(BookData);
        } else
        if(searchCate !== '') {
            setBookArr([...BookData?.filter((book) => book.category == searchCate)]);
        } else
            if(searchText !== '') {
            setBookArr([...BookData?.filter((book) => book.title.replace(/\s/g, '').includes(searchText) ) ]);
        } else
            if(searchCate !== '' && searchText != '') {
            setBookArr([...BookData?.filter((book) => book.category == searchCate && book.title.replace(/\s/g, '').includes(searchText))]);
        }
    },[searchCate, searchText]);


    return(
        <div className="main_container">
            <div>
                <BooksMenubar setSearchCate={setSearchCate} />
                <SearchBar setSearchText={setSearchText} />
            </div>

            <div className={`item_container ${displayType == "card" ? "item_card_container" : "item_row_container"}`} >
                {
                    bookArr?.map((book, i) => (
                        <div key={i} className={`item_card ${displayType == "card" ? "item_card_box" : "item_row_box"}`}>
                            <input type="checkbox" className={displayType == "card" ? "item_card_checkbox" : "item_row_checkbox"} 
                                    style={{display: actionType == "delete" ? "block" : "none"}} 
                                    onClick={() => checkboxBtn(book.id)}
                            />
                            <Link to={`/bookDetail/${book.id}`} className={displayType == "card" ? "item_card_content_box" : "item_row_content_box"} >
                                <div className={displayType == "card" ? "item_card_thumnail_box" : "item_row_thumnail_box"}>
                                    <img src={book.image} className={displayType == "card" ? "item_card_thumnail" : "item_row_thumnail"}/>
                                </div>
                                <div className="font_interval">
                                    <span className="font_b">{book.title}</span>
                                    <span className="font_s">{book.author}</span>
                                </div>
                            </Link>
                            <p>카테고리 {`>`} {book.category}</p>
                            <div style={{display:"flex"}}>
                                <button className={displayType == "card" ? "item_card_updateBtn" : "item_row_updateBtn"}
                                        style={{display: actionType == "update" ? "block" : "none"}}
                                        onClick={() => updateBtn(book.id)} >수정</button>
                                <button className={displayType == "card" ? "item_card_updateBtn" : "item_row_updateBtn"}
                                        style={{display: actionType == "delete" ? "block" : "none"}}
                                        onClick={() => deleteBtn(book.id)} >삭제</button>
                            </div>
                        </div>
                    ))
                }
            </div>

       


        </div>
    )
}