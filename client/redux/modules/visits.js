
const day = 24 * 60 * 60 * 1000; // 24 hours
const yesterday = new Date( Date.now() + 14 * 24 * 60 * 60 );
const GET_LAST_VISITOR_VISIT = 'redux-example/date/GET_LAST_VISITOR_VISIT';

const initialState = {};

export default function reducer(state = initialState, action = {}) {

  switch (action.type) {

    case GET_LAST_VISITOR_VISIT: {
      const { count } = state;
      return {
        count: count + 1
      };
    }

    default:
      return state;
  }

}

export const addSpend = data => ({
  types: [ADD, ADD_SUCCESS, ADD_FAIL],
  promise: async client => {
    try {
      const result = await client.post('/spend/add', data);
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }
});

export const loadList = data => ({
  types: [LOAD_LIST, LOAD_LIST_SUCCESS, LOAD_LIST_FAIL],
  promise: async client => {
    try {
      const result = await client.get('/spend/loadList', { params: data });
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }
});
