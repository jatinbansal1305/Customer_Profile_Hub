import React, { useState, useEffect } from "react";
import './CustomerPortal.css';
import Photos from "./Photos";
const CustomerPortal = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);


  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.error(error));
  }, []);


  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);
  };
  return (
    <div className="customer-portal">
      <div className="customer-list-container">
        <div className="customer-list">
          {customers.map((customer) => (
            <div
              key={customer.id}
              className={`customer-card ${selectedCustomer && selectedCustomer.id === customer.id
                ? "selected"
                : ""
                }`}
              onClick={() => handleCustomerClick(customer)}
            >
              <h2>{customer.title}</h2>
              <p>{customer.body}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="customer-details-container">
        <div className="customer-details">
          {selectedCustomer ? (
            <>
              <h2>{selectedCustomer.title}</h2>
              <p>{selectedCustomer.body}</p>
              <Photos />
            </>
          ) : (
            <p>Select a customer to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerPortal;
