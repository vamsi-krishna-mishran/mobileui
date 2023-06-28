const asynccall=()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{resolve("OK")},2000);
    })
}
const asynccall1=(param)=>{
    
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{console.log(param);resolve("OK")},3000);
    })
}
const asynccall2=()=>{
    console.log("call2")
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{resolve("OK")},4000);
    })
}
(
    async()=>{
       var res=await asynccall();
       console.log(res)
        asynccall1("vamsi");
        asynccall1("krishna");
    }
)()



