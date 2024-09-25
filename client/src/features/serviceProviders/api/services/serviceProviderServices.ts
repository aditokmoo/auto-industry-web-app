import { axiosPrivate } from "../../../../api/http";

interface ParamsType {
    type: string,
    value: string,
}

export async function getUsersBy(params: ParamsType) {
    try {
        const res = await axiosPrivate.get(`/api/user?${params.type}=${params.value}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });
        const data = res.data;
        return data;
    } catch (error) {
        console.log(error)
        return error
    }
}