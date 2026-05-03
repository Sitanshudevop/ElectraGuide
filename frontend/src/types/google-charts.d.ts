// Type declarations for Google Charts
declare namespace google {
  namespace charts {
    function load(version: string, packages: Record<string, unknown>): void;
    function setOnLoadCallback(callback: () => void): void;
  }
  namespace visualization {
    class DataTable {
      addColumn(typeOrOptions: string | object, label?: string): void;
      addRows(rows: unknown[][]): void;
      removeRows(rowIndex: number, numberOfOrws: number): void;
      getNumberOfRows(): number;
    }
    class PieChart {
      constructor(element: Element);
      draw(data: DataTable, options?: unknown): void;
    }
    class BarChart {
      constructor(element: Element);
      draw(data: DataTable, options?: unknown): void;
    }
    function arrayToDataTable(data: unknown[][], firstRowIsData?: boolean): DataTable;
  }
}
