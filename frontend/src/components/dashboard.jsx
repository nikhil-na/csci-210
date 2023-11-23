import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/header/navbar";
import Footer from "../components/header/footer";

import AddBudgetModal from "../components/dashboardEx/AddBudgetModal";
import AddExpenseModal from "../components/dashboardEx/AddExpenseModal";
import ViewExpensesModal from "../components/dashboardEx/ViewExpensesModal";
import BudgetCard from "../components/dashboardEx/BudgetCard";
import UncategorizedBudgetCard from "../components/dashboardEx/UncategorizedBudgetCard";
import TotalBudgetCard from "../components/dashboardEx/TotalBudgetCard";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../context/BudgetsContext";

import Container from "react-bootstrap/Container";
import { Button, Stack } from "react-bootstrap";

function Dashboard() {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");

  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/dashboard")
      .then((res) => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.name);
        } else {
          setAuth(false);
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    axios
      .get("http://localhost:8000/logout")
      .then((res) => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const { budgets, getBudgetExpenses } = useBudgets();

  console.log(budgets);

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  return (
    <div>
      <Navbar />
      <div className="container mb-5">
        {auth && (
          <>
            <Container className="my-4">
              <Stack direction="horizontal" gap="2" className="mb-4">
                <h3 className="me-auto">
                  Welcome to your Dashboard, {name} !!
                </h3>
                <Button variant="outline-primary" onClick={handleLogout}>
                  Logout
                </Button>
              </Stack>
              <Stack direction="horizontal" gap="2" className="mb-4">
                <h1 className="me-auto">Budgets</h1>
                <Button
                  variant="primary"
                  onClick={() => setShowAddBudgetModal(true)}
                >
                  Add Budget
                </Button>
                <Button variant="outline-primary" onClick={openAddExpenseModal}>
                  Add Expense
                </Button>
              </Stack>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: "1rem",
                  alignItems: "flex-start",
                }}
              >
                {budgets.map((budget) => {
                  const amount = getBudgetExpenses(budget.id).reduce(
                    (total, expense) => total + expense.amount,
                    0
                  );
                  return (
                    <BudgetCard
                      key={budget.id}
                      name={budget.name}
                      amount={amount}
                      max={budget.max}
                      onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                      onViewExpensesClick={() =>
                        setViewExpensesModalBudgetId(budget.id)
                      }
                    />
                  );
                })}
                <UncategorizedBudgetCard
                  onAddExpenseClick={openAddExpenseModal}
                  onViewExpensesClick={() =>
                    setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)
                  }
                />
                <TotalBudgetCard />
              </div>
            </Container>
            <AddBudgetModal
              show={showAddBudgetModal}
              handleClose={() => setShowAddBudgetModal(false)}
            />
            <AddExpenseModal
              show={showAddExpenseModal}
              defaultBudgetId={addExpenseModalBudgetId}
              handleClose={() => setShowAddExpenseModal(false)}
            />
            <ViewExpensesModal
              budgetId={viewExpensesModalBudgetId}
              handleClose={() => setViewExpensesModalBudgetId()}
            />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
const setBackground = {
  background: "linear-gradient(45deg,  #A0A0A0, #FFFFFF)",
};

export default Dashboard;
