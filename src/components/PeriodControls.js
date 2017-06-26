import React from 'react';
import { NavLink } from 'react-router-dom';

export default function PeriodControls() {
  return (
    <div className="btn-group btn-group-justified">
      <NavLink exact to="/" className="btn btn-default btn-lg">
        Current
      </NavLink>
      <NavLink to="/5-day" className="btn btn-default btn-lg">
        5 day
      </NavLink>
    </div>
  );
}
