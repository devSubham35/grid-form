function csvToJson(csvString: string) {
  // Replace \r\n with \n and split the CSV string into lines
  const lines = csvString.replace(/\r\n/g, "\n").split("\n");

  // Extract the headers by splitting the first line
  const headers = lines[0].split(",").map((header) => header.replace(/"/g, ""));

  // Map the remaining lines to JSON objects
  const jsonArray = lines.slice(1).map((line) => {
    // Split each line into values
    const values = line
      .split(",")
      .map((value) => value.replace(/"/g, "").trim());

    // Reduce the headers and values into an object
    const jsonObject = headers.reduce((obj, header, index) => {
      obj[header] = values[index];
      return obj;
    }, {} as { [key: string]: string });

    return jsonObject;
  });

  return jsonArray;
}
export default csvToJson;
