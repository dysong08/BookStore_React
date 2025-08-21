import { useState } from "react"

export default function SearchBar({setSearchText}) {

    const [text, setText] = useState('');

    const searchInput = (val) => {
        setText(val);
    };

    const searchBtn = () => {
        setSearchText(text);
    };

    const keyDownHandler = (e) => {
        if(e.key === 'Enter') {
            searchBtn();
        }
    }

    return (
        <div>
            <input onChange={(e) => searchInput(e.target.value)} value={text} onKeyDown={keyDownHandler} />
            <button onClick={searchBtn}>검색</button>
        </div>
    )
}