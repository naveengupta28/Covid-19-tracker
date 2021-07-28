import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import './infoBox.css'

export default function InfoBox({title,cases,active,isRed,total,...props}) {
    return (
        <Card onClick={props.onClick} className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"}`}>
            <CardContent>
                <Typography color="textSecondary">
                   {title}
                </Typography>
                <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>{cases}</h2>
                <Typography className="infoBox_total" color="textSecondary">
                    {total} total

                </Typography>

            </CardContent>
        </Card>
    )
}
