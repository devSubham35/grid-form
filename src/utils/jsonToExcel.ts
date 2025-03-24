import * as XLSX from "xlsx";

const jsonToExcel = (
  jsonData: {
    [key: string]: string;
  }[],
  fileName: string
) => {
  // Create a worksheet from the JSON data
  const worksheet = XLSX.utils.json_to_sheet(jsonData);

  // Create a new workbook and append the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Write the workbook to a file
  XLSX.writeFile(workbook, fileName);
};
export default jsonToExcel;
