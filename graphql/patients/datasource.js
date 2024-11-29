import { useQuery } from "@apollo/client";
import { GET_PATIENTDETAILS_BY_PATIENTID } from "./Query";

export const useGetPatientDetailsByPatientId = (patientId) => {
  const { data, loading, error, refetch } = useQuery(
    GET_PATIENTDETAILS_BY_PATIENTID,
    {
      variables: { patientId },
      skip: true,
    }
  );

  return { data, loading, error, refetch };
};

export const useGetPatientDetailsForHomepageByPatientId = (patientId) => {
  const { data, loading, error, refetch } = useQuery(
    GET_PATIENTDETAILS_BY_PATIENTID,
    {
      variables: { patientId },
      skip: !patientId,
    }
  );

  return { data, loading, error, refetch };
};
