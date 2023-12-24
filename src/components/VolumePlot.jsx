import { useState, useEffect } from 'react'
import Plot from 'react-plotly.js'

const VolumePlot = ({volumeData}) => {

    if (!volumeData || volumeData.length < 2) {
        return <p>No data available.</p>;
      }

    const xData = volumeData.map((item) => item.day);
    const yData = volumeData.map((item) => item.sum);

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
        title: 'Daily Volume',
        xaxis: { title: 'Day' },
        yaxis: { title: 'Daily Volume (ETH)' },
        plot_bgcolor: '#242424',
        paper_bgcolor: '#242424',
        font: { color: 'white' }, 
        autosize: true, 
      };

    return(
        <Plot data={plotData} layout={layout}/>
    )
}

export default VolumePlot