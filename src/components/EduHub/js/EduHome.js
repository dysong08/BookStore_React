import { useEffect, useState } from "react";
// import EduData from "../json/EduData.json";
import "../css/EduHome.css";
import "components/Parts/css/Font.css";
import { Link } from "react-router-dom";

export default function EduHome( { eduList, setEduList, searchText, checkedMenu, checkedCateId, action }) {

    // useEffect(() => {
    //      console.log(EduData)
    //     setEduList(EduData);
    // }, []);

    // useEffect(() => {
    //     console.log(eduList)
    // }, [eduList]);

    useEffect(() => {
        let tempArr = [];
        let cateArr = [];
        let searchArr = [];

        // if(checkedCateId) {
        //     cateArr = EduData?.filter(item => item.id == checkedCateId || item.parentId == checkedCateId);
        // };

        // if(searchText != "" && searchText != null && searchText != undefined) {
            const removeSpace = searchText?.replace(/\s+/g, "");
            searchArr = eduList?.filter(item => item.title.replace(/\s+/g, "").includes(removeSpace) 
                                || item.instructor.replace(/\s+/g, "").includes(removeSpace) 
            );
        // }
        // tempArr = [...cateArr, ...searchArr];

        setEduList(searchArr);
    }, [searchText]);

    return (
        <div className="edu_home_container">
            <div>{eduList?.length}건</div>
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