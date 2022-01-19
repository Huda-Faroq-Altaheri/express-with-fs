const express=require('express');
const app=express();
app.use(express.json()); 

const userRouter=require('./module/user/user.router');
app.use(userRouter);

app.listen(3000,()=>{
    console.log('server is running');
})