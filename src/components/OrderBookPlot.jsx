import { useState, useEffect } from 'react'
import Plot from 'react-plotly.js'

const OrderBookPlot = ({orderBookData}) => {

    if (!orderBookData || orderBookData.length < 2) {
        return <p>No data available.</p>;
      }

    const askData = orderBookData.filter((item) => item.orderType === 'ask');
    const bidData = orderBookData.filter((item) => item.orderType === 'bid');

    const lowestAsk = askData.map(order => order.price)[0]
    const highestBid =  bidData.map(order => order.price)[0]
    const bidAskSpread = lowestAsk - highestBid

    const plotData = [
      {
        type: 'scatter',
        mode: 'lines+markers',
        x: bidData.map(order => order.price),
        y: bidData.map(order => order.amount),
        fill: 'tozeroy',
        fillcolor: 'rgba(0, 255, 0, 0.15)',
        marker: {
          color: 'rgba(0, 255, 0, 0.4)',
          size: 10,
          width: 3
        },
        name: 'Bids',
      },
      {
        type: 'scatter',
        mode: 'lines+markers',
        x: askData.map(order => order.price),
        y: askData.map(order => order.amount),
        fill: 'tozeroy',
        fillcolor: 'rgba(255, 0, 255, 0.15)',
        marker: {
          color: 'rgba(255, 0, 255, 0.4)',
          size: 10,
          width: 3
        },
        name: 'Asks',
      },
    ];

    const annotation = {
      x: 0.1,
      y: 0.8,
      xref: 'paper',
      yref: 'paper',
      text: `Market Buy: ${lowestAsk.toFixed(5)} ETH<br>Market Sell: ${highestBid.toFixed(5)} ETH<br>Bid-Ask Spread: ${bidAskSpread.toFixed(5)} ETH`,
      showarrow: true,
      arrowhead: 4,
      ax: 0,
      ay: -40, 
    };
    
    const layout = {
      title: 'Order Book',
        xaxis: { title: 'Price (ETH)' },
        yaxis: { title: 'Quantity (NFTs)' },
        plot_bgcolor: '#242424',
        paper_bgcolor: '#242424',
        font: { color: 'white' }, 
        autosize: true, 
        annotations: [annotation,],
    };
    
    return (
      <Plot data={plotData} layout={layout} />
    );
}

export default OrderBookPlot