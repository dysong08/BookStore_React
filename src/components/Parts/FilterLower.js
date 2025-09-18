import { useEffect, useState } from "react";

export default function FilterLower({ cateList, setCateList, subCateId, setSubCateId}) {



    const cateHandler = (id) => {
        if(id) {
            // console.log(id)
            setSubCateId(id);

        }
    };

    return (
        <div className="filter_lower_container">

            {/* {console.log(cateList)} */}
            {
                cateList?.map((item, index) => 
                    <>
                    <div key={item.id} onClick={() => cateHandler(item.id)}
                        className={`filter_lower_content bold size20
                                    ${subCateId == item.id ? "filter_lower_content_target" : ""}  
                                    ${subCateId != item.id ? "filter_lower_content_non-target" : ""}   `} 
                        value={item.id}>
                            {item.name}
                    </div>
                    </>
                )
            }
        </div>
    )
}