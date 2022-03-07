import React, { useState } from "react";
import { SignJWT } from "jose";
import { MeiliSearch } from "meilisearch";
import "./modal.css";
import { useUser } from "../../context/UserContext";

const client = new MeiliSearch({
  host: process.env.REACT_APP_MEILI_HOST,
  apiKey: process.env.REACT_APP_MEILI_API_KEY,
});

function Modal({ handleClose }) {
  const [filterValue, setFilterValue] = useState("");
  const apiKeyRef = React.useRef();
  const addUser = useUser()[3];

  const handleTokenCreate = async () => {
    if (!filterValue) {
      return alert("Please input a name");
    }

    const { results } = await client.getKeys();
    const apiKeyList = results.filter((res) => res.description === "SEARCH");

    if (apiKeyList && apiKeyList.length > 0) {
      apiKeyRef.current = apiKeyList[0].key;
    } else {
      const newKey = await client.createKey({
        description: "SEARCH",
        actions: ["search"],
        indexes: [process.env.REACT_APP_MEILI_INDEX || "tenant_token"],
        expiresAt: "2023-01-01T00:00:00Z",
      });
      apiKeyRef.current = newKey.key;
    }

    const payload = {
      apiKeyPrefix: apiKeyRef.current.slice(0, 8),
      searchRules: {
        tenant_token: {
          filter: `user = ${filterValue}`,
        },
      },
    };

    const tokenJoseJwt = new SignJWT(payload);
    tokenJoseJwt.setProtectedHeader({
      alg: "HS256",
      typ: "JWT",
    });

    const expirationDate = new Date(
      new Date().setFullYear(new Date().getFullYear() + 1)
    ).getTime();
    tokenJoseJwt.setExpirationTime(expirationDate);

    const enc = new TextEncoder();
    const tenantToken = await tokenJoseJwt.sign(enc.encode(apiKeyRef.current));
    console.log(tenantToken);

    addUser({ key: tenantToken, name: filterValue });
    handleClose();
  };

  return (
    <>
      <div
        onClick={handleClose}
        className="fixed top-0 left-0 right-0 bottom-0 z-10 bg-black opacity-30"
      />
      <div className="fixed top-0 right-0 bottom-0 z-20 bg-white px-8 py-5 max-w-sm shadow-md right-modal">
        <div className="flex items-center pb-5">
          <h2 className="text-xl font-bold flex-1">Creating a Tenant token</h2>
          <button className="text-xl" type="button" onClick={handleClose}>
            &times;
          </button>
        </div>
        <p className="text-justify">
          Tenant Token are simply JWT, generated and used to search documents
          with specific searchRules.
          <br />
          <br />
          Try adding “user = Kevin” to generate a dedicated token for kevin
        </p>
        <div className="mt-8 border-2 border-slate-300 border-l-0	border-r-0 py-8">
          <div>
            <code>
              <div>{"{"}</div>
              <div className="ml-4">{"“searchRules”: {"}</div>
              <div className="ml-8">
                “filter”: “user =
                <input
                  type="text"
                  className="ml-1 w-24 modal-filter-input"
                  value={filterValue}
                  placeholder="Enter name"
                  onChange={(e) => setFilterValue(e.target.value)}
                />
                ”
              </div>
              <div className="ml-4">{"}"}</div>
              <div>{"}"}</div>
            </code>
          </div>
        </div>
        <div className="text-center my-5">
          <button
            type="button"
            className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 mr-2 mb-2"
            onClick={handleTokenCreate}
          >
            Create token
          </button>
        </div>
      </div>
    </>
  );
}

export default Modal;
