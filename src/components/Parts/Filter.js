import "components/Parts/css/Filter.css";
import { useEffect, useState } from "react";
import FilterLower from "./FilterLower";
import EduCateApi from "components/EduHub/api/EduCateApi";

export default function Filter({ eduListAll, eduList, setEduList, cateList, setCateList, eduCount, setEduCount}) {

    const [cateListAll, setCateListAll] = useState([]);
    const [majorCateId, setMajorCateId] = useState(0);
    const [subCateId, setSubCateId] = useState(0);
    const [isDiscount, setIsDiscount] = useState(false);
    const [isFree, setIsFree] = useState(false);
    const [sortType, setSortType] = useState("none");


    useEffect(() => {
        const fetchInit = async () => {
            const res = await EduCateApi.getCateListAll();
            setCateListAll(res);
        }
        fetchInit();
    }, []);

    useEffect(() => {
        setEduCount(eduList?.length);
    }, [eduList]);

    useEffect(() => {
        setEduList(getFilterOp());
    }, [isDiscount, isFree]);

    useEffect(() => {
        setSortType("none");
        setEduList(getChkIsCateId(majorCateId, subCateId));
    }, [subCateId]);

    useEffect(() => {
        //  console.log("cateListAll : " , cateListAll  )
    }, [cateListAll]);


    const filterHandler = (e) => {
        const majorId = e.target.value;
        setMajorCateId(majorId);
        setSubCateId(0);
        setIsDiscount(false);
        setIsFree(false);
        setSortType("none");

        if(majorId == "all") {
            setEduList(eduListAll);
            setCateList([]);
        } else {
            // cate parentid == majorId인 eduList를 가져와야함
            setEduList(getChkIsCateId(majorId, 0));
            setCateList(cateListAll?.filter(item => item.parentId == majorId));
        }
    };

    const getChkIsCateId = (majId, subId) => {
        // console.log("isChkCate : ",  majId, subId)
        let cateArr = [];
        if(subId > 0 && majId > 0) {
            return eduListAll.filter(item => item.categoryId == subId);
        } else
        if(subId == 0 && majId > 0) {
            cateArr = cateListAll?.filter(item => item.parentId == majId);
            return eduListAll?.filter(a => cateArr.some(b => b.id == a.categoryId));
        } else 
        if(subId == 0 && majId == 0){
            return eduListAll?.length > 0 ? eduListAll : [];
        }
    };
    
    const getFilterOp = () => {
        // console.log("isDiscount : ", isDiscount, ", isFree : ", isFree);
        let cateArr = [];
        if(majorCateId > 0 || subCateId > 0) {
            cateArr = getChkIsCateId(majorCateId, subCateId);
        } else
        if(majorCateId == 0 && subCateId == 0) {
            cateArr = eduListAll;
        }

        let temp = [];
        if(isDiscount && isFree) {
            temp = eduListAll.filter(item => item.price != item.discountPrice || item.discountPrice == 0);
        } else
        if(isDiscount && !isFree) {
            temp = eduListAll.filter(item => item.price != item.discountPrice);
        } else 
        if(!isDiscount && isFree) {
            temp = eduListAll.filter(item => item.discountPrice == 0);
        } else {
            temp = eduListAll?.length > 0 ? eduListAll : [];
        }
        return temp.filter(a => cateArr.some(b => b.id == a.id));
    };

    const sortHandler = (e) => {
        setSortType(e.target.value);
    };

    useEffect(() => {
        // console.log("sortType : ", sortType)
        getSortFilter();
    }, [sortType]);


    const getSortFilter = () => {
        if(sortType == "none") {
            setEduList(prev => [...prev]);
        }
        if(sortType == "name") {
            setEduList(prev => [...prev].sort((a, b) => a.title.localeCompare(b.title)));
        }
        if(sortType == "rating") {
            setEduList(prev => [...prev].sort((a, b) => {
                if(a.rating !== b.rating) return b.rating - a.rating;
                return a.title.localeCompare(b.title);
            }));
        }
        if(sortType == "students") {
            setEduList(prev => [...prev].sort((a, b) => {
                if(a.students !== b.students) return b.students - a.students;
                return a.title.localeCompare(b.title);
            }));
        }
        if(sortType == "priceDesc") {
            setEduList(prev => [...prev].sort((a, b) => {
                if(a.price !== b.price) return b.price - a.price;
                return a.title.localeCompare(b.title);
            }));
        }
        if(sortType == "priceAsc") {
            setEduList(prev => [...prev].sort((a, b) => {
                if(a.price !== b.price) return a.price - b.price;
                return a.title.localeCompare(b.title);
            }));   
        }
    };

    const resetFilter = () => {
        setMajorCateId(0);
        setIsDiscount(false);
        setIsFree(false);
        setSortType("none");
    };

    return (
        <div className="filter_container">
            <div className="watching_video">
                <div>강의동영상1</div>
                <div>강의동영상2</div>
                <div>강의동영상3</div>
            </div>

            <div className="filter_box">
                <div className="filter_search">
                    
                    <select value={majorCateId} onChange={filterHandler} >
                        <option value={0}>전체</option>
                        {
                            cateListAll?.filter(a => a.depth == 1)
                                .map(item => 
                                    <option key={item.id} value={item.id}>{item.name}</option>
                            )
                        }
                    </select>
                   
                    <button onClick={() => setIsDiscount(prev => !prev)}
                        className={`${isDiscount ? "filter_isDiscount" : ""} filter_chkBtn`}> 할인중 </button>
                    <button onClick={() => setIsFree(prev => !prev)}
                        className={`${isFree ? "filter_isFree" : ""} filter_chkBtn`}> 무료 </button>
                    <button onClick={resetFilter}
                        className=""> 초기화 </button> 
                        {eduCount} 건
                </div>
                <div className="filter_sort">
                    <select value={sortType} onChange={sortHandler}>
                        <option value={"none"}>정렬</option>
                        <option value={"name"}>이름순</option>
                        <option value={"rating"}>평점순</option>
                        <option value={"students"}>수강생순</option>
                        <option value={"priceDesc"}>가격높은순</option>
                        <option value={"priceAsc"}>가격낮은순</option>
                    </select>
                </div>
            </div>

            <div>
                <FilterLower cateList={cateList} setCateList={setCateList} 
                    subCateId={subCateId} setSubCateId={setSubCateId}/>
            </div>
        </div>
    )
}