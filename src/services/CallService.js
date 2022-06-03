import baseApi from "./api";
const api = baseApi();

export const getCallDetails = async (offSet, limit) => {
  //GET /calls returns a list of paginated calls. You can fetch the next page of calls by changing the values of offset and limit arguments.
  const result = await api.get(`https://frontend-test-api.aircall.io/calls`, {
    params: { offset: offSet, limit: limit },
  });
  return result.data;
};

export const updateCallDetails = async (id) => {
  //PUT /calls/:id/archive as the name implies it either archive or unarchive a given call. If the call doesn't exist, it'll throw an error
  const result = await api.put(
    `https://frontend-test-api.aircall.io/calls/${id}/archive`
  );
  return result.data;
};
