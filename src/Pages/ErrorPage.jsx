import { Link } from "react-router-dom";
import errorImage from "../Images/errorImage.png";
import { Helmet } from "react-helmet-async";
const ErrorPage = () => {
  return (
    <section className="flex items-center h-full dark:bg-gray-50 dark:text-gray-800">
      <Helmet>
        <title>Global News | ErrorPage</title>
      </Helmet>
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-2">
        <div className="max-w-xl text-center">
          <img
            src={errorImage}
            className="h-[400px] w-full rounded-lg"
            alt=""
          />
          <p className="text-2xl font-semibold md:text-3xl">
            Sorry, we couldn't find this page.
          </p>
          <p className="mt-4 mb-8 dark:text-gray-600">
            But dont worry, you can find plenty of other things on our homepage.
          </p>
          <Link
            rel="noopener noreferrer"
            to="/"
            className="px-8 py-3 bg-cyan-600 text-white font-semibold rounded dark:bg-violet-600 dark:text-gray-50"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
