import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom"
import BookData from "./Books.json";
import BookCategory from "./BookCategory.json";
import LevelSelect from "../Parts/LevelSelect";

export default function BookDetailCenter({props}) {

    const { id } = useParams();
    const fileInputRef = useRef(null);
    const {role, form, setForm, selected, setSelected, bookInfo, path} = props;
    const pathType = path.includes("bookUpdate") ? "update" : path.includes("bookDetail") ? "detail" : "add" ;
    const [bookArr, setBookArr] = useState({});
    const [thumnailFile, setThumnailFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [imgFiles, setImgFiles] = useState([]);
    

    const initOption = [
        [...BookCategory.filter((cate) => cate.depth == 1)] ,
        [], 
        [],
    ]
    const [options, setOptions] = useState(initOption);

    const inputHandler = (e) => {
        const {name, value} = e.target;
        setForm(prev => ({...prev, [name]:value}) );
    };

    const toggelThumnailBtn = () => {
        fileInputRef.current.click();
    };
    
    const thumnailHandler = (e) => {
        const file = e.target.files[0];
        if(!file) return;

        setThumnailFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const selectedCateHandler = (e) => {
        
        const select = JSON.parse(e.target.value);
        const index = select.depth-1;
        let temp = [...selected];
        temp[index] = select;
        setSelected(temp);
        
        // const emptyIdx = selected.findIndex(item => item.length == 0 );

        // selected에 선택한 하위에 값이 있으면 비워줌
        if(selected.length > index+1) {
            setSelected(prev => {
                // temp = prev.map((item, i) => (i > index ? {} : item) );
                temp = prev.map(item => (item) );
                return temp;
            });
        }
        nextOptionHandler(select);
    };

    const nextOptionHandler = (selectObj) => {

        const depth = selectObj.depth;
        const index = depth -1;
        let temp = [...options];
        const nextOp = BookCategory?.filter((cate) => cate.parentId == selectObj.id);

        // 선택한 index 보다 options가 길 경우 -> options 뒤를 비워줘야함
        if(selected.length != 0 && selected.length > depth) {
            temp = options?.map((item, i) => (i > index ? [] : item) );
            setOptions(temp);
        }
            
        // depth != 3 인데 다음 option가 없을때
        if(depth != 3 && nextOp.length == 0) {
            temp[depth] = [];
            setOptions(temp);
        }
        else 
        // depth != 3 이고 이후 option가 있을때
        if(depth != 3 && nextOp.length > 0) {
            temp[depth] = nextOp;
            setOptions(temp);
        } 
    };

    const getCatePath = (categoryId) => {
        // detail category || update 
        let current = BookCategory?.find(cate => cate.id == categoryId);
        let arr = [];
        while (current) {
            arr.unshift(current.name);
            current = BookCategory?.find(c => c.id == current.parentId);
        }
        setSelected(arr);
        return arr;
    }

    useEffect(() => {
        if(id) {
            setBookArr(...BookData?.filter((book) => book.id == id));
        };
    }, [id]);

    useEffect(() => {
        if(bookArr.categoryId) {
            getCatePath(bookArr.categoryId);
        };
        if(bookArr.image) {
            setPreviewUrl(pathType == "add" ? null : bookArr?.image);
        };
    }, [bookArr]);


    useEffect(() => {
        // console.log(" form 바뀜 : ", form)
    }, [form]);

    useEffect(() => {
        // console.log(" options 바뀜 : ", options)
    }, [options]);

    return(
        <div>
            {
                role == "admin" ? 
            
                <div>
                    <span style={{fontSize:"20px", fontWeight:"bold"}}>
                        {pathType == "add" ? "도서 등록" : 
                        pathType == "update" ? "도서 수정" : "도서 상세"}
                    </span>
                    <p>도서명 :  <input name="title"  value={pathType == "add" ? form?.title  : bookInfo?.title}  onChange={inputHandler}/></p>
                    <p>저자 :    <input name="author" value={pathType == "add" ? form?.author : bookInfo?.author} onChange={inputHandler}/></p>
                    <p>등록번호 : <input name="isbn"   value={pathType == "add" ? form?.isbn  : bookInfo?.isbn}   onChange={inputHandler} type="number"/></p>
                    <p>카테고리 : 
                    {
                        <LevelSelect pathType={pathType} options={options} selected={selected} onChange={selectedCateHandler}/>
                    }
                    </p>
                    {
                        previewUrl && (
                            <img src={previewUrl} alt="미리보기"
                            style={{width:"300px", height:"350px"}}/>
                        )
                    }
                    <input type="file" accept="image/*" ref={fileInputRef} onChange={thumnailHandler}
                        style={{display:"none"}}/>
                    <button onClick={toggelThumnailBtn}>사진 등록/변경</button>
                </div>
                :
                <div>
                    <span>도서 정보</span>
                    <p>{bookArr?.title}</p>
                    <span>등록일 : {bookArr?.registeredAt}</span>
                    <span>등록번호 : {bookArr?.isbn}</span>
                    <span>저자 : {bookArr?.author}</span>
                    <img src={bookArr?.image} style={{width:"300px", height:"350px"}}/>
                </div>
            }
        </div>
    )
}