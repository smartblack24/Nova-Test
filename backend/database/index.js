const data = require('./data');
const moment = require('moment');

const db = {
	data: data.reports || [],
	get({ count = 20, cursor = new Date().toISOString() }) {
		const now = cursor && cursor.length ? cursor : new Date().toISOString();
		if (!moment(now, moment.ISO_8601).isValid()) {
			throw new Error('Cursor must be valid ISO 8601 date');
		}
		const limit = count && count.length ? count : 20;
		if (isNaN(limit)) {
			throw new Error('Count must be a valid number');
		}
		const reports = this.data
			.filter(report => !report.archived) // Filter out archived reports
			.filter(report => new Date(report.createdAt) >= new Date(cursor)) // Filter out reports created before cursor
			.slice(0, count); // Slice to requested count

		return {
			count: reports.length,
			cursor,
			reports,
		};
	},
	archive(id) {
		if (!this.data.find(report => report.id === id)) {
			throw new Error('Report not found!');
		};

		// Find report to archive, set it to archived=true
		this.data = this.data.map((report) => {
			return (report.id === id) ? { ...report, archived: true } : report;
		});

		return this.data.find(report => report.id === id);
	},
};

module.exports = { db };
