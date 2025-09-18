import "components/Parts/css/Filter.css";
import { useEffect, useState } from "react";
import FilterLower from "./FilterLower";

export default function Filter({EduData, EduCategories, eduList, setEduList, cateList, setCateList}) {

    const [majorCateId, setMajorCateId] = useState(null);
    const [subCateId, setSubCateId] = useState(null);
    const [chkDiscount, setChkDiscount] = useState(false);
    const [chkIsFree, setChkIsFree] = useState(false);

    const discountFt = (targetId) => {
        return EduData.filter(item => item.parentId == targetId && item.price != item.discountPrice);
    };

    const freeFt = (targetId) => {
        return EduData.filter(item => item.parentId == targetId && item.discountPrice == 0);
    };

    const filterHandler = (e) => {
        const targetId = e.target.value;
        setMajorCateId(targetId);
        setSubCateId(null);

        if(targetId == "all") {
            setEduList(EduData);
            setCateList([]);
        } else {
            // cate parentid == targetid인 eduData를 가져와야함
            const cateArr = EduCategories?.filter(item => item.parentId == targetId);
            setEduList(EduData.filter(a => cateArr.some(b => b.id == a.categoryId)));
            setCateList(EduCategories?.filter(item => item.parentId == targetId));
        }
    };

    const displayDiscount = () => {
        setChkDiscount(prev => !prev);
        const next = !chkDiscount;

        if(next) {
            // 선택(할인중인것)
            if(majorCateId || subCateId) {
                setEduList(eduList.filter(item => item.price != item.discountPrice));
            } else {
                setEduList(EduData.filter(item => item.price != item.discountPrice));
            }
        } else {
            // 선택해제(전체)
            if(majorCateId && subCateId) {
                setEduList(EduData.filter(a => a.categoryId == subCateId));
            } else
            if(majorCateId) {
                const cateArr = EduCategories?.filter(item => item.parentId == majorCateId);
                setEduList(EduData.filter(a => cateArr.some(b => b.id == a.categoryId)));
                // console.log( "EduData : ", EduData )
            }  
            else {
                setEduList(EduData);
            }
        }
    };

    const displayIsFree = () => {
        setChkIsFree(prev => !prev);
        const next = !chkIsFree;

        if(next) {
            // 선택(무료인것)
            if(majorCateId || subCateId) {
                setEduList(eduList.filter(item => item.discountPrice == 0));
            } else {
                setEduList(EduData.filter(item => item.discountPrice == 0));
            }
        } else {
            // 선택해제(전체)
            if(majorCateId && subCateId) {
                setEduList(EduData.filter(a => a.categoryId == subCateId));
            } else
            if(majorCateId) {
                const cateArr = EduCategories?.filter(item => item.parentId == majorCateId);
                setEduList(EduData.filter(a => cateArr.some(b => b.id == a.categoryId)));
            }  
            else {
                setEduList(EduData);
            }
        }
    };

    useEffect(() => {
        if(subCateId) {
            if(chkDiscount && chkIsFree) {
                setEduList(EduData.filter(item => (item.price != item.discountPrice || item.discountPrice == 0) && item.categoryId == subCateId ));
            } else
            if(chkDiscount) {
                setEduList(EduData.filter(item => item.price != item.discountPrice && item.categoryId == subCateId ) );
            } else
            if(chkIsFree) {
                setEduList(EduData.filter(item => item.discountPrice == 0 && item.categoryId == subCateId ) );
            } else
                setEduList(EduData.filter(data => data.categoryId == subCateId) );
        }
    }, [subCateId]);

    useEffect(() => {
         console.log(eduList  )

    }, [eduList]);

    useEffect(() => {
        //  console.log(cateList  )

    }, [cateList]);

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
                            EduCategories?.filter(item => item.parentId == null)
                                .map(item => 
                                    <option key={item.id} value={item.id}>{item.name}</option>
                            )
                        }
                    </select>
                   
                    <button onClick={displayDiscount}
                        className={`${chkDiscount ? "filter_chkDiscount" : ""} filter_chkBtn`}> 할인중 </button>
                    <button onClick={displayIsFree}
                        className={`${chkIsFree ? "filter_chkIsFree" : ""} filter_chkBtn`}> 무료 </button>
                    {/* <button onClick={resetSearch}
                        className=""> 초기화 </button> */}
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