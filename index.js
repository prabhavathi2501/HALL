import  express from "express"
const app = express()
app.use(express.json())

const hall =[{
    rooms:[],
    bookingrooms:[],
    starttime:/^(0[0-9]|1\d|2[0-3])\:(00)/,
    endtime:/^(0[0-9]|1\d|2[0-3])\:(00)/,
    room_id:[]
}]

app.get("/",(req,res)=>{
    res.send("Home Page:Hall Booking APP")
})

app.get("/hall",(req,res)=>{
    res.send({
        message:"data fetch successfully",
        count:hall.length,
        hall
    })
})
app.post("/hall",(req,res)=>{
  let data = req.body
  hall.push(data)
  let filterData = hall.filter((e)=>e.code===data.code)
  if(filterData.length==0)
  {
    hall.push(data)
          res.status(200).send({
    message:"data create sucessfull"
  })  
  }
  else
  {
    res.send({
        message:" already hall exits"
    })
  }
 })
app.post("/newhallcreate",(req,res)=>{
   let booked=false;
    hall.map((e)=>{
       
        if(e.roomID===req.body.roomID){
          e.bookedStatus="Occupied";
          e.customerName=req.body.customerName;
          e.date=req.body.date;
          e.startTime=req.body.startTime;
          e.endTime=req.body.endTime;
          booked:true
        }
       
      })
      if(booked){
        console.log(error)
        res.json({
          message:"Booking Successfull"
        })
      }else{
        res.json({
          message:"Booking Failed",
          instruction:"Check room exist or not and check the availability"
        })
      }
})

app.listen(8004,()=>console.log("server listen to port 8004 sussfully"))