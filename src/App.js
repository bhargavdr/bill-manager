import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import AddBill from './components/AddBill';
import BillsList from './components/BillsList';
import EditBill from './components/EditBill';

function App() {
  const [billsList, setBillsList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const bill = (name, currency, amount, dueDate, difference) => {
    const newBill = { name, currency, amount, dueDate, difference };
    setBillsList([...billsList, newBill]);
  };

  const removeBill = (index) => {
    const updatedBillsList = [...billsList];
    updatedBillsList.splice(index, 1);
    setBillsList(updatedBillsList);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
  };

  const handleUpdateBill = (
    updatedName,
    updatedCurrency,
    updatedAmount,
    updatedDueDate,
    updatedDifference
  ) => {
    const updatedBillsList = [...billsList];
    updatedBillsList[editingIndex] = {
      name: updatedName,
      currency: updatedCurrency,
      amount: updatedAmount,
      dueDate: updatedDueDate,
      difference: updatedDifference,
    };
    setBillsList(updatedBillsList);
    setEditingIndex(null);
  };

  const sortedBillsList = [...billsList].sort(
    (a, b) => a.difference - b.difference
  );

  return (
    <>
      <Header />
      <div className="App">
        <AddBill className="addBillContainer" onSubmit={bill} />
        <div className="billsContainer">
          {sortedBillsList.length > 0 ? <h2>List of Bills:</h2> : null}
          {editingIndex !== null ? (
            <EditBill
              billDetails={sortedBillsList[editingIndex]}
              onSubmit={handleUpdateBill}
              onCancel={handleCancelEdit}
            />
          ) : (
            sortedBillsList.length > 0 &&
            sortedBillsList.map((bill, index) => (
              <BillsList
                key={index}
                index={index}
                name={bill.name}
                currency={bill.currency}
                amount={bill.amount}
                dueDate={bill.dueDate}
                difference={bill.difference}
                onDelete={removeBill}
                onEdit={handleEdit}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default App;
