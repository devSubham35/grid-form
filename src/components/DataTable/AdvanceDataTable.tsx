/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useMemo, useRef, useState } from "react";

import {
  ColDef,
  ColDefField,
  // GridTheme,
  ModuleRegistry,
  RowSelectedEvent,
  RowSelectionOptions,
} from "@ag-grid-community/core";
// import { themeQuartz } from "ag-grid-community";
import { AgGridReact } from "@ag-grid-community/react";
import { CsvExportModule } from "@ag-grid-community/csv-export";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";

import _ from "lodash";
import moment from "moment";


// Shadcn/UI Imports
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";


// Custom Components (you'll need to create these)
import DataTableAction from "./DataTableAction";
import DataTableStatus from "./DataTableStatus";
import DataTableHeaderMenu from "./DataTableHeaderMenu";
import DataTableBulkDeleteButton from "./DataTableBulkDeleteButton";

// Utility Imports
import CustomPagination from "./CustomPagination";
import jsonToExcel from "@/utils/jsonToExcel";
import csvToJson from "@/utils/csvToJson";

ModuleRegistry.registerModules([ClientSideRowModelModule, CsvExportModule]);

export enum BaseDataStatus {
  Active = "Active",
  Inactive = "Inactive",
  Resolved = "Resolved",
  Pending = "Pending",
  Ongoing = "Ongoing",
}

export type BaseDataType = {
  [key: string]: any;
};

interface Props<T extends BaseDataType> {
  data: T[];
  onPageSizeChange?: (size: number) => void;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  hiddenColumnKeys?: Array<keyof T>;
  exportedColumnKeys?: Array<keyof T>;
  selectableColumnKey?: keyof T;
  columnNames?: Partial<Record<keyof T, string>>;
  onPageChange?: (page: number) => void;
  currentPage: number;
  currentStatus?: string;
  onStatusChange?: (data: T) => void;
  onDelete?: (data: T) => void;
  onEdit?: (data: T) => void;
  onBulkDelete?: (data: T[]) => void;
  setStatusFilter: (status: string) => void;
  handleSearchItem: (value: string) => void;
  handleSearchType?: (value: string) => void;
  exportFileName?: string;
  render?: Partial<Record<keyof T, (data: T) => React.ReactNode>>;
  idDelete?: boolean;
  isStatus?: boolean;
  isCsv?: boolean;
  onAssign?: (data: T) => void;
  selectedAccess: string;
  isAssign?: boolean;
  isEdit?: boolean;
  isView?: boolean;
  noClick?: boolean;
  isSortType?: boolean;
  noAction?: boolean;
  onView?: (data: T) => void;
}

