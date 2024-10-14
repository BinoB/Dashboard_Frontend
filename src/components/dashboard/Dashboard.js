import React from 'react'
import OrderSummary from '../orderPage/OrderSummary'
import OrderChart from '../orderPage/OrderChart'

const Dashboard = () => {
  return (
	<div >
		<OrderSummary/>
		<OrderChart/>
	</div>
  )
}

export default Dashboard