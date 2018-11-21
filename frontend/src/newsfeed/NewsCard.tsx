import * as React from "react";
import {Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import IconButton from "@material-ui/core/IconButton/IconButton";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";

const styles = (theme: Theme) => createStyles({
    card: {
        marginBottom: theme.spacing.unit * 2
    },

    source: {
        marginBottom: "12px"
    },

    linkIcon: {
        marginLeft: theme.spacing.unit
    },

    title: {
        display: "flex",
        alignItems: "center"
    }
});

interface Props extends WithStyles<typeof styles> {
    newsItem: any;
}

const getHostname = (link: string) => {
    const url = new URL(link);
    return url.hostname;
};

export const NewsCard = withStyles(styles)((props: Props) => (
    <Card square className={props.classes.card}>
        <CardContent>
            <div className={props.classes.title}>
                <Typography variant={"headline"}>
                    <span dangerouslySetInnerHTML={{__html: props.newsItem.title}}/>
                </Typography>
                <IconButton className={props.classes.linkIcon} href={props.newsItem.link} target={"_blank"}><OpenInNewIcon/></IconButton>
            </div>
            <Typography className={props.classes.source} color={"textSecondary"} gutterBottom>{getHostname(props.newsItem.link)}</Typography>
            <Typography><span dangerouslySetInnerHTML={{__html: props.newsItem.content}}/></Typography>
        </CardContent>
    </Card>
));