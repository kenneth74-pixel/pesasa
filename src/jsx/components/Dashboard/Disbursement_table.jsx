import React, { useState, useRef, useCallback, useContext } from "react";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
//import { ThemeContext2 } from "contexts/ColorContext.js";

import {
  GroupingState,
  IntegratedGrouping,
  SummaryState,
  IntegratedSummary,
  SelectionState,
  IntegratedSelection,
  DataTypeProvider,
  SearchState,
  IntegratedFiltering,
  PagingState,
  IntegratedPaging,
  SortingState,
  IntegratedSorting,
  TreeDataState,
  CustomTreeData,
  FilteringState,
} from "@devexpress/dx-react-grid";
import { GridExporter } from "@devexpress/dx-react-grid-export";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableGroupRow,
  GroupingPanel,
  TableSummaryRow,
  TableSelection,
  DragDropProvider,
  Toolbar,
  ExportPanel,
  SearchPanel,
  PagingPanel,
  ColumnChooser,
  TableColumnVisibility,
  TableColumnResizing,
  TableColumnReordering,
  TableFixedColumns,
  VirtualTable,
  TableTreeColumn,
  TableFilterRow,
} from "@devexpress/dx-react-grid-material-ui";

import Input from "@material-ui/core/Input";
import * as PropTypes from "prop-types";
import saveAs from "file-saver";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },

  numericInput: {
    fontSize: "14px",
    textAlign: "right",
    width: "100%",
  },
};

const CurrencyEditorBase = ({ value, onValueChange, classes }) => {
  const handleChange = (event) => {
    const { value: targetValue } = event.target;
    if (targetValue.trim() === "") {
      onValueChange();
      return;
    }
    onValueChange(parseInt(targetValue, 10));
  };
  return (
    <Input
      type="number"
      classes={{
        input: classes.numericInput,
        root: classes.root,
      }}
      fullWidth
      value={value === undefined ? "" : value}
      inputProps={{
        min: 0,
        placeholder: "Filter...",
      }}
      onChange={handleChange}
    />
  );
};

