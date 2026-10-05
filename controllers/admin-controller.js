const User = require('../models/userModel');
const Transaction = require('../models/transactionModel');

const getAllUsers = async(req,res)=>{
    try {
        const users = await User.find({},{password:0});
        console.log(users); 
        if(!users || users.length===0){
            return res.status(404).json({message : 'No Users Found'})
        }
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
    }
}

const deleteUserById=async(req,res)=>{
    try {
        const id = req.params.id;
        await User.deleteOne({_id:id})
        return res.status(200).json({message : 'User deleted succesfully'})
    } catch (error) {
        console.log(error);
    }
}

const getTransactions = async(req,res)=>{
    try {
        const id = req.params.id;
        const transactions = await Transaction.find({userid:id})
        console.log(transactions);
        if(!transactions || transactions.length===0){
            return res.status(404).json({message : 'No Transactions Found'})
        }
        return res.status(200).json(transactions);
    } catch (error) {
        console.log(error);
    }
}

const getUpdatedTransactions = async(req,res)=>{
    try {
        const id = req.params.id;
        const transactions = await Transaction.find({userid:id})
        console.log(transactions);
        if(!transactions || transactions.length===0){
            return res.status(404).json({message : 'No Transactions Found'})
        }
        return res.status(200).json(transactions);
    } catch (error) {
        console.log(error);
    }
}

const getUserData=async(req,res)=>{
    try {
        const id = req.params.id;
        const user = await User.findOne({_id:id})
        console.log(user); 
        if(!user || user.length===0){
            return res.status(404).json({message : 'No Transactions Found'})
        }
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
}


module.exports = {getAllUsers, deleteUserById, getTransactions, getUserData, getUpdatedTransactions};