import Filter from "components/Parts/Filter";
import "../../css/EduHeader.css";
import EduHome from "../EduHome";
import EduDetail from "../EduDetail";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "components/Parts/SearchBar";
import EduData from "../../json/EduData.json"
import EduCategories from "components/EduHub/json/EduCategories.json";
import EduFooter from "./EduFooter";

export default function EduHeader({location}) {

    const pathname = location.pathname;
    const headerRef = useRef();
    const [headerHeight, setHeaderHeight] = useState(null);
    const [action, setAction] = useState("home");
    const [eduList, setEduList] = useState([]);
    const [cateList, setCateList] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [checkedMenu, setCheckedMenu] = useState(null);
    const [checkedCateId, setCheckedCateId] = useState(null);
    const [eduCount, setEduCount] = useState(eduList?.length);
    const placeholder = "강의명 또는 강사명을 입력하세요.";

    const checkedMenuHandler = (value) => {
        // console.log(value)
    };

    useEffect(() => {
        setAction(pathname.includes("/detail") ? "detail" : "home");
    }, [pathname]);

    useEffect(() => {
        // console.log("searchText : ", searchText)
        // if(searchText.length > 0) {

        // }
    }, [searchText]);

    useEffect(() => {
        if(headerRef.current) {
            setHeaderHeight(headerRef.current.offsetHeight);
        }
        const resizeHandler = () => {
            if(headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);
        }
        window.addEventListener("resize", resizeHandler);
        return () => window.removeEventListener("resize", resizeHandler);
    }, []);

    return (
        <>
            <div className="edu_header_container" ref={headerRef}>
                <div className="edu_header_top">
                    <div>
                        <Link to={"/eduHub"} onClick={(e) => { e.preventDefault(); setSearchText(""); } }>
                            Edu로고
                        </Link>
                    </div>

                    <div className="edu_header_center">
                        <div className="edu_header_center_side">
                            <div className={`edu_header_menu`} onClick={() => checkedMenuHandler(1)}>메뉴1</div>
                            <div className={`edu_header_menu`} onClick={() => checkedMenuHandler(2)}>메뉴2</div>
                            <div className={`edu_header_menu`} onClick={() => checkedMenuHandler(3)}>메뉴3</div>
                        </div>
                        <div className="edu_header_center_center">
                            <div className="edu_header_searchbar">
                                <SearchBar searchText={searchText} setSearchText={setSearchText} 
                                            placeholder={placeholder} pathname={pathname} />
                            </div>
                        </div>
                        <div className="edu_header_center_side">
                            <div className={`edu_header_menu`} onClick={() => checkedMenuHandler(4)}>메뉴4</div>
                            <div className={`edu_header_menu`} onClick={() => checkedMenuHandler(5)}>메뉴5</div>
                            <div className={`edu_header_menu`} onClick={() => checkedMenuHandler(6)}>메뉴6</div>
                        </div>
                    </div>
                    
                    <div>
                        <div>장바구니</div>
                        <div>마이페이지</div>
                        <div>ㅁㅁㅁ</div>
                    </div>
                </div>
                {/* <div className="edu_header_bottom">
                     <div className="edu_header_catebar">
                        {
                            cateList?.map(item => 
                                <div key={item.id} onClick={() => setCheckedCateId(item.id)}>{item.name}</div>
                            )
                        }
                    </div>
                </div> */}
            </div>

            {
                action == "home" ?
                <>
                    <Filter EduCategories={EduCategories} EduData={EduData} eduList={eduList} setEduList={setEduList} cateList={cateList} setCateList={setCateList} eduCount={eduCount} setEduCount={setEduCount}/>
                    <EduHome eduList={eduList} setEduList={setEduList} searchText={searchText} checkedMenu={checkedMenu} action={action} setEduCount={setEduCount}/>
                </>

                :
                action == "detail" ?
                    <EduDetail headerHeight={headerHeight} checkedMenu={checkedMenu} action={action} />
                :
                    ""
            }
            <EduFooter />
        </>
    )
}