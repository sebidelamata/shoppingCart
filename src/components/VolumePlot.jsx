import { useState, useEffect } from 'react'
import Plot from 'react-plotly.js'

const VolumePlot = ({volumeData}) => {

    if (!volumeData || volumeData.length < 2) {
        return <p>No data available.</p>;
      }

    const xData = volumeData.map((item) => item.day);
    const yData = volumeData.map((item) => item.sum);

    const mean = yData.reduce((acc, val) => acc + val, 0) / yData.length;
    const stdDev = Math.sqrt(yData.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / yData.length);

    function calculateMovingAverage(values, windowSize) {
        return values.map((value, index) => {
          if (index < windowSize - 1) {
            // Not enough data points for the window, calculate the average of available values
            const availableValues = values.slice(0, index + 1);
            const sum = availableValues.reduce((acc, curr) => acc + curr, 0);
            return sum / availableValues.length;
          }
      
          // Calculate the sum of values in the window
          const sum = values.slice(index - windowSize + 1, index + 1).reduce((acc, curr) => acc + curr, 0);
      
          // Calculate the backward-looking moving average
          const movingAverage = sum / windowSize;
      
          return movingAverage;
        });
      }

    let oneWeekMovingAverage = calculateMovingAverage(yData, 7);
    oneWeekMovingAverage = oneWeekMovingAverage[oneWeekMovingAverage.length - 1]

    const plotData = [
        {
          type: 'scatter',
          mode: 'lines+markers',
          x: xData,
          y: yData,
          line: {
            shape: 'spline',
            color: 'rgba(255, 255, 255, 0.5);',
            width: '5'
          },
    }];

    const annotation = {
      x: 0.85,
      y: 0.8,
      xref: 'paper',
      yref: 'paper',
      text: `Avg Daily Volume ${mean.toFixed(4) || 0} ETH<br>Standard Deviation ${stdDev.toFixed(4) || 0} ETH<br>7-Day Avg ${oneWeekMovingAverage.toFixed(4) || 0} ETH<br>Last Daily Volume ${(yData[yData.length - 1] || 0).toFixed(4) || 0} ETH`,
      showarrow: true,
      arrowhead: 4,
      ax: 0,
      ay: -40,
    };
    
    const layout = {
        title: 'Daily Volume',
        xaxis: { title: 'Day' },
        yaxis: { title: 'Daily Volume (ETH)' },
        responsive: true,
        plot_bgcolor: '#242424',
        paper_bgcolor: '#242424',
        font: { color: 'white' }, 
        autosize: true, 
        annotations: [annotation,],
      };

    return(
        <Plot className='plot' data={plotData} layout={layout}/>
    )
}

export default VolumePlot