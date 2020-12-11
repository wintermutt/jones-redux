export default function Window({
  show = false,
  backgroundColor = '#f8e1c6',
  children
}) {
  if (!show) return null
  
  const spacing = '50px'
  
  return (
    <>
      <div className="window">
        {children}
      </div>

      <style jsx>{`
        .window {
          position: absolute;
          top: ${spacing};
          left: ${spacing};
          bottom: ${spacing};
          right: ${spacing};
          border: 2px solid black;
          background: ${backgroundColor};
        }
      `}</style>
    </>
  )
}