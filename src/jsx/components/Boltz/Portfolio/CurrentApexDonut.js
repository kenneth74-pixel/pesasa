import React from "react";
import ReactApexChart from "react-apexcharts";

class CurrentApexDonut extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			series: [this.props.theData.approvedNumber, this.props.theData.rejectedNumber, this.props.theData.pendingNumber],
			options: {
				chart: {
					height: 250,
					type: "donut",
					toolbar: {
						show: false,
					},
				},
				dataLabels: {
					enabled: false
				},
				stroke: {
					width: 0,
				},
				//colors:['#374C98', '#FFAB2D', '#FF782C', '#00ADA3'],
				colors: ['#096', '#F00', '#FFAB2D'],
				legend: {
					position: 'bottom',
					show: false
				},
				responsive: [{
					breakpoint: 768,
					options: {
						chart: {
							height: 200
						},
					}
				}]
			},
		};
	}

	render() {
		return (
			<div id="chart">
				<ReactApexChart
					options={this.state.options}
					series={[this.props.theData.approvedNumber, this.props.theData.rejectedNumber, this.props.theData.pendingNumber]}
					type="donut"
					height={250}
				/>
			</div>
		);
	}
}

export default CurrentApexDonut;