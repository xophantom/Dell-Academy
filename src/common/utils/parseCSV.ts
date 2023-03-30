export const parseCSV = (csvFile: string): string[][] => {
  const rows = csvFile.split("\n");
  const csvArray: string[][] = [];
  rows.forEach((row) => {
    const cells = row.split(";");
    csvArray.push(cells);
  });
  return csvArray;
};
