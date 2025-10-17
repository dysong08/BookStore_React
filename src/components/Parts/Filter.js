import "components/Parts/css/Filter.css";
import { useEffect, useState } from "react";
import FilterLower from "./FilterLower";
import EduCateApi from "components/EduHub/api/EduCateApi";

export default function Filter({ eduListAll, setEduListAll, eduList, setEduList, cateList, setCateList, eduCount, setEduCount}) {

    const [cateListAll, setCateListAll] = useState([]);
    const [majorCateList, setMajorCateList] = useState([]);
    const [majorCateId, setMajorCateId] = useState(0);
    const [subCateId, setSubCateId] = useState(0);
    const [isDiscount, setIsDiscount] = useState(false);
    const [isFree, setIsFree] = useState(false);


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
        if(subCateId > 0) {
            setEduList(getChkIsCateId(majorCateId, subCateId));
        }
        if(subCateId == 0) {
            setEduList(getChkIsCateId(majorCateId, 0));
        }
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
        console.log("isChkCate : ",  majId, subId)
        let cateArr = [];
       
        if(subId > 0 && majId > 0) {
            return eduListAll.filter(item => item.categoryId == subId);
            // cateArr = cateListAll?.filter(item => item.id == subId);
            // setEduList( eduListAll?.filter(a => cateArr.some(b => b.id == a.categoryId && b.parentId == majId))  );
        } else
        if(subId == 0 && majId > 0) {
            cateArr = cateListAll?.filter(item => item.parentId == majId);
            console.log("cateArr : ", cateArr)
            console.log("cateArr 다음 : ", eduListAll?.filter(a => cateArr.some(b => b.id == a.categoryId)))
            return eduListAll?.filter(a => cateArr.some(b => b.id == a.categoryId));
        } else 
        if(subId == 0 && majId == 0){
            console.log("eduListAll : ",  eduListAll)
            return eduListAll?.length > 0 ? eduListAll : [];
        }
    };

    
    const getFilterOp = () => {
        // ====== 카테Id 있을경우 적용도 해야함!!!!!!!!!!  ==

        if(isDiscount && isFree) {
            return eduList.filter(item => item.price != item.discountPrice || item.discountPrice == 0);
        } else
        if(isDiscount && !isFree) {
            return eduList.filter(item => item.price != item.discountPrice);
        } else 
        if(!isDiscount && isFree) {
            return eduList.filter(item => item.discountPrice == 0);
        } else {
            return eduListAll?.length > 0 ? eduListAll : [];
        }
    };

    const chkIsCate = () => {
        if(majorCateId || subCateId) {
            
        }
    };

    const ckFreeFt = () => {

    };

    const displayDiscount = () => {
        if(isDiscount) {
            // 할인중 선택한 상태
            if(majorCateId || subCateId) {
                setEduList(eduList.filter(item => item.price != item.discountPrice), ckFreeFt(!subCateId || subCateId == 0 ? majorCateId : subCateId));
            } else {
                setEduList(eduListAll.filter(item => item.price != item.discountPrice), ckFreeFt(0));
            }
        } else {
            // 할인중 선택해제(전체)
            console.log(majorCateId , " != " , subCateId)
            if(majorCateId && subCateId) {
                setEduList(eduListAll.filter(a => a.categoryId == subCateId), ckFreeFt(subCateId));
            } else
            if(majorCateId) {
                const cateArr = cateListAll?.filter(item => item.parentId == majorCateId);
                setEduList(eduListAll.filter(a => cateArr.some(b => b.id == a.categoryId)), ckFreeFt(majorCateId));
                // console.log( "eduList : ", eduList )
            }  
            else {
                setEduList(eduList);
            }
        }
    };

    const displayisFree = () => {
        if(isFree) {
            // 선택(무료인것 && 카테고리 선택한 상태)
            if(majorCateId || subCateId) {
                if(isDiscount) { 
                    //할인중 선택한 상태
                    // console.log( [...new Set ([...eduList, ...eduList.filter(item => item.discountPrice == 0)])] )
                    setEduList([...new Set([...eduList, ...eduList.filter(item => item.discountPrice == 0)])] );
                } else { 
                    //할인중 선택 아닐때
                    setEduList(eduList.filter(item => item.discountPrice == 0));
                }
            } else {
                // 전체 && 무료인것
                setEduList(eduListAll.filter(item => item.discountPrice == 0));
            }
        } else{
            // 선택해제(전체) -> 할인중 + 카테고리 상태확인
            if(isDiscount) {
                if(majorCateId && subCateId) {
                    //할인중+카테고리 있을때

                } else {
                    //할인중+카테고리 없을때

                }
                console.log("할인 체크중")
                // 카테고리 && 할인중 체크상태
                // setEduList( [...new Set([...])])
                setEduList(eduListAll.filter(a => a.categoryId == subCateId && a.price != a.discountPrice));
            } else {
                // 할인체크X 카테고리만 체크상태
                console.log("할인 체크XXX")
                setEduList(eduListAll.filter(a => a.categoryId == subCateId));
            }


            if(majorCateId && subCateId) {

            } else
            if(majorCateId) {
                const cateArr = cateListAll?.filter(item => item.parentId == majorCateId);
                setEduList(eduListAll.filter(a => cateArr.some(b => b.id == a.categoryId)));
            }  
            else {
                setEduList(eduList);
            }
        }
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
                    
                    <select onChange={filterHandler} >
                        <option value={"all"}>전체</option>
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
                    {/* <button onClick={resetSearch}
                        className=""> 초기화 </button> */}
                        {eduCount} 건
                </div>
                <div className="filter_sort">
                    <select>
                        <option>정렬</option>
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