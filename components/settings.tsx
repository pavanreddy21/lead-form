import { useState } from "react";
import Sidebar from "./Sidebar";

export default function SettingsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 p-8">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          Settings Feature Coming Soon, Currently it is Configured by JSON
        </div>
      </div>
    </div>
  );
}
