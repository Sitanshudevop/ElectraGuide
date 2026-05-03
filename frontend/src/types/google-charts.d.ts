// Type declarations for Google Charts
declare namespace google {
  namespace charts {
    function load(version: string, packages: Record<string, any>): void;
    function setOnLoadCallback(callback: () => void): void;
  }
  namespace visualization {
    class DataTable {
      addColumn(typeOrOptions: string | object, label?: string): void;
      addRows(rows: any[][]): void;
      removeRows(rowIndex: number, numberOfOrws: number): void;
      getNumberOfRows(): number;
    }
    class PieChart {
      constructor(element: Element);
      draw(data: DataTable, options?: any): void;
    }
    class BarChart {
      constructor(element: Element);
      draw(data: DataTable, options?: any): void;
    }
    function arrayToDataTable(data: any[][], firstRowIsData?: boolean): DataTable;
  }
}
