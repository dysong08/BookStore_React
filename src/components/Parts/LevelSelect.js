export default function LevelSelect({options, onChange, }) {

    return (
        <>
        {
            options?.map((option, index) => (

                <select onChange={onChange} key={index}> 
                    <option>선택</option>    
                    {
                        options[index]?.map((op, i) => (
                            <option key={op.id} value={JSON.stringify(op)}>{op.name}</option> 
                        ))
                    }
                </select> 
            ))
        }
        </>
    )
}