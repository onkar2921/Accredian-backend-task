
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const CryptoJS=require("crypto-js")
require("dotenv").config();
const { v4: uuid4 } = require("uuid");


// import query functions
const {signUpQuery,
    // loginQuery,
    getUserdataQuery,checkUser}=require("../DbQueries/AuthQueries")

// secreate key for decrypt the data
const secretKey =process.env.SECREATEKEY;





// signup controller

const SignUpController=async(req,res)=>{
    try {
        
const encryptedDataFromClient = req.body.encryptedData; // Assuming it's sent in the request body
const decryptedData = CryptoJS.AES.decrypt(encryptedDataFromClient, secretKey).toString(CryptoJS.enc.Utf8);

const { username, email, password, contact, address } = JSON.parse(decryptedData);



// validation of data
if(!username || !email || !password || !contact || !address){
    return res.status(401).json({message:"please provide username, email, password, contact, address",sucess:false})
}


if (!password) {
    return res.status(400).json({ message: 'Password is missing in the decrypted data.' });
}

const hashPassword = bcrypt.hashSync(password, 12);

const uniqueId=uuid4();

        const userData = {
            id:uniqueId,
            username,
            email,
            password: hashPassword,
            contact,
            address
          };
        const result=await signUpQuery(userData);

        if(result){
           return res.status(201).json({message:"sign up sucessfully",sucess:true, result});
        }
        return res.status(500).json({message:"sign up failed",sucess:false});


        
    } catch (error) {
        console.log(error)
    }
}


// login controller

const LoginController=async(req,res)=>{
 try {
    
       
const encryptedDataFromClient = req.body.encryptedData; 
console.log("encrypted data at back",encryptedDataFromClient)
const decryptedData = CryptoJS.AES.decrypt(encryptedDataFromClient, secretKey).toString(CryptoJS.enc.Utf8);

    const {email,password}=JSON.parse(decryptedData);
    console.log("decrypted data at back",email,password)
    // validation of data
if( !email || !password ){
    return res.status(401).json({message:"please provide username, email, password, contact, address",sucess:false})
}


    //  check user is already exist or not on email

     const exist=await checkUser(email);
    //  console.log("exist",exist[0][0]);
     if(!exist){
        return res.status(404).json({ message: 'User not found with the provided email.' });
     }

     const actualPassword=await bcrypt.compareSync(password,exist[0][0].password);
     if(!actualPassword){
        return res.status(404).json({ message: 'User password is not matched' });
     }


    
     const token= await jwt.sign({email:exist[0][0].email,id:exist[0][0].id},process.env.SECREATEKEY)

     if(token){
        return res.status(201).json({message:"login sucessfully",sucess:true,exist, token});
     }
     return res.status(500).json({message:"login failed",sucess:false});

 } catch (error) {
    console.log(error)
 }
}


// get user data controller

const GetUserDataController=async(req,res)=>{
    try {
        const userId=req.user;

        if(!userId){
          return  res.status(404).json({message:"please provide userid",sucess:false});
        }

        console.log("userID",userId)

        const userData=await getUserdataQuery(userId?.id);
        
        if(userData){
            return res.status(201).json({message:"getting user data sucessfully",sucess:true,userData});
         }
         return res.status(500).json({message:"failed in getting user data",sucess:false});
    

    } catch (error) {
        console.log(error)
    }
}


module.exports={SignUpController,LoginController,GetUserDataController}