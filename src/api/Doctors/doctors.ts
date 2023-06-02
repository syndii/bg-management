import $api from "@/api/index";

interface IAddParams {
    did: string,
    uname: string,
    sex: any,
    age: string,
    tel: string,
    a: string,
    [key: string]: any,
}

// 添加医生数据
export const addDataList = async (params: any) => {
    return await $api.post('/doctors', {
        // uid: params.uid,
        uname: params.uname,
        sex: Number(params.sex),
        age: params.age,
        tel: params.tel,
        a: params.address,
    })
};

// 获取医生数据
export const getDataList = async (params: IAddParams) => {
    console.log(params)
    return await $api.get('/doctors', {
        params: {
            ...params,
        },
    })
};

// 更新医生数据
export const upDataList = async (id: string, params: IAddParams) => {
    return await $api.patch(`/doctors/${id}`, params)
};

// 删除医生数据
export const delDataList = async (id: string) => {
    return await $api.delete(`/doctors/${id}`)
};

export default {};
