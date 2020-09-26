// import axios from 'axios';
import {API_URL} from './../config/index.js';
const endpoint= 'https://5f5c7a365e3a4d0016249439.mockapi.io/api/products';

const getListProductService = () =>{
  return axios({
    url: endpoint,
    method:'GET',
  });
};

const deleteProductService = (id)=> {
  return axios({
    url: `${endpoint}/${id}`,
    method:'DELETE',
  })
}

const addProductService = (product) =>{
  return axios({
    url: endpoint,
    method: 'POST',
    data: product,
  })
}
const getDetailService = (id) => {
  return axios({
    url: `${endpoint}/${id}`,
    method:'GET',
  })
}
const updateService = (id,product) => {
  return axios({
    url: `${endpoint}/${id}`,
    method:'PUT',
    data: product,
  })
}
export {deleteProductService,getListProductService,addProductService,getDetailService,updateService};


export const callAPI = ({uri,method="GET",data=null}) => {
  return axios({
    url:`${API_URL}${uri}`,
    method,
    data,
  })
}
