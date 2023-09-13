import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { Input, Modal, Form, Select, message, Table } from 'antd'
import axios from 'axios';
import Spinner from '../components/Spinner';

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setloading] = useState(false);
  const [allTransection, setAllTransection] = useState([]);
  const [frequency, setFrequency] = useState('7');

  //table data 
  const columns = [
    {
      title:'Date',
      dataIndex:'date'
    },
    {
      title:'Amount',
      dataIndex:'amount'
    },
    {
      title:'Type',
      dataIndex:'type'
    },
    {
      title:'Category',
      dataIndex:'category'
    }, {
      title:'Refrence',
      dataIndex:'refrence'
    },
    {
      title:'Actions',
    },
  ]

  //get all transections 
 
  //useeffect HOOK
  useEffect(() => {
    const getAllTransections = async ()=>{
      try{
        const user = JSON.parse(localStorage.getItem('user'));
        setloading(true);
        const res = await axios.get('/transections/get-transection',
           {userid: user._id,
           frequency
        });
        setloading(false);
        setAllTransection(res.data);
        console.log(res.data)
      }catch(error){
        console.log(error);
        message.error('Fetch Issue With Tranction')
      }
    };
  
    getAllTransections();
  },[frequency]);

  //form handiling 
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      setloading(true)
      await axios.post('/transections/add-transection', { ...values, userid: user._id });
      setloading(false);
      message.success('Transaction added Successfully');
      setShowModal(false)
    } catch (error) {
      setloading(false);
      message.error('Failed to add transection');
    }
  }
  return (
    <Layout>
      {loading && <Spinner/>}
      <div className='filters'>
        <div>
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(values)=>setFrequency(values)}>
          <Select.Option value='7'>LAST 1 Week</Select.Option>
          <Select.Option value='30'>LAST 1 Month</Select.Option>
          <Select.Option value='365'>LAST 1 Year</Select.Option>
          <Select.Option value='custom'>Custom</Select.Option>
          </Select>
        </div>
        <div>
          <button className='btn btn-primary' onClick={() => setShowModal(true)}>
            Add New
          </button>
        </div>
      </div>
      <div className='content'>
      <Table columns={columns} dataSource={allTransection}/>
      </div>
      <Modal title='Add Transection'
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form layout='vertical' onFinish={handleSubmit}>
          <Form.Item label='Amount' name='amount'>
            <Input type='text' />
          </Form.Item>
          <Form.Item label='type' name='type'>
            <Select>
              <Select.Option value='income'>Income</Select.Option>
              <Select.Option value='expense'>Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label='Category' name='category'>
            <Select>
              <Select.Option value='salary'>Salary</Select.Option>
              <Select.Option value='tip'>Tip</Select.Option>
              <Select.Option value='project'>Project</Select.Option>
              <Select.Option value='food'>Food</Select.Option>
              <Select.Option value='movie'>Movie</Select.Option>
              <Select.Option value='bills'>Bills</Select.Option>
              <Select.Option value='medical'>Medical</Select.Option>
              <Select.Option value='fee'>Fee</Select.Option>
              <Select.Option value='tax'>Tax</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label='Date' name='date'>
            <Input type='date' />
          </Form.Item>
          <Form.Item label='Refrence' name='refrence'>
            <Input type='text' />
          </Form.Item>
          <Form.Item label='Description' name='description'>
            <Input type='text' />
          </Form.Item>
          <div className='d-flex justify-content-end'>
            <button className='btn btn-primary'>
              {" "}
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  )
}

export default HomePage;