import React, { useEffect, useState } from "react";
import HealthBridgeHomeTop from "../../components/homepage/HomeTop";
import { useRouter } from "next/router";
import { useGetPatientDetailsForHomepageByPatientId } from "../../graphql/patients/datasource";
import Details from "../../components/detailspage/Details";
import Activity from "../../components/activity/Activity";
import Footer from "../../components/footer/Footer";
import Chatai from "../../components/message/ChatAi";

function Index() {
  const router = useRouter();
  const [patientDetails, setPatientDetails] = useState(null);

  const { data } = useGetPatientDetailsForHomepageByPatientId(
    router?.query?.patientId
  );

  useEffect(() => {
    if (data) {
      setPatientDetails(data?.getPatientByPatientId);
    }
  }, [data]);

  return (
    <>
      <div className="container mx-auto px-5 mt-20 lg:w-[360px]">
        <HealthBridgeHomeTop patientDetails={patientDetails} />
        <Details patientDetails={patientDetails} />
        <Activity />
        <Chatai />
      </div>
      <div className="container mx-auto lg:w-[360px]">
        <Footer />
      </div>
    </>
  );
}

export default Index;
