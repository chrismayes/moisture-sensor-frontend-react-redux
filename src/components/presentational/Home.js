import React from 'react';

export default class Home extends React.Component {
  componentWillMount() {
    const {apiCall} = this.props;
		apiCall(null, 'get', '/arduino/arm', 'actionWaterLevel',);
	}

	render() {
    const {storeData} = this.props;
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1, height: '100%', justifyContent: 'center'}}>
				<h2>Soil Moisture Level</h2>
				<div style={{
					width: '50px',
					height: '400px',
					border: '2px solid black',
					backgroundColor: '#FED',
					display: 'flex',
					marginBottom: '100px'
				}}>
					<div style={{
						width: '50px',
						height: (storeData.percent * 4) + 'px',
						border: 'none',
						backgroundColor: '#46F',
						alignSelf: 'flex-end',
						alignItems: 'center',
						justifyContent: 'center',
						textAlign: 'center',
						color: 'white'
					}}>{storeData.percent}%</div>
				</div>
      </div>
    );
  }
}
