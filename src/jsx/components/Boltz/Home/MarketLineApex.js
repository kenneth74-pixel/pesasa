import React from "react";
import ReactApexChart from "react-apexcharts";

class MarketLineApex extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			series: [{
				name: 'Applications',
				data: this.props.yearSum
			},
				// {
				// 	name: 'series2',
				// 	data: [400, 300, 450, 350, 700, 200, 800, 800, 700, 750]
				// }
			],
			options: {
				chart: {
					height: 350,
					type: "line",
					toolbar: {
						show: false,
					},
				},
				colors: ["#2258BF", "#FF7213"],
				dataLabels: {
					enabled: false
				},
				stroke: {
					curve: 'smooth',
					width: 10,
				},
				legend: {
					show: false
				},
				grid: {
					borderColor: '#AFAFAF',
					strokeDashArray: 10,
				},
				yaxis: {
					labels: {
						style: {
							colors: '#787878',
							fontSize: '13px',
							fontFamily: 'Poppins',
							fontWeight: 400

						},
						formatter: function (value) {
							return value + " req";
						}
					},
				},
				xaxis: {
					categories: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
					labels: {
						style: {
							colors: '#787878',
							fontSize: '13px',
							fontFamily: 'Poppins',
							fontWeight: 400

						},
					},
					axisBorder: {
						show: false,
					},
					axisTicks: {
						show: false,
					},

				},
				tooltip: {
					x: {
						format: 'dd/MM/yy HH:mm'
					},
				},

			},
		};
	}

	render() {
		return (
			<div id="chart">
				<ReactApexChart
					options={this.state.options}
					series={this.state.series}
					type="line"
					height={350}
				/>
			</div>
		);
	}
}

export default MarketLineApex;