import Transaction from "../models/Transaction"



const plans = [

]


//api controller for getting all plans

export const getallplans = async (req,res)=>{
  try {
    res.json({success:true,plans})
    
  } catch (error) {
    res.json({success:false,message:error.message})
  }
}


//api controller to purchase the plan
export  const purchasePlan = async (req,res)=>{
  try {
    const {planId}= req.body
    const userId= req.user._id
    const plan= plans.find(plan =>plan._id === planId)
    if(!plan){
      return res.json({success:false,message:"invalid plan"})
    }
    //create new transaction

    const transaction = await Transaction.create({
      userId:userId,
      planId:planId,
      amount:plan.price,
      credits:plan.credits,
      isPaid:false
    })
  } catch (error) {
    
  }

}
