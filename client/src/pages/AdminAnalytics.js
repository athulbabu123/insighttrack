import React from 'react'
import {Card, Col, Progress, Row, Statistic} from 'antd'
import { useLocation } from 'react-router-dom';
import { PieChart} from '@mui/x-charts';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowDownOutlined, ArrowUpOutlined, DollarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import './AdminAnalytics.css'
import Footer from '../components/Layout/Footer';
import AdminLayoutNavbar from './AdminLayoutNavbar';

const AdminAnalytics = () => {

    const location = useLocation();
    const { allTransaction, user } = location.state || {};





// Total number of transactions
const totalTransaction = allTransaction.length;

// Filter transactions by type
const totalIncomeTransactions = allTransaction.filter(transaction => transaction.type === 'income');
const totalExpenseTransactions = allTransaction.filter(transaction => transaction.type === 'expense');

// Calculate total amounts
const totalIncomeAmount = totalIncomeTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);
const totalExpenseAmount = totalExpenseTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);

// Calculate absolute difference
const difference = (totalIncomeAmount - totalExpenseAmount);

// Calculate percentage of income and expense transactions
const totalIncomePercent = (totalIncomeTransactions.length / totalTransaction) * 100;
const totalExpensePercent = (totalExpenseTransactions.length / totalTransaction) * 100;

// Calculate percentage of profit and loss
const profitPercentage = difference > 0 ? (difference / totalIncomeAmount) * 100 : 0;
const lossPercentage = difference < 0 ? (Math.abs(difference) / totalIncomeAmount) * 100 : 0;


console.log(`Total Transactions: ${totalTransaction}`);
console.log(`Total Income Transactions: ${totalIncomeTransactions.length}`);
console.log(`Total Expense Transactions: ${totalExpenseTransactions.length}`);
console.log(`Total Income Amount: $${totalIncomeAmount}`);
console.log(`Total Expense Amount: $${totalExpenseAmount}`);
console.log(`Difference (absolute): $${difference}`);
console.log(`Percentage of Income Transactions: ${totalIncomePercent}%`);
console.log(`Percentage of Expense Transactions: ${totalExpensePercent}%`);
// console.log(`Percentage of Profit/Loss: ${profitLossPercent}%`);

let value = ''
let color =''
let icon = ''
let situation = ''


if (difference>0) {
    value=profitPercentage
    color='#00ff00'
    icon=<ArrowUpOutlined />
    situation='Profit'
} else if(difference<0) {
    value=lossPercentage
    color='#cf1322'
    icon=<ArrowDownOutlined />
    situation='Loss'
}else{
    value=0
    color='#ffffff'
    icon=<DollarOutlined />
    situation='Balanced'
}

const customTitle = (
    <span style={{ fontSize: '20px', color: '#000000' }}>Profit/Loss</span>
    );

const customSituation = (
    <span className={(difference>0) ? 'profit' : 'loss'}>{situation}</span>
    );
     

// Function to generate a list of months
const generateMonths = (start, end) => {
    let months = [];
    let current = dayjs(start);
    const endDate = dayjs(end);
  
    while (current.isBefore(endDate) || current.isSame(endDate, 'month')) {
      months.push(current.format('YYYY-MM'));
      current = current.add(1, 'month');
    }
  
    return months;
  };
  
  // Function to aggregate data and include all months
  const aggregateData = (transactions, start, end) => {
    const data = {};
    const months = generateMonths(start, end);
  
    transactions.forEach(({ date, type, amount }) => {
      const transactionDate = dayjs(date);
  
      if (transactionDate.isAfter(dayjs(start).subtract(1, 'day')) && transactionDate.isBefore(dayjs(end).add(1, 'day'))) {
        const month = transactionDate.format('YYYY-MM');
  
        if (!data[month]) {
          data[month] = { month, income: 0, expense: 0 };
        }
  
        if (type === 'income') {
          data[month].income += amount;
        } else if (type === 'expense') {
          data[month].expense += amount;
        }
      }
    });
  
    // Ensure all months are present within the date range
    months.forEach(month => {
      if (!data[month]) {
        data[month] = { month, income: 0, expense: 0 };
      }
    });
  
    // Convert object to array and sort by month
    const sortedData = Object.values(data).sort((a, b) => dayjs(a.month).unix() - dayjs(b.month).unix());
  
    return sortedData;
  };
  
  // Define the start and end dates
  const startDate = '2024-01-01';
  const endDate = '2024-12-31';
  
  const data = aggregateData(allTransaction, startDate, endDate);


  return (
    <div className='body'>

    <div className='dashboard-header'>
        <AdminLayoutNavbar/>
    </div>

    <div className='dashboard-welcome'>
      <h1 className='transaction-heading'>Analytics of {user.name} </h1>
      </div>

    <div className='heading-title'>
        <h2 className='pie-heading'>Pie Chart</h2>
        <h2 className='result-heading'>Result</h2>
        <h2 className='bar-heading'>Bar Chart</h2>
    </div>

    <div className='chart-and-card'>

    <div className='pie-chart'>  
        <PieChart
        series={[
        {
        data: [
        { id: 0, value: totalIncomeAmount, label: 'Income',color: '#00ff00' },
        { id: 1, value: totalExpenseAmount, label: 'Expense', color: 'red' },
        ],
        },
        ]}
        width={400}
        height={200}
        />
    </div>



    <div className='profit-loss-card'>
        <Row gutter={40}>
            <Col span={40}>
                <Card bordered={false}>
                    <div className={(difference>0) ? 'profit' : 'loss'}>{customTitle}</div>
                    <Statistic
                    style={{ width: 200, height: 90, padding:20,paddingLeft:30,fontWeight: 700}}
                    title={customSituation}
                    value={`${value}`}
                    precision={2}
                    valueStyle={{ color: `${color}` }}
                    prefix={icon}
                    suffix="%"
                    />
                </Card>
            </Col>
        </Row>
    </div>

    </div>

    <div className='bar-chart'>
    <ResponsiveContainer width={350} height={300}>
      <BarChart data={data}>
        <XAxis dataKey="month" tick={{ fill: '#055df5', fontSize: 12 }} axisLine={{ stroke: '#000000' }} tickLine={{ stroke: '#ffffff' }}/>
        <YAxis tick={{ fill: '#f44336', fontSize: 12 }} tickLine={{ stroke: '#ffffff' }} axisLine={{ stroke: '#000000' }}/>
        <Tooltip />
        <Legend />
        <Bar dataKey="income" fill="#00ff00" barSize={10} />
        <Bar dataKey="expense" fill="#ff4d4f" barSize={10} />
      </BarChart>
    </ResponsiveContainer>
    </div>

    <div>
        <Footer/>
    </div>

</div>
  )
}

export default AdminAnalytics
