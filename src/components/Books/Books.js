import { useEffect, useState } from "react"
import BookData from "./Books.json";
import "./Books.css";
import BooksMenubar from "./BooksMenubar";
import SearchBar from "../Parts/SearchBar";
import { Link } from "react-router-dom";

export default function Books() {

    const [bookArr, setBookArr] = useState([]);
    const [searchCate, setSearchCate] = useState('');
    const [searchText, setSearchText] = useState('');


    useEffect(() => {
        setBookArr(BookData);
    },[]);

    useEffect(() => {
         console.log("searchCate : " ,searchCate)
        if(searchCate === 'all') {
            setBookArr(BookData);
        } else
        if(searchCate !== '') {
           
            setBookArr([...BookData?.filter((book) => book.category == searchCate)]);
        } else
            if(searchText !== '') {
            console.log( "searchText : ", searchText)
            setBookArr([...BookData?.filter((book) => book.title.replace(/\s/g, '').includes(searchText) ) ]);
        } else
            if(searchCate !== '' && searchText != '') {
            console.log("searchCate : " ,searchCate , ", searchText : ", searchText)
            setBookArr([...BookData?.filter((book) => book.category == searchCate && book.title.replace(/\s/g, '').includes(searchText))]);
        }
    },[searchCate, searchText]);


    return(
        <div className="main-container">
            <BooksMenubar setSearchCate={setSearchCate} />
            <SearchBar setSearchText={setSearchText} />

            <div className="item-container">
                {
                    bookArr?.map((book, i) => (
                        <Link to={`/bookDetail/${book.id}`} key={i} className="item-card">
                            <div className="thumnail-box">
                                <img src={book.image} className="thumnail"/>
                            </div>
                            <div className="font-interval">
                                <span className="font-b">{book.title}</span>
                                <span className="font-s">{book.author}</span>
                            </div>
                            <p>{book.category}</p>
                        </Link>
                    ))
                }
            </div>

        </div>
    )
}