import { Lead } from "./LeadList";
import StatusDropdown from "./StatusDropdown";

export default function LeadsTable({
  currentPage,
  itemsPerPage,
  leadsData,
  handleLeadStatusChange,
}: {
  currentPage: number;
  itemsPerPage: number;
  leadsData: Lead[];
  handleLeadStatusChange: (index: number, status: string) => void;
}) {
  const paginatedLeads = leadsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Submitted</th>
            <th className="p-4">Status</th>
            <th className="p-4">Country</th>
          </tr>
        </thead>
        <tbody>
          {paginatedLeads.map((lead, index) => (
            <tr key={index} className="border-t">
              <td className="p-4">
                {lead.firstName} {lead.lastName}
              </td>
              <td className="p-4">{lead.submittedTime}</td>
              <td className="p-4">
                <StatusDropdown
                  status={lead.status}
                  onStatusChange={(status) =>
                    handleLeadStatusChange(index, status)
                  }
                />
              </td>
              <td className="p-4">{lead.countryOfCitizenship}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
