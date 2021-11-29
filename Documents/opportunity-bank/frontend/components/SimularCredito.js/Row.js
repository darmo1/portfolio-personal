import * as React from 'react'
import { separadorMillares } from '../../utils/separadorMillares'

export function Row(props) {
  return (
    <tbody>
      <tr className="border">
        <td className="text-center p-4">{props.periodo}</td>
        <td className="text-center p-4">{separadorMillares(props.cuota)}</td>
        <td className="text-center p-4">{separadorMillares(props.interes)}</td>
        <td className="text-center p-4">{separadorMillares(props.capital)}</td>
        <td className="text-center p-4">{separadorMillares(props.saldo)}</td>
      </tr>
    </tbody>
  )
}

export function createRows(arr) {
  return arr.map(({ cuota, interes, capital, saldo }, index) => {
    if (saldo <= 0) {
      return (
        <Row
          periodo={index}
          cuota={cuota}
          interes={interes}
          capital={capital}
          saldo={0}
          key={index}
        />
      )
    }

    return (
      <Row
        periodo={index}
        cuota={cuota}
        interes={interes}
        capital={capital}
        saldo={saldo}
        key={index}
      />
    )
  })
}
