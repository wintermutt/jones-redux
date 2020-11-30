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
          font-size: 6px;
          text-align: center;
          padding-top: 3px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: flex-end;
          pointer-events: none;
        }

        .token {
          width: 16px;
          height: 14px;
          border-radius: 10px;
          background: rgb(48, 179, 48);
          margin-bottom: 15px;
          box-shadow: 0 4px 0 rgb(28, 114, 28);
        }
      `}</style>
    </>
  )
}