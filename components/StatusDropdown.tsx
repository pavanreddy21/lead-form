const StatusDropdown = ({
  status,
  onStatusChange,
}: {
  status: string;
  onStatusChange: (status: string) => void;
}) => {
  return (
    <select
      className="p-2 border border-gray-300 rounded-lg"
      value={status}
      onChange={(e) => onStatusChange(e.target.value)}
    >
      <option value="">All</option>
      <option value="PENDING">Pending</option>
      <option value="REACHED_OUT">Reached Out </option>
    </select>
  );
};
export default StatusDropdown;
