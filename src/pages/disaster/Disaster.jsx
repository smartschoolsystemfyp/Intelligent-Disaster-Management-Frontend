import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useService } from "../../context/service";
import Loader from "../../components/Loader";

const Disaster = () => {
  const {
    loading,
    disasters,
    getDisasters,
    deleteDisaster,
    createDisaster,
    updateDisaster,
    getDisasterById,
  } = useService();

  const [isModalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState("create");
  const [updateDisasterId, setUpdateDisasterId] = useState(null);
  const [newDisaster, setNewDisaster] = useState({
    name: "",
    type: "Earthquake",
    location: "",
    status: "Active",
    startDate: "",
    endDate: "",
    description: "",
  });

  const disasterTypes = [
    "Earthquake",
    "Flood",
    "Wildfire",
    "Hurricane",
    "Tornado",
  ];
  const statusOptions = ["Active", "Resolved", "Monitoring"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDisaster({ ...newDisaster, [name]: value });
  };

  const handleDisaster = async () => {
    if (actionType === "create") await createDisaster(newDisaster);
    else await updateDisaster(updateDisasterId, newDisaster);
    setActionType("create");
    setModalOpen(false);
    setNewDisaster({
      name: "",
      type: "",
      location: "",
      status: "Active",
      startDate: "",
      endDate: "",
      description: "",
    });
  };

  async function handleEdit(id) {
    if (id) {
      const disaster = await getDisasterById(id);

      setNewDisaster({
        name: disaster.name || "",
        type: disaster.type || "",
        location: disaster.location || "",
        status: disaster.status || "Active",
        startDate: disaster.startDate
          ? new Date(disaster.startDate).toISOString().split("T")[0]
          : "",
        endDate: disaster.endDate
          ? new Date(disaster.endDate).toISOString().split("T")[0]
          : "",
        description: disaster.description || "",
      });

      setUpdateDisasterId(disaster._id);
      setActionType("update");
      setModalOpen(true);
    }
  }

  useEffect(() => {
    getDisasters();
  }, []);

  return (
    <div className="p-6 text-[0.828rem]">
      {loading && <Loader />}
      <div id="modal" className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Disasters</h2>
        <button
          className="bg-[#171717] text-white px-4 py-2 rounded-md hover:bg-black"
          onClick={() => setModalOpen(true)}
        >
          Add Disaster
        </button>
      </div>

      <div id="overflow" className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-lg whitespace-nowrap rounded-lg overflow-hidden">
          <thead className="bg-[#171717] text-white">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Start Date</th>
              <th className="px-4 py-3">End Date</th>
              <th className="px-4 py-3">Assigned Resources</th>
              <th className="px-4 py-3">Assigned Volunteers</th>
              <th className="px-4 py-3">Assigned Donations</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {disasters.length > 0 &&
              disasters.map((disaster, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-100 transition duration-200"
                >
                  <td className="px-4 py-3">{disaster.name}</td>
                  <td className="px-4 py-3">{disaster.type}</td>
                  <td className="px-4 py-3">{disaster.location}</td>
                  <td
                    className={`px-4 py-3 font-bold ${
                      disaster.status === "Active"
                        ? "text-red-500"
                        : disaster.status === "Resolved"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {disaster.status}
                  </td>
                  <td className="px-4 py-3">
                    {disaster?.startDate?.slice(0, 10)}
                  </td>
                  <td className="px-4 py-3">
                    {disaster?.endDate?.slice(0, 10) || "Ongoing"}
                  </td>
                  <td className="px-4 py-3">
                    {disaster.resources.length > 0
                      ? disaster.resources.map((resource, index) => (
                          <span key={index}>
                            {resource.name}
                            {index < disaster.resources.length - 1 ? ", " : ""}
                          </span>
                        ))
                      : "No resources"}
                  </td>
                  <td className="px-4 py-3">
                    {disaster.volunteers.length > 0
                      ? disaster.volunteers.map((volunteer, index) => (
                          <span key={index}>
                            {volunteer.name}
                            {index < disaster.volunteers.length - 1 ? ", " : ""}
                          </span>
                        ))
                      : "No volunteers"}
                  </td>
                  <td className="px-4 py-3">
                    {disaster.donations.length > 0
                      ? `$${disaster.donations.reduce(
                          (sum, donation) => sum + donation.amount,
                          0
                        )}`
                      : "No donations"}
                  </td>
                  <td className="px-4 py-3">
                    {disaster.description.slice(0, 10) + "..."}
                  </td>
                  <td className="px-4 py-3 flex space-x-2 font-extrabold">
                    <button
                      onClick={() => handleEdit(disaster._id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={async () => {
                        const confirm = window.confirm(
                          "Are you sure you want to delete?"
                        );
                        if (confirm) await deleteDisaster(disaster._id);
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
        {disasters.length === 0 && (
          <div className="w-full h-[50vh] flex justify-center items-center font-semibold">
            No Disaster found
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            id="overflow"
            className="bg-white modal p-8 rounded-lg shadow-lg w-96 max-w-full mx-auto max-h-[95vh] overflow-y-auto"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Add New Disaster
            </h3>
            <div className="flex flex-col gap-4">
              {/* Disaster Name */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Disaster Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter disaster name"
                  value={newDisaster.name}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Disaster Type */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="type"
                  className="text-sm font-medium text-gray-700"
                >
                  Disaster Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={newDisaster.type}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {disasterTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="location"
                  className="text-sm font-medium text-gray-700"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Enter location"
                  value={newDisaster.location}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
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
                  value={newDisaster.status}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              {/* Start Date */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="startDate"
                  className="text-sm font-medium text-gray-700"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={newDisaster.startDate}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* End Date */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="endDate"
                  className="text-sm font-medium text-gray-700"
                >
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={newDisaster.endDate}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="description"
                  className="text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter description"
                  value={newDisaster.description}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  rows={4}
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition-all focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  onClick={handleDisaster}
                >
                  {actionType === "create" ? "Add Disaster" : "Update Disaster"}
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
    </div>
  );
};

export default Disaster;
