import * as React from "react";
import User from "./user";
import { UserCard } from "./user-card.component";
import "./user-card-list.component.scss";

interface UserCardListState {
  all: Array<User>;
  filter: string;
  filtered: Array<User>;
  isLoading: boolean;
  error: string;
  sort: SortType;
}

type SortType = "lastname" | "email" | "phone" | "";

/*    */
export default class UserCardList extends React.Component {
  state: UserCardListState = {
    isLoading: true,
    all: [],
    filter: "",
    filtered: [],
    error: "",
    sort: ""
  };

  /* From my Angular background I expected DI for providers.
     It seems at least one way DI is done in React by creating 
     a React component for the service context and then 
     transcluding its consumers?! 

     That pattern doesn't seem to be maintainable at enterprise 
     scale where you would have many global singleton providers.     
     I will definitely have to read up more on DI patterns for
     React. 
     
     For now, I decided I should not spend too much time 
     learning and just get it working.  */
  componentDidMount() {
    /* Pared down the data from the API. */
    fetch(
      "https://randomuser.me/api/?results=25&inc=name,picture,phone,location,email,id,nat&noinfo&nat=us"
    )
      .then(response => response.json())
      .then(
        (data: any) => {
          this.setState({
            isLoading: false,
            all: data["results"],
            filtered: data["results"]
          });
        },
        error => {
          /* I didn't actually implement an error notification. It was
             late and I ran out of coffee. I don't do error notifications
             without coffee. Besides, this code will never error, right?! */
          this.setState({
            isLoading: false,
            error: error
          });
        }
      );
  }

  private userFilterFn = (user: User, idx: number) => {
    /* The request didn't state exactly how the filter should
       work. I went with my best guess. */
    return (
      user.name.first.indexOf(this.state.filter) >= 0 ||
      user.name.last.indexOf(this.state.filter) >= 0 ||
      user.email.indexOf(this.state.filter) >= 0 ||
      user.phone.indexOf(this.state.filter) >= 0
    );
  };

  filterChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    /* This should probably be debounced, but honestly I don't 
       know enough about React's state management best practices
       to take a stab. It's a low priority IMO so I'm skipping
       the research. */
    this.setState({ filter: event.target.value }, this.filterUsers);
  };

  filterUsers = () => {
    if (this.state.all) {
      if (this.state.filter) {
        this.setState(
          { filtered: this.state.all.filter(this.userFilterFn) },
          this.sortUsers
        );
      } else {
        this.setState({ filtered: this.state.all }, this.sortUsers);
      }
    }
  };

  sortChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ sort: event.target.value }, this.sortUsers);
  };

  sortUsers = () => {
    if (this.state.sort) {
      console.log("SortUsers called: " + this.state.sort);
      const sorted = this.state.filtered.sort((a: User, b: User) => {
        switch (this.state.sort) {
          case "lastname":
            return a.name.last > b.name.last ? 1 : -1;
          case "phone":
            return a.phone > b.phone ? 1 : -1;
          case "email":
            return a.email > b.email ? 1 : -1;
          default:
            return 0;
        }
      });
      this.setState({ filtered: sorted });
    }
  };

  updateUser = (updatedUser: User) => {
    const users = this.state.all.map<User>(u => {
      if (u.id.value === updatedUser.id.value) {
        return updatedUser;
      }
      return u;
    });
    console.log(users);
    this.setState({ all: users }, this.filterUsers);
  };

  render() {
    let output;
    if (this.state.isLoading) {
      output = (
        <div className="loading">
          <svg
            width="120"
            height="30"
            viewBox="0 0 120 30"
            xmlns="http://www.w3.org/2000/svg"
            fill="#fff"
          >
            <circle cx="15" cy="15" r="15">
              <animate
                attributeName="r"
                from="15"
                to="15"
                begin="0s"
                dur="0.8s"
                values="15;9;15"
                calcMode="linear"
                repeatCount="indefinite"
              />
              <animate
                attributeName="fill-opacity"
                from="1"
                to="1"
                begin="0s"
                dur="0.8s"
                values="1;.5;1"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="60" cy="15" r="9" fill-opacity="0.3">
              <animate
                attributeName="r"
                from="9"
                to="9"
                begin="0s"
                dur="0.8s"
                values="9;15;9"
                calcMode="linear"
                repeatCount="indefinite"
              />
              <animate
                attributeName="fill-opacity"
                from="0.5"
                to="0.5"
                begin="0s"
                dur="0.8s"
                values=".5;1;.5"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="105" cy="15" r="15">
              <animate
                attributeName="r"
                from="15"
                to="15"
                begin="0s"
                dur="0.8s"
                values="15;9;15"
                calcMode="linear"
                repeatCount="indefinite"
              />
              <animate
                attributeName="fill-opacity"
                from="1"
                to="1"
                begin="0s"
                dur="0.8s"
                values="1;.5;1"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>
      );
    } else if (this.state.filtered) {
      const cards = this.state.filtered.map((user, idx) => (
        <UserCard
          user={user}
          updateList={this.updateUser}
          key={user.id.value || "k" + idx}
        />
      ));
      output = (
        <div className="user-card-list">
          <header>
            <h1>Users</h1>
            <div className="filter-bar">
              <div>
                <label htmlFor="users-filter">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20
                    "
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M1 0l9 15.094v5.906l4 3v-8.906l9-15.094h-22zm18.479 2l-2.981 5h-8.996l-2.981-5h14.958z"
                    />
                  </svg>
                </label>
                <input
                  type="search"
                  autoComplete="false"
                  name="users-filter"
                  value={this.state.filter}
                  onChange={this.filterChanged}
                />
              </div>
              <div>
                <label htmlFor="users-sort">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M6 22l6-8h-4v-12h-4v12h-4l6 8zm11.694-19.997h2.525l3.781 10.997h-2.421l-.705-2.261h-3.935l-.723 2.261h-2.336l3.814-10.997zm-.147 6.841h2.736l-1.35-4.326-1.386 4.326zm-.951 11.922l3.578-4.526h-3.487v-1.24h5.304v1.173l-3.624 4.593h3.633v1.234h-5.404v-1.234z"
                    />
                  </svg>
                </label>
                <select
                  name="users-sort"
                  value={this.state.sort}
                  onChange={this.sortChanged}
                >
                  <option value="" />
                  <option value="lastname">Last Name</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                </select>
              </div>
            </div>
          </header>
          <main>{cards}</main>
        </div>
      );
    }
    return output;
  }
}
