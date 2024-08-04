import Sidebar from "./Sidebar";
import Header from "./Header";
import LeadsTable from "./LeadsTable";
import Pagination from "./Pagination";
import { SetStateAction, useMemo, useState, useEffect } from "react";
import { loadLeadsData } from "./uitls";
import { useDispatch, useSelector } from "react-redux";
import { setLeadStatus, setLeadsData } from "../store/leadsSlice";

export type Lead = {
  countryOfCitizenship: string;
  email: string;
  firstName: string;
  lastName: string;
  resume: string;
  status: string;
  submittedTime: string;
};

export default function LeadList() {
  const leadsData = useSelector((state: { leads: any }) => state.leads);
  const dispatch = useDispatch();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(setLeadsData(loadLeadsData()));
  }, []);

  const handleLeadStatusChange = (index: number, status: string) => {
    dispatch(setLeadStatus({ index, status }));
  };

  const filteredLeads = useMemo(() => {
    return leadsData.filter(
      (lead: {
        firstName: string;
        lastName: string;
        submittedTime: string;
        status: string;
        countryOfCitizenship: string;
      }) => {
        const lowerCaseQuery = searchQuery.trim().toLowerCase();
        return (
          (lead.firstName.toLowerCase().includes(lowerCaseQuery) ||
            lead.lastName.toLowerCase().includes(lowerCaseQuery) ||
            lead.submittedTime.toLowerCase().includes(lowerCaseQuery) ||
            lead.status.toLowerCase().includes(lowerCaseQuery) ||
            lead.countryOfCitizenship.toLowerCase().includes(lowerCaseQuery)) &&
          (filterStatus === "" || lead.status === filterStatus)
        );
      }
    );
  }, [filterStatus, leadsData, searchQuery]);

  const handleSerchQueryChange = (val: SetStateAction<string>) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex-1 bg-gray-50 p-8">
        <Header
          filterStatus={filterStatus}
          searchQuery={searchQuery}
          setSearchQuery={handleSerchQueryChange}
          setFilterStatus={setFilterStatus}
        />
        <div className="mt-6">
          <LeadsTable
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            leadsData={filteredLeads}
            handleLeadStatusChange={handleLeadStatusChange}
          />
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalItems={filteredLeads.length}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </div>
    </div>
  );
}
