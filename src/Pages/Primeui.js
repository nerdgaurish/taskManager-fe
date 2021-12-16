/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "./DataTableDemo.css";

// eslint-disable-next-line func-names
const Primeui = function (props) {
  const { columns, itemsData } = props;

  const dateFilterTemplate = (options) => {
    return (
      <Calendar
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        dateFormat="mm/dd/yy"
        placeholder="mm/dd/yyyy"
        mask="99/99/9999"
      />
    );
  };

  const fields = columns.map((i) => i.header);

  const formatDate = (value) => {
    const date = new Date(value);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const dateBodyTemplate = (rowData) => {
    return formatDate(rowData.date);
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={rowData.Avatar}
        alt={rowData.Username}
        className="product-image"
      />
    );
  };

  const bodyType = (field) => {
    if (field === "date") {
      return dateBodyTemplate;
    }
    if (field === "Avatar") {
      return imageBodyTemplate;
    }
    return "";
  };

  const dynamicColumns = columns.map((col) => {
    return (
      <Column
        key={col.field}
        field={col.field}
        filter
        filterPlaceholder={col.header}
        sortable
        style={{ minWidth: "12rem", height: 1 }}
        filterElement={col.field === "date" && dateFilterTemplate}
        body={bodyType(col.field)}
        header={col.header}
        headerStyle={col.field === "isDone" && { width: "3em" }}
        selectionMode={col.field === "isDone" && "multiple"}
      />
    );
  });

  const [filters1, setFilters1] = useState("");
  const [globalFilterValue1, setGlobalFilterValue1] = useState("");
  const dt = useRef(null);

  const onGlobalFilterChange1 = (e) => {
    const { value } = e.target;
    // eslint-disable-next-line no-underscore-dangle
    const _filters1 = { ...filters1 };
    _filters1.global.value = value;
    setFilters1(_filters1);
    setGlobalFilterValue1(value);
  };

  const exportColumns = columns.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));

  const exportPdf = () => {
    // eslint-disable-next-line import/no-extraneous-dependencies
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        // eslint-disable-next-line new-cap
        const doc = new jsPDF.default(0, 0);
        doc.autoTable(exportColumns, itemsData);
        doc.save("Todo.pdf");
      });
    });
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((FileSaver) => {
      const EXCEL_TYPE =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const EXCEL_EXTENSION = ".xlsx";
      const data = new Blob([buffer], {
        type: EXCEL_TYPE,
      });
      FileSaver.saveAs(
        data,
        `${fileName}_export_${new Date().getTime()}${EXCEL_EXTENSION}`
      );
    });
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(itemsData);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      saveAsExcelFile(excelBuffer, "products");
    });
  };

  const header = (
    <div className="p-d-flex p-ai-center export-buttons">
      <Button
        type="button"
        icon="pi pi-file-excel"
        onClick={exportExcel}
        className="p-button-success p-mr-2"
        data-pr-tooltip="XLS"
      />
      <Button
        type="button"
        icon="pi pi-file-pdf"
        onClick={exportPdf}
        className="p-button-warning p-mr-2"
        data-pr-tooltip="PDF"
      />
    </div>
  );

  // eslint-disable-next-line no-unused-vars
  const renderHeader1 = () => {
    return (
      <div className="p-d-flex p-jc-between">
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Clear"
          className="p-button-outlined"
        />
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue1}
            onChange={onGlobalFilterChange1}
            placeholder="Keyword Search"
          />
        </span>
      </div>
    );
  };

  const [selectedProducts8, setSelectedProducts8] = useState([]);
  return (
    <DataTable
      ref={dt}
      value={itemsData}
      paginator
      className="p-datatable-customers"
      showGridlines
      rows={10}
      dataKey="id"
      filters={filters1}
      filterDisplay="menu"
      responsiveLayout="scroll"
      globalFilterFields={fields}
      emptyMessage="No records found."
      header={header}
      selectionMode="checkbox"
      selection={selectedProducts8}
      onSelectionChange={(e) => setSelectedProducts8(e.value)}
    >
      {dynamicColumns}
    </DataTable>
  );
};

export default Primeui;
