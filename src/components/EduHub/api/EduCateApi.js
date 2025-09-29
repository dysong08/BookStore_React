import axios from "axios";
let baseURL = process.env.REACT_APP_API_URL+"/api/eduCate";

const getCateListAll = async () => {
    try {
        const res = await axios.get(baseURL+`/getCateListAll`);
        return res.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

const getCateDepth1 = async () => {
    try {
        const res = await axios.get(baseURL+`/depth1`);
        return res.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};


export default { getCateListAll, getCateDepth1,  }