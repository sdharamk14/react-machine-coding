import { useState } from "react";

const PAGE_SIZE = 10;
const MAX_BUTTON_TO_SHOW = 5;
export const Pagination = ({
  data,
  renderRow,
  rowPerPageSize = PAGE_SIZE,
  onPageChange,
}: {
  data: any;
  renderRow?: (data: any) => React.ReactNode;
  rowPerPageSize?: number;
  onPageChange: (page: number) => void;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(rowPerPageSize);
  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const handlePrev = () => {
    setCurrentPage((prev) => prev - 1);
    onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
    onPageChange(currentPage - 1);
  };

  const handlePageChange = (val: number) => {
    setCurrentPage(val);
    onPageChange(val);
  };

  const updatedData = data?.slice(startIndex, endIndex);

  const pageButtons = Array.from(
    { length: totalPages },
    (_: string, index: number) => index + 1
  );

  const pageStartIndex = Math.max(0, currentPage - 2);
  const pageEndIndex = Math.min(totalPages, currentPage + 2);
  const buttonToBeShown = pageButtons.slice(pageStartIndex, pageEndIndex);

  return (
    <div>
      <div style={{ height: 240, overflowY: "auto" }}>
        {updatedData.map((d: any) => {
          return (
            <div key={d}>
              {typeof renderRow === "function" ? renderRow(d) : d}
            </div>
          );
        })}
      </div>
      <div>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={40}>40</option>
        </select>
        <button disabled={currentPage === 1} onClick={handlePrev}>
          Prev
        </button>
        {buttonToBeShown.map((val: number) => {
          return (
            <button
              onClick={() => handlePageChange(val)}
              style={{
                backgroundColor: `${currentPage === val ? "lightCoral" : ""}`,
              }}
              disabled={currentPage === val}
            >
              {val}
            </button>
          );
        })}
        <button disabled={totalPages === currentPage} onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export const PaginationDemo = () => {
  const data = new Array(105).fill("").map((val: string, index: number) => {
    return index + 1;
  });

  return (
    <Pagination
      data={data}
      onPageChange={() => {
        console.log("called");
      }}
      renderRow={(d) => <li>{d}</li>}
    />
  );
};
