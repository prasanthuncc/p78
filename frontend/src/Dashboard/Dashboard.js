import React    from "react";
import template from "./Dashboard.jsx";

class Dashboard extends React.Component {
  render() {
    return template.call(this);
  }
}

export default Dashboard;
