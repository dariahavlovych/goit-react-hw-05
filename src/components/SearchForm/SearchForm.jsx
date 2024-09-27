import { IoSearchOutline } from "react-icons/io5";

const SearchForm = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const query = e.target.elements.search.value;
    if (!query) {
      return alert("Please enter your search query");
    }
    onSubmit(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="search"
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
      />
      <button type="submit">
        <IoSearchOutline />
      </button>
    </form>
  );
};

export default SearchForm;
