// @/components/Layout/Sidebar.js
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

export default function Sidebar({
  show,
  setter,
}: {
  show: boolean;
  setter: Function;
}) {
  const pathname = usePathname();

  // Define our base class
  const className =
    'bg-black w-[250px] transition-[margin-left] ease-in-out duration-500 fixed md:static top-0 bottom-0 left-0 z-40';
  // Append class based on state of sidebar visiblity
  const appendClass = show ? ' ml-0' : ' ml-[-250px] md:ml-0';

  // Clickable menu items
  const MenuItem = ({ name, route }: { name: String; route: any }) => {
    // Highlight menu item based on currently displayed route
    const colorClass =
      pathname === route ? 'text-white' : 'text-white/50 hover:text-white';

    return (
      <Link
        href={route}
        onClick={() => {
          setter((oldVal: boolean) => !oldVal);
        }}
        className={`flex gap-1 [&>*]:my-auto text-md pl-6 py-3 border-b-[1px] border-b-white/10 ${colorClass}`}
      >
        <div>{name}</div>
      </Link>
    );
  };

  const sidebarStyle = {
    width: '200px',
    transition: 'transform 0.3s ease',
    transform: show ? 'translateX(0)' : 'translateX(-100%)',
  };

  // Overlay to prevent clicks in background, also serves as our close button
  const ModalOverlay = () => (
    <div
      className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30`}
      onClick={() => {
        setter((oldVal: boolean) => !oldVal);
      }}
    />
  );

  return (
    <>
      <div className="shadow-md bg-primary fixed left-0 h-full">
        <div className={`${className}${appendClass}`}>
          <div className="p-2 flex">
            <Link href="/">{/*eslint-disable-next-line*/}</Link>
          </div>
          <div className="flex flex-col">
            <MenuItem name="Home" route="" />
            <MenuItem name="Manage Books" route="/admin/manage-books" />
            <MenuItem name="Manage Users" route="/admin/manage-users" />
            <MenuItem name="Manage Checkouts" route="/admin/manage-checkouts" />
          </div>
        </div>
        {show ? <ModalOverlay /> : <></>}
      </div>
    </>
  );
}
