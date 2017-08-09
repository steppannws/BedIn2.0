export function requestCreate() {
  return {
    type: 'REQUEST_CREATE',
  };
}

export function receiveCreatedPatient(input) {
  return {
    type: 'RECEIVE_CREATED_PATIENT',
    input
  };
}

export function failedToCreate(err) {
  return {
    type: 'FAILED_TO_CREATE',
    err
  }
}

export function failedRequest(err) {
  return {
    type: 'FAILED_REQUEST',
    err
  };
}

export function requestList() {
  return {
    type: 'REQUEST_LIST',
  };
}

export function receivePlans(plans) {
  return {
    type: 'RECEIVE_PLANS',
    plans
  };
}

export function resetCreateSuccess() {
  return {
    type: 'RESET_CREATE_SUCCESS',
  };
}

export function fetchPlanList() {
  return (dispatch) => {
    dispatch(requestList());

    return fetch('./healthcare/plans', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      console.log('DATA PLAN LIST', data)
      .then(data => dispatch(receivePlans(data)))
      .catch(err => dispatch(failedRequest(err)))
  };
};


export function createPatientRequest(inputData) {
  return (dispatch) => {
    dispatch(requestCreate());
    return fetch('./bedin/healthcares', {
      method: 'POST',
      credentials: 'include',
      headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
      body: JSON.stringify(inputData)
    })
      .then(response => response.json())
      .then(data => {
        //console.log('DATA', data)
        if(data) {
          dispatch(receiveCreatedPatient(data))
        } else {
          dispatch(failedToCreate(data.err))
        }
      })
      .catch(err => dispatch(failedRequest(err)))
  };
};
