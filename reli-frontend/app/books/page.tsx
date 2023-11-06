'use client';

import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import BtnCellRenderer from './BtnCellRenderer';
import Navbar from 'app/nav-bar/Navbar';
import Modal from 'app/custom-components/modal/ModalComponent';
import ModalPopUpCellRenderer from 'app/custom-components/modal/ModalPopUpCellRenderer';
// import ChildMessageRenderer from './ChildMessageRenderer';

const modalProperties : ModalPropsDef = {
  showModal : true,
  dialogueText : "Clicked on",
  okButton : "OK",
  cancelButton : "Cancel"

}

function BookPage() {
  const gridRef = useRef<any>(null);

  const onFilterTextBoxChanged = useCallback(() => {
    const filterValue = (
      document.getElementById('filter-text-box') as HTMLInputElement
    )?.value;
    gridRef?.current?.api?.setQuickFilter(filterValue);
  }, []);

  const colDefs: ColDef[] = [
    {
      headerName: 'Book Name',
      field: 'bookName',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Author Name',
      field: 'authorName',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Num Copies',
      field: 'numCopies',
      filter: 'agNumberColumnFilter',
    },
    { headerName: 'Religion', field: 'religion', filter: 'agTextColumnFilter' },
    {
      headerName : 'Shelf',
      field : 'shelf',
      filter: 'agNumberColumnFilter',
    },
    {
      headerName : 'Wing',
      field : 'wing',
      filter: 'agTextColumnFilter',


    },
    {
      headerName: 'Actions',
      field: 'availableActions',
      cellRenderer: ModalPopUpCellRenderer,
    },
  ];

  const defaultColumnDefs = {
    sortable: true,
    filter: true,
    resizable: true,
    flex: 1,
    minWidth: 100,
    cellClass: 'px-4 py-2 cell-wrap-text', // Apply Tailwind CSS classes to grid cells
  };

  const [columnDefs] = useState(colDefs);

  const [rowData, setRowData] = useState([]);
  useEffect(() => {
    fetch('../data/Mock_Book.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRowData(data.rows);
      });
  }, []);

  const gridOptions = {
    suppressCellFocus : true,
    pagination : true,
    rowHeight : 60
  }

  return (
    <div>
      <Navbar/>
      <div className="w-full">
        <div className="mt-24 w-3/4 mx-auto">
          <div className="flex justify-between">
            <div className="text-2lg text-primary p-1 font-bold">
              Available Books
            </div>
            <div className="flex items-center justify-center">
              <input
                type="text"
                placeholder="Search..."
                id="filter-text-box"
                onInput={onFilterTextBoxChanged}
                className="shadow appearance border border-primary rounded p-1 focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
        </div>
        <div
          className="m-2 mx-auto ag-theme-alpine min-w-fit"
          style={{ height: '700px', width: '80%' }}
        >
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColumnDefs}
            context={{
              modalProps : modalProperties,
            }}
            gridOptions={gridOptions}
          ></AgGridReact>
        </div>

      </div>
    </div>
  );
}

export default BookPage;
