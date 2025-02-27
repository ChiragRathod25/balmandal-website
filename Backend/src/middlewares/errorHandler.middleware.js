export const errorHandler=(err,req,res,next)=>{
    let statuscode=err.statuscode || 500;
    let message=err.message ;
    console.log("Error: ",err);
    
    console.error(`Error : ${statuscode} ${message}`)
    return res.status(statuscode).json({
        success:false,
        statuscode,
        message,
    })
}