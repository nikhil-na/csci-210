import React, { useContext } from "react";
import { TiDelete } from 'react-icons/ti';
import { AppContext } from "../../context/AppContext";

import { Card, ProgressBar } from 'react-bootstrap';

const ExpenseItem = (props) => {
    const { dispatch } = useContext(AppContext);

    const handleDeleteExpense = () => {
        dispatch({
            type: 'DELETE_EXPENSE',
            payload: props.id
        })
    }
    return (

        <Card className="d-flex justify-content-center mb-3">
			<Card.Body>
				<Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
					<div className="me-2">{props.name}</div>
					<div className="d-flex align-items-baseline">
						${props.cost} <span className="text-muted fs-6 ms-1">
							/${2000}
						</span>
                        <TiDelete size = '1.5rem' onClick={handleDeleteExpense}></TiDelete>
					</div>
				</Card.Title>
				<ProgressBar 
					className="rounded-pill" 
					variant={getProgressBarVariant(props.cost, 2000)} 
					min={0} 
					max={2000} 
					now={props.cost} 
				/>
			</Card.Body>
		</Card>
    )
}

function getProgressBarVariant(amount, max){
    const ratio = amount / max;;
    if(ratio < 0.5) return "primary";
    if(ratio < 0.75) return "warning";
    return "danger";
}


export default ExpenseItem;