import { useEffect, useState } from "react"
import BookData from "./Books.json"


export default function BooksMenubar({setSearchCate }) {

    const [categoryArr, setCategoryArr] = useState([]);
    
    const searchCate = (cate) => {
        setSearchCate(cate);
    };

    useEffect(() => {   
        setCategoryArr([...new Set(BookData?.map(book => book.category) )]);
    }, []);

    useEffect(() => {   
        console.log("categoryArr : ", categoryArr)
    }, [categoryArr]);


    return (
        <div>
            <span onClick={() => searchCate("all")}>전체</span>
            {
                categoryArr?.map((cate, i) => (
                    <span key={i}>
                        <span onClick={() => searchCate(cate)}> {cate} </span> 
                    </span>
                ))
            }
        </div>

    )
}