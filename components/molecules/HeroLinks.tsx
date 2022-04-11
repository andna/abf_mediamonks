import React from "react";
import {Hero} from "../../types/Hero";
import {Accordion, AccordionDetails, AccordionSummary, Badge, Grid, Tooltip, Typography} from "@mui/material";

import {styled} from "@mui/material/styles";
import colors from "../atoms/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {ExtraInfo} from "../../types/ExtraInfo";


type Props = {
    extraInfo: ExtraInfo[];
}




const HeroLinks: React.FC<Props> = ({ extraInfo }) => {

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

    return (
        <>
        {extraInfo.map((info : ExtraInfo) => (
            <AccordionRoot
                key={info.id}
                elevation={3}
            >
                <AccordionSummaryContainer expandIcon={<ExpandMoreIcon />}>
                    <span>
                        <span style={{textTransform:'capitalize'}}>
                            {info.id}
                        </span>
                        {' '}
                        <small><small>({info.available})</small></small>
                    </span>
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