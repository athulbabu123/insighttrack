import React, { useEffect, useState } from 'react';
import { Form, Input, message, Modal, Select, Table } from 'antd';
import { EditOutlined, DeleteOutlined, TableOutlined } from '@ant-design/icons'
import { DatePicker } from 'antd';
import moment from 'moment';
import axios from 'axios';
import './Dashboard.css';
import DashboardNavbar from './DashboardNavbar';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Layout/Footer';
export let loginUserName = 'initialName';

const { RangePicker } = DatePicker;

const Dashboard = () => {

  const [loading, setLoading] = useState(false);
  const[fetching,setFetching]=useState(false);
  const [viewData, setViewData] = useState('table');
  const [showModal, setShowModal] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [frequency, setFrequency] = useState('7');
  const [selectedDate, setSelectedDate] = useState([]);
  const [editable, setEditable] = useState(null);
  const [loginUser,setLoginUser] = useState('');
  const [type, setType] = useState('all');
  const navigate = useNavigate();



  const getAllTransaction = async () => {
    setFetching(true);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      setLoading(true);
      console.log('Fetching transactions with:', {
        userid: user._id,
        frequency,
        selectedDate: selectedDate.length > 0 ? [moment(selectedDate[0]).format('YYYY-MM-DD'), moment(selectedDate[1]).format('YYYY-MM-DD')] : [],
        type,
      });
      const res = await axios.post('/transactions/get-transaction', {
        userid: user._id,
        frequency,
        selectedDate: selectedDate.length > 0 ? [moment(selectedDate[0]).format('YYYY-MM-DD'), moment(selectedDate[1]).format('YYYY-MM-DD')] : [],
        type,
      });
      console.log('API Response:', res.data);
      setAllTransaction(res.data);
      if(allTransaction.length>0){
        setFetching(false);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
      message.error('Issue with transaction');
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    getAllTransaction();
  }, [frequency, selectedDate, type]);

 
  

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      setLoading(true);
      if (editable) {
        await axios.post('/transactions/edit-transaction', { payload: { ...values, userid: user._id, _id: editable._id }, transactionId: editable._id });
        setLoading(false);
        message.success('Transaction updated successfully');
      } else {
        await axios.post('/transactions/add-transaction', { ...values, userid: user._id });
        message.success('Transaction added successfully');
      }
      setLoading(false);
      setShowModal(false);
      setEditable(null);
      getAllTransaction();
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error('Failed to add/update transaction');
    }
  };

  // Handle edit
  const handleEdit = (record) => {
    setEditable(record);
    setShowModal(true);
  };

  // Handle delete handler
  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post('/transactions/delete-transaction', { transactionId: record._id });
      setLoading(false);
      message.success('Transaction deleted successfully');
      getAllTransaction();
      //   getAllTransaction();
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error('Failed to delete transaction');
    }
  };


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setLoginUser(user);
    }
  }, []);


  const loginUserName = loginUser.name;
  console.log(loginUserName);
  

  const viewAnalytics = () => {
    navigate('/analytics-data', { state: { allTransaction,loginUser } });
  };

  const formatDate=(date)=>{
    let transactionDate = moment(date).format("DD-MM-YYYY");
    return transactionDate;
}

const alert = ()=>{
  message.error('No Transactions Found')
}

  return (
    <div>
      
      <div className='dashboard-header'>
        <DashboardNavbar/>
      </div>

      <div className='dashboard-welcome'>
        <h4>Welcome {loginUser && loginUser.name}</h4>
      </div>


      <div className='filter-heading'>Select Filters</div>
      <div className="filters">
          {/* div for filters */}
          

          <div className='select-filters'>
            
            <h6>Filter by date</h6>
            <Select className='date-width' value={frequency} onChange={(values) => setFrequency(values)}>
              <Select.Option value="7">Last 1 Week</Select.Option>
              <Select.Option value="14">Last 2 Weeks</Select.Option>
              <Select.Option value="21">Last 3 Weeks</Select.Option>
              <Select.Option value="30">Last Month</Select.Option>
              <Select.Option value="182">Last 6 Months</Select.Option>
              <Select.Option value="365">Last 1 Year</Select.Option>
              <Select.Option value="custom">Custom Range</Select.Option>
            </Select>
            {frequency === "custom" && <RangePicker value={selectedDate} onChange={(values) => setSelectedDate(values)} />}
          </div>

          {/* div for category type */}
          <div className='select-type'>
            <h6>Filter by Type</h6>
            <Select style={{ width: '100px' }} value={type} onChange={(values) => setType(values)}>
              <Select.Option value="all" >All</Select.Option>
              <Select.Option value="income" >Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </div>

          <div className='analytics-btn-user'>
            <button className='btn btn-primary' onClick={() => viewAnalytics()}>View Analytics</button>
          </div>

          {/* div for add button */}
          <div className='add-button'>
            <button className="btn btn-primary" onClick={() => { setEditable(null); setShowModal(true); }}>Add New Transaction</button>
          </div>

        </div>

        <div className='data-div-dashboard'>
        {allTransaction.length === 0 ? (
          <>
          
            <p className='no-transactions-message'>No transactions found</p> 
          
          </>
    
  ) : (
        <table id='dashboard-table'>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
  {allTransaction.map((curUser) => (
    <tr key={curUser._id}>
      <td>{formatDate(curUser.date)}</td>
      <td>{curUser.amount}</td>
      <td>{curUser.type}</td>
      <td>{curUser.category}</td>
      <td>{curUser.description}</td>
      <td><button className='btn' onClick={() => handleEdit(curUser)}><EditOutlined/></button></td>
      <td><button className='btn' onClick={() => handleDelete(curUser)}><DeleteOutlined/></button></td>
    </tr>
  ))}
</tbody>
        </table>
  )}
    
    </div>

    <div>
    <Modal title={editable ? "Edit Transaction" : "Add Transaction"} 
  open={showModal} 
  onCancel={() => setShowModal(false)}
  footer={false}>
          <Form layout="vertical" 
  onFinish={handleSubmit} 
  initialValues={editable ? {
    amount: editable.amount,
    type: editable.type,
    category: editable.category,
    date: moment(editable.date).format("YYYY-MM-DD"),
    description: editable.description
  } : {
    amount: '',
    type: null, // Default value
    category: null, // Default value
    date: null, // Default to today's date
    description: ''
  }}>
            <Form.Item label="Amount" name='amount'>
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Type" name='type'>
              <Select placeholder="Select a type">
                <Select.Option value="income">income</Select.Option>
                <Select.Option value="expense">expense</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Category" name='category'>
              <Select placeholder="Select a category">
                <Select.Option value="salary">salary</Select.Option>
                <Select.Option value="gift">gift</Select.Option>
                <Select.Option value="food">food</Select.Option>
                <Select.Option value="movie">movie</Select.Option>
                <Select.Option value="bills">bills</Select.Option>
                <Select.Option value="fees">fees</Select.Option>
                <Select.Option value="tax">tax</Select.Option>
                <Select.Option value="others">others</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Date" name='date'>
              <Input type="date" />
            </Form.Item>
            <Form.Item label="Description" name='description'>
              <Input type="text" />
            </Form.Item>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">SAVE</button>
            </div>
          </Form>
        </Modal>
    </div>

    <div>
      <Footer/>
    </div>

    </div>
  )
}

export default Dashboard
