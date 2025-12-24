import { useCallback, useState } from "react";
import Input from "./Input";
import useFetch from "../../hooks/useFetch";
import { debounce } from "../../generic";

type List = {
  label: string;
  value: string;
};

type AutocompleteProps = {
  list: List[];
  onChange: (val: string) => void;
  includeDebounce?: boolean;
};

const url = "https://dummyjson.com/users";
type User = { id: number; firstName: string };

const Autocomplete = ({
  list,
  onChange,
  includeDebounce = false,
}: AutocompleteProps) => {
  const [value, setValue] = useState("");
  const [showList, setShowList] = useState(false);

  const manageDebounce = (val: string) => {
    if (includeDebounce) {
      debouncedSearch(val);
    } else {
      onChange(val);
    }
  };
  const handleClear = () => {
    setValue("");
    setShowList(true);
    manageDebounce("");
  };
  const debouncedSearch = useCallback(debounce(onChange, 500), []);

  const handleChange = (val: string) => {
    setValue(val);
    setShowList(true);
    manageDebounce(val);
  };

  const handleSuggestion = (val: string) => {
    return () => {
      setValue(val);
      setShowList(false);
      manageDebounce(val);
    };
  };

  const updatedList = list
    ?.filter((item: List) => {
      if (!value) return true;
      return item.label.toLowerCase().includes(value.toLowerCase());
    })
    ?.map((item: List) => {
      return (
        <li
          key={item.value}
          style={{
            listStyle: "none",
            cursor: "pointer",
            padding: 10,
            backgroundColor: item.label === value ? "lightcyan" : "lightcoral",
          }}
          onClick={handleSuggestion(item.label)}
        >
          {item.label}
        </li>
      );
    });

  return (
    <div style={{ position: "relative", width: 300 }}>
      <Input value={value} setValue={handleChange} clear={handleClear} />
      {!!value.length && showList && (
        <ul
          style={{
            position: "absolute",
            padding: 10,
            width: "100%",
            margin: 0,
            maxHeight: 200,
            overflowY: "auto",
          }}
        >
          {value && updatedList.length === 0 && "Not found"}
          {!!value.length && !!updatedList.length && updatedList}
        </ul>
      )}
    </div>
  );
};

export const AutocompleteDemo = () => {
  const { loading, error, data = [] } = useFetch({ url });
  const [value, setValue] = useState("");
  const { users = [] } = data || {};

  const list = users?.map((item: User) => {
    return {
      label: item.firstName,
      value: item.id,
    };
  });

  if (loading) return <div>...Loading</div>;
  if (error) return <div>{error?.message ?? "Error loading data"}</div>;

  return <Autocomplete list={list} onChange={(val) => setValue(val)} />;
};

export default Autocomplete;
