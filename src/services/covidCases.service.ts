import axios from "./axiosInstance";
const casesService = {
    getByDate: async (key: string, params: object) => {
        const res = await axios.get(`${key}`, {
            params: { ...params },
        });
        return res.data
    },
    getCountry: async (key: string) => {
        const res = await axios.get(`${key}`);
        return res.data
    },
    getAll: async (key: string) => {
        const res = await axios.get(`${key}`);
        return res.data
    },


}
export default casesService;