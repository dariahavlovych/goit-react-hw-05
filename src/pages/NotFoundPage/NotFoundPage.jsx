import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <h2>Sorry, this page doesn`t exist</h2>
      <Link to="/">Go Home</Link>
    </div>
  );
};

export default NotFoundPage;
