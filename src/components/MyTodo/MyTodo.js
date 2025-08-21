import { useEffect, useRef, useState } from "react"
import './MyTodo.css';

export default function Todo() {

    const inputRef = useRef(null);
    const [list, setList] = useState([]);
    const [todo, setTodo] = useState('');
    const [editText, setEditText] = useState('');
    const [textEditNum, setTextEditNum] = useState(0);
    const [delectToList, setDelectToList] = useState([]);

    const dummyTodos = [
        { id: 1, text: "React 공부하기", completed: false },
        { id: 2, text: "장보기",        completed: true },
        { id: 3, text: "운동 30분 하기", completed: false },
    ];

    const addTodo = () => {
        const nexttId = list[list.length -1]?.id + 1;
        const tempList = {id : nexttId, text : todo, completed : false};
        setList(prev => [ ...prev, tempList]);
        setTodo("");
        inputRef.current.focus();
    };

    const deleteTodo = () => {
        const tempList = list.filter(item1 => !delectToList.some(item2 => item1.id === item2.id) );
        setList(tempList);

    }

    const deleteChecked = (id) => {
        let exists = [];
        exists = delectToList?.some(item => item.id === id);

        let tempList = [];
        if(exists) {
            tempList = delectToList.filter(item => item.id !== id);
            setDelectToList(tempList);
        } else {
            tempList = list.filter(item => item.id === id);
            setDelectToList(prev => [...prev, ...tempList]);
        }
    };

    const toggleChecked = (id) => {
        setList(prev => prev.map(item => item.id === id ? {...item, completed: !item.completed} : item));
    };

    // input change
    const textChangeHandler = (val, id) => {
        setEditText(val);
    };

    // img click
    const editImgHandler = (id) => {
        if(textEditNum == 0) {
            setTextEditNum(id);
        } else 
        if(textEditNum != id) {
            // eslint-disable-next-line no-restricted-globals
            if(confirm("이미 수정 중인 할 일이 있습니다. 취소하시겠습니까?")) {
                setTextEditNum(id);
            } else {
                return;
            };
        };
        const temp = list.filter(item => item.id == id)[0].text;
        console.log(temp)
        setEditText(temp)
    };

    // text save
    const textSaveHandler = (id) => {
        setList(prev => prev.map(item => item.id === id ? {...item, text: editText} : item));
        setTextEditNum(0);
    };

    useEffect(() => {
       setList(dummyTodos) ;
    },[]);

    useEffect(() => {
    //    console.log("list : " , list);
    },[list]);

    return (
        <div>
           
            <button onClick={deleteTodo}>삭제</button>
            <table className="todo-table">
                <thead>
                    <tr className="text-center">
                        <td className="td-one">삭제</td>
                        <td className="td-one">순번</td>
                        <td className="td-two">할 일</td>
                        <td className="td-three">완료</td>
                    </tr>
                </thead>
                <tbody>
                        {
                            list?.map(todo => (
                                <tr key={todo.id}>
                                    <td className="text-center">
                                        <input type="checkbox" onClick={()=>deleteChecked(todo.id)}/>
                                    </td>
                                    <td className="text-center">{todo.id}</td>
                                    <td className="text-left-padding">
                                        <input value={textEditNum === todo.id ? editText : todo.text} 
                                               className={textEditNum === todo.id ? "text-input-edit" :  "text-input-read"}
                                               onChange={(e) => textChangeHandler(e.target.value, todo.id)}
                                        />
                                        <img src="/images/pen-to-editer.svg" 
                                            onClick={() => editImgHandler(todo.id)}
                                            style={textEditNum === todo.id ? {display : "none"} : {display: "flex"}}
                                        />    
                                        <button onClick={() => textSaveHandler(todo.id)}
                                            style={textEditNum === todo.id ? {display : "flex"} : {display: "none"}} >저장
                                        </button>
                                    </td>
                                    <td className="text-center">
                                        <img src={todo.completed ? "/images/square-checked.svg" : "/images/square-unchecked.svg" } 
                                            onClick={() => toggleChecked(todo.id)}
                                        />
                                    </td>
                                </tr>
                            ))
                        }
                        <tr>
                            <td colSpan={3}>
                                <input type="text" className="todo-input"
                                    value={todo} onChange={(e) => setTodo(e.target.value)}
                                    ref={inputRef}
                                />
                            </td>
                            <td>
                                <button onClick={addTodo}>추가</button>
                            </td>
                        </tr>
                </tbody>
            </table>
        </div>
    )
}