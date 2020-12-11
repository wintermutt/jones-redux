import { useState } from 'react'

export default function Modal({children}) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <>
      <div className="background" onClick={() => setDismissed(true)}>
        <div className="modal">
          {children}
        </div>
      </div>

      <style jsx>{`
        .background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal {
          border: 1px solid #6e5b45;
          background: #fff;
          width: 40vw;
          font-size: 12px;
          padding: 10px;
          text-align: center;
          border-radius: 5px;
        }
      `}</style>
    </>
  )
}