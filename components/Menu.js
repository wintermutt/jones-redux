import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {
  getCurrentBuilding,
  getLocalProducts,
  getEmployers,
  getEmployerJobs,
  buy,
  applyForJob
} from '../model/slice'

import { getContext, selectContext } from '../model/ui'

export default function Menu() {
  const dispatch = useDispatch()

  const building = useSelector(getCurrentBuilding)
  const context = useSelector(getContext)
  const products = useSelector(getLocalProducts)
  const employers = useSelector(getEmployers)
  const jobs = useSelector(state => getEmployerJobs(state, context.employer))

  let items = []

  if (context.name === 'buildingMain' && products) {
    items = products.map(p => ({
      label: p.name,
      amount: p.price,
      handleClick: () => dispatch(buy(p.name))
    }))  
  }

  if (context.name === 'buildingMain' && building.name === 'Employment Office') {
    items = employers.map(employer => ({
      label: employer,
      handleClick: () => dispatch(selectContext({name: 'employerJobs', employer}))
    }))
  }
  
  if (context.name === 'employerJobs') {
    items = jobs.map(j => ({
      label: j.name,
      amount: j.wage,
      handleClick: () => dispatch(applyForJob(j.name))
    }))
  }

  return (
    <>
      <ul>
        {items.map(i =>
          <li onClick={i.handleClick} key={i.label}>
            {i.label}
            {i.amount &&
              <span className="amount">${i.amount}</span>
            }
          </li>
        )}
      </ul>

      <style jsx>{`
        ul {
          flex-grow: 1;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-content: flex-start;
          margin: 0;
          padding: 5px;
          list-style-type: none;
          position: absolute;
          top: 100px;
          bottom: 25px;
          left: 0;
          right: 0;
        }

        li {
          padding: 7px;
          margin: 1px;
          width: calc(50% - 2px);
          height: 50px;
          cursor: pointer;
          background-color: rgba(255, 255, 255, 0.3);
          font-size: 8px;
          line-height: 150%;
          position: relative;
        }

        .amount {
          position: absolute;
          right: 5px;
          bottom: 3px;
        }
      `}</style>
    </>
  )
}