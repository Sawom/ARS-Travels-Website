import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const Update = () => {
    // user = update
    const [update, setUpdate] = useState({name:'', email:''});
    const {id} = useParams();

     // date picker
    const [date, setDate] = useState();

    // load
    useEffect( ()=>{
        fetch(`http://localhost:5000/shipment/${id}`)
        .then(res=> res.json())
        .then(data => setUpdate(data) );
    },  [])

    // update package code
    const handlePackagecodeChange = event =>{
        const updatedPackage = event.target.value;
        const updatedUser = {packagecode: updatedPackage, name: update.name, email: update.email, city: update.city , address: update.address , phoneno: update.phoneno , date: update.date };
        setUpdate(updatedUser);
    }

    // update name
    const handleNameChange = event =>{
        const updatedName = event.target.value;
        const updatedUser = { packagecode: update.packagecode , name: updatedName , email: update.email, city: update.city , address: update.address , phoneno: update.phoneno , date: update.date };
        setUpdate(updatedUser);
    }
    // update email
    const handleEmailChange = event =>{
        const updatedEmail = event.target.value;
        const updatedUser = { packagecode: update.packagecode, name: update.name , email: updatedEmail , city: update.city , address: update.address , phoneno: update.phoneno , date: update.date };
        setUpdate(updatedUser);
    }

    //update city
    const handleCityChange = event =>{
        const updatedCity = event.target.value;
        const updatedUser = { packagecode: update.packagecode, name: update.name , email: update.email , city: updatedCity , address: update.address , phoneno: update.phoneno , date: update.date };
        setUpdate(updatedUser);
    }

    //update address
    const handleAddressChange = event =>{
        const updatedAddress = event.target.value;
        const updatedUser = { packagecode: update.packagecode, name: update.name , email: update.email , city: update.city , address: updatedAddress , phoneno: update.phoneno , date: update.date };
        setUpdate(updatedUser);
    }

    // update phone no
    const handlePhoneChange = event =>{
        const updatedPhone = event.target.value;
        const updatedUser = { packagecode: update.packagecode, name: update.name , email: update.email , city: update.city , address: update.address , phoneno: updatedPhone , date: update.date };
        setUpdate(updatedUser);
    }

    // update date change
    const handleDateChange = event =>{
        const updatedDate = event.target.value;
        const updatedUser = { packagecode: update.packagecode, name: update.name , email: update.email , city: update.city , address: update.address , phoneno: update.phoneno , date: updatedDate };
        setUpdate(updatedUser);
    }

    // updated user function
    const handleUpdate = event => {
        event.preventDefault();
        const url = `http://localhost:5000/shipment/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(update)
        })
        .then(res => res.json())
        .then(data =>{
            if(data.modifiedCount > 0){
                alert('updated successfully! ')
                setUpdate({});
                event.target.reset();
            }
        })
    }

    return (
        <div>
            <br />
            <h3 className='app'> Update Name: {update.name} , Email: {update.email} </h3> <br />
            <div className='center container' >
                <br />
                <Form onSubmit={handleUpdate} >
                    <br />
                    {/* update package code */}
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Package Code</Form.Label>
                        <Form.Control onChange={handlePackagecodeChange}  required  defaultValue={update.packagecode || ''} name="phoneno" type="number" placeholder="Phone no" />
                    </Form.Group>

                    {/* update name */}
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Name</Form.Label>
                        <Form.Control onChange={handleNameChange} required defaultValue={update.name || ''} name="name" type="text" placeholder="Name" />
                    </Form.Group>

                    {/* update email */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={handleEmailChange}  required defaultValue={update.email || ''}  name="email"  type="email" placeholder="Email" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    {/* update city */}
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>City</Form.Label>
                        <Form.Control onChange={handleCityChange}  required defaultValue={update.city || ''}  name="city" type="text" placeholder="City" />
                    </Form.Group>

                    {/* update address */}
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Address</Form.Label>
                        <Form.Control onChange={handleAddressChange}  required defaultValue={update.address || ''} name="address" type="text" placeholder="Address" />
                    </Form.Group>

                    {/* update phone no */}
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Phone no</Form.Label>
                        <Form.Control onChange={handlePhoneChange}  required  defaultValue={update.phoneno || ''} name="phoneno" type="number" placeholder="Phone no" />
                    </Form.Group>

                    {/* update date */}
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Select Date</Form.Label>
                        <Form.Control onChange={handleDateChange} required defaultValue={update.date || ''} name="date" type="date"  placeholder="Enter date" />
                    </Form.Group>

                    {/*  button */}
                    <Button variant="primary" type="submit">Update</Button>
                    <br /> <br />
                </Form>
            </div>
            <br />
        </div>
    );
};

export default Update;