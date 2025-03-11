import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useService } from "../context/service";
import { GiEarthAmerica } from "react-icons/gi";

const menuItems = [
  {
    label: "Dashboard Overview",
    path: "/dms/",
    icon: "fa-solid fa-chart-line",
  },
  {
    label: "Weather Forecast",
    path: "/dms/weather",
    icon: "fa-solid fa-cloud-sun-rain",
  },
  { section: "Management" },
  {
    label: "Disaster Management",
    path: "/dms/disaster",
    icon: "fa-solid fa-house-flood-water",
  },
  {
    label: "Volunteer Management",
    path: "/dms/volunteer",
    icon: "fa-solid fa-people-group",
  },
  {
    label: "Resource Management",
    path: "/dms/resources",
    icon: "fa-solid fa-boxes-stacked",
  },
  {
    label: "Donation Management",
    path: "/dms/donations",
    icon: "fa-solid fa-hand-holding-dollar",
  },
  { section: "Analytics" },
  {
    label: "Settings",
    path: "/dms/settings",
    icon: "fa-solid fa-gear",
  },
  {
    label: "Logout",
    action: "logout",
    icon: "fa-solid fa-right-from-bracket",
  },
];

const Sidebar = () => {
  const location = useLocation();
  const { logout, loading, loggedInUser } = useService();
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setIsOpen(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle sidebar visibility
  const toggleSidebar = () => setIsOpen(!isOpen);

  // Handle logout action
  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      try {
        await logout();
      } catch (error) {
        console.error("Logout failed:", error);
        alert("Logout failed. Please try again.");
      }
    }
  };

  return (
    <>
      {/* Top Navigation Bar */}
      <div className="bg-[#171717] w-full h-[65px] fixed top-0 z-40 flex justify-between px-4 items-center">
        <div
          className="fixed top-4 left-5 cursor-pointer z-50 lg:hidden"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <i className="fa fa-bars text-white text-lg"></i>
        </div>

        <div className=" items-center justify-center lg:flex hidden">
          <GiEarthAmerica className="text-white text-3xl" />
          <h2 className="ml-2 text-lg text-gray-300 font-semibold">
            Disaster Management
          </h2>
        </div>

        {/* User Profile Section */}
        <div className="py-3 pl-1 absolute right-10">
          <div className="flex items-center gap-4">
            <div className="w-[40px] h-[40px] rounded-full overflow-hidden cursor-pointer ring-2 ring-blue-500">
              <img className="w-full h-full" src="/profile.png" alt="" />
            </div>
            <div className="text-gray-200 hidden sm:block">
              <p className="text-sm font-semibold">{loggedInUser.name}</p>
              <p className="text-xs">{loggedInUser.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile view */}
      {isOpen && window.innerWidth < 1024 && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        ></div>
      )}

      <motion.aside
        id="sidebar"
        className="w-[260px] text-white h-screen p-3 fixed top-0 z-50 lg:z-10 shadow-xl bg-[#171717]"
        initial={{ x: -260 }}
        animate={{ x: isOpen ? 0 : -260 }}
        transition={{ stiffness: 100 }}
        aria-label="Sidebar"
      >
        <div className="flex items-center justify-center mt-2">
          <GiEarthAmerica className="text-white text-3xl" />
          <h2 className="ml-2  text-gray-300 font-semibold">
            Disaster Management
          </h2>
        </div>

        {/* Menu Items */}
        <ul className="space-y-3 mt-10">
          {menuItems.map((item, index) =>
            "section" in item ? (
              <p
                key={index}
                className="text-sm text-gray-200 font-semibold"
                aria-label={`Section: ${item.section}`}
              >
                {item.section}
              </p>
            ) : (
              <li key={index}>
                {item.action === "logout" ? (
                  <div
                    onClick={handleLogout}
                    className="text-[0.9rem] p-2 rounded hover:bg-white hover:text-gray-800 cursor-pointer flex items-center transition-all duration-300"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && handleLogout()}
                    aria-label="Logout"
                  >
                    {loading ? (
                      <i className="fa fa-spinner fa-spin mr-3"></i>
                    ) : (
                      <i className={`${item.icon} mr-3`}></i>
                    )}
                    {item.label}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`text-[0.9rem] p-2 rounded hover:bg-[#343434]  flex items-center transition-all duration-300 ${
                      location.pathname === item.path
                        ? "border-l-[6px] border-white bg-[#343434]"
                        : ""
                    }`}
                    aria-label={item.label}
                  >
                    <i className={`${item.icon} mr-3`}></i> {item.label}
                  </Link>
                )}
              </li>
            )
          )}
        </ul>

        {/* Close button for mobile view */}
        {isOpen && window.innerWidth < 1024 && (
          <button
            onClick={toggleSidebar}
            className="lg:hidden w-[25px] h-[25px] absolute left-[270px] top-[15px] z-50 flex justify-center items-center cursor-pointer bg-white text-gray-800 rounded-full p-1"
            aria-label="Close sidebar"
          >
            <i className="fa-solid fa-times text-xs"></i>
          </button>
        )}
      </motion.aside>
    </>
  );
};

export default Sidebar;
