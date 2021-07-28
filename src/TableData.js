import React from 'react'
import './TableData.css'
import numeral from 'numeral'
function TableData({countries}) {
    return (
        <div className="table">
            {countries.map(({country,cases})=>(
                <tr>
                    <td>{country}</td>
                    <td><strong>{numeral(cases).format("0,0") }</strong></td>
                </tr>
            ))}
            
        </div>
    )
}

export default TableData
