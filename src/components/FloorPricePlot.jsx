import { useState, useEffect } from 'react'
import Plot from 'react-plotly.js'

const FloorPricePlot = ({floorPriceData}) => {

    if (!floorPriceData || floorPriceData.length < 2) {
        return <p>No data available.</p>;
      }

    const xData = floorPriceData.map((item) => item.timestamp);
    const yData = floorPriceData.map((item) => item.floorPrice);

    const plotData = [
        {
          type: 'scatter',
          mode: 'lines+markers',
          x: xData,
          y: yData,
          line: {
            shape: 'spline', // Set to 'spline' for a curved line
            color: 'rgba(255, 255, 255, 0.87);',
          },
    }];
    
    const layout = {
        title: 'Floor Price',
        xaxis: { title: 'Day' },
        yaxis: { title: 'Floor Price (ETH)' },
        plot_bgcolor: '#242424',
        paper_bgcolor: '#242424',
        font: { color: 'white' }, 
        autosize: true, 
      };

    return(
        <Plot data={plotData} layout={layout}/>
    )
}

export default FloorPricePlot