// Contact.js
import React, { useEffect, useState } from "react";

export default function Contact() {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/ContactUs")
      .then((res) => res.json())
      .then((data) => setContact(data))
      .catch((err) => console.error("Error fetching contact:", err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">📞 Contact Us</h2>
      {contact ? (
        <div className="bg-white shadow-md rounded p-6">
          <p><strong>Name:</strong> {contact.name}</p>
          <p><strong>Email:</strong> {contact.email}</p>
          <p><strong>Phone:</strong> {contact.phoneno}</p>
        </div>
      ) : (
        <p>Loading contact info...</p>
      )}
    </div>
  );
}
