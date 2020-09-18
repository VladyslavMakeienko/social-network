import React from "react";
import { connect, DefaultRootState } from "react-redux";
import {
  follow,
  unfollow,
  requestUsers,
  FilterType,
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { compose } from "redux";
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsers,
  getUsersFilter,
} from "../../redux/users-selectors";
import { UserType } from "../../types/types";
import { AppStateType } from "../../redux/redux-store";

type MapStatePropsType = {
  currentPage: number;
  pageSize: number;
  isFetching: boolean;
  totalUsersCount: number;
  users: Array<UserType>;
  followingInProgress: Array<number>;
  filter: FilterType;
};

type MapDispatchPropsType = {
  getUsers: (currentPage: number, pageSize: number, filter: FilterType) => void;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
};

type OwnPropsType = {
  pageTitle: string;
};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    const { currentPage, pageSize, filter } = this.props;
    this.props.getUsers(currentPage, pageSize, filter);
  }

  onPageChanged = (pageNumber: number) => {
    const { pageSize, filter } = this.props;
    this.props.getUsers(pageNumber, pageSize, filter);
  };

  onFilterChanged = (filter: FilterType) => {
    const { pageSize } = this.props;
    this.props.getUsers(1, pageSize, filter);
  };

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          users={this.props.users}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          followingInProgress={this.props.followingInProgress}
          onFilterChanged={this.onFilterChanged}
        />
      </>
    );
  }
}
let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
    filter: getUsersFilter(state),
  };
};
export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
    mapStateToProps,
    {
      follow,
      unfollow,
      getUsers: requestUsers,
    }
  )
)(UsersContainer);
