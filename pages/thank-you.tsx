import { NextPage } from "next";
import Button from "../components/atoms/button";
import Heading from "../components/atoms/heading";
import Layout from "../components/common/layout";

const ThankYou: NextPage = () => {
  return (
    <Layout name="Thank You">
      <div className="py-12">
        <Heading level={1} className="mb-2">
          Thank You!
        </Heading>
        <p className="mb-10 text-lg">
          We are really glad you chose our shop. Hope our yerba will be the best
          one you ever tried!
        </p>
        <Button to="/" variant="primary" size="lg">
          Go back home
        </Button>
      </div>
    </Layout>
  );
};

export default ThankYou;
