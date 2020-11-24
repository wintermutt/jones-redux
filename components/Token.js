import getPosition from '../helpers/getPosition'

export default function Token({ position }) {
  const size = 20
  const {top, left, bottom, right} = getPosition(size, position)

  return (
    <>
      <div className="container">
        <div className="token"></div>
      </div>

      <style jsx>{`
        .container {
          position: absolute;
          top: ${top};
          left: ${left};
          bottom: ${bottom};
          right: ${right};
          border: 1px solid transparent;
          width: ${size}%;
          height: ${size}%;
          font-size: 0.6em;
          text-align: center;
          padding-top: 3px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: flex-end;
        }

        .token {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background: red;
          margin-bottom: 10px;
          box-shadow: 0 1px 1px black;
        }
      `}</style>
    </>
  )
}