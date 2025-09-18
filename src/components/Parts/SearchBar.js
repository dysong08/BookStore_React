import { useEffect, useState } from "react"

export default function SearchBar({searchText, setSearchText, placeholder, pathname}) {

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
    };

    const imgClassname = pathname.includes("eduHub") ?  "eduHub_searchimg" : "";
        

    useEffect(() => {
        setText(searchText);
    }, [searchText]);

    return (
        <div className="searchbar_container">
            <div></div>
            <input onChange={(e) => searchInput(e.target.value)} 
                value={text} onKeyDown={keyDownHandler} 
                placeholder={placeholder ? placeholder : "" } 
            />
            <div className="searchbar_img_div">
                <img className={imgClassname}
                    src="/images/magnifying-glass-solid-full.svg" onClick={searchBtn} />
            </div>
        </div>
    )
}