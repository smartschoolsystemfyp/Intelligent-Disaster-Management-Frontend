import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useService } from "../../context/service";
import { AiOutlineFileDone } from "react-icons/ai";
import Loader from "../../components/Loader";

const Resource = () => {
  const {
    loading,
    disasters,
    resources,
    getResources,
    createResource,
    updateResource,
    deleteResource,
    getResourceById,
    assignResourceToDisaster,
  } = useService();

  const [isModalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState("create");
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedDisaster, setSelectedDisaster] = useState(null);
  const [updateResourceId, setUpdateResourceId] = useState(null);
  const [newResource, setNewResource] = useState({
    name: "",
    quantity: "",
    type: "Food & Water",
    description: "",
    status: "Available",
  });

  const resourceTypes = ["Food & Water", "Medical", "Shelter", "Clothing"];
  const statusOptions = ["Available", "Allocated", "Unavailable"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewResource({ ...newResource, [name]: value });
  };

  const handleResource = async () => {
    if (actionType === "create") await createResource(newResource);
    else await updateResource(updateResourceId, newResource);
    setActionType("create");
    setModalOpen(false);
    setNewResource({
      name: "",
      quantity: "",
      type: "Food & Water",
      description: "",
      status: "Available",
    });
  };

  async function handleEdit(id) {
    if (id) {
      const resource = await getResourceById(id);
      setNewResource({
        name: resource.name || "",
        quantity: resource.quantity || "",
        type: resource.type || "Food & Water",
        description: resource.description || "",
        status: resource.status || "Available",
      });
      setUpdateResourceId(resource._id);
      setActionType("update");
      setModalOpen(true);
    }
  }

  function handleAssignModalOpen(id) {
    setIsAssignModalOpen(true);
    setUpdateResourceId(id);
  }

  async function handleAssign() {
    await assignResourceToDisaster(selectedDisaster, updateResourceId);
    setIsAssignModalOpen(false);
  }

  useEffect(() => {
    getResources();
  }, []);

  return (
    <div className="p-6 text-[0.828rem]">
      {loading && <Loader />}
      <div id="modal" className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Resources</h2>
        <button
          className="bg-[#171717] text-white px-4 py-2 rounded-md hover:bg-black"
          onClick={() => setModalOpen(true)}
        >
          Add Resource
        </button>
      </div>

      <div id="overflow" className="overflow-x-auto max-h-[calc(100vh-200px)]">
        <table className="w-full border-collapse bg-white shadow-lg whitespace-nowrap rounded-lg overflow-hidden">
          <thead className="bg-[#171717] text-white">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Quantity</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Status</th>
              {/* <th className="px-4 py-3">Assigned To</th> */}
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {resources.length > 0 &&
              resources.map((resource, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-100 transition duration-200"
                >
                  <td className="px-4 py-3">{resource?.name}</td>
                  <td className="px-4 py-3">{resource?.quantity}</td>
                  <td className="px-4 py-3">{resource?.type}</td>
                  {/* <td className="px-4 py-3">{resource?.assignedDisaster.name}</td> */}
                  <td className="px-4 py-3 font-bold text-green-500">
                    {resource?.status}
                  </td>
                  <td className="px-4 py-3">
                    {resource?.description?.slice(0, 10) + "..."}
                  </td>
                  <td className="px-4 py-3 flex space-x-2 font-extrabold">
                    <button
                      onClick={() => handleAssignModalOpen(resource._id)}
                      className="text-green-500 hover:text-green-700"
                    >
                      <AiOutlineFileDone />
                    </button>
                    <button
                      onClick={() => handleEdit(resource._id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={async () => {
                        const confirm = window.confirm(
                          "Are you sure you want to delete?"
                        );
                        if (confirm) await deleteResource(resource._id);
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
        {resources.length === 0 && (
          <div className="w-full h-[50vh] flex justify-center items-center font-semibold">
            No Resources found
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center h-auto z-50">
          <div
            id="overflow"
            className="bg-white modal p-8 rounded-lg shadow-lg w-96 max-w-full mx-auto max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              {actionType === "create" ? "Add New Resource" : "Edit Resource"}
            </h3>
            <div className="flex flex-col gap-4">
              {/* Resource Name */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Resource Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter resource name"
                  value={newResource.name}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Quantity */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="quantity"
                  className="text-sm font-medium text-gray-700"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  placeholder="Enter quantity"
                  value={newResource.quantity}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Resource Type */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="type"
                  className="text-sm font-medium text-gray-700"
                >
                  Resource Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={newResource.type}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {resourceTypes.map((type) => (
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
                  value={newResource.status}
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
                  value={newResource.description}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  rows={4}
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition-all focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  onClick={handleResource}
                >
                  {actionType === "create" ? "Add Resource" : "Update Resource"}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
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

export default Resource;
