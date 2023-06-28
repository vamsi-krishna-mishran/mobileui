import {API_URL} from '@env';
export const UploadType=async (url,type="GET",payload="NULL")=>{
    const res = await fetch(`${url}`,{
        method:type,
        headers: {
            "Content-Type": "application/json",
          },
        body:JSON.stringify(payload)
    });
    if(res.status===200)
    {
        const res2=await res.text();
        return res2;
    }
    else 
    {
        return false;
    }
    
}

  