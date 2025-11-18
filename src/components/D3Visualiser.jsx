import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import { getD3Data, subscribe, unsubscribe } from "../console-monkey-patch";

function LogToNum(input) {

    if(!input) { return 0};
    var stringArray = input.split(/(\s+)/);

    for (const item of stringArray) {
        if (item.startsWith('gain:')) {
            let val = item.substring(5)
            return Number(val)
        }
    }
    return 0;
}

export function Graph({ }) {
    const [rngArray, setRngArray] = useState([]);
    const maxValue = 1;

    useEffect(() => {
        const handleD3Update = (e) => {
            const newData = e.detail.map(LogToNum);
            setRngArray(newData);
        };

        subscribe("d3Data", handleD3Update);

        setRngArray(getD3Data().map(LogToNum));

        return () => unsubscribe("d3Data", handleD3Update);
    }, []);

    useEffect(() => {
        const svg = d3.select('svg');
        svg.selectAll("*").remove();

        let w = svg.node().getBoundingClientRect().width;
        w = w - 40
        let h = svg.node().getBoundingClientRect().height;
         h = h - 25
        const barWidth = w / rngArray.length

        let yScale = d3.scaleLinear()
            .domain([0, maxValue])
            .range([h, 0]);
        
        const chartGroup = svg.append('g')
            .classed('chartGroup', true)
            .attr('transform', 'translate(30,3)')

        let barGroups = chartGroup
            .selectAll('g')
            .data(rngArray);

        chartGroup.append("linearGradient")
            .attr("id", "line-gradient")
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", 0)
            .attr("y1", yScale(0))
            .attr("x2", 0)
            .attr("y2", yScale(maxValue))
            .selectAll("stop")
            .data([
                { offset: "0%", color: "blue"},
                { offset: "100%", color: "red"}
            ])
            .enter().append("stop")
            .attr("offset", function (d) { return d.offset; })
            .attr("stop-color", function (d) { return d.color; });

        chartGroup
            .append('path')
            .datum(rngArray.map((d) => LogToNum(d)))
            .attr('fill', 'none')
            .attr('stroke', 'url(#line-gradient)')
            .attr('stroke-width', 4)
            .attr('d', d3.line()
                .x((d, i) => i * barWidth)
                .y((d) => yScale(d))
            )
            

        let yAxis = d3.axisLeft(yScale);
        chartGroup.append('g')
            .classed('axis y', true)
            .call(yAxis);

    }, [rngArray]);


    return (
        <div className="App container">
            <h3>Visualiser</h3>
            <svg width="100%" height="600px" className="border border-primary rounded p-2"></svg>

        </div>
    );
}

export default Graph;