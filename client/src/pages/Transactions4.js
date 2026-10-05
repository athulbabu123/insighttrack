import React, { useEffect, useState } from 'react';
import { Form, Input, message, Modal, Select, Table } from 'antd';
import { EditOutlined, DeleteOutlined, TableOutlined } from '@ant-design/icons'
import { DatePicker } from 'antd';
import moment from 'moment';
import axios from 'axios';
import './Transactions4.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../components/Layout/Footer';
import AdminLayoutNavbar from './AdminLayoutNavbar';
export let loginUserName = 'initialName';

const { RangePicker } = DatePicker;

const Transactions4 = () => {

  const [loading, setLoading] = useState(false);
  const[fetching,setFetching]=useState(false);
  const [showModal, setShowModal] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [frequency, setFrequency] = useState('7');
  const [selectedDate, setSelectedDate] = useState([]);
  const [editable, setEditable] = useState(null);
  const [type, setType] = useState('all');
  const navigate = useNavigate();

  const location = useLocation();

  const { user} = location.state || { user };



  const getAllTransaction = async () => {
    setFetching(true);
    try {
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
      setFetching(false);
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


  

  const viewAnalytics = () => {
    navigate('/admin/analytics-data', { state: { allTransaction, user } });
  };

  const formatDate=(date)=>{
    let transactionDate = moment(date).format("DD-MM-YYYY");
    return transactionDate;
}

const alert = ()=>{
  message.error('No Transactions Found')
}

const handleDateChange = (dates) => {
    if (dates) {
      setSelectedDate([
        dates[0].format('YYYY-MM-DD'),
        dates[1].format('YYYY-MM-DD'),
      ]);
    } else {
      setSelectedDate([]);
    }
  };



  return (
    <div>
      
      <div className='dashboard-header'>
        <AdminLayoutNavbar/>
      </div>

      <div className='dashboard-welcome'>
      <h1 className='transaction-heading'>Transactions of {user.name} </h1>
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
            {/* {frequency === "custom" && <RangePicker value={selectedDate} onChange={(values) => setSelectedDate(values)} />} */}
            {frequency === "custom" && <RangePicker value={selectedDate.length ? [moment(selectedDate[0]), moment(selectedDate[1])] : []} onChange={handleDateChange} />}
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

          <div className='analytics-btn'>
            <button className='btn btn-primary' onClick={() => viewAnalytics()}>View Analytics</button>
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

export default Transactions4


