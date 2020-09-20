import React from "react";
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";
import TicketDetail from "./TicketDetail";
import EditTicketForm from './EditTicketForm';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withFirestore } from 'react-redux-firebase';

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTicket: null,
      editing: false
    };
  }

  handleEditClick = () => {
    this.setState({editing: true});
  }

  handleChangingSelectedTicket = (id) => {
    this.props.firestore.get({collection: 'tickets', doc: id}).then((ticket) => {
      const firestoreTicket = {
        names: ticket.get('names'),
        location: ticket.get('location'),
        issue: ticket.get('issue'),
        id: ticket.id
      }
      this.setState({selectedTicket: firestoreTicket});
    });
  }

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        selectedTicket: null,
        editing: false
        });
    } else {
      const { dispatch } = this.props;
      const action = {
        type: 'TOGGLE_FORM'
      }
      dispatch(action);
    }
  }

  handleAddingNewTicketToList = () => {
    const { dispatch } = this.props;
    const action2 = {
      type: 'TOGGLE_FORM'
    }
    dispatch(action2);
  }

  handleDeletingTicket = (id) => {
    const { dispatch } = this.props;
    const action = {
      type: 'DELETE_TICKET',
      id: id
    }
    dispatch(action);
    this.setState({selectedTicket: null});
  }

  handleEditingTicketInList = () => {
    this.setState({
      editing: false,
      selectedTicket: null
    });
  }

  render(){
    let currentlyVisibleState = null;
    let buttonText = null;
    if (this.state.editing ) {      
      currentlyVisibleState = <EditTicketForm
      ticket = {this.state.selectedTicket}
      onEditTicket = {this.handleEditingTicketInList} />
      buttonText = "Return to Ticket List";
    } else if (this.state.selectedTicket != null) {
        currentlyVisibleState = <TicketDetail 
          ticket = {this.state.selectedTicket} 
          onClickingDelete = {this.handleDeletingTicket} 
          onClickingEdit = {this.handleEditClick} />
        buttonText = "Return to Ticket List";
    } else if (this.props.formVisibleOnPage) {
        currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />
        buttonText = "Return to Ticket List";
    } else {
        currentlyVisibleState = 
          <TicketList 
            ticketList={this.props.masterTicketList} 
            onTicketSelection={this.handleChangingSelectedTicket} />
        buttonText = "Add Ticket";
    }
    return (
      <div style={{ 
        textAlign: 'center',
        padding: '20px',
        }}>
      <React.Fragment>
          {currentlyVisibleState}
          <Button variant="primary" onClick={this.handleClick}>{buttonText}</Button>
        </React.Fragment>
      </div>
    );
  }
}

TicketControl.propTypes = {
  masterTicketList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    formVisibleOnPage: state.formVisibleOnPage
  }
}

TicketControl = connect(mapStateToProps)(TicketControl);

export default withFirestore(TicketControl);