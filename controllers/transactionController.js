const transactionModel = require('../models/transactionModel');
const moment = require('moment');

// const getAllTransaction = async (req, res) => {
//   try {
//     const { frequency, selectedDate, userid, type } = req.body;

//     let dateFilter = {};

//     if (frequency !== 'custom') {
//       dateFilter = {
//         date: {
//           $gt: moment().subtract(Number(frequency), 'd').toDate(),
//         },
//       };
//     } else {
//       dateFilter = {
//         date: {
//           $gte: moment(selectedDate[0]).startOf('day').toDate(),
//           $lte: moment(selectedDate[1]).endOf('day').toDate(),
//         },
//       };
//     }

//     console.log('Request Parameters:', { frequency, selectedDate, userid, type });
//     console.log('Date Filter:', dateFilter);

//     const transactions = await transactionModel.find({
//       userid,
//       ...dateFilter,
//       ...(type !== 'all' && { type }),
//     });

//     console.log('Fetched Transactions:', transactions);

//     res.status(200).json(transactions);
//   } catch (error) {
//     console.error('Error Fetching Transactions:', error);
//     res.status(500).json({ message: 'Failed to fetch transactions', error });
//   }
// };





const getAllTransaction = async (req, res) => {
  try {
    const { frequency, selectedDate, userid, type } = req.body;

    let dateFilter = {};

    // Validate and log incoming data
    console.log('Request Parameters:', { frequency, selectedDate, userid, type });

    if (frequency !== 'custom') {
      // Validate frequency and log
      const days = Number(frequency);
      if (isNaN(days) || days <= 0) {
        throw new Error('Invalid frequency value');
      }

      dateFilter = {
        date: {
          $gte: moment().subtract(days, 'days').startOf('day').toDate(),
          $lte: moment().endOf('day').toDate(),
        },
      };
    } else {
      // Validate selectedDate
      if (!Array.isArray(selectedDate) || selectedDate.length !== 2) {
        throw new Error('Invalid selectedDate format');
      }
      
      const [startDate, endDate] = selectedDate;

      // Log dates and create filter
      console.log('Start Date:', moment(startDate).startOf('day').toDate());
      console.log('End Date:', moment(endDate).endOf('day').toDate());

      dateFilter = {
        date: {
          $gte: moment(startDate).startOf('day').toDate(),
          $lte: moment(endDate).endOf('day').toDate(),
        },
      };
    }

    console.log('Date Filter:', dateFilter);

    // Perform the database query
    const transactions = await transactionModel.find({
      userid,
      ...dateFilter,
      ...(type !== 'all' && { type }),
    });

    console.log('Fetched Transactions:', transactions);

    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error Fetching Transactions:', error.message || error);
    res.status(500).json({ message: 'Failed to fetch transactions', error: error.message || error });
  }
};



const deleteTransaction =async(req,res)=>{
    try{
                await transactionModel.findOneAndDelete({_id:req.body.transactionId})
                res.status(200).send('transaction deleted');
    }
     catch(error){
        console.log(error);
        res.status(500).json(error);
     }

}

const editTransaction = async (req, res) => {
  try {
    await transactionModel.findOneAndUpdate({ _id: req.body.transactionId }, req.body.payload);
    res.status(200).send('Edit Successfully');
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const addTransaction = async (req, res) => {
  try {
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();
    res.status(201).send('Transaction created');
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { getAllTransaction, addTransaction, editTransaction,deleteTransaction };
