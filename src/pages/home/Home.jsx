import React, { useEffect } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
  Filler,
} from "chart.js";
import { FaFire, FaHandsHelping, FaDollarSign } from "react-icons/fa";
import { useService } from "../../context/service";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
  Filler
);

const Home = () => {
  const { insights, getInsights } = useService();

  const reports = [
    {
      title: "Ongoing Disasters",
      value: insights.ongoingDisasters,
      bgColor: "bg-gradient-to-r from-red-500 to-red-600",
      icon: <FaFire size={24} className="text-white" />,
    },
    {
      title: "Total Volunteers",
      value: insights.totalVolunteers,
      bgColor: "bg-gradient-to-r from-blue-500 to-blue-600",
      icon: <FaHandsHelping size={24} className="text-white" />,
    },
    {
      title: "Total Donations",
      value: insights.totalAmount,
      bgColor: "bg-gradient-to-r from-green-500 to-green-600",
      icon: <FaDollarSign size={24} className="text-white" />,
    },
  ];

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Donations ($)",
        data: [5000, 10000, 7500, 12000, 9000, 15000],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#3b82f6",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const doughnutData = {
    labels: insights?.resourcesName?.map((item) => item.name),
    datasets: [
      {
        data: insights?.resourcesQuantity?.map((item) => item.quantity),
        backgroundColor: ["#4CAF50", "#FF9800", "#2196F3", "#E91E63"],
        borderColor: "#ffffff",
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  useEffect(() => {
    getInsights();
  }, []);

  return (
    <section className="p-2 sm:p-6 space-y-5">
      {/* Reports Section */}
      <div id="modal" className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {reports.map((report, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center h-40 ${report.bgColor} text-white rounded-xl shadow-lg p-6 space-y-3 transition-transform transform hover:scale-105`}
          >
            <div className="flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-full">
              {report.icon}
            </div>
            <h2 className="text-lg font-semibold text-center">
              {report.title}
            </h2>
            <p className="text-2xl font-bold">{report.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* Doughnut Chart - Resource Distribution */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Resource Distribution
          </h3>
          <div className="w-full h-72 flex items-center justify-center">
            <Doughnut
              data={doughnutData}
              options={{
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: {
                      font: {
                        size: 14,
                      },
                      color: "#4b5563",
                    },
                  },
                  tooltip: {
                    backgroundColor: "#1e293b",
                    titleColor: "#ffffff",
                    bodyColor: "#ffffff",
                    borderColor: "#3b82f6",
                    borderWidth: 1,
                  },
                },
                animation: {
                  animateRotate: true,
                  animateScale: true,
                },
              }}
            />
          </div>
        </div>

        {/* Line Chart - Donation Trend */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Donation Trend
          </h3>
          <div className="w-full h-72 pt-10">
            <Line
              data={lineData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                    labels: {
                      font: {
                        size: 14,
                      },
                      color: "#4b5563",
                    },
                  },
                  tooltip: {
                    backgroundColor: "#1e293b",
                    titleColor: "#ffffff",
                    bodyColor: "#ffffff",
                    borderColor: "#3b82f6",
                    borderWidth: 1,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false,
                    },
                    ticks: {
                      color: "#4b5563",
                    },
                  },
                  y: {
                    grid: {
                      color: "#e5e7eb",
                    },
                    ticks: {
                      color: "#4b5563",
                    },
                  },
                },
                animation: {
                  duration: 1000,
                },
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
