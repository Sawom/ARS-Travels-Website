import React, { useEffect, useState } from 'react';
import { Button, Form, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Shipment = () => {
    const [error, setError] = useState('');
    const [shipment , setShipment] = useState({});

    // date picker
    const [date, setDate] = useState();

    // shipment info loading
    const [info, setInfo] = useState([]);
     useEffect(()=>{
        fetch('http://localhost:5000/shipment')
        .then(res => res.json())
        .then(data => setInfo(data));
    }, []) // end

    // input from form
    const handleInput = event =>{
        const field = event.target.name;
        const value = event.target.value;
        const newShipment = {...shipment};
        newShipment[field] = value;
        setShipment(newShipment);
    }

     // add data shipment
    const handleAddShipment = (event) =>{
        event.preventDefault();
        console.log(shipment);
        fetch(`http://localhost:5000/shipment`, {
            method : 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(shipment)
        } )
        .then(res => res.json())
        .then(data =>{
           if(data.acknowledged){
                alert('Shipment Information Added');
                const refresh = window.location.reload(true);
                event.target.reset();
           }
            
        })
    }
     // delete
    const handleDelete = id=> {
        const agree = window.confirm(`Are You Sure You Want to Delete: ${id}`);
        if(agree){
            fetch(`http://localhost:5000/shipment/${id}`, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data =>{
                if(data.deletedCount > 0){
                    alert('Deleted Successfully!');
                    const remainingShipment = info.filter(inf => inf._id !== id );
                    setInfo(remainingShipment);
                }
            })
        }
    }

    return (
        <div>
            <h4 className='App my-4'>Shipment Form</h4>
            <div className='container my-4 center' >
                <Form onSubmit={handleAddShipment} className='my-4'>
                    {/* package code */}
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label> Package Code </Form.Label>
                        <Form.Control onChange={handleInput} required name="packagecode" type="number" placeholder="Enter Package Code" />
                    </Form.Group> 
                    {/* name */}
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Name</Form.Label>
                        <Form.Control  onChange={handleInput} required  name="name" type="text" placeholder="Enter Name" />
                    </Form.Group>
                    {/* email */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={handleInput} required type="email" name="email" placeholder="Enter Email" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    {/* city */}
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>City</Form.Label>
                        <Form.Control onChange={handleInput} required  name="city" type="text" placeholder="Enter City" />
                    </Form.Group>
                    {/* address */}
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label> Address </Form.Label>
                        <Form.Control onChange={handleInput} required  name="address" type="text" placeholder="Enter Address" />
                    </Form.Group>
                    {/* phone no */}
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Phone No</Form.Label>
                        <Form.Control onChange={handleInput} required name="phoneno" type="number" placeholder="Enter Phone no" />
                    </Form.Group>
                    {/* date */}
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Select Date</Form.Label>
                        <Form.Control onChange={handleInput} required name="date" type="date"  placeholder="Enter date" />
                    </Form.Group>
                    {/* button */}
                    <Button size='sm' variant="primary" type="submit">
                        Add Shipping
                    </Button>
                </Form>
            </div>
            <br /><br />
            <h2 className='App' >Shipment information</h2>
            {/* showing shipment info */}
            <div >
                
                <div className='container my-3 '>
                    {
                        info.map( shipInfo =>  <ListGroup as="ol" key={shipInfo._id}>
                            <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start"  >
                                <div className="ms-2 me-auto">
                                <p> <b> Package Code: {shipInfo.packagecode} </b>  </p>
                                <p > <b> Name: {shipInfo.name} </b>  </p>
                                <p> Email: {shipInfo.email} </p>
                                <p> City: {shipInfo.city} </p>
                                <p> Address: {shipInfo.address} </p>
                                <p> Phone: {shipInfo.phoneno }</p>
                                <p> Date: {shipInfo.date} </p>
                                <Link to={`/shipment/update/${shipInfo._id}`} >
                                        <Button variant="success" size='sm' >Update</Button>
                                </Link> 
                                <Button className='mx-3' size='sm' variant="danger" onClick={ ()=> handleDelete(shipInfo._id)} >X Delete</Button>
                                </div>
                            </ListGroup.Item>
                            <br />
                        </ListGroup> )
                    }
                </div>
            </div>
            
        </div>
    );
};

export default Shipment;