export default dispatch => {
    dispatch({ type: "LIKE", payload: "like o"})
    // return dispatch => {
    //     dispatch({ type: "LIKE", payload: "like o"})
    // //   post('/api/get-users-to-explore')
    // //     .then(p => dispatch({ type: 'GET_USERS_TO_EXPLORE', payload: p.data }))
    // //     .catch(e => console.log(e))
    // }
}
  