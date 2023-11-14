'use client';
import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import ModalPopUpCellRenderer from 'app/custom-components/modal/ModalPopUpCellRenderer';
import Navbar from 'app/nav-bar/Navbar';
import { useRef, useCallback, useState, useEffect } from 'react';
import Sidebar from 'app/custom-components/side-bar/admin/Sidebar';

function ManageBooksPage() {
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
      headerCheckboxSelection: true,
      checkboxSelection: true,
      showDisabledCheckboxes: true,
      editable: true,
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
      field: 'authorName',
      filter: 'agTextColumnFilter',
      editable: true,
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
      field: 'numCopies',
      filter: 'agNumberColumnFilter',
      editable: true,
    },
    {
      headerName: 'Religion',
      field: 'religion',
      filter: 'agTextColumnFilter',
      editable: true,
    },
    {
      headerName: 'Wing',
      field: 'wing',
      filter: 'agTextColumnFilter',
      editable: true,
    },
    {
      headerName: 'Shelf',
      field: 'shelf',
      filter: 'agNumberColumnFilter',
      editable: true,
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

  const [modalProps, setModalProperties] = useState({
    showModal: false,
  } as ModalPropsDef);

  const modalProperties: ModalPropsDef = {
    showModal: false,
    titleText: 'Checkout Book',
    dialogueText: 'Are you sure you want to checkout ',
    okButton: 'Checkout',
    cancelButton: 'Cancel',
    handleOk: hideModal,
    handleCancel: hideModal,
  };

  function showModal(showModal: boolean, bookData: any) {
    const newModalProperties: ModalPropsDef = {
      ...modalProperties,
      showModal: showModal,
      dialogueText: `${modalProperties.dialogueText} ${bookData.bookName} ?`,
    };
    console.log('New modal props ' + newModalProperties.showModal);
    setModalProperties(newModalProperties);
  }

  function hideModal(showModal: boolean = false) {
    setModalProperties({ showModal: showModal } as ModalPropsDef);
  }

  // Mobile sidebar visibility state
  const [showSidebar, setShowSidebar] = useState(false);
  const handleToggle = () => {
    setShowSidebar(!showSidebar);
  };

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
                      setModalProperties({
                        showModal: false,
                      } as ModalPropsDef)
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
    suppressCellFocus: true,
    pagination: true,
    rowHeight: 60,
  };

  return (
    <div className="h-screen flex">
      <div
          className={`w-1/5 transition-all duration-300 ease-in-out overflow-hidden ${
            showSidebar ? 'block translate-x-0 ' : 'hidden translate-x-full'
          } outline outline-dashed`}
        >
          {/** create a side bar  */}
          <Sidebar show={showSidebar} setter={setShowSidebar} />
        </div>

        {/* Main Content */}
      <div className="outline outline-dashed w-full relative transition-margin">
        
        {/** create a nav bar */}
        <nav className={`z-50 shadow-md fixed w-full transition-margin ${showSidebar ? 'ml-1/5' : 'ml-0'}`}>
          <div className="p-0.5 bg-primary"></div>
          <div className="p-3 flex justify-between items-center">
            <input
              type="checkbox"
              id="sidebarToggle"
              className="hidden"
              checked={showSidebar}
              onChange={handleToggle}
            />
            <label htmlFor="sidebarToggle" className="cursor-pointer p-3">
              Toggle Sidebar
            </label>
            <div className="text-2xl text-primary font-bold">
              Divine Manuscripts
            </div>
            <div className="p-4 flex justify-between items-center">
              <div className="flex space-x-4">
                {/* Notifications icon */}
                {/* Profile icon */}
              </div>
            </div>
          </div>
        </nav>

        

        <div className="mt-24 w-4/5 mx-auto">
          <div className="flex justify-between">
            <div className="text-2lg text-primary p-1 font-bold">
              Book Records
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
                className="mr-2 ml-2 text-[#5ba151] border border-solid border-[#458246] hover:bg-[#458246]-500 hover:text-[#ffd] hover:bg-[#5ba151] shadow hover:shadow-lg focus:outline-1 hover:outline hover:outline-dashed active:bg-[#458246]-600 font-bold text-sm px-2 py-1.5 rounded outline-none ease-linear transition-all duration-150"
                type="button"
              >
                <i className="fas fa-heart"></i> Checkout selection
              </button>
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
            rowSelection={'multiple'}
            suppressRowClickSelection={true}
            suppressCellFocus={true}
            pagination={true}
            rowHeight={60}
          ></AgGridReact>
        </div>
        <div className="mt-4 mx-auto w-2/4">
          <div className="flex items-center justify-center">
            <button
              className="mr-2 ml-2 text-[#5ba151] border border-solid border-[#458246] hover:bg-[#458246]-500 hover:text-[#ffd] hover:bg-[#5ba151] shadow hover:shadow-lg focus:outline-1 hover:outline hover:outline-dashed active:bg-[#458246]-600 font-bold text-sm px-2 py-1.5 camelCase rounded outline-none ease-linear transition-all duration-150"
              type="button"
            >
              <i className="fas fa-heart"></i> Add new book
            </button>

            <button
              className="text-[#cc5833] bg-transparent border border-solid border-[#cc5833] hover:bg-[#cc5833] hover:text-[#ffd] active:bg-pink-600 font-bold uppercase text-sm px-2 py-1.5 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
              type="button"
            >
              Delete selection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageBooksPage;
