import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";

function TicketDetail(props){
  const { ticket, onClickingDelete } = props;

  return (
    <React.Fragment>
      <h1>Ticket Detail</h1>
      <h3>{ticket.location} - {ticket.names}</h3>
      <p><em>{ticket.issue}</em></p>
      <Button style={{margin: 10}} variant="success" onClick={ props.onClickingEdit }>Update Ticket</Button>
      <Button variant="danger" onClick={() => onClickingDelete(ticket.id) }>Close Ticket</Button>
      <hr/>
    </React.Fragment>
  );
}

TicketDetail.propTypes = {
  ticket: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func
};

export default TicketDetail;