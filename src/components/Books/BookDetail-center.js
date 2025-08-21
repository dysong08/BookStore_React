import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import BookData from "./Books.json";
import BookCategory from "./BookCategory.json";
import LevelSelect from "../Parts/LevelSelect";

export default function BookDetailCenter({props}) {

    const {userType, form, setForm, selected, setSelected} = props;
    const [bookArr, setBookArr] = useState({});
    const { id } = useParams();
    const [thumnailFile, setThumnailFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [imgFiles, setImgFiles] = useState([]);
    

    const initOption = [
        [...BookCategory.filter((cate) => cate.depth == 1)] ,
        [], 
        [],
    ]
    const [options, setOptions] = useState(initOption);

    const registHandler = (e) => {
        const {name, value} = e.target;
        setForm(prev => ({...prev, [name]:value}) );
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
                temp = prev.map((item, i) => (i > index ? {} : item) );
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

    useEffect(() => {
        if(id) {
            setBookArr(...BookData?.filter((book) => book.id == id));
        }
    }, [id]);


    useEffect(() => {
        // console.log(" form 바뀜 : ", form)
    }, [form]);

    useEffect(() => {
        // console.log(" options 바뀜 : ", options)
    }, [options]);

    return(
        <div>
            {
                userType == "user" ? 
            <div>
                <span>도서 정보</span>
                <p>{bookArr?.title}</p>
                <span>등록일 : {bookArr?.registeredAt}</span>
                <span>등록번호 : {bookArr?.isbn}</span>
                <span>저자 : {bookArr?.author}</span>
                <img src={bookArr?.image} style={{width:"300px", height:"350px"}}/>
            </div>
            :
            <div>
                <span>도서 등록</span>
                <p>도서명 : <input name="title" value={form.title} onChange={registHandler}/></p>
                <p>저자 :   <input name="author" value={form.author} onChange={registHandler} /></p>
                <p>등록번호 : <input name="isbn" value={form.isbn} onChange={registHandler} type="number"/></p>
                <p>카테고리 : 
                {
                    <LevelSelect options={options} onChange={selectedCateHandler}/>
                }
                </p>
                <input type="file" accept="image/*" onChange={thumnailHandler}/>
                {
                    previewUrl && (
                        <img src={previewUrl} alt="미리보기"
                            style={{width:"300px", height:"350px"}}/>
                    )
                }

            </div>
            }
        </div>
    )
}