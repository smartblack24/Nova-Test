import React, { Component } from 'react';
import { MDBBtn, MDBTable, MDBTableBody, MDBTableHead  } from 'mdbreact';
import { BACKEND_SERVER_PORT } from '../constants';
import fetch from 'isomorphic-fetch';

const columns= [
    {
        label: 'id',
        field: 'id',
        sort: 'asc'
    },
    {
        label: 'firstName',
        field: 'firstName',
        sort: 'asc'
    },
    {
        label: 'lastName',
        field: 'lastName',
        sort: 'asc'
    },
    {
        label: 'score',
        field: 'score',
        sort: 'asc'
    },
    {
        label: 'dob',
        field: 'dob',
        sort: 'asc'
    },
    {
        label: 'ssn',
        field: 'ssn',
        sort: 'asc'
    },
    {
        label: 'createdAt',
        field: 'createdAt',
        sort: 'asc'
    },
    {
        label: 'archived',
        field: 'archived',
        sort: 'asc'
    },
    {
        label: 'Image',
        field: 'img',
        sort: 'asc'
    },
];

class ListReports extends Component {
    constructor(props) {
        super(props);
    }
    handleArchive = (data) => (e) => {
		fetch(`http://localhost:${BACKEND_SERVER_PORT}/api/requests/archive`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify({ id: data.id }),
            method: 'PATCH',
        })
        .then(res => res.json())
        .then(result => {
            this.props.loadReports();
        })
    }

    render () {
        const dataLists = [];
        this.props.listReports && this.props.listReports.map((data) => {
            dataLists.push({
                ...data,
                archived:(<MDBBtn color='blue' rounded size="sm" onClick={this.handleArchive(data)}>Archive</MDBBtn>),
                img: <img src={data.img.picture} />
            })
        })
        return(
            <MDBTable btn>
                <MDBTableHead columns={columns} />
                <MDBTableBody rows={dataLists} />
            </MDBTable>
        );
    }
};

export default ListReports;