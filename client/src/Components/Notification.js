import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loading from './Loading';
import Popup from './Popup';
const Notification = () => {
    const {alert} = useSelector(state => state)
    const dispatch = useDispatch();
    return (
      <div>
        {alert.loading && <Loading />}

        {alert.error && (
          <Popup
            msg={{ title: "Error", body: alert.error }}
            handleShow={() => dispatch({ type: "ALERT", payload: {} })}
            variant="alert-danger"
          />
        )}
        {alert.success && (
          <Popup
            msg={{ title: "Success", body: alert.success }}
            handleShow={() => dispatch({ type: "ALERT", payload: {} })}
            variant="alert-success"
          />
        )}
      </div>
    );
}

export default Notification;
