const bullBearFontColor = (pctChange) => {
    if(pctChange > 0){
        return 'rgb(0,255,0)'
    } else if(pctChange < 0){
        return 'rgb(255,0,255)'
    } else { return 'white'}
}

export default bullBearFontColor