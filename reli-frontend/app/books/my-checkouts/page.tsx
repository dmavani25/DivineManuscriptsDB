'use client';
import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import ModalPopUpCellRenderer from 'app/custom-components/modal/ModalPopUpCellRenderer';
import Navbar from 'app/nav-bar/Navbar';
import { useRef, useCallback, useState, useEffect } from 'react';
import Link from 'next/link';

function ManageCheckOuts() {
  const gridRef = useRef<any>(null);

  const onFilterTextBoxChanged = useCallback(() => {
    const filterValue = (
      document.getElementById('filter-text-box') as HTMLInputElement
    )?.value;
    gridRef?.current?.api?.setQuickFilter(filterValue);
  }, []);

  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const colDefs: ColDef[] = [
    {
      headerName: 'Book Name',
      field: 'bookname',
      filter: 'agTextColumnFilter',
      headerCheckboxSelection: true,
      checkboxSelection: true,
      showDisabledCheckboxes: true,
      valueSetter: (params) => {
        const newVal = params.newValue;
        const valueChanged = params.data.bookName !== newVal;
        if (valueChanged) {
          console.log('Value changed ' + newVal);
          params.data.bookName = newVal;
        }
        return valueChanged;
      },
    },
    {
      headerName: 'Author Name',
      field: 'authorname',
      filter: 'agTextColumnFilter',
      valueSetter: (params) => {
        const newVal = params.newValue;
        const valueChanged = params.data.authorName !== newVal;
        if (valueChanged) {
          console.log('Value changed ' + newVal);
          params.data.authorName = newVal;
        }
        return valueChanged;
      },
    },
    {
      headerName: 'Num Copies',
      field: 'numcopies',
      filter: 'agNumberColumnFilter',
      valueSetter: (params) => {
        const newVal = params.newValue;
        const valueChanged = params.data.numCopies !== newVal;
        if (valueChanged) {
          console.log('Value changed ' + newVal);
          params.data.numCopies = newVal;
        }
        return valueChanged;
      },
    },
    {
      headerName: 'Loan Period (Days)',
      field: 'daysCheckedOut',
      filter: 'agNumberColumnFilter',
    },
  ];

  const defaultColumnDefs = {
    sortable: true,
    filter: true,
    resizable: true,
    editable: false,
    flex: 1,
    minWidth: 100,
    cellClass: 'px-4 py-2 cell-wrap-text', // Apply Tailwind CSS classes to grid cells
  };

  const [columnDefs] = useState(colDefs);

  const [modalProps, setModalProperties] = useState({
    showModal: false,
  } as ModalPropsDef);

  const modalProperties: ModalPropsDef = {
    showModal: false,
    titleText: 'Checkin Book',
    dialogueText: 'Are you sure you want to checkin a single copy of these ',
    okButton: 'Checkin',
    cancelButton: 'Cancel',
    handleOk: hideModal,
    handleCancel: hideModal,
  };

  function showModal(showModal: boolean, bookcount: any) {
    let newModalProperties: ModalPropsDef = {
      ...modalProperties,
      showModal: showModal,
      dialogueText: `${modalProperties.dialogueText} ${bookcount} editions?`,
    };

    if(bookcount <= 0){
      newModalProperties = {
        ...modalProperties,
        showModal: showModal,
        dialogueText: `Please select at least one book`,
        okButton: 'OK',        
      };

    }
    
    console.log('New modal props ' + newModalProperties.showModal);
    setModalProperties(newModalProperties);
  }

  function hideModal(showModal: boolean = false) {
    setModalProperties({ showModal: showModal } as ModalPropsDef);
    return;
  }

  const onSelectedRowsChanged = (params: any) => {
    // get selected rows of data
    const selectedData = params.api.getSelectedRows();
    // Function to generate a unique ID for each book
    const generateId = (book: any) => `${book.bookname}-${book.authorname}`;

    // Generate IDs for the selected rows
    const selectedDataIDs = selectedData.map((book: any) => generateId(book));

    // Update the state with the selected row IDs
    setSelectedRowIds(selectedDataIDs); // Assuming setRowId is your state setter function


  };

  const handleCheckIn = (rowIds : any) => {
    if(rowIds.length <= 0) hideModal();
    
      
    rowIds.forEach((rowId: any) => {
      const bookname = rowId.split('-')[0];
      const authorname = rowId.split('-')[1];

      fetch('/api/checkings', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookname: bookname,
          authorname: authorname,
          useremail: "aaly24@amherst.edu",
        }),
      })
        .then((response) => {
          if (response.status === 200) {
            hideModal();
            alert('Successfully checked in');
            window.location.reload();
          } else {
            alert('Error checking in' + response.status + response.statusText);
          }
          return response.json();
        });
    });
      
  }

  const modalComponent = () => (
    <>
      {modalProps.showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className=" rounded-md relative w-1/3 my-auto mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0  p-2 rounded-lg shadow-lg relative flex flex-col w-full bg-[#fff] outline outline-1     focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-3 border-primary-200 rounded-t">
                  <h3 className="text-lg font-semibold">
                    {modalProps.titleText}
                  </h3>
                </div>
                {/*body*/}
                <div className="relative pl-4 pr-4 flex-auto">
                  <p className="my-4 text-blueGray-500 text-2md leading-relaxed">
                    {modalProps.dialogueText}
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-2 border-blueGray-200 rounded-b">
                  <button
                    className="text-[#cc5833] bg-transparent border border-solid border-[#cc5833] hover:bg-[#cc5833] hover:text-[#ffd] active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() =>
                      setModalProperties({
                        showModal: false,
                      } as ModalPropsDef)
                    }
                  >
                    {modalProps.cancelButton}
                  </button>
                  <button
                    className="text-[#5ba151] border border-solid border-[#458246] hover:bg-[#458246]-500 hover:text-[#ffd] hover:bg-[#5ba151] shadow hover:shadow-lg focus:outline-1 hover:outline hover:outline-dashed active:bg-[#458246]-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() =>
                      handleCheckIn(selectedRowIds)
                    }
                  >
                    {modalProps.okButton}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );

  const [rowData, setRowData] = useState([]);
  useEffect(() => {
    fetch('/api/checkings', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
     
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        const newData = data.map((obj: any) => {
          // Calculate the current timestamp
          const currentTimestamp = new Date().getTime();
          // Calculate the time difference in milliseconds
          if (obj.checkedoutsince == null) {
            return {
              ...obj,
              daysCheckedOut: 0,
            };
          }
          const objectTimestamp =  new Date(obj.checkedoutsince).getTime();
          const timeDifference = currentTimestamp - objectTimestamp;
          // Convert milliseconds to days
          const daysCheckedOut = Math.floor(
            timeDifference / (1000 * 60 * 60 * 24)
          );
            
          return {
            ...obj,
            daysCheckedOut: daysCheckedOut,
          };
        });

        setRowData(newData);
      });
  }, []);

  const gridOptions = {
    suppressCellFocus: true,
    pagination: true,
    rowHeight: 60,
  };

  return (
    <div>
      <Navbar />
      {modalComponent()}
      <div className="w-full">
        <div className="mt-20 w-4/5 mx-auto">
          <div className="flex justify-between">
            <div className="text-2lg text-primary p-1 font-bold">
              My Checked Out Books
            </div>
            <div className="flex items-center justify-center">
              <input
                type="text"
                placeholder="Search..."
                id="filter-text-box"
                onInput={onFilterTextBoxChanged}
                className="shadow appearance border border-primary rounded p-1 focus:outline-none focus:shadow-outline"
              />
              <button
                className="px-10 mr-2 ml-2 text-[#5ba151] border border-solid border-[#458246] hover:bg-[#458246]-500 hover:text-[#ffd] hover:bg-[#5ba151] shadow hover:shadow-lg focus:outline-1 hover:outline hover:outline-dashed active:bg-[#458246]-600 font-bold text-sm px-2 py-1.5 rounded outline-none ease-linear transition-all duration-150"
                type="button"
                onClick={() =>showModal(true, selectedRowIds.length)
                }
              >
                <i className="fas fa-heart"></i> CheckIn selection
              </button>
              <Link href={'/books'}>
                <button
                  className="px-10 mr-2 ml-2 text-[#5ba151] border border-solid border-[#458246] hover:bg-[#458246]-500 hover:text-[#ffd] hover:bg-[#5ba151] shadow hover:shadow-lg focus:outline-1 hover:outline hover:outline-dashed active:bg-[#458246]-600 font-bold text-sm px-2 py-1.5 camelCase rounded outline-none ease-linear transition-all duration-150"
                  type="button"
                >
                  <i className="fas fa-heart"></i> View Books
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div
          className="m-2 mx-auto ag-theme-alpine min-w-fit"
          style={{ height: '650px', width: '80%' }}
        >
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColumnDefs}
            context={{
              showModal,
            }}
            animateRows={true}
            rowSelection={'multiple'}
            suppressRowClickSelection={true}
            suppressCellFocus={true}
            onSelectionChanged={onSelectedRowsChanged}
            pagination={true}
            rowHeight={60}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
}

export default ManageCheckOuts;
