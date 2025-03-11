import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useService } from "../../context/service";
import { AiOutlineFileDone } from "react-icons/ai";

const Volunteer = () => {
  const {
    disasters,
    volunteers,
    getVolunteers,
    createVolunteer,
    getVolunteerById,
    deleteVolunteer,
    updateVolunteer,
    assignVolunteerToDisaster,
  } = useService();

  const [isModalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState("create");
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedDisaster, setSelectedDisaster] = useState(null);
  const [updateVolunteerId, setUpdateVolunteerId] = useState(null);
  const [newVolunteer, setNewVolunteer] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    availability: "Part-time",
    location: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVolunteer({ ...newVolunteer, [name]: value });
  };

  const handleVolunteer = async () => {
    if (actionType === "create") await createVolunteer(newVolunteer);
    else await updateVolunteer(updateVolunteerId, newVolunteer);
    setActionType("create");
    setModalOpen(false);
    setNewVolunteer({
      name: "",
      email: "",
      phone: "",
      skills: "",
      availability: "Part-time",
      location: "",
    });
  };

  async function handleEdit(id) {
    if (id) {
      const volunteer = await getVolunteerById(id);
      setNewVolunteer({
        name: volunteer.name || "",
        email: volunteer.email || "",
        phone: volunteer.phone || "",
        skills: volunteer.skills?.join(", ") || "",
        availability: volunteer.availability || "Part-time",
        location: volunteer.location || "",
      });
      setUpdateVolunteerId(volunteer._id);
      setActionType("update");
      setModalOpen(true);
    }
  }

  function handleAssignModalOpen(id) {
    setIsAssignModalOpen(true);
    setUpdateVolunteerId(id);
  }

  async function handleAssign() {
    await assignVolunteerToDisaster(selectedDisaster, updateVolunteerId);
    setIsAssignModalOpen(false);
  }

  useEffect(() => {
    getVolunteers();
  }, []);

  return (
    <div className="p-6 text-[0.828rem]">
      <div id="modal" className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Volunteer Management</h2>
        <button
          className="bg-[#171717] text-white px-4 py-2 rounded-md hover:bg-black"
          onClick={() => setModalOpen(true)}
        >
          Add Volunteer
        </button>
      </div>

      {/* Scrollable Table Container */}
      <div id="overflow" className="overflow-x-auto max-h-[calc(100vh-200px)]">
        {" "}
        {/* Adjusted height */}
        <table className="w-full border-collapse bg-white shadow-lg rounded-lg whitespace-nowrap">
          <thead className="bg-[#171717] text-white sticky top-0">
            {" "}
            {/* Sticky header */}
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Skills</th>
              <th className="px-4 py-3">Availability</th>
              <th className="px-4 py-3">Assigned To</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {volunteers.length > 0 &&
              volunteers.map((volunteer, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-3">{volunteer.name}</td>
                  <td className="px-4 py-3">{volunteer.email}</td>
                  <td className="px-4 py-3">{volunteer.phone}</td>
                  <td className="px-4 py-3">{volunteer.skills.join(", ")}</td>
                  <td className="px-4 py-3">{volunteer.availability}</td>
                  <td className="px-4 py-3">
                    {volunteer.assignedDisaster?.name || "Free"}
                  </td>
                  <td className="px-4 py-3">{volunteer.location}</td>
                  <td className="px-4 py-3 flex space-x-2">
                    <button
                      onClick={() => handleAssignModalOpen(volunteer._id)}
                      className="text-green-500 hover:text-green-700"
                    >
                      <AiOutlineFileDone />
                    </button>
                    <button
                      onClick={() => handleEdit(volunteer._id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={async () => {
                        if (
                          window.confirm("Are you sure you want to delete?")
                        ) {
                          await deleteVolunteer(volunteer._id);
                        }
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
        {volunteers.length === 0 && (
          <div className="w-full h-[50vh] flex justify-center items-center font-semibold">
            No Volunteers found
          </div>
        )}
      </div>

      {/* Add/Edit Volunteer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            id="modal"
            className="bg-white p-8 rounded-lg shadow-lg w-96 max-w-full mx-auto"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              {actionType === "create"
                ? "Add New Volunteer"
                : "Update Volunteer"}
            </h3>
            <div className="flex flex-col gap-4">
              {/* Name */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter volunteer name"
                  value={newVolunteer.name}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter volunteer email"
                  value={newVolunteer.email}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Enter volunteer phone"
                  value={newVolunteer.phone}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Skills */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="skills"
                  className="text-sm font-medium text-gray-700"
                >
                  Skills (comma-separated)
                </label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  placeholder="Enter skills (e.g., First Aid, Cooking)"
                  value={newVolunteer.skills}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
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
                  placeholder="Enter volunteer location"
                  value={newVolunteer.location}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition-all focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  onClick={handleVolunteer}
                >
                  {actionType === "create"
                    ? "Add Volunteer"
                    : "Update Volunteer"}
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

      {/* Assign Volunteer Modal */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div id="modal" className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Assign Volunteer</h3>
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

export default Volunteer;
