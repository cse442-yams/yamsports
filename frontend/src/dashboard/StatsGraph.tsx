import createStyles from "@material-ui/core/styles/createStyles";
import {Theme, WithStyles} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import * as React from "react";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {blue, blueGrey, indigo, lightBlue, lightGreen, orange, purple, red, teal} from "@material-ui/core/colors";

const styles = (theme: Theme) => createStyles({

});

interface Props extends WithStyles<typeof styles> {
    data: any[];
    labels: string[];
    yLabel: string;
}

const colors = [red[700], indigo[700], orange[700], purple[700], lightBlue[700], lightGreen[700], teal[700], blueGrey[700]];

export const StatsGraph = withStyles(styles)((props: Props) => {
    return (
            <LineChart data={props.data} width={500} height={400}>
                <XAxis dataKey={"date"}/>
                <YAxis/>
                <CartesianGrid strokeDasharray={"3 3"}/>
                <Tooltip/>
                <Legend/>
                {props.labels.map((label, i) => (
                    <Line key={label} dataKey={label} stroke={colors[i]} strokeWidth={2}/>
                ))}
            </LineChart>
    )
});