import{ React, useState,useEffect }from "react";
import { render } from "react-dom";
import './invoice.css';

import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import requestPost from '../../serviceWorker';
import 'antd/dist/antd.css';


const Invoices = (data) => {


  // const [service, setServ] = useState([])
  const [invoiceData, setInvoiceData] = useState('')
  const [servArr, setservArr] = useState([])
  const [itemArr, setitemArr] = useState([])
  const [invNO, setInvNo] = useState('')
  const [date, setDate] = useState('')
  const [sumvalue,setSum] = useState(0)
  const [company,setCompany] = useState('')
  const [imgPop, setimgPop] = useState();
// const servArr = data.data.state.services
// const itemArr = data.data.state.items
// console.log(servArr);
  const printdoc=()=>{
  
    document.getElementById("printbutton").style.display="none";
   window.print()
   data.onclose()
  }


let sum=0;
  useEffect(() => {

const rdata =	{
		"type" : "SP_CALL",
	 "requestId" : 2400005,
		 "request": {
 }
  }
 
  requestPost(rdata).then((res) => {

	setCompany(res.data.result)

	setimgPop(res.data.result.logo)
	console.log(res.data.result);
  }).catch(() => {
  
console.log('No internet connection found. App is running in offline mode.');
})
	
	const requestData = {
		"type": "SP_CALL",
		"requestId": 2100002,
		"request": {
		  "cmId" : data.data.state
		}
	  }

	  requestPost(requestData).then((res) => {

setInvoiceData(res.data.result)
console.log(res.data.result);
setInvNo(res.data.result.bill.invoiceNo)
setDate(res.data.result.bill.date)
if(res.data.result.bill.items[0]!==null){

	setitemArr(res.data.result.bill.items)
	const arritem=res.data.result.bill.items;
	let i;
	let rate
	let qty
	
	for ( i = 0; i < arritem.length; i+=1 ) {
		
		 rate=parseInt(arritem[i].price,10);
		
		 qty=parseInt(arritem[i].qty,10);
		sum += rate*qty;
		

	} 
	
	}else{
		
		setitemArr([])
	}
	
	if(res.data.result.bill.services[0]!==null){
	setservArr(res.data.result.bill.services)


	const arritem=res.data.result.bill.services;
	let i;
	let rate
	let qty
	
	for ( i = 0; i < arritem.length; i+=1 ) {
		
		 rate=parseInt(arritem[i].price,10);
		
		 qty=parseInt(arritem[i].qty,10);
		sum += rate*qty;
		

	} 
	
	}else{
		setservArr([])
	}
	setSum(sum)
	  }).catch(() => {

		console.log('No internet connection found. App is running in offline mode.');
	  })
	
  }, [])
  
  const logoStyle = {
	width: "100px",
	height: "100px",
	
		padding: "20px",
	
  };


  return (
    <>
 
<div className="container bootstrap snippets bootdeys">
<div className="row">
  <div className="col-sm-12">
	  	<div className="panel panel-default invoice" id="invoice">
		  <div className="panel-body">
			{/* <div className="invoice-ribbon"><div className="ribbon-inner">PAID</div></div> */}
		    <div className="row">

				<div className="col-sm-6 top-left">
					{/* <i className="fa fa-rocket"/> */}

					<img src={imgPop} style={logoStyle} alt="logo" className="logo" />
				</div>

				<div className="col-sm-6 top-right">
						<h3 className="marginright">INVOICE NO-  {invNO} </h3>
						<span className="marginright">{date}</span>
			    </div>

			</div>
			<hr/>
			<div className="row">

				<div className="col-md-6 from">
					<p className="lead marginbottom">From : {company.name}</p>
					<p>{company.address}</p>
					
					<p>{company.city}</p>
					<p>Phone: {company.mobile}</p>
					<p>Email: {company.email}</p>
				</div>

				<div className="col-md-6 to ">
					<p className="lead marginbottom">To : {invoiceData.name} </p>
					<p>Vehicle no: {invoiceData.vehicleNumber}</p>
					<p>Address: {invoiceData.address}</p>
					<p>Phone: {invoiceData.mobile}</p>
					

			    </div>

			    {/* <div className="col-md-4 text-right payment-details">
					<p className="lead marginbottom payment-info">Payment details</p>
					<p>Date: 14 April 2014</p>
					
			    </div> */}

			</div>

{   itemArr.length>0 ?
            <div>
            <h5 className="pt-4">Items</h5>
			<div className="row table-row">
				<table className="table table-striped">
			      <thead>
			        <tr>
			          <th className="text-center" style={{width:'5%'}}>#</th>
			          <th style={{width:'50%'}}>Item</th>
			          <th className="text-right" style={{width:'15%'}}>Quantity</th>
			          <th className="text-right" style={{width:'15%'}}>Unit Price</th>
			          <th className="text-right" style={{width:'15%'}}>Total Price</th>
			        </tr>
			      </thead>
			      <tbody>
                    {itemArr.map((item, index) => (
                        <tr>
                        <td className="text-center">{index+1}</td>
                        <td>{item.service}</td>
                        <td className="text-right">{item.qty}</td>
                        <td className="text-right">AED {item.price}</td>
                        <td className="text-right">AED {item.qty*item.price}</td>
						
                      </tr>
                    ))}
			        
			       
			       </tbody>
			    </table>

			</div>
            </div>
 : null} 



{   servArr.length>0 ?
<div>
<h5 className="pt-4">Service</h5>
            <div className="row table-row">
				<table className="table table-striped">
			      <thead>
			        <tr>
			          <th className="text-center" style={{width:'5%'}}>#</th>
			          <th style={{width:'50%'}}>Service</th>
			          <th className="text-right" style={{width:'15%'}}>Quantity</th>
			          <th className="text-right" style={{width:'15%'}}>Unit Price</th>
			          <th className="text-right" style={{width:'15%'}}>Total Price</th>
			        </tr>
			      </thead>
			      <tbody>
                    {servArr.map((item, index) => (
                        <tr>
                        <td className="text-center">{index+1}</td>
                        <td>{item.service}</td>
                        <td className="text-right">{item.qty}</td>
                        <td className="text-right">AED{item.price}</td>
                        <td className="text-right">AED {item.qty*item.price}</td>
                      </tr>
                    ))}
			        
			       
			       </tbody>
			    </table>

			</div>
            </div>

 : null} 
			<div className="row">
			<div className="col-md-6 margintop">
				<p className="lead marginbottom">THANK YOU!</p>

				<button className="btn btn-success" id="printbutton"  onClick={printdoc}><i className="fa fa-print"/>Print Invoice</button>
				{/* <button className="btn btn-danger"><i className="fa fa-envelope-o"/>Mail Invoice</button> */}
			</div>
			<div className="col-md-6 text-right pull-right invoice-total">
					  
			          
			          <b className="pt-2">Total : {sumvalue} </b>
			</div>
			</div>

		  </div>
		</div>
	</div>
</div>
</div>
   </>
  );
};

export default Invoices