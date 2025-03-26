import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch contacts from backend
    axios
      .get("http://localhost:5002/api/admin/contacts")
      .then((response) => {
        setContacts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Contact Messages</h1>

      {loading ? (
        <p>Loading contacts...</p>
      ) : contacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-600">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="border border-gray-600 p-2">Email</th>
              <th className="border border-gray-600 p-2">Full Name</th>
              <th className="border border-gray-600 p-2">Message</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={index} className="text-center bg-gray-200">
                <td className="border border-gray-600 p-2">{contact.email}</td>
                <td className="border border-gray-600 p-2">{contact.fullName}</td>
                <td className="border border-gray-600 p-2">{contact.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
