import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddExpenseForm from "./expense/AddExpense";
import BudgetC from "./expense/BudgetC";
import ExpenseList from "./expense/ListExpense";
import ExpenseTotal from "./expense/TotalExpense";
import Remaining from "./expense/RemainingBal";
import Navbar from "../components/header/navbar";
import Footer from "../components/header/footer";

import Container from 'react-bootstrap/Container';
import { Button, Card, ProgressBar, Stack } from 'react-bootstrap';

function Dashboard(){
    const [auth, setAuth] = useState(false);
    const [name, setName] = useState('');

    axios.defaults.withCredentials = true;

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/dashboard')
        .then((res) => {
            if(res.data.Status === "Success"){
                setAuth(true);
                setName(res.data.name);
            } else{
                setAuth(false);
                navigate('/login');
            }
        })
        .catch(err => console.log(err))
    }, [])

    console.log(auth);

    const handleLogout = () => {
        axios.get('http://localhost:8000/logout')
        .then((res) => {
            navigate('/');
        })
        .catch(err => console.log(err));
    }

    return (
        <div style={setBackground}>
            <Navbar />
            <div className="container">
                {
                    auth && 
                    <div>
                        <Container className="my-4">
                            <Stack direction = "horizontal" gap="2" className="mb-4">
                                <h3 className="me-auto">Welcome to your Dashboard, {name} !!</h3>
                                <Button variant = "outline-primary" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </Stack>
                            
                        </Container>
                        
                        <div className='container'>
                            <h3 className='mt-3 d-flex justify-content-center pt-5'>Your Budget Planner</h3>
                            <div className='row mt-3'>
                                <div className='col-sm'>
                                    <BudgetC />
                                </div>
                                <div className='col-sm'>
                                    <Remaining />
                                </div>
                                <div className='col-sm'>
                                    <ExpenseTotal />
                                </div>
                            </div>
                            <h3 className='mt-3'>Expenses</h3>
                            <div className='row '>
                                <div className='col-sm'>
                                    <ExpenseList />
                                </div>
                            </div>
                            <h3 className='mt-3'>Add Expense</h3>
                            <div className='row mt-3'>
                                <div className='col-sm'>
                                    <AddExpenseForm />
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <Footer />
        </div>
    )
}
const setBackground = {
    background: "linear-gradient(45deg,  #A0A0A0, #FFFFFF)",
}

export default Dashboard;