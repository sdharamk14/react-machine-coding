import { useState } from "react";
import userList from "./users";
export const DataTable = () => {
  const pageCountList = [5, 10, 15, 20];
  const [perPage, setPerPage] = useState(pageCountList[0]);
  const [currentPage, setCurrentPage] = useState(1);

  const renderTableHeader = () => {
    if (userList.length > 0) {
      const user = userList[0];

      const usersKeys = Object.keys(user);
      return (
        <tr style={{ borderBottom: "1px solid #000" }}>
          {usersKeys.map((key) => (
            <th key={key} style={{ fontWeight: 700 }}>
              {key}
            </th>
          ))}
        </tr>
      );
    }
    return null;
  };

  const renderTableBody = () => {
    if (userList.length > 0) {
      const usersKeys = Object.keys(userList[0]);
      const updateUserList = userList.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
      );
      return (
        <tbody>
          {updateUserList.map((user) => (
            <tr key={user.id} style={{ borderBottom: "1px solid #000" }}>
              {usersKeys.map((key) => (
                <td key={key}>{user[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      );
    }
    return null;
  };

  return (
    <table>
      <thead>{renderTableHeader()}</thead>
      {renderTableBody()}
      <tfoot>
        <tr>
          <td>
            <select
              value={perPage}
              onChange={(e) => {
                setPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              {pageCountList.map((count) => (
                <option key={count} value={count}>
                  {count}
                </option>
              ))}
            </select>
          </td>
          <td colSpan={userList.length}>
            <div>
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {Math.ceil(userList.length / perPage)}
              </span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === Math.ceil(userList.length / perPage)}
              >
                Next
              </button>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};
