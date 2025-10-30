import { useEffect, useRef, useState } from "react"

export default function SearchBar({keyword, setKeyword, comboText, placeholder, pathname}) {

    const imgClassname = pathname.includes("eduHub") ?  "eduHub_searchimg" : "";
    const [text, setText] = useState('');
    const focusRef = useRef(null)

    const searchInput = (val) => {
        setText(val);
    };

    const searchBtn = () => {
        if(text.length > 0) {
            setKeyword(text);
        }else {
            alert("검색어를 입력해주세요.");
            focusRef.current.focus();
        }
    };

    const keyDownHandler = (e) => {
        if(e.key === 'Enter') {
            searchBtn();
        }
    };


    return (
        <div className="searchbar_container">
            <div></div>
            {/* <select>
                {
                    comboText?.map((item, idx) => 
                        <option value={idx}>{item}</option>
                    )
                }
            </select> */}
            <input onChange={(e) => searchInput(e.target.value)} 
                value={text} onKeyDown={keyDownHandler} ref={focusRef}
                placeholder={placeholder ? placeholder : "" } 
            />
            <div className="searchbar_img_div">
                <img className={imgClassname}
                    src="/images/magnifying-glass-solid-full.svg" onClick={searchBtn} />
            </div>
        </div>
    )
}