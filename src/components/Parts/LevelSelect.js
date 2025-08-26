export default function LevelSelect({pathType, options, selected, onChange, }) {

    return (
        <>
        {
            options?.map((option, index) => (
                <select onChange={onChange} key={index}> 
                    {
                        pathType == "add" ? 
                            <option>선택</option>    
                            :
                            <option>{typeof selected[index] == "string" ? selected[index] : typeof selected[index] == "object" ? selected[index].name :  "선택"}</option>
                    }
                    {
                        options[index]?.map((op, i) => (
                            <option key={op.id} value={JSON.stringify(op)} >{op.name}</option> 
                        ))
                    }
                </select> 
            ))
        }
        </>
    )
}