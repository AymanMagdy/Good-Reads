import React, { Component, useM } from "react";
import { connect } from "react-redux";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Button } from "reactstrap";

import { updateAdminProps } from "../../../actions/adminAction";

class CategoriesTable extends Component {
  editCategoryModal = (category) => {
    this.props.updateAdminProps([
      { prop: "currentCategory", value: category },
      {
        prop: "isCategoryModal",
        value: !this.props.isModal,
      },
    ]);
  };

  renderActions = (info) => {
    return (
      <div>
        <Button
          onClick={this.editCategoryModal.bind(this, info.original)}
          color="primary"
          style={{ marginRight: 10, marginLeft: 10 }}
        >
          <i className="fa fa-edit" />
        </Button>
        <Button
          color="danger"
          onClick={() => {
            if (window.confirm("Are you sure?")) {
            }
          }}
        >
          <i className="fa fa-trash" />
        </Button>
      </div>
    );
  };
  columns = [
    { Header: "Id", accessor: "_id" },
    { Header: "Name", accessor: "name" },
    {
      Header: "Actions",
      Cell: this.renderActions.bind(this),
      sortable: false,
    },
  ];

  render() {
    const { categories } = this.props;

    return (
      <ReactTable
        pageSize={10}
        columns={this.columns}
        data={categories}
        getTdProps={() => {
          return {
            style: {
              display: "flex",
              justifyContent: "center",
            },
          };
        }}
      />
    );
  }
}
const mapStateToProps = (state) => {
  const { categories, isCategoryModal } = state.admin;
  return { categories, isModal: isCategoryModal };
};

export default connect(mapStateToProps, {
  updateAdminProps,
})(CategoriesTable);