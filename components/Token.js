import getPosition from '../helpers/getPosition'

export default function Token({ position, width, height }) {
  const {top, left, bottom, right} = getPosition(width, height, position)

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
          width: ${width}vw;
          height: ${height}vh;
          font-size: 0.6em;
          text-align: center;
          padding-top: 3px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: flex-end;
          pointer-events: none;
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