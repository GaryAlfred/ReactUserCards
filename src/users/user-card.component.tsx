import * as React from "react";
import User from "./user";
import "./user-card.component.scss";
import { EditUserCard } from "./edit-user-card.component";

interface UserCardProps {
  user: User;
  updateList: (user: User) => void;
}

interface UserCardState {
  user: User;
  showEditor: boolean;
  updateList: (user: User) => void;
}

export class UserCard extends React.Component {
  state: UserCardState;

  constructor(props: UserCardProps) {
    super(props);
    this.state = {
      user: props.user,
      showEditor: false,
      updateList: props.updateList
    };
    this.editorClicked = this.editorClicked.bind(this);
  }

  /* I considered doing edit-in-place fields instead
    of a separate editor. After exploring the path of opening
    a new editor component, I regret not keeping it
    simple. */
  editorClicked = () => {
    console.log("EditorClicked");
    this.setState({ showEditor: true });
  };

  updateUser = (euser: User) => {
    console.log("UpdateUser called");
    console.log(euser);
    if (euser) {
      this.setState(
        {
          showEditor: false,
          user: euser
        },
        () => this.state.updateList(euser)
      );
    } else {
      this.setState({ showEditor: false });
    }
  };

  /* Random thought regarding the icon - 
     SVG components are awesome. For my current 
     employer I built an SVG icon component that takes advantage 
     the <use> element. I then built an Icon library of <symbols>
     so that no icon ever has to load more than once. In React
     you would call such a component like <Icon type="edit-circle" />
     
     Speaking of icons, I couldn't find a clean version of the 
     icon in the design so I grabbed a free SVG icon because I 
     wanted to add a little scale transformation on hover and 
     it looked bad using a raster cut from an image in an email.
     
     I normally would not deviate from design without approval. */
  render() {
    const editorProps = {
      user: this.state.user,
      closeHandler: this.updateUser
    };
    return (
      <div className="user-card">
        <div className="user-card__header">
          <div className="icon-button" onClick={this.editorClicked}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3.994 12.964l3.106 3.105-4.112.931 1.006-4.036zm9.994-3.764l-5.84 5.921-3.202-3.202 5.841-5.919 3.201 3.2z"
              />
            </svg>
          </div>
          <div className="title">
            {this.state.user.name.first} {this.state.user.name.last}
          </div>
          <div className="avatar">
            <img src={this.state.user.picture.large} alt="User avatar" />
          </div>
        </div>
        <div className="user-card__main">
          <div>
            <div className="centered">{this.state.user.email}</div>
          </div>
          <div>
            <div className="centered">{this.state.user.phone}</div>
          </div>
          <div>
            <div className="centered">
              {this.state.user.location.city}, {this.state.user.location.state}
            </div>
          </div>
        </div>
        {this.state.showEditor ? (
          <div className="user-editor">
            <EditUserCard {...editorProps} />
          </div>
        ) : null}
      </div>
    );
  }
}
