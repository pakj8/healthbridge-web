import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_ADVICE, GET_FOLLOWUP_QUESTIONS } from "./Query";
import { GET_ADVISE } from "./Mutation";

export const useFollowUpQuestions = () => {
  const [fetchFollowUpQuestions, { data, loading, error }] = useLazyQuery(
    GET_FOLLOWUP_QUESTIONS
  );

  return {
    fetchFollowUpQuestions,
    data,
    loading,
    error,
    data,
  };
};

export const useGetAdvise = () => {
  const [advise, { data, loading, error, refetch }] = useMutation(GET_ADVISE);

  const getAdviseHandler = async (input) => {
    try {
      return await advise({
        variables: { input },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return [getAdviseHandler, { data, loading, error, refetch }];
};
