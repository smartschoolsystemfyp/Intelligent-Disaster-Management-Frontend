import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AiOutlineFileDone } from "react-icons/ai";
import { useService } from "../../context/service";
import Loader from "../../components/Loader";

const Donation = () => {
  const {
    loading,
    disasters,
    donations,
    getDonations,
    getDonationById,
    assignDonationToDisaster,
    createDonation,
    updateDonation,
    deleteDonation,
  } = useService();

  const [isModalOpen, setModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [actionType, setActionType] = useState("create");
  const [updatedDonationId, setUpdatedDonationId] = useState(null);
  const [selectedDisaster, setSelectedDisaster] = useState(null);
  const [newDonation, setNewDonation] = useState({
    donorName: "",
    donorContact: "",
    donationType: "Monetary",
    amount: "",
    status: "",
    items: [{ itemName: "", quantity: 0 }],
    date: new Date().toISOString().split("T")[0],
  });

  const donationTypes = ["Monetary", "In-Kind"];
  const statusOptions = ["Pending", "Received", "Assigned"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDonation({ ...newDonation, [name]: value });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...newDonation.items];
    updatedItems[index][name] = value;
    setNewDonation({ ...newDonation, items: updatedItems });
  };

  const handleAddItem = () => {
    setNewDonation({
      ...newDonation,
      items: [...newDonation.items, { itemName: "", quantity: 0 }],
    });
  };

  const handleDonation = async () => {
    if (actionType === "create") await createDonation(newDonation);
    else await updateDonation(updatedDonationId, newDonation);
    setModalOpen(false);
    setNewDonation({
      donorName: "",
      donorContact: "",
      donationType: "Monetary",
      amount: "",
      status: "",
      items: [{ itemName: "", quantity: 0 }],
      date: new Date().toISOString().split("T")[0],
    });
  };

  async function handleEdit(id) {
    if (id) {
      const donation = await getDonationById(id);
      setNewDonation({
        donorName: donation.donorName || "",
        donorContact: donation.donorContact || "",
        donationType: donation.donationType || "",
        amount: donation.amount || "",
        status: donation.status || "",
        location: donation.location || "",
        items:
          donation.items.length > 1 &&
          donation.items.map((item) => {
            return { itemName: item.itemName, quantity: item.quantity };
          }),
      });
      setUpdatedDonationId(donation._id);
      setActionType("update");
      setModalOpen(true);
    }
  }

  function handleAssignModalOpen(id) {
    setIsAssignModalOpen(true);
    setUpdatedDonationId(id);
  }

  async function handleAssign() {
    await assignDonationToDisaster(selectedDisaster, updatedDonationId);
    setIsAssignModalOpen(false);
  }

  useEffect(() => {
    getDonations();
  }, []);

  return (
    <div className="p-6 text-[0.828rem]">
      {loading && <Loader />}
      <div id="modal" className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Donations</h2>
        <button
          className="bg-[#171717] text-white px-4 py-2 rounded-md hover:bg-black"
          onClick={() => setModalOpen(true)}
        >
          Add Donation
        </button>
      </div>

      <div id="overflow" className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-lg rounded-lg whitespace-nowrap overflow-hidden">
          <thead className="bg-[#171717] text-white">
            <tr>
              <th className="px-4 py-3">Donor Name</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Amount/Items</th>
              <th className="px-4 py-3">Date</th>
              {/* <th className="px-4 py-3">Assigned To</th> */}
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {donations.length > 0 &&
              donations.map((donation, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-100 transition duration-200"
                >
                  <td className="px-4 py-3">{donation.donorName}</td>
                  <td className="px-4 py-3">{donation.donorContact}</td>
                  <td className="px-4 py-3">{donation.donationType}</td>
                  <td className="pl-12 py-3">
                    {donation.donationType === "Monetary"
                      ? `PKR ${donation.amount}`
                      : donation.items
                          .map((item) => `${item.itemName} ${item.quantity}`)
                          .join(", ")}
                  </td>
                  <td className="px-4 py-3">{donation.date?.slice(0, 10)}</td>
                  {/* <td className="px-4 py-3">
                    {donation?.assignedDisaster.name}
                  </td> */}
                  <td
                    className={`px-4 py-3 font-bold ${
                      donation.status === "Pending"
                        ? "text-yellow-500"
                        : donation.status === "Received"
                        ? "text-green-500"
                        : "text-blue-500"
                    }`}
                  >
                    {donation.status}
                  </td>
                  <td className="px-4 py-3 flex space-x-2 font-extrabold">
                    <button
                      onClick={() => handleAssignModalOpen(donation._id)}
                      className="text-green-500 hover:text-green-700"
                    >
                      <AiOutlineFileDone />
                    </button>
                    <button
                      onClick={() => handleEdit(donation._id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={async () => {
                        const confirm = window.confirm(
                          "Are you sure you want to delete?"
                        );
                        if (confirm) await deleteDonation(donation._id);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {donations.length === 0 && (
          <div className="w-full h-[50vh] flex justify-center items-center font-semibold">
            No Donation found
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            id="overflow"
            className="bg-white modal p-8 rounded-lg shadow-lg w-96 max-w-full mx-auto max-h-[95vh] overflow-y-auto"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Add New Donation
            </h3>
            <div className="flex flex-col gap-4">
              {/* Donor Name */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="donorName"
                  className="text-sm font-medium text-gray-700"
                >
                  Donor Name
                </label>
                <input
                  type="text"
                  id="donorName"
                  name="donorName"
                  placeholder="Enter donor name"
                  value={newDonation.donorName}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Donor Contact */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="donorContact"
                  className="text-sm font-medium text-gray-700"
                >
                  Contact
                </label>
                <input
                  type="text"
                  id="donorContact"
                  name="donorContact"
                  placeholder="Enter contact information"
                  value={newDonation.donorContact}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Donation Type */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="donationType"
                  className="text-sm font-medium text-gray-700"
                >
                  Donation Type
                </label>
                <select
                  id="donationType"
                  name="donationType"
                  value={newDonation.donationType}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {donationTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="status"
                  className="text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={newDonation.status}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {statusOptions.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="amount"
                  className="text-sm font-medium text-gray-700"
                >
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  placeholder="Enter amount"
                  value={newDonation.amount}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Items */}
              <div className="flex flex-col gap-2">
                {newDonation.items.length > 0 &&
                  newDonation.items.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        name="itemName"
                        placeholder="Item Name"
                        value={item.itemName}
                        onChange={(e) => handleItemChange(index, e)}
                        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all w-1/2"
                      />
                      <input
                        type="number"
                        name="quantity"
                        placeholder="Quantity"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, e)}
                        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all w-1/2"
                      />
                    </div>
                  ))}
                <button
                  className="text-blue-500 hover:text-blue-600 hover:underline mt-2 text-sm font-medium transition-all"
                  onClick={handleAddItem}
                >
                  + Add Another Item
                </button>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition-all focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  onClick={handleDonation}
                >
                  {actionType === "create" ? "Add Donation" : "Update Donation"}
                </button>
                <button
                  className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isAssignModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div id="modal" className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Assign Donation</h3>
            <select
              className="border p-2 rounded w-full"
              value={selectedDisaster}
              onChange={(e) => setSelectedDisaster(e.target.value)}
            >
              <option value="">Select Disaster</option>
              {disasters.map((disaster, index) => (
                <option key={index} value={disaster._id}>
                  {disaster.name}
                </option>
              ))}
            </select>
            <div className="flex justify-end gap-3 mt-4">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                onClick={handleAssign}
              >
                Assign
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                onClick={() => setIsAssignModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Donation;
