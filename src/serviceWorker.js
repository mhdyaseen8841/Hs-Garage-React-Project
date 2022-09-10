import axios from "axios"
import ServiceURL from "./constants/url"

 const requestPost = async (data) =>{
  const response = await axios.post(ServiceURL,data)
  return response
}
export default requestPost;
