import React, { Component, Fragment } from 'react';
import fetch from 'isomorphic-fetch';
import logo from './logo.svg';
import { BACKEND_SERVER_PORT } from './constants';
import { MDBBtn } from 'mdbreact';
import ListReports from './components/listReports';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			count: 20,
			cursor: '2010-01-01', //Data was created many years ago so I use past date as cursor
			listReports: null,
		}
	}

	componentDidMount() {
		// Example get reports request
		this.refresh();
	}

	loadReports = (count, cursor) => {
		fetch(`http://localhost:${BACKEND_SERVER_PORT}/api/requests?count=${count}&cursor=${cursor}`)
		.then(res => res.json())
		.then(result => {
			this.setState({
				listReports: result.reports,
				count: count,
			})
		});
	}

	refresh = () => {
		this.loadReports(this.state.count, this.state.cursor);
	}
	handleLoad = () => {
		this.loadReports(this.state.count + 20, this.state.cursor);
	}

	render() {
		const { listReports } = this.state;
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to Nova's code challenge!</h1>
				</header>
				<Fragment>
					<MDBBtn color="light-green" onClick={this.handleLoad}>Load More</MDBBtn>
				</Fragment>
				<ListReports listReports={listReports} loadReports={this.refresh}/>
			</div>			
		);
	}
}

export default App;
