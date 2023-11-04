"use client"
import { useState } from "react";


function BtnCellRenderer(props : any) {
  const invokeParentMethod = () => {
    props.context.methodFromParent(
      `Row: ${props.node.rowIndex}, Col: ${props.colDef.field}`
    );
  };


  return (
    <button
      className="middle none center rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 "
      onClick={invokeParentMethod}
    >
      Click Me!
    </button>
  );

}


export default BtnCellRenderer;