import React, { useEffect } from "react";

const SearchContext = React.createContext({
  searchTerm: "",
});

export const SearchContextProvider = (props) => {
  // const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <SearchContext.Provider
      value={{
        searchTerm: "",
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
