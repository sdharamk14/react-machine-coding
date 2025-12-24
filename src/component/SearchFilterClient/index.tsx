import { ChangeEvent, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { debounce } from "../../generic";
const url = "https://dummyjson.com/users";
type User = { id: number; firstName: string };
const SearchFilterClient = () => {
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");
  const { loading, error, data = [] } = useFetch({ url });
  const { users = [] } = data || {};

  if (loading) return <div>...Loading</div>;
  if (error) return <div>{error?.message ?? "Error loading data"}</div>;
  const debouncedSearch = debounce(setSearch, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <div>
      <input value={value} onChange={handleChange} />
      <ul>
        {Array.isArray(users)
          ? users
              ?.filter((user: User) => {
                if (search === "") return true;

                return user.firstName
                  .toLowerCase()
                  .includes(search.toLowerCase());
              })
              ?.map((user: User) => {
                return <li key={user.id}>{user.firstName}</li>;
              })
          : null}
      </ul>
    </div>
  );
};

export default SearchFilterClient;
