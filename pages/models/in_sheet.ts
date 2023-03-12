export type rowData = [string, string, string, string, string, string];

export interface SheetResponseData {
  range: string;
  majorDimension: string;
  values: rowData[];
}
