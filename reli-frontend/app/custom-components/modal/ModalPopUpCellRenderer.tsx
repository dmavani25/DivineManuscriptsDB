import React from 'react';

const ModalPopUpCellRenderer = (props: any) => {
  const { data, context } = props;
  const { showModal } = context;

  const handleButtonClick = () => {
    // Call methodFromParent to update modal properties
    showModal(true, data);
  };

  return (
    <button
      className="p-1.5 text-primary-500 bg-transparent border border-solid border-primary-500 hover:bg-secondary-500 hover:text-primary active:bg-primary-600 uppercase text-sm rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
      type="button"
      onClick={handleButtonClick}
    >
      Checkout
    </button>
  );
};

export default ModalPopUpCellRenderer;
