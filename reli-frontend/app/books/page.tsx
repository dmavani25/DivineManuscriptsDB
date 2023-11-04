'use client';

import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import BtnCellRenderer from './BtnCellRenderer';
// import ChildMessageRenderer from './ChildMessageRenderer';


const methodFromParent = (cell : any) => {
  alert('<Parent Component Method from ' + cell + '!>');
};

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
      headerName: 'Number of Copies',
      field: 'numCopies',
      filter: 'agNumberColumnFilter',
    },
    { headerName: 'Religion', field: 'religion', filter: 'agTextColumnFilter' },
    {
      headerName: 'Actions',
      field: 'availableActions',
      cellRenderer: BtnCellRenderer,
    },
  ];

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

  return (
    <div className="h-screen flex flex-col items-center justify-center ">
      <div className="p-3 ">
        <input
          className="shadow appearance-none border border-1 rounded-md w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          id="filter-text-box"
          placeholder="Search..."
          onInput={onFilterTextBoxChanged}
        />
      </div>
      <div
        className="ag-theme-alpine min-w-fit"
        style={{ height: '600px', width: '1000px' }}
      >
        <AgGridReact
          getRowId={(params) => params.data.row}
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          context={{
            methodFromParent,
          }}
        ></AgGridReact>
      </div>
    </div>
  );
}

export default BookPage;
