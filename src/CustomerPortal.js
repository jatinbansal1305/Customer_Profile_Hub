import React, { useState, useEffect, useRef } from "react";
import "./CustomerPortal.css";
import Photos from "./Photos";

const CustomerPortal = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(1000);
  const customerListRef = useRef(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.error(error));
  }, []);

  
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);
  };


  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (customerListRef.current) {
      const firstCustomerCard = customerListRef.current.querySelector(".customer-card");
      if (firstCustomerCard) {
        firstCustomerCard.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [currentPage]);

  
  const totalPages = Math.ceil(customers.length / customersPerPage);

  return (
    <div className="customer-portal">
      <div className="customer-list-container">
        <div className="customer-list" ref={customerListRef}>
          {currentCustomers.map((customer) => (
            <div
              key={customer.id}
              className={`customer-card ${
                selectedCustomer && selectedCustomer.id === customer.id ? "selected" : ""
              }`}
              onClick={() => handleCustomerClick(customer)}
            >
              <h2>{customer.title}</h2>
              <p>{customer.body}</p>
            </div>
          ))}
        </div>
       
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
            className="pagination-arrow"
          >
            &#8249;
          </button>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => paginate(currentPage + 1)}
            className="pagination-arrow"
          >
            &#8250;
          </button>
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
