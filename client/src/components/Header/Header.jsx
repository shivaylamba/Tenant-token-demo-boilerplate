import React, { useEffect, useState } from "react";
import Logo from "../../assets/logo.svg";
import { useSearch } from "../../context/MeiliSearchContext";
import { useUser } from "../../context/UserContext";
import Modal from "../Modal/Modal";
import Select from "../Select/Select";

function Header() {
  const [showModal, setShowModal] = useState(false);

  const { search, searchText, setSearchText } = useSearch();

  const [user, setUser, usersList] = useUser();

  useEffect(() => {
    search({ query: "" });

    // eslint-disable-next-line
  }, []);

  function toggleModal() {
    setShowModal(!showModal);
  }

  return (
    <div className="flex flex-col sm:flex-row p-[20px] shadow-md">
      <div className="flex w-full sm:w-2/3 space-x-10">
        <div>
          <img src={Logo} alt={"logo"} />
        </div>
        <div className="w-2/3">
          <input
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            className="form-control
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
          "
            type={"text"}
            placeholder="Search..."
          />
        </div>
      </div>
      <div className="flex w-full sm:w-1/3 space-x-3 mt-4 sm:mt-0 sm:justify-end">
        <div className="w-1/3">
          <Select
            value={user}
            onChange={(e) => {
              setUser(JSON.parse(e.target.value));
            }}
            options={usersList.map((i) => ({
              value: JSON.stringify(i),
              label: i.name,
            }))}
          />
        </div>
        <div>
          <button
            type="button"
            className="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out p-2 rounded-sm"
            onClick={toggleModal}
          >
            Create A Tenant Token
          </button>
          {showModal && <Modal handleClose={toggleModal} />}
        </div>
      </div>
    </div>
  );
}

export default Header;
