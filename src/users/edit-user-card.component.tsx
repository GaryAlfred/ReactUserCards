import * as React from "react";
import User from "./user";
import "./edit-user-card.component.scss";

interface EditUserCardProps {
  user: User;
  closeHandler: (euser: User | null) => void;
}

interface EditUserCardState {
  user: User;
  euser: User;
  closeHandler: (euser: User | null) => void;
}

/* I didn't have a design for the editor so 
   I went with simple to save time. */
export class EditUserCard extends React.Component {
  state: EditUserCardState;

  constructor(props: EditUserCardProps) {
    super(props);
    this.state = {
      user: props.user,
      euser: JSON.parse(JSON.stringify(props.user)),
      closeHandler: props.closeHandler
    };
    this.updateAndClose = this.updateAndClose.bind(this);
  }

  /* There has to be a DRYer way of doing this?! */
  firstNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const euser = { ...this.state.euser };
    euser.name.first = e.target.value;
    this.setState({ euser: { ...euser } });
  };
  lastNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const euser = { ...this.state.euser };
    euser.name.last = e.target.value;
    this.setState({ euser: { ...euser } });
  };
  emailChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const euser = { ...this.state.euser };
    euser.email = e.target.value;
    this.setState({ euser: { ...euser } });
  };
  phoneChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const euser = { ...this.state.euser };
    euser.phone = e.target.value;
    this.setState({ euser: { ...euser } });
  };
  cityChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const euser = { ...this.state.euser };
    euser.location.city = e.target.value;
    this.setState({ euser: { ...euser } });
  };
  stateChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const euser = { ...this.state.euser };
    euser.location.state = e.target.value;
    this.setState({ euser: { ...euser } });
  };

  justClose = () => {
    this.state.closeHandler(null);
  };
  updateAndClose = () => {
    this.state.closeHandler(this.state.euser);
  };

  render() {
    return (
      <div className="edit-user-card">
        <div>
          <label htmlFor="eu-firstname">First Name</label>
          <input
            type="search"
            autoComplete="false"
            name="eu-firstname"
            value={this.state.euser.name.first}
            onChange={this.firstNameChanged}
          />
        </div>
        <div>
          <label htmlFor="eu-lastname">Last Name</label>
          <input
            type="search"
            autoComplete="false"
            name="eu-lastname"
            value={this.state.euser.name.last}
            onChange={this.lastNameChanged}
          />
        </div>
        <div>
          <label htmlFor="eu-email">Email</label>
          <input
            type="search"
            autoComplete="false"
            name="eu-email"
            value={this.state.euser.email}
            onChange={this.emailChanged}
          />
        </div>
        <div>
          <label htmlFor="eu-phone">Phone</label>
          <input
            type="search"
            autoComplete="false"
            name="eu-phone"
            value={this.state.euser.phone}
            onChange={this.phoneChanged}
          />
        </div>
        <div>
          <label htmlFor="eu-city">City</label>
          <input
            type="search"
            autoComplete="false"
            name="eu-city"
            value={this.state.euser.location.city}
            onChange={this.cityChanged}
          />
        </div>
        <div>
          <label htmlFor="eu-state">State</label>
          <input
            type="search"
            autoComplete="false"
            name="eu-state"
            value={this.state.euser.location.state}
            onChange={this.stateChanged}
          />
        </div>
        <div className="actions">
          <button type="button" onClick={this.justClose}>
            Cancel
          </button>
          <button
            type="button"
            className="primary"
            onClick={this.updateAndClose}
          >
            Ok
          </button>
        </div>
      </div>
    );
  }
}
