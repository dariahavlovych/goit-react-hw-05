import { Field, Form, Formik } from "formik";
import { IoSearchOutline } from "react-icons/io5";

const SearchForm = ({ onSubmit }) => {
  const initialValues = {
    query: "",
  };

  const handleSubmit = (values) => {
    onSubmit(values.query);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <Field name="query" placeholder="Search images and photos" />
        <button type="submit">
          <IoSearchOutline />
        </button>
      </Form>
    </Formik>
  );
};

export default SearchForm;
