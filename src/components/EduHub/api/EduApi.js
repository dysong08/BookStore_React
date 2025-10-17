import axios from "axios";
let baseURL = process.env.REACT_APP_API_URL+"/api/edu";

const getEduListAll = async () => {
    try {
        const res = await axios.get(baseURL+`/getEduListAll`);
        return res.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

const getEduOne = async (id) => {
    try {
        const res = await axios.get(baseURL+`/getEduOne/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};





export default { getEduListAll, getEduOne,  }