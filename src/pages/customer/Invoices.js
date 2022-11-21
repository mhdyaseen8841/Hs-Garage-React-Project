import{ React, useState }from "react";
import { render } from "react-dom";
import './invoice.css';

import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';

import 'antd/dist/antd.css';

const Invoices = (data) => {


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
 
<div className="container bootstrap snippets bootdeys">
<div className="row">
  <div className="col-sm-12">
	  	<div className="panel panel-default invoice" id="invoice">
		  <div className="panel-body">
			{/* <div className="invoice-ribbon"><div className="ribbon-inner">PAID</div></div> */}
		    <div className="row">

				<div className="col-sm-6 top-left">
					<i className="fa fa-rocket"/>
				</div>

				<div className="col-sm-6 top-right">
						<h3 className="marginright">INVOICE-{data.data.state.invoiceNum}</h3>
						<span className="marginright">{data.data.state.date}</span>
			    </div>

			</div>
			<hr/>
			<div className="row">

				<div className="col-md-4 from">
					<p className="lead marginbottom">From : HS Garage</p>
					<p>350 Rhode Island Street</p>
					
					<p>California, 94103</p>
					<p>Phone: 415-767-3600</p>
					<p>Email: contact@dynofy.com</p>
				</div>

				<div className="col-md-4 to">
					<p className="lead marginbottom">To : {data.data.state.customer}</p>
					<p>425 Market Street</p>
        
					<p>California, 94105</p>
					<p>Phone: 415-676-3600</p>
					<p>Email: john@doe.com</p>

			    </div>

			    <div className="col-md-4 text-right payment-details">
					<p className="lead marginbottom payment-info">Payment details</p>
					<p>Date: 14 April 2014</p>
					<p>VAT: DK888-777 </p>
					<p>Total Amount: $1019</p>
					<p>Account Name: Flatter</p>
			    </div>

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
                        <td className="text-center">{index}</td>
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
                        <td className="text-center">{index}</td>
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
					  <p>Subtotal : $1019</p>
			          <p>Discount (10%) : $101 </p>
			          <p>VAT (8%) : $73 </p>
			          <p>Total : $991 </p>
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