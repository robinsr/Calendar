import $ from 'jquery';
import AppointmentActions from '../actions/AppointmentActions';

const request = (params) => {
  return new Promise((resolve, reject) => {
    $.ajax(Object.assign(params, {
      success: resolve,
      error: reject
    }));
  });
};

const AppointmentSource = {
  getAll: {
    remote(state) {
      return request({
        type: 'GET',
        url: '/appointments/all'
      });
    },
    success: AppointmentActions.receivedResults,
    error: AppointmentActions.fetchingResultsFailed
  },

  update: {
    remote(state, appt) {
      return request({
        type: 'PUT',
        url: `/appointments/${appt.id}`,
        data: JSON.stringify(appt),
        headers: {'Content-Type': 'application/json'},
      });
    },
    success: AppointmentActions.updateSuccess,
    error: AppointmentActions.updateError
  }
};

export default AppointmentSource;