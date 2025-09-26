import { useEffect, useState } from "react";
import "../css/EduHome.css";
import "components/Parts/css/Font.css";
import { Link } from "react-router-dom";
import EduApi from "../api/EduApi.js";

export default function EduHome( { eduList, setEduList, searchText, checkedMenu, checkedCateId, action, setEduCount }) {



    useEffect(() => {
        const fetchInit = async () => {
            const res = await EduApi.getEduListAll();
            setEduList(res);
        }
        fetchInit();
    }, []);
   
    useEffect(() => { 

    },[eduList])

    // useEffect(() => {
    //     let tempArr = [];
    //     let cateArr = [];
    //     let searchArr = [];

    //     const removeSpace = searchText?.replace(/\s+/g, "");
    //     searchArr = eduList?.filter(item => item.title.replace(/\s+/g, "").includes(removeSpace) 
    //                         || item.instructor.replace(/\s+/g, "").includes(removeSpace) 
    //     );

    //     setEduList(searchArr);
    // }, [searchText]);

    return (
        <div className="edu_home_container">
            
            {
                eduList?.length > 0 ?

                eduList?.map((item, index) => item.state == "Y" && 
                    ( 
                        <div className="edu_item_card" key={index}>
                            <Link className="edu_item_imgbox" to={`/eduHub/detail/${item.id}`}>
                                <img src={item.thumbnail}/>
                            </Link>
                            <div className="edu_item_infobox">
                                <div className={`size18 bold`}>{item.title}</div>
                                <div className={`lighter`}>{item.instructor}</div>
                                <div>
                                    <span className={`${item.price == item.discountPrice ? "" : "strike"}`}>{item.price.toLocaleString()}원</span> 
                                    <span> {item.price == item.discountPrice ? "" : "|"} </span>
                                    <span className={`${item.price == item.discountPrice ? "" : "red"}`}>{item.price == item.discountPrice ? "" : item.discountPrice.toLocaleString()+"원"} </span>
                                </div>
                                <div>
                                    <span>{item.rating}</span> 
                                    <span> | </span>
                                    <span>{item.students} </span>
                                </div>
                                

                            </div>
                        </div>
                    )
                )
                    :
                    <div>
                        <p>검색 결과가 없습니다.</p>
                    </div>
            }
        </div>
    )
}