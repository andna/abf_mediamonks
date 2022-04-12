import React from "react";
import {Accordion, AccordionDetails, AccordionSummary, Badge, Grid, Tooltip, Typography, useTheme} from "@mui/material";

import {styled} from "@mui/material/styles";
import colors from "../atoms/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {ExtraInfo} from "../../types/ExtraInfo";


type Props = {
    extraInfo: ExtraInfo[];
}




const HeroLinks: React.FC<Props> = ({ extraInfo }) => {

    const theme = useTheme();
    const AccordionRoot = styled(Accordion)({
        margin: "16px 0",
        boxShadow: "0px 3px 6px 1px rgba(0,0,0,0.15)",

        "&:before": {
            backgroundColor: "unset",
        },
    });

    const AccordionSummaryContainer = styled(AccordionSummary)({
        padding: "0 24px",
        "& .MuiAccordionSummary-content": {
            margin: "10px 0 !important", // Avoid change of sizing on expanded
        },
        "& .MuiAccordionSummary-expandIconWrapper": {
            color: colors.blueBright,
        },
    });

    const styles = {
        icon: {
            margin: "0px 8px 0 -8px",
            position: "relative" as "relative",
            top: 5
        },
        name: {
            textTransform: 'capitalize' as 'capitalize'
        },
        number: {
            color: theme.palette.secondary.main
        }
    }

    return (
        <>
        {extraInfo.map((info : ExtraInfo) => (
            <AccordionRoot
                key={info.id}
                elevation={3}
                disabled={info.available === 0}
            >
                <AccordionSummaryContainer expandIcon={<ExpandMoreIcon />}>
                    <b>
                        <span style={styles.icon}>{info.iconId}</span>
                        {' '}
                        <span style={styles.name}>
                            {info.id}
                        </span>
                        {' '}
                        <span style={styles.number}>{info.available}</span>
                    </b>
                </AccordionSummaryContainer>
                <AccordionDetails>
                    <ul>
                        {info.items.map(data => {
                            return <li key={data.name}>
                                {data.name}
                            </li>
                        })}
                    </ul>
                    {info.available > 20 &&
                    <span>And more!</span>}
                </AccordionDetails>
            </AccordionRoot>
        ))
        }
        </>
    )
}

export default HeroLinks;