CurrencyEditorBase.propTypes = {
  value: PropTypes.number,
  onValueChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

CurrencyEditorBase.defaultProps = {
  value: undefined,
};

const CurrencyEditor = withStyles(styles)(CurrencyEditorBase);

const DateFormatter = ({ value }) => <span>{value.toLocaleDateString()}</span>;

const DateTypeProvider = (props) => (
  <DataTypeProvider {...props} formatterComponent={DateFormatter} />
);

const onSave = (workbook) => {
  workbook.xlsx.writeBuffer().then((buffer) => {
    saveAs(
      new Blob([buffer], { type: "application/octet-stream" }),
      "DataGrid.xlsx"
    );
  });
};

const columns = [];
const dateColumns = [];
const groupSummaryItems = [];
const totalSummaryItems = [];

function MyComponent(props) {
  const defaultExpandedGroups = props.defaultExpandedGroups;
  const [grouping, setGrouping] = useState(props.grouping);

  const theColor = "#000";

  const customizeHeader = (worksheet) => {
    const generalStyles = {
      font: { bold: true },
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "D3D3D3" },
        bgColor: { argb: "D3D3D3" },
      },
      alignment: { horizontal: "left" },
    };
    for (let rowIndex = 1; rowIndex < 6; rowIndex += 1) {
      worksheet.mergeCells(rowIndex, 1, rowIndex, 3);
      worksheet.mergeCells(rowIndex, 4, rowIndex, 6);
      Object.assign(worksheet.getRow(rowIndex).getCell(1), generalStyles);
      Object.assign(worksheet.getRow(rowIndex).getCell(3), generalStyles);
    }
    worksheet.getRow(1).height = 20;
    worksheet.getRow(1).getCell(1).font = { bold: true, size: 16 };
    worksheet.getRow(1).getCell(4).numFmt = "d mmmm yyyy";
    worksheet.getRow(1).getCell(4).font = { bold: true, size: 16 };
    worksheet.getColumn(1).values = [
      "PESASA",
      "Easy Loans:",
      "Address:",
      "Web:",
    ];
    worksheet.getColumn(4).values = [
      new Date(),
      "PESASA",
      " ",
      "https://pesasa.net",
    ];
    worksheet.addRow({});
  };

  const customizeFooter = (worksheet) => {
    const { lastRow } = worksheet;
    let currentRowIndex = lastRow.number + 2;
    for (let rowIndex = 0; rowIndex < 3; rowIndex += 1) {
      worksheet.mergeCells(
        currentRowIndex + rowIndex,
        1,
        currentRowIndex + rowIndex,
        6
      );
      Object.assign(worksheet.getRow(currentRowIndex + rowIndex).getCell(1), {
        font: { bold: true },
        alignment: { horizontal: "right" },
      });
    }
    worksheet.getRow(currentRowIndex).getCell(1).value =
      "Exported From PESASA System";
    currentRowIndex += 1;
    worksheet.getRow(currentRowIndex).getCell(1).value = "pesasa.net";
    currentRowIndex += 1;
    worksheet.getRow(currentRowIndex).getCell(1).value = "PESASA";
    worksheet.getRow(currentRowIndex).getCell(1).font = { italic: true };
  };

  const [selection, setSelection] = useState([]);

  let fileName = "PESASA_DATA.xlsx";

  if (props.fileName != undefined && props.fileName !== null) {
    fileName = props.fileName + "_PESASA.xlsx";
  }

  const onSave = (workbook) => {
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(
        new Blob([buffer], { type: "application/octet-stream" }),
        fileName
      );
    });
  };

  const exporterRef = useRef(null);

  const startExport = useCallback(
    (options) => {
      exporterRef.current.exportGrid(options);
    },
    [exporterRef]
  );

  const styles2 = {
    white: {
      color: theColor.color,
    },
  };

  const getClassByValue = (value, classes) => {
    // if (value === "pending") return classes.pending;
    // if (value === "ATUHAIRE Precious") return classes.declined;
    // if (value === "blue") return classes.blue;
    return classes.white;
  };

  const updateSelectionState = (selection) => {
    setSelection(selection);
    try {
      props.passSelection(selection);
    } catch (error) {}
  };

  const getRowId = (rows) => rows.id;

  const TableCell = withStyles(
    styles2,
    "TableCell"
  )(({ value, classes, ...restProps }) => (
    <Table.Cell
      className={getClassByValue(value, classes)}
      value={value}
      {...restProps}
    />
  ));

  const [hiddenColumnNames, setHiddenColumnNames] = useState(
    props.defaultHiddenColumnNames
  );

  let mobileColumns = props.mobileHiddenColumnNames ?? [];

  if (mobileColumns.length === 0 && props.columns.length >= 2) {
    for (let index = 1; index < props.columns.length - 1; index++) {
      mobileColumns.push(props.columns[index].name);
    }
  }

  const [mobileHiddenColumns, setMobileHiddenColumns] = useState([
    ...new Set(mobileColumns),
  ]);

  return (
    <div style={{zIndex:-1000}}>
      <div className="showTable">
        <Grid
          rows={props.rows}
          columns={props.columns}
          getRowId={props.getRowId ? getRowId : null}
        >
          <DragDropProvider />
          <DateTypeProvider for={dateColumns} />

          <SortingState
            defaultSorting={
              props.defaultSorting !== null || props.defaultSorting != undefined
                ? props.defaultSorting
                : []
            }
          />

          <GroupingState
            defaultExpandedGroups={defaultExpandedGroups}
            grouping={grouping}
            onGroupingChange={setGrouping}
          />

          <SearchState defaultValue="" />

          <DataTypeProvider
            for={
              props.currencyColumns !== undefined &&
              props.currencyColumns.length > 0
                ? props.currencyColumns
                : []
            }
            availableFilterOperations={[
              "greaterThanOrEqual",
              "lessThan",
              "lessThanOrEqual",
              "equal",
              "notEqual",
              "greaterThan",
            ]}
            editorComponent={CurrencyEditor}
          />
          {props.filteringStateColumnExtensions !== undefined &&
          props.filteringStateColumnExtensions.length > 0 ? (
            <FilteringState
              columnExtensions={props.filteringStateColumnExtensions}
              defaultFilters={[]}
            />
          ) : null}

          <IntegratedFiltering />
          {props.totalSummaryItems !== undefined &&
          props.totalSummaryItems.length > 0 ? (
            <SummaryState
              totalItems={props.totalSummaryItems}
              groupItems={
                props.groupSummaryItems !== undefined &&
                props.groupSummaryItems.length > 0
                  ? props.groupSummaryItems
                  : []
              }
            />
          ) : null}
          <PagingState
            defaultPageSize={
              props.defaultPageSize !== null ||
              props.defaultPageSize !== undefined
                ? props.defaultPageSize
                : 60
            }
            defaultCurrentPage={0}
          />

          {props.mySelection ? (
            <SelectionState
              selection={props.selection}
              onSelectionChange={props.changeSelection}
            />
          ) : (
            <SelectionState
              selection={selection}
              //onSelectionChange={setSelection}
              onSelectionChange={(selection) => {
                updateSelectionState(selection);
              }}
            />
          )}

          <IntegratedSorting />
          <IntegratedGrouping />

          {props.totalSummaryItems !== undefined &&
          props.totalSummaryItems.length > 0 ? (
            <IntegratedSummary />
          ) : null}

          <IntegratedSelection />
          <IntegratedPaging />
          <Table
          style={{zIndex:-100}}
            cellComponent={TableCell}
            columnExtensions={props.tableColumnExtensions}
          />
          {props.defaultColumnWidths !== undefined &&
          props.defaultColumnWidths.length > 0 ? (
            <TableColumnResizing
              defaultColumnWidths={props.defaultColumnWidths}
            />
          ) : null}
          {props.defaultOrder !== undefined && props.defaultOrder.length > 0 ? (
            <TableColumnReordering defaultOrder={props.defaultOrder} />
          ) : null}

          {props.infiniteScrolling ? <VirtualTable /> : null}
          <TableHeaderRow showSortingControls />

          {props.hideDataExport ? (
            [
              props.showSelection ? (
                <TableSelection selectByRowClick showSelectAll={true} />
              ) : null,
            ]
          ) : (
            <TableSelection selectByRowClick showSelectAll={true} />
          )}

          <TableGroupRow
            showColumnsWhenGrouped={props.showColumnsWhenGrouped}
          />

          <TableColumnVisibility
            hiddenColumnNames={hiddenColumnNames}
            onHiddenColumnNamesChange={setHiddenColumnNames}
          />

          <Toolbar />

          {props.totalSummaryItems !== undefined &&
          props.totalSummaryItems.length > 0 ? (
            <TableSummaryRow />
          ) : null}
          {props.filterRow ? <TableFilterRow showFilterSelector /> : null}
          <TableFixedColumns
            leftColumns={
              props.leftColumns !== undefined && props.leftColumns.length > 0
                ? props.leftColumns
                : []
            }
            rightColumns={
              props.rightColumns !== undefined && props.rightColumns.length > 0
                ? props.rightColumns
                : []
            }
          />

          {!props.hideGrouping ? <GroupingPanel showGroupingControls /> : null}

          {!props.hideSearchPanel ? <SearchPanel /> : null}

          <ColumnChooser />

          {props.hideDataExport ? null : (
            <ExportPanel startExport={startExport} />
          )}

          {!props.hidePagingPanel ? (
            <PagingPanel pageSizes={[10, 20, 30, 50, 70, 100, 0]} />
          ) : null}
        </Grid>
      </div>

      {/* <div className="showMobileTable">
        <Grid
          rows={props.rows}
          columns={props.columns}
          getRowId={props.getRowId ? getRowId : null}
        >
          <DragDropProvider />
          <DateTypeProvider for={dateColumns} />

          <SortingState
            defaultSorting={
              props.defaultSorting !== null || props.defaultSorting != undefined
                ? props.defaultSorting
                : []
            }
          />

          <GroupingState
            defaultExpandedGroups={defaultExpandedGroups}
            // grouping={grouping}
            onGroupingChange={setGrouping}
          />

          <SearchState defaultValue="" />

          <DataTypeProvider
            for={
              props.currencyColumns !== undefined &&
              props.currencyColumns.length > 0
                ? props.currencyColumns
                : []
            }
            availableFilterOperations={[
              "greaterThanOrEqual",
              "lessThan",
              "lessThanOrEqual",
              "equal",
              "notEqual",
              "greaterThan",
            ]}
            editorComponent={CurrencyEditor}
          />
          {props.filteringStateColumnExtensions !== undefined &&
          props.filteringStateColumnExtensions.length > 0 ? (
            <FilteringState
              columnExtensions={props.filteringStateColumnExtensions}
              defaultFilters={[]}
            />
          ) : null}

          <IntegratedFiltering />
          {props.totalSummaryItems !== undefined &&
          props.totalSummaryItems.length > 0 ? (
            <SummaryState
              totalItems={props.totalSummaryItems}
              groupItems={
                props.groupSummaryItems !== undefined &&
                props.groupSummaryItems.length > 0
                  ? props.groupSummaryItems
                  : []
              }
            />
          ) : null}
          <PagingState
            defaultPageSize={
              props.defaultPageSize !== null ||
              props.defaultPageSize !== undefined
                ? props.defaultPageSize
                : 30
            }
            defaultCurrentPage={0}
          />

          {props.mySelection ? (
            <SelectionState
              selection={props.selection}
              onSelectionChange={props.changeSelection}
            />
          ) : (
            <SelectionState
              selection={selection}
              //onSelectionChange={setSelection}
              onSelectionChange={(selection) => {
                updateSelectionState(selection);
              }}
            />
          )}

          <IntegratedSorting />
          <IntegratedGrouping />

          {props.totalSummaryItems !== undefined &&
          props.totalSummaryItems.length > 0 ? (
            <IntegratedSummary />
          ) : null}

          <IntegratedSelection />
          <IntegratedPaging />
          <Table
            cellComponent={TableCell}
            columnExtensions={props.tableColumnExtensions}
          />
          {props.defaultColumnWidths !== undefined &&
          props.defaultColumnWidths.length > 0 ? (
            <TableColumnResizing
              defaultColumnWidths={props.defaultColumnWidths}
            />
          ) : null}
          {props.defaultOrder !== undefined && props.defaultOrder.length > 0 ? (
            <TableColumnReordering defaultOrder={props.defaultOrder} />
          ) : null}

          {props.infiniteScrolling ? <VirtualTable /> : null}
          <TableHeaderRow showSortingControls />

          {props.hideDataExport ? (
            [
              props.showSelection ? (
                <TableSelection selectByRowClick showSelectAll={true} />
              ) : null,
            ]
          ) : (
            <TableSelection selectByRowClick showSelectAll={true} />
          )}

          <TableGroupRow
            showColumnsWhenGrouped={props.showColumnsWhenGrouped}
          />

          <TableColumnVisibility
            hiddenColumnNames={mobileHiddenColumns}
            onHiddenColumnNamesChange={setMobileHiddenColumns}
          />

          <Toolbar />

          {props.totalSummaryItems !== undefined &&
          props.totalSummaryItems.length > 0 ? (
            <TableSummaryRow />
          ) : null}
          {props.filterRow ? <TableFilterRow showFilterSelector /> : null}
          <TableFixedColumns
            leftColumns={
              props.leftColumns !== undefined && props.leftColumns.length > 0
                ? props.leftColumns
                : []
            }
            rightColumns={
              props.rightColumns !== undefined && props.rightColumns.length > 0
                ? props.rightColumns
                : []
            }
          />

          {!props.hideGrouping ? <GroupingPanel showGroupingControls /> : null}

          {!props.hideSearchPanel ? <SearchPanel /> : null}

          <ColumnChooser />

          {props.hideDataExport ? null : (
            <ExportPanel startExport={startExport} />
          )}

          {!props.hidePagingPanel ? (
            <PagingPanel pageSizes={[10, 20, 30, 50, 70, 100, 0]} />
          ) : null}
        </Grid>
      </div> */}

      <GridExporter
        ref={exporterRef}
        rows={props.exportRow}
        columns={props.exportColumns}
        grouping={grouping}
        totalSummaryItems={
          props.totalSummaryItems !== undefined &&
          props.totalSummaryItems.length > 0
            ? props.totalSummaryItems
            : []
        }
        groupSummaryItems={
          props.groupSummaryItems !== undefined &&
          props.groupSummaryItems.length > 0
            ? props.groupSummaryItems
            : []
        }
        // customizeHeader={customizeHeader}
        // customizeFooter={customizeFooter}
        selection={props.mySelection ? props.selection : selection}
        onSave={onSave}
      />
    </div>
  );
}

export default withStyles(styles)(MyComponent);
