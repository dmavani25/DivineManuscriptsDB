

function BtnCellRenderer() {


  const clickButton = ()=>{
    alert('Button Clicked!');
  }
  return (
    <button
      className="middle none center rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 "
      onClick={clickButton}
    >
      Click Me!
    </button>
  );

}


export default BtnCellRenderer;