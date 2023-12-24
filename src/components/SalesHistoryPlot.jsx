import { useState, useEffect } from 'react'
import Plot from 'react-plotly.js'

const SalesHistoryPlot = ({salesHistoryData}) => {

    if (!salesHistoryData || salesHistoryData.length < 2) {
        return <p>No data available.</p>;
      }

    let xData = salesHistoryData.map((item) => item[0]);
    xData = xData.map((timestamp) => new Date(timestamp * 1000))
    const yData = salesHistoryData.map((item) => item[1]);

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
          mode: 'markers',
          x: xData,
          y: yData,
          marker: {
            color: 'rgba(255, 255, 255, 0.25);',
          },
    }];

    const annotation = {
        x: 0.85,
        y: 0.8,
        xref: 'paper',
        yref: 'paper',
        text: `Avg Price ${mean.toFixed(4)} ETH<br>Standard Deviation ${stdDev.toFixed(4)} ETH<br>7-Day Avg ${oneWeekMovingAverage.toFixed(4)} ETH<br>Last Sale Price ${yData[yData.length - 1].toFixed(4)} ETH`,
        showarrow: true,
        arrowhead: 4,
        ax: 0,
        ay: -40,
      };
    
    const layout = {
        title: 'Sales History',
        xaxis: { title: 'Day' },
        yaxis: { title: 'Sale Price (ETH)' },
        plot_bgcolor: '#242424',
        paper_bgcolor: '#242424',
        font: { color: 'white' }, 
        autosize: true, 
        annotations: [annotation],
      };

    return(
        <Plot className='plot' data={plotData} layout={layout}/>
    )
}

export default SalesHistoryPlot