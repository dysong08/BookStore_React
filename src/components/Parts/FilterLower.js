import { useEffect, useState } from "react";

export default function FilterLower({ cateList, setCateList, subCateId, setSubCateId}) {



    const cateHandler = (id) => {
        if(id) {
            if(id == subCateId) {
                setSubCateId(0);
            } else {
                setSubCateId(id);
            }
        }
    };

    return (
        <div className="filter_lower_container">

            {/* {console.log(cateList)} */}
            {
                cateList?.map(item => 
                <>
                    <div key={item.id} onClick={() => cateHandler(item.id)} value={item.id}
                        className={`filter_lower_content bold size20
                            ${subCateId == item.id ? "filter_lower_content_target" : ""}  
                            ${subCateId != item.id ? "filter_lower_content_non-target" : ""}   `} 
                    >
                        {item.name}
                    </div>
                </>
                )
            }
        </div>
    )
}