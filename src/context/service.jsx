import axios from "axios";
import { toast } from "react-hot-toast";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ServiceContext = createContext();

const ServiceProvider = ({ children }) => {
  // Configurations
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_URL;
  const token = localStorage.getItem("token") || null;
  const resolver = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const mutation = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  // DMS States
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [disasters, setDisasters] = useState([]);
  const [donations, setDonations] = useState([]);
  const [resources, setResources] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [loggedInUser, setloggedInUser] = useState(
    JSON.parse(localStorage.getItem("admin")) || null
  );

  // Authentication
  const register = async (credentials) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${URL}/auth/register`,
        credentials,
        mutation
      );
      navigate("/");
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (credentials) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${URL}/auth/login`,
        credentials,
        mutation
      );
      setloggedInUser(data.user);
      toast.success(data.message);
      localStorage.setItem("token", data.token);
      localStorage.setItem("admin", JSON.stringify(data.user));
      navigate("/dms/");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${URL}/auth/logout`, mutation);
      setloggedInUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (credentials) => {
    try {
      setLoading(true);
      const { data } = await axios.patch(
        `${URL}/auth/password/update`,
        credentials,
        mutation
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Insights Management
  const getInsights = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${URL}/insights`, resolver);
      setInsights(data.insights);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Disaster Management
  const getDisasters = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${URL}/disaster`, resolver);
      setDisasters(data.disasters);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getDisasterById = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${URL}/disaster/${id}`, resolver);
      return data.disaster;
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createDisaster = async (disaster) => {
    try {
      setLoading(true);
      console.log(disaster);
      const { data } = await axios.post(`${URL}/disaster`, disaster, mutation);
      setDisasters([...disasters, data.disaster]);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteDisaster = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`${URL}/disaster/${id}`, mutation);
      setDisasters(
        disasters.filter((item) => item._id !== data.deletedDisaster._id)
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateDisaster = async (id, disaster) => {
    try {
      setLoading(true);
      const { data } = await axios.patch(
        `${URL}/disaster/${id}`,
        disaster,
        mutation
      );
      const spread = [...disasters];
      const index = spread.findIndex(
        (item) => item._id === data.updatedDisaster._id
      );
      spread[index] = data.updatedDisaster;
      setDisasters(spread);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Volunteer Management
  const getVolunteers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${URL}/volunteer`, resolver);
      setVolunteers(data.volunteers);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getVolunteerById = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${URL}/volunteer/${id}`, resolver);
      return data.volunteer;
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createVolunteer = async (volunteer) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${URL}/volunteer`,
        volunteer,
        mutation
      );
      setVolunteers([...volunteers, data.volunteer]);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteVolunteer = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`${URL}/volunteer/${id}`, mutation);
      setVolunteers(
        volunteers.filter((item) => item._id !== data.deletedVolunteer._id)
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateVolunteer = async (id, volunteer) => {
    try {
      setLoading(true);
      const { data } = await axios.patch(
        `${URL}/volunteer/${id}`,
        volunteer,
        mutation
      );
      const spread = [...volunteers];
      const index = spread.findIndex(
        (item) => item._id === data.updatedVolunteer._id
      );
      spread[index] = data.updatedVolunteer;
      setVolunteers(spread);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Donation Management
  const getDonations = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${URL}/donation`, resolver);
      setDonations(data.donations);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getDonationById = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${URL}/donation/${id}`, resolver);
      return data.donation;
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createDonation = async (donation) => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${URL}/donation`, donation, mutation);
      setDonations([...donations, data.donation]);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteDonation = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`${URL}/donation/${id}`, mutation);
      setDonations(
        donations.filter((item) => item._id !== data.deletedDonation._id)
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateDonation = async (id, donation) => {
    try {
      setLoading(true);
      const { data } = await axios.patch(
        `${URL}/donation/${id}`,
        donation,
        mutation
      );
      const spread = [...donations];
      const index = spread.findIndex(
        (item) => item._id === data.updatedDonation._id
      );
      spread[index] = data.updatedDonation;
      setDonations(spread);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Resource Management
  const getResources = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${URL}/resource`, resolver);
      setResources(data.resources);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getResourceById = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${URL}/resource/${id}`, resolver);
      return data.resource;
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createResource = async (resource) => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${URL}/resource`, resource, mutation);
      setResources([...resources, data.resource]);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteResource = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`${URL}/resource/${id}`, mutation);
      setResources(
        resources.filter((item) => item._id !== data.deletedResource._id)
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateResource = async (id, resource) => {
    try {
      setLoading(true);
      const { data } = await axios.patch(
        `${URL}/resource/${id}`,
        resource,
        mutation
      );
      const spread = [...resources];
      const index = spread.findIndex(
        (item) => item._id === data.updatedResource._id
      );
      spread[index] = data.updatedResource;
      setResources(spread);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Assign

  const assignVolunteerToDisaster = async (disasterId, volunteerId) => {
    try {
      setLoading(true);
      const { data } = await axios.patch(
        `${URL}/disaster/${disasterId}/volunteer/${volunteerId}`,
        mutation
      );
      const spread = [...volunteers];
      const index = spread.findIndex((item) => item._id === data.volunteer._id);
      spread[index] = data.volunteer;
      setVolunteers(spread);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const assignDonationToDisaster = async (disasterId, donationId) => {
    try {
      setLoading(true);
      const { data } = await axios.patch(
        `${URL}/disaster/${disasterId}/donation/${donationId}`,
        mutation
      );
      const spread = [...donations];
      const index = spread.findIndex((item) => item._id === data.donation._id);
      spread[index] = data.donation;
      setDonations(spread);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const assignResourceToDisaster = async (disasterId, resourceId) => {
    try {
      setLoading(true);
      const { data } = await axios.patch(
        `${URL}/disaster/${disasterId}/resource/${resourceId}`,
        mutation
      );
      const spread = [...resources];
      const index = spread.findIndex((item) => item._id === data.resource._id);
      spread[index] = data.resource;
      setResources(spread);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async ({
    donorName,
    donorContact,
    amount,
    elements,
    stripe,
    CardElement
  }) => {
    setLoading(true);

    try {
      const { data } = await axios.post(`${URL}/payment/`, {
        donorName,
        donorContact,
        amount: parseFloat(amount),
      });

      const { clientSecret } = data;

      if (!clientSecret) {
        toast.error("Payment failed. Please try again.");
        setLoading(false);
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else {
        toast.success("Payment successful! Thank you for your donation.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (token) {
      getInsights();
      getDisasters();
      getDonations();
      getResources();
      getVolunteers();
    }
  }, []);

  return (
    <ServiceContext.Provider
      value={{
        insights,
        disasters,
        donations,
        resources,
        volunteers,
        loggedInUser,
        getInsights,
        loading,
        register,
        signIn,
        logout,
        updatePassword,
        createDisaster,
        getDisasters,
        getDisasterById,
        deleteDisaster,
        updateDisaster,
        createVolunteer,
        getVolunteers,
        getVolunteerById,
        deleteVolunteer,
        updateVolunteer,
        getDonations,
        getDonationById,
        createDonation,
        updateDonation,
        deleteDonation,
        getResources,
        getResourceById,
        createResource,
        deleteResource,
        updateResource,
        handlePayment,
        assignResourceToDisaster,
        assignDonationToDisaster,
        assignVolunteerToDisaster,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

const useService = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error("useService must be used within a ServiceProvider");
  }
  return context;
};

export { useService, ServiceProvider };
