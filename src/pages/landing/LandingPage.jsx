import { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUser,
  FaHandsHelping,
  FaHeart,
  FaStar,
  FaArrowRight,
} from "react-icons/fa";
// Individual icons from their respective sets
// import { GiEarthquake } from 'react-icons/gi';
import { RiFloodFill } from "react-icons/ri";
import { HiFire } from "react-icons/hi2";
import { MdOutlineEmergency } from "react-icons/md";
import { BsSnow } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useService } from "../../context/service";
import toast from "react-hot-toast";

const LandingPage = () => {
  const { createVolunteer, loading } = useService();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    availability: "Part-time",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createVolunteer(formData);
    toast.success("Thank you for volunteering! We will contact you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      skills: "",
      availability: "Part-time",
      location: "",
    });
  };

  return (
    <div className="font-[Poppins]">
      {/* Navbar */}
      <nav className="fixed w-full bg-white bg-opacity-90 shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <MdOutlineEmergency className="h-8 w-8 text-red-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">DMS</span>
            </div>

            {/* Navigation Links - Center */}
            <div className="hidden md:flex items-center space-x-5">
              <a
                href="#home"
                className="text-gray-900 hover:text-red-600 px-3 py-2 text-[0.9rem] font-medium"
              >
                Home
              </a>
              <a
                href="#services"
                className="text-gray-900 hover:text-red-600 px-3 py-2 text-[0.9rem] font-medium"
              >
                Services
              </a>

              <a
                href="#testimonials"
                className="text-gray-900 hover:text-red-600 px-3 py-2 text-[0.9rem] font-medium"
              >
                Testimonials
              </a>
              <a
                href="#volunteer"
                className="text-gray-900 hover:text-red-600 px-3 py-2 text-[0.9rem] font-medium"
              >
                Volunteer
              </a>
            </div>

            {/* Donate Button - Right */}
            <div className="flex items-center">
              <Link to={"/stripe"}>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center">
                  <FaHeart className="mr-2" /> Donate Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-16">
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div
          className="bg-cover bg-center h-screen"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
          }}
        >
          <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Disaster Management System
            </h1>
            <p className="text-xl text-white mb-8 max-w-3xl">
              Connecting communities, resources, and responders to mitigate
              disasters and save lives.
            </p>
            <a href="#volunteer">
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md text-lg font-medium flex items-center">
                Get Involved <FaArrowRight className="ml-2" />
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive disaster management solutions to
              communities in need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  {/* <GiEarthquake className="h-10 w-10 text-red-600" /> */}
                  <h3 className="ml-3 text-xl font-semibold text-gray-900">
                    Earthquake Response
                  </h3>
                </div>
                <p className="text-gray-600">
                  Rapid response teams, structural assessment, and emergency
                  shelter for earthquake affected areas.
                </p>
              </div>
            </div>

            {/* Service Card 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <RiFloodFill className="h-10 w-10 text-blue-600" />
                  <h3 className="ml-3 text-xl font-semibold text-gray-900">
                    Flood Relief
                  </h3>
                </div>
                <p className="text-gray-600">
                  Water rescue operations, temporary housing, and clean water
                  distribution in flood zones.
                </p>
              </div>
            </div>

            {/* Service Card 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <HiFire className="h-10 w-10 text-orange-600" />
                  <h3 className="ml-3 text-xl font-semibold text-gray-900">
                    Wildfire Management
                  </h3>
                </div>
                <p className="text-gray-600">
                  Fire containment strategies, evacuation coordination, and
                  post-fire recovery programs.
                </p>
              </div>
            </div>

            {/* Service Card 4 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <MdOutlineEmergency className="h-10 w-10 text-purple-600" />
                  <h3 className="ml-3 text-xl font-semibold text-gray-900">
                    Emergency Medical
                  </h3>
                </div>
                <p className="text-gray-600">
                  Mobile medical units, trauma care, and medical supply
                  distribution during crises.
                </p>
              </div>
            </div>

            {/* Service Card 5 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <BsSnow className="h-10 w-10 text-blue-400" />
                  <h3 className="ml-3 text-xl font-semibold text-gray-900">
                    Winter Storm Support
                  </h3>
                </div>
                <p className="text-gray-600">
                  Heating assistance, snow removal, and emergency shelter during
                  extreme winter conditions.
                </p>
              </div>
            </div>

            {/* Service Card 6 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <FaHandsHelping className="h-10 w-10 text-green-600" />
                  <h3 className="ml-3 text-xl font-semibold text-gray-900">
                    Community Training
                  </h3>
                </div>
                <p className="text-gray-600">
                  Disaster preparedness workshops, first aid training, and
                  emergency response drills.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What People Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Testimonials from those we've helped and worked with.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    src="https://randomuser.me/api/portraits/women/32.jpg"
                    alt="Lisa Thompson"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Lisa Thompson
                  </h3>
                  <div className="flex text-yellow-400">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "When the floods hit our town, DMS was there within hours. Their
                quick response and organized relief efforts saved countless
                lives."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    src="https://randomuser.me/api/portraits/men/22.jpg"
                    alt="David Wilson"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    David Wilson
                  </h3>
                  <div className="flex text-yellow-400">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "As a donor, I'm impressed by DMS's transparency and efficiency.
                I know my contributions are making a real difference."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    src="https://randomuser.me/api/portraits/women/63.jpg"
                    alt="Maria Garcia"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Maria Garcia
                  </h3>
                  <div className="flex text-yellow-400">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The disaster preparedness training from DMS helped our
                community survive the hurricane with minimal casualties. We're
                forever grateful."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Registration Form */}
      <section id="volunteer" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Become a Volunteer
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join our network of dedicated volunteers helping communities in
              crisis.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-gray-50 p-8 rounded-lg shadow-md text-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 py-2 px-4 border"
                    placeholder="Your name"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 py-2 px-4 border"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 py-2 px-4 border"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Location
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 py-2 px-4 border"
                    placeholder="City, State/Province"
                  />
                </div>
              </div>

              {/* Skills */}
              <div className="md:col-span-2">
                <label
                  htmlFor="skills"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Skills & Expertise
                </label>
                <textarea
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  rows={3}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 py-2 px-4 border"
                  placeholder="Medical training, construction, logistics, languages spoken, etc."
                />
              </div>

              {/* Availability */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availability
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="availability"
                      value="Full-time"
                      checked={formData.availability === "Full-time"}
                      onChange={handleChange}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">Full-time</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="availability"
                      value="Part-time"
                      checked={formData.availability === "Part-time"}
                      onChange={handleChange}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">Part-time</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="availability"
                      value="On-call"
                      checked={formData.availability === "On-call"}
                      onChange={handleChange}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">On-call</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 text-center">
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md font-medium"
              >
                {loading ? "submitting" : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <MdOutlineEmergency className="h-8 w-8 text-red-600" />
                <span className="ml-2 text-xl font-bold">DMS</span>
              </div>
              <p className="text-gray-400">
                Connecting communities with disaster relief resources since
                2010.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#home" className="text-gray-400 hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="text-gray-400 hover:text-white"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a href="#donors" className="text-gray-400 hover:text-white">
                    Donors
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    className="text-gray-400 hover:text-white"
                  >
                    Testimonials
                  </a>
                </li>
                <li>
                  <a
                    href="#volunteer"
                    className="text-gray-400 hover:text-white"
                  >
                    Volunteer
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <FaMapMarkerAlt className="mr-2" /> 123 Relief Ave, Disaster
                  City, DC 12345
                </li>
                <li className="flex items-center">
                  <FaPhone className="mr-2" /> +1 (800) 555-DMS1
                </li>
                <li className="flex items-center">
                  <FaEnvelope className="mr-2" /> info@dms.org
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">
                Subscribe to our newsletter for updates on our work.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 rounded-l-md w-full text-gray-900"
                />
                <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-r-md">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Disaster Management System. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