const AdvancedDataTable = <T extends BaseDataType>({
  data,
  onPageSizeChange,
  pageSize,
  onPageChange,
  currentPage,
  totalPages,
  totalCount,
  hiddenColumnKeys = [],
  exportedColumnKeys,
  selectableColumnKey,
  columnNames,
  currentStatus,
  onStatusChange,
  onDelete,
  onEdit,
  onBulkDelete,
  setStatusFilter,
  handleSearchItem,
  exportFileName,
  render,
  idDelete,
  isStatus,
  isCsv,
  onAssign,
  selectedAccess,
  isAssign,
  isEdit,
  isView,
  onView,
  noClick,
  handleSearchType,
  isSortType,
  noAction
}: Props<T>) => {

  const gridRef = useRef<AgGridReact<T>>(null);
  const [selectedDataList, setSelectedDataList] = useState<T[]>([]);
  const [searchType, setSearchType] = useState("");

  const selectRowData = (rowData: T) => {
    const isDataExists = selectedDataList.find((item) => _.isEqual(item, rowData));
    if (!isDataExists) {
      setSelectedDataList((prevList) => [...prevList, rowData]);
    }
  };

  const deselectRowData = (rowData: T) => {
    setSelectedDataList((prevList) =>
      prevList.filter((item) => !_.isEqual(item, rowData))
    );
  };

  const headers = useMemo(() => {
    if (data && data?.length > 0) {
      return Object.keys(data[0]) as Array<keyof T>;
    }
    return [];
  }, [data]);

  const hiddenHeadersSet = useMemo(
    () => new Set(hiddenColumnKeys),
    [hiddenColumnKeys]
  );

  const defaultColDef = useMemo(() => {
    const def: ColDef<T> = {
      flex: 1,
    };
    return def;
  }, []);

  const columnDefs = useMemo(() => {
    const defs = headers.map((header) => {
      const isSelectable = header === selectableColumnKey;
      const internalFlex: Record<string, number> = {
        status: 0,
      };
      const internalRenders: Partial<
        Record<string, (data: T) => React.ReactNode>
      > = {
        status: (rowData: T) => (
          <DataTableStatus
            noClick={noClick}
            status={rowData.status}
            onStatusChange={() => onStatusChange && onStatusChange(rowData)}
          />
        ),
        createdAt: (rowData: T) =>
          moment(rowData?.createdAt).format("MMM Do YY"),
      };

      const isRenderable = render && Boolean(render[header]);
      const isInternalRenderable = Boolean(internalRenders[header as string]);

      const def: ColDef<T> = {
        field: header as ColDefField<T, any>,
        hide: hiddenHeadersSet.has(header),
        headerName: columnNames ? columnNames[header] : undefined,
        checkboxSelection: isSelectable,
        headerCheckboxSelection: isSelectable,
        flex: internalFlex[header as string] ?? 1,
        cellRenderer: isRenderable
          ? (props: { data: T }) => render[header]?.(props.data)
          : isInternalRenderable
            ? (props: { data: T }) => internalRenders[header]?.(props.data)
            : undefined,
      };
      return def;
    });

    const actionDef: ColDef<T> =
      data?.length > 0 && !noAction
        ? {
          field: "Action" as ColDefField<T, any>,
          sortable: false,
          flex: 0,
          cellRenderer: (props: { data: T }) => {
            return (
              <DataTableAction
                onDelete={() => {
                  if (onDelete) {
                    onDelete(props.data);
                    setSelectedDataList([]);
                  }
                }}
                onEdit={() => onEdit && onEdit(props.data)}
                idDelete={idDelete}
                selectedAccess={selectedAccess}
                onAssign={() => onAssign && onAssign(props.data)}
                isAssign={
                  props?.data?.moderator_company_master_access === "No" &&
                  isAssign
                }
                isEdit={isEdit}
                isView={isView}
                onView={() => onView && onView(props.data)}
              />
            );
          },
        }
        : {
          hide: true,
          sortable: false,
        };

    return [...defs, actionDef];
  }, [
    headers,
    hiddenHeadersSet,
    selectableColumnKey,
    columnNames,
    render,
    exportedColumnKeys,
  ]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchItem(e.target.value);
  };

  const handleTypeChange = (value: string) => {
    setSearchType(value);
    handleSearchType && handleSearchType(value);
  };

  const handleRowSelection = (event: RowSelectedEvent<T, any>) => {
    if (event.node.isSelected()) {
      event.data && selectRowData(event.data);
    } else {
      event.data && deselectRowData(event.data);
    }
  };

  const handleBulkDelete = () => {
    onBulkDelete && onBulkDelete(selectedDataList);
    gridRef.current?.api.deselectAll();
    setSelectedDataList([]);
  };

  const handleExportExcel = useCallback(() => {
    const csvData = gridRef.current?.api.getDataAsCsv({
      columnKeys: (exportedColumnKeys as string[]) || headers,
      onlySelectedAllPages: selectedDataList.length > 0,
    });
    if (!csvData) return;
    const jsonData = csvToJson(csvData);
    jsonToExcel(jsonData, `${exportFileName}.xlsx`);
  }, [exportedColumnKeys, exportFileName, selectedDataList, headers]);

  const handleExportCSV = useCallback(() => {
    gridRef.current?.api.exportDataAsCsv({
      fileName: exportFileName,
      columnKeys: (exportedColumnKeys as string[]) || headers,
      onlySelectedAllPages: selectedDataList.length > 0,
    });
  }, [exportedColumnKeys, exportFileName, selectedDataList, headers]);

  const isBulkDeleteEnabled = selectedDataList.length > 0;

  const handlePageSizeChange = (newPageSize: number) => {
    onPageSizeChange && onPageSizeChange(newPageSize);
  };

  const handlePageChange = (page: number) => {
    onPageChange && onPageChange(page);
  };

  const rowSelection: RowSelectionOptions = {
    mode: "multiRow",
    headerCheckbox: true,
  };

  return (
    <div className="w-full h-full">
      <div className="flex items-center flex-wrap gap-2 justify-between mb-4">
        <Tabs
          value={currentStatus || ""}
          onValueChange={(value) => {
            setStatusFilter(value);
            setSelectedDataList([]);
          }}
          className="px-2"
        >
          <TabsList>
            <TabsTrigger value="">All</TabsTrigger>
            {isStatus && <TabsTrigger value="Active">Active</TabsTrigger>}
            {isStatus && <TabsTrigger value="Inactive">Inactive</TabsTrigger>}
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2 flex-wrap">
          <Input
            placeholder="Search..."
            onChange={handleSearch}
            className="w-[200px]"
          />

          {isSortType && (
            <Select value={searchType} onValueChange={handleTypeChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="digital-recruitment">Digital Recruitment</SelectItem>
                <SelectItem value="talent-acquisition">Talent Acquisition</SelectItem>
                <SelectItem value="help-center">Help Center</SelectItem>
              </SelectContent>
            </Select>
          )}

          {onBulkDelete && (
            <DataTableBulkDeleteButton
              disabled={!isBulkDeleteEnabled}
              onBulkDelete={handleBulkDelete}
            />
          )}

          {isCsv && (
            <DataTableHeaderMenu
              onPrint={() => window.alert("printed")}
              onExportCSV={handleExportCSV}
              onExportExcel={handleExportExcel}
            />
          )}
        </div>
      </div>
      <div className="ag-theme-alpine w-full h-full">
        <AgGridReact<T>
          ref={gridRef}
          rowData={data}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection={rowSelection}
          // suppressRowClickSelection={true}
          suppressCellFocus={true}
          rowHeight={50}
          onRowSelected={handleRowSelection}
          pagination={true}
          paginationPageSize={50}
          suppressPaginationPanel={true}
          localeText={{ noRowsToShow: "No data found" }}
          className="ag-theme-quartz"
        />
      </div>

      {data?.length === 0 ? null : (
        <CustomPagination
          onPageSizeChange={handlePageSizeChange}
          pageSize={pageSize}
          onPageChnage={handlePageChange}
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalCount}
        />
      )}
    </div>
  );
};

export default AdvancedDataTable;