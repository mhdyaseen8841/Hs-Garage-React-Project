import{ React, useState }from "react";
import { render } from "react-dom";

import { Col, Divider, Row, Table } from 'antd';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';

import 'antd/dist/antd.css';

const Invoice = (data) => {


  // const [service, setServ] = useState([])
  

const servArr = data.data.state.services
const itemArr = data.data.state.items
console.log(servArr);
  const printdoc=()=>{
  
    document.getElementById("printbutton").style.display="none";
   window.print()
   data.onclose()
  }
  return (
    <>
    
   
    <div id="divcontents" style={{ padding: 20 }}>
        <Row>
          <Col>
            <Divider>Invoice</Divider>
          </Col>
        </Row>

        <Row gutter={24} style={{ marginTop: 32 }}>
          <Col span={8}>
            <h3>HS Garage</h3>
            <div>#944/945, 4th Cross, 9th Main,</div>
            <div>Vijaya Bank Layout,</div>
            <div>Bannerghatta Road,</div>
            <div>Dubai - 560076</div>
          </Col>
          <Col span={8} offset={8}>
            <table>
              <tr>
                <th>Invoice # :</th>
                <td>{data.data.state.invoiceNum}</td>
              </tr>
              <tr>
                <th>Invoice Date :</th>
                <td>{data.data.state.date}</td>
              </tr>
              <tr>
                <th>Due Date :</th>
                <td>10-01-2018</td>
              </tr>
            </table>
          </Col>
        </Row>

        <Row style={{ marginTop: 48 }}>
          <div>Bill To: <strong> {data.data.state.customer} </strong></div>
          <div>Bannerghatt Road,</div>
          <div>Bangalore - 560076</div>
        </Row>

        <Row style={{ marginTop: 15 }}>
          <Col>
          <h5>Services</h5>
          </Col>
        </Row>

        <Row width={100}>
          <Table dataSource={servArr} 
            pagination={false}
          >
            <Table.Column title="Items" dataIndex='item' />
            <Table.Column title="Quantity" dataIndex='quantity' />
            <Table.Column title="Price" dataIndex='rate' />
            <Table.Column title="Line Total" />
          </Table>
        </Row>



        <Row style={{ marginTop: 15 }}>
          <Col>
          <h5>Items</h5>
          </Col>
        </Row>

        <Row >
          <Table dataSource={itemArr}
            pagination={false}
          >
            <Table.Column title="Items" dataIndex='item' />
            
            <Table.Column title="Quantity" dataIndex='quantity' />
            <Table.Column title="Price" dataIndex='rate' />
            <Table.Column title="Line Total" />
          </Table>
        </Row>

        <Row style={{ marginTop: 48 }}>
          <Col span={8} offset={16}>
            <table>
              <tr>
                <th>Gross Total :</th>
                <td>Rs. 1599</td>
              </tr>
              <tr>
                <th>IGST @6% :</th>
                <td>Rs. 95.94</td>
              </tr>
              <tr>
                <th>CGST @6% :</th>
                <td>Rs. 95.94</td>
              </tr>
              <tr>
                <th>Nett Total :</th>
                <td>Rs. 1790.88</td>
              </tr>
            </table>
          </Col>
        </Row>

        <Row style={{ marginTop: 48, textAlign: 'center' }}>
          notes
        </Row>

        <Row style={{ marginTop: 48, textAlign: 'center' }}>
          Footer
        </Row>
        <button id="printbutton" variant="contained" onClick={printdoc}>Create Invoice</button>
      </div></>
  );
};

export default Invoice