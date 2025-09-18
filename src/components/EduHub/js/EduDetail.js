import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom"
import EduData from "../json/EduData.json";
import "../css/EduDetail.css";
import "components/Parts/css/Font.css";
import ScrollToTop from "components/Parts/ScrollToTop";

export default function EduDetail({headerHeight, action}) {

    const location = useLocation();
    const sectionRef = useRef(null);
    const { id } = useParams(null);
    const [edu, setEdu] = useState({});
    const [isTopBtnVisible, setIsTopBtnVisible] = useState(false);

    useEffect(() => {
        if(id) {
            setEdu(...EduData?.filter(item => item.id == id) );
        }
    }, [id]);

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY > 200) {
                setIsTopBtnVisible(true);
            } else {
                setIsTopBtnVisible(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

     useEffect(() => {
        // console.log("sectionRef : ", sectionRef.current)
    }, []);

    const scrollToTop = () => {
        window.scroll({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="edu_detail_container" >
            {
                <div>
                    <div className="edu_detail_content_topbox">
                        <div className="edu_detail_content_top">
                            <div className="edu_detail_content_top_left">
                                <div className="info_intro">
                                    <div>카테고리-카테 / 풀스텍</div>
                                    <div className={`size35 bold`}>{edu?.title}</div>
                                    <div className={`size22 `}>{edu?.description}</div>
                                </div>
                                <div className="info_meta">
                                    <div>{edu?.rating} | {edu?.students}</div>
                                    <div>{edu?.instructor}</div>
                                    <div></div>
                                </div>
                            </div>
                            <div className="edu_detail_content_top_right">
                                <img src={edu?.thumbnail}></img>
                            </div>
                        </div>
                    </div>

                    <div className="edu_detail_content_nav"
                        style={{top: `${headerHeight}px`}}  >
                        <div className={`bold`}>
                            강의소개 | 수강평 | 커뮤니티 | 새소식 
                        </div>
                    </div>

                    <div className="edu_detail_content">
                        <div className="edu_detail_content_middle">
                            <div>~~~~수강생 후기~~~~~~~

                                <div>후기</div>
                                <div>후기</div>
                                <div>후기</div>
                            </div>
                            <div> ~~~~~설명~~~~~~~
                                <div>설명</div>
                                <div>설명</div>
                                <div>설명</div>
                            </div>
                        </div>
                        <hr />
                        <div className="edu_detail_content_bottom">
                            <div>내용</div>
                            <div>내용</div>
                            <div>내용</div>
                            <div>내용</div>
                            <div>내용</div>
                            <div>내용</div>
                            <div>내용</div>
                        </div>
                    </div>
                </div>
            }
            {
                isTopBtnVisible && 
                <ScrollToTop  scrollToTop={scrollToTop} />
            }
        </div>
    )
}