import React from 'react';
import { MdDeleteOutline } from 'react-icons/md';

const BillsList = ({
  index,
  name,
  currency,
  amount,
  dueDate,
  difference,
  onDelete,
  onEdit,
}) => {
  const handleDelete = () => {
    onDelete(index);
  };

  const handleEditClick = () => {
    onEdit(index);
  };

  const styles = {
    color:
      difference > 7
        ? 'green'
        : difference <= 7 && difference > 0
        ? 'orange'
        : 'red',
  };

  return (
    <div
      className="bill"
      style={{ cursor: 'pointer' }}
      onClick={handleEditClick}
    >
      <h3>{name}</h3>
      <p>
        {currency} {amount}
      </p>
      <p style={styles}>{dueDate}</p>
      <button
        className="deletebtn"
        onClick={(e) => {
          e.stopPropagation();
          handleDelete();
        }}
      >
        <MdDeleteOutline />
      </button>
    </div>
  );
};

export default BillsList;
