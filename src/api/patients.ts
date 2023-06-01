import $api from "../api/index";

interface IAddParams {
  uid: string,
  uname: string,
  sex: any,
  age: string,
  tel: string,
  address: string,
  [key: string]: any,
}

// 添加患者数据
export const addDataList = async (params: any) => {
  return await $api.post('/patients', {
    // uid: params.uid,
    uname: params.uname,
    sex: Number(params.sex),
    age: params.age,
    tel: params.tel,
    address: params.address,
  })
};

// 获取患者数据
export const getDataList = async (params: IAddParams) => {
  return await $api.get('/patients', {
    params: {
      ...params,
    },
  })
};

// 更新患者数据
export const upDataList = async (id: string, params: IAddParams) => {
  return await $api.patch(`/patients/${id}`, params)
};

// 删除患者数据
export const delDataList = async (id: string) => {
  return await $api.delete(`/patients/${id}`)
};

export default {};